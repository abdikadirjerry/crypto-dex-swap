import React from "react";
import type { SwapOrder } from "../types/dex";

interface TransactionFeedProps {
  orders: SwapOrder[];
}

export const TransactionFeed: React.FC<TransactionFeedProps> = ({ orders }) => {
  return (
    <div className="max-w-md w-full mx-auto bg-slate-900/60 border border-purple-900/40 rounded-3xl p-5 space-y-3">
      <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider">
        Recent Protocol Swaps
      </h3>
      <div className="space-y-2">
        {orders.length > 0 ? (
          orders.map((ord, idx) => (
            <div
              key={idx}
              className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex justify-between items-center text-xs"
            >
              <div>
                <span className="font-bold text-slate-100">
                  {ord.fromAmount} {ord.fromToken.symbol}
                </span>
                <span className="text-slate-500 mx-1.5">→</span>
                <span className="font-bold text-cyan-400">
                  {ord.toAmount} {ord.toToken.symbol}
                </span>
              </div>
              <span className="text-[10px] text-purple-400 bg-purple-950/40 px-2 py-0.5 rounded border border-purple-500/20">
                {ord.timestamp}
              </span>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-xs text-slate-500">
            No swaps executed in this session yet.
          </div>
        )}
      </div>
    </div>
  );
};
