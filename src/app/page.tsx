import Navbar from "@/components/Navbar";
import Dashboard from "@/components/Dashboard";
import Charts from "@/components/Charts";
import Contact from "@/components/Contact";
import { fetchVaultData } from "@/api/enzymeFinance";
import { fetchBinanceData } from "@/api/binance";

export const revalidate = 0;
export const preferredRegion = "fra1";

export default async function Home() {
  const data = await fetchVaultData();
  const { closePrices, benchmarkValue } = await fetchBinanceData(
    "BTCUSDT",
    "1d",
    data.length
  );
  data.map((item, index) => {
    item["BTCUSDT Benchmark Value"] = benchmarkValue[index];
    item.price = closePrices[index];
    item.timestamp = `${item.timestamp} (BTCUSDT: $${closePrices[index]})`;
  });
  return (
    <div className="bg-[#111121] h-full w-full overflow-hidden">
      <Navbar />
      <Dashboard data={data} />
      <Charts data={data} />
      <Contact />
    </div>
  );
}
