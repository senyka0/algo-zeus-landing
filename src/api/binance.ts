import axios from "axios";

export const fetchBinanceData = async (
  symbol: string,
  interval: string,
  limit: number
) => {
  const minLimit = Math.max(1, limit || 0);
  const proxy = process.env.NEXT_PUBLIC_CORS_PROXY || "";
  const target = "https://api.binance.com/api/v3/klines";
  const apiEndpoint = proxy ? `${proxy}${target}` : target;
  try {
    const response = await axios.get(apiEndpoint, {
      params: { symbol: symbol, interval: interval, limit: minLimit },
    });
    const closePrices = response.data.map((candle: Array<string | number>) =>
      parseFloat(candle[4] as string)
    );
    const benchmark = closePrices.map((price: number, index: number) => {
      if (index === 0) return 1;
      return price / closePrices[index - 1];
    });
    const benchmarkValue = benchmark.reduce((acc: number[], val: number) => {
      if (acc.length > 0) {
        acc.push(acc[acc.length - 1] * val);
      } else {
        acc.push(val);
      }
      return acc;
    }, []);
    return { closePrices, benchmarkValue };
  } catch (error) {
    throw error;
  }
};
