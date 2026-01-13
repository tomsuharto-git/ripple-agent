/**
 * CoinGecko API integration for live crypto prices
 * Free tier: 10-30 calls/minute, no API key required
 */

export interface CryptoPrice {
  symbol: string;
  name: string;
  currentPrice: number;
  priceChange24h: number;
  priceChangePercent24h: number;
  marketCap: number;
  volume24h: number;
  high24h: number;
  low24h: number;
  lastUpdated: string;
}

export async function getXRPPrice(): Promise<CryptoPrice | null> {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/ripple?localization=false&tickers=false&community_data=false&developer_data=false',
      {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 60 }, // Cache for 60 seconds
      }
    );

    if (!response.ok) {
      console.error('CoinGecko API error:', response.status);
      return null;
    }

    const data = await response.json();
    const market = data.market_data;

    return {
      symbol: 'XRP',
      name: 'Ripple',
      currentPrice: market.current_price.usd,
      priceChange24h: market.price_change_24h,
      priceChangePercent24h: market.price_change_percentage_24h,
      marketCap: market.market_cap.usd,
      volume24h: market.total_volume.usd,
      high24h: market.high_24h.usd,
      low24h: market.low_24h.usd,
      lastUpdated: data.last_updated,
    };
  } catch (error) {
    console.error('Failed to fetch XRP price:', error);
    return null;
  }
}

export function formatPriceContext(price: CryptoPrice): string {
  const direction = price.priceChangePercent24h >= 0 ? '📈' : '📉';
  const changeSign = price.priceChangePercent24h >= 0 ? '+' : '';

  return `
## LIVE XRP MARKET DATA (as of ${new Date(price.lastUpdated).toLocaleString()})

| Metric | Value |
|--------|-------|
| Current Price | $${price.currentPrice.toFixed(4)} |
| 24h Change | ${changeSign}${price.priceChangePercent24h.toFixed(2)}% ${direction} |
| 24h High/Low | $${price.high24h.toFixed(4)} / $${price.low24h.toFixed(4)} |
| Market Cap | $${(price.marketCap / 1e9).toFixed(2)}B |
| 24h Volume | $${(price.volume24h / 1e9).toFixed(2)}B |

Use this live data to answer questions about current XRP price and market conditions.
`;
}

// Keywords that trigger price data fetch
export function isPriceQuery(message: string): boolean {
  const priceKeywords = [
    'price', 'cost', 'worth', 'value', 'trading', 'market cap',
    'volume', 'high', 'low', 'up', 'down', 'today', 'now',
    'current', 'live', 'real-time', 'realtime', 'how much',
    'gone up', 'gone down', 'increased', 'decreased', 'change'
  ];

  const lowerMessage = message.toLowerCase();
  return priceKeywords.some(keyword => lowerMessage.includes(keyword));
}
