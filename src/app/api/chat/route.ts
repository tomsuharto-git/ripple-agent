import Anthropic from '@anthropic-ai/sdk';
import { systemPrompt, chatConfig } from '@/data/chat-context';
import { getXRPPrice, formatPriceContext, isPriceQuery } from '@/lib/crypto-price';

const anthropic = new Anthropic();

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Convert messages to Anthropic format
    const anthropicMessages = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    }));

    // Check if latest message is asking about price/market data
    const latestMessage = messages[messages.length - 1];
    let enhancedSystemPrompt = systemPrompt;

    if (latestMessage && isPriceQuery(latestMessage.content)) {
      const priceData = await getXRPPrice();
      if (priceData) {
        enhancedSystemPrompt = systemPrompt + '\n\n---\n' + formatPriceContext(priceData);
      }
    }

    // Create streaming response
    const stream = await anthropic.messages.stream({
      model: chatConfig.model,
      max_tokens: chatConfig.maxTokens,
      system: enhancedSystemPrompt,
      messages: anthropicMessages,
    });

    // Create a ReadableStream for SSE
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              const text = event.delta.text;
              const data = JSON.stringify({ text });
              controller.enqueue(encoder.encode('data: ' + data + '\n\n'));
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process chat request' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
