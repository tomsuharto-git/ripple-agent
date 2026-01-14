import Anthropic from '@anthropic-ai/sdk';
import { systemPrompt, chatConfig } from '@/data/chat-context';
import { getXRPPrice, formatPriceContext, isPriceQuery } from '@/lib/crypto-price';
import { searchWeb, formatSearchContext, shouldSearchWeb, buildSearchQuery } from '@/lib/web-search';

const anthropic = new Anthropic();

export async function POST(req: Request) {
  try {
    const { messages, temperature = 0.7 } = await req.json();

    // Convert messages to Anthropic format
    const anthropicMessages = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    }));

    // Check if latest message needs additional context
    const latestMessage = messages[messages.length - 1];
    let enhancedSystemPrompt = systemPrompt;

    if (latestMessage) {
      const userQuery = latestMessage.content;

      // Fetch price data if asking about price
      if (isPriceQuery(userQuery)) {
        const priceData = await getXRPPrice();
        if (priceData) {
          enhancedSystemPrompt += '\n\n---\n' + formatPriceContext(priceData);
        }
      }

      // Fetch web search results if asking about news/current events
      if (shouldSearchWeb(userQuery)) {
        const searchQuery = buildSearchQuery(userQuery);
        const searchResults = await searchWeb(searchQuery, 5);
        if (searchResults && searchResults.results.length > 0) {
          enhancedSystemPrompt += '\n\n---\n' + formatSearchContext(searchResults);
        }
      }
    }

    // Create streaming response
    const stream = await anthropic.messages.stream({
      model: chatConfig.model,
      max_tokens: chatConfig.maxTokens,
      temperature: Math.min(Math.max(temperature, 0), 1), // Clamp between 0 and 1 for Anthropic
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
