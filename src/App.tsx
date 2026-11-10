import React, { useState } from "react";
import type { SwapOrder } from "./types/dex";
import { Header } from "./components/Header";
import { SwapCard } from "./components/SwapCard";
import { TransactionFeed } from "./components/TransactionFeed";

export const App: React.FC = () => {
  const [orders, setOrders] = useState<SwapOrder[]>([
    {
      fromToken: {
        symbol: "ETH",
        name: "Ethereum",
        icon: "⚡",
        balance: 3.42,
        priceUsd: 2850,
      },
      toToken: {
        symbol: "USDC",
        name: "USD Coin",
        icon: "💵",
        balance: 4250,
        priceUsd: 1,
      },
      fromAmount: "0.5",
      toAmount: "1425.00",
      slippage: 0.5,
      timestamp: "10:42 AM",
    },
  ]);

  const handleExecuteSwap = (newOrder: SwapOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-mono flex flex-col selection:bg-purple-500 selection:text-white pb-12">
      <Header />

      <main className="flex-1 max-w-xl w-full mx-auto p-6 space-y-6 flex flex-col justify-center">
        <SwapCard onExecuteSwap={handleExecuteSwap} />
        <TransactionFeed orders={orders} />
      </main>
    </div>
  );
};

export default App;
