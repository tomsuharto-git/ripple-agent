/**
 * FOCUS GROUP API CLIENT
 *
 * Utilities for interacting with the Focus Group Chat API.
 * API is stateless - history must be sent with each request.
 */

import { API_CONFIG, type APIMessage, type AskResponse, type Persona } from '@/data/group-chat';

/**
 * Ask a question to the entire group.
 * AI will select 2-4 personas who would naturally respond.
 */
export async function askGroup(
  question: string,
  history: APIMessage[] = []
): Promise<AskResponse> {
  const response = await fetch(
    `${API_CONFIG.baseUrl}/audiences/${API_CONFIG.audience}/ask`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        history,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

/**
 * Ask a question to a specific persona (1:1 mode).
 * Note: Individual endpoint returns { response: {...} } not { responses: [...] }
 * so we normalize it to match the group response format.
 */
export async function askPersona(
  personaId: number,
  question: string,
  history: APIMessage[] = []
): Promise<AskResponse> {
  const response = await fetch(
    `${API_CONFIG.baseUrl}/audiences/${API_CONFIG.audience}/ask/${personaId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        history,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();

  // Normalize: individual endpoint returns { response: {...} }
  // but we need { responses: [...] } to match group format
  return {
    responses: [data.response],
    history: data.history,
  };
}

/**
 * Fetch persona details from API.
 * Note: We also have personas hardcoded in group-chat.ts for faster initial load.
 */
export async function fetchPersonas(): Promise<Persona[]> {
  const response = await fetch(
    `${API_CONFIG.baseUrl}/audiences/${API_CONFIG.audience}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch personas: ${response.status}`);
  }

  const data = await response.json();
  return data.personas || [];
}

/**
 * Helper to convert internal messages to API format.
 */
export function toAPIHistory(
  messages: Array<{
    type: 'user' | 'persona';
    content: string;
    persona?: { id: number; name: string };
  }>
): APIMessage[] {
  return messages.map((msg) => {
    if (msg.type === 'user') {
      return {
        role: 'moderator' as const,
        text: msg.content,
      };
    }
    return {
      role: 'persona' as const,
      text: msg.content,
      persona_id: msg.persona?.id,
      persona_name: msg.persona?.name,
    };
  });
}
