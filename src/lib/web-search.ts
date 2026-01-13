/**
 * Brave Search API integration
 * Free tier: 2,000 queries/month
 * Get API key at: https://brave.com/search/api/
 */

export interface SearchResult {
  title: string;
  url: string;
  description: string;
  age?: string;
}

export interface SearchResponse {
  query: string;
  results: SearchResult[];
  timestamp: string;
}

export async function searchWeb(query: string, count: number = 5): Promise<SearchResponse | null> {
  const apiKey = process.env.BRAVE_SEARCH_API_KEY;

  if (!apiKey) {
    console.error('BRAVE_SEARCH_API_KEY not configured');
    return null;
  }

  try {
    const params = new URLSearchParams({
      q: query,
      count: count.toString(),
      text_decorations: 'false',
      search_lang: 'en',
      country: 'us',
    });

    const response = await fetch(
      `https://api.search.brave.com/res/v1/web/search?${params}`,
      {
        headers: {
          'Accept': 'application/json',
          'X-Subscription-Token': apiKey,
        },
      }
    );

    if (!response.ok) {
      console.error('Brave Search API error:', response.status);
      return null;
    }

    const data = await response.json();

    const results: SearchResult[] = (data.web?.results || []).slice(0, count).map((r: {
      title: string;
      url: string;
      description: string;
      age?: string;
    }) => ({
      title: r.title,
      url: r.url,
      description: r.description,
      age: r.age,
    }));

    return {
      query,
      results,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Failed to search web:', error);
    return null;
  }
}

export function formatSearchContext(search: SearchResponse): string {
  if (search.results.length === 0) {
    return '';
  }

  let context = `\n## WEB SEARCH RESULTS for "${search.query}"\n\n`;

  search.results.forEach((result, i) => {
    context += `### ${i + 1}. ${result.title}\n`;
    context += `${result.description}\n`;
    context += `Source: ${result.url}${result.age ? ` (${result.age})` : ''}\n\n`;
  });

  context += `\n*Search performed at ${new Date(search.timestamp).toLocaleString()}*\n`;
  context += `\nUse these search results to provide current, accurate information. Cite sources when relevant.\n`;

  return context;
}

// Keywords that trigger web search
const NEWS_KEYWORDS = [
  'news', 'latest', 'recent', 'today', 'yesterday', 'this week',
  'announced', 'update', 'breaking', 'report', 'rumor',
  'sec', 'regulation', 'lawsuit', 'ruling', 'court',
  'partnership', 'deal', 'acquisition', 'ipo',
  'what happened', 'what\'s happening', 'current events'
];

const SEARCH_TRIGGERS = [
  'search', 'look up', 'find', 'google', 'what is',
  'who is', 'when did', 'where is', 'why did', 'how did'
];

export function shouldSearchWeb(message: string): boolean {
  const lower = message.toLowerCase();

  // Check for news-related keywords
  const hasNewsKeyword = NEWS_KEYWORDS.some(keyword => lower.includes(keyword));

  // Check for explicit search triggers
  const hasSearchTrigger = SEARCH_TRIGGERS.some(trigger => lower.includes(trigger));

  // Check if it's a question about recent/current events
  const isCurrentEventsQuestion =
    (lower.includes('ripple') || lower.includes('xrp')) &&
    (hasNewsKeyword || lower.includes('?'));

  return hasNewsKeyword || hasSearchTrigger || isCurrentEventsQuestion;
}

export function buildSearchQuery(message: string): string {
  // Add "Ripple XRP" context if not already present
  const lower = message.toLowerCase();
  const hasContext = lower.includes('ripple') || lower.includes('xrp');

  if (hasContext) {
    return message;
  }

  return `Ripple XRP ${message}`;
}
