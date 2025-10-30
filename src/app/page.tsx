"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Dashboard from "@/components/Dashboard";
import Charts from "@/components/Charts";
import Contact from "@/components/Contact";
import { fetchVaultData } from "@/api/enzymeFinance";
import { fetchBinanceData } from "@/api/binance";

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const vaultData = await fetchVaultData();
        if (!vaultData || vaultData.length === 0) {
          setData([]);
          return;
        }
        const { closePrices, benchmarkValue } = await fetchBinanceData(
          "BTCUSDT",
          "1d",
          Math.max(1, vaultData.length)
        );

        const processedData = vaultData.map((item, index) => ({
          ...item,
          "BTCUSDT Benchmark Value": benchmarkValue[index],
          price: closePrices[index],
          timestamp: `${item.timestamp} (BTCUSDT: $${closePrices[index]})`,
        }));

        setData(processedData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#111121] h-screen w-full flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#111121] h-full w-full overflow-hidden">
      <Navbar />
      <Dashboard data={data} />
      <Charts data={data} />
      <Contact />
    </div>
  );
}
