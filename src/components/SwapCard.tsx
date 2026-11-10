import React, { useState } from "react";
import { TOKENS } from "../data/tokens";
import type { Token, SwapOrder } from "../types/dex";

interface SwapCardProps {
  onExecuteSwap: (order: SwapOrder) => void;
}

export const SwapCard: React.FC<SwapCardProps> = ({ onExecuteSwap }) => {
  const [fromToken, setFromToken] = useState<Token>(TOKENS[0]);
  const [toToken, setToToken] = useState<Token>(TOKENS[1]);
  const [fromAmount, setFromAmount] = useState<string>("1.0");
  const [slippage, setSlippage] = useState<number>(0.5);

  const exchangeRate = fromToken.priceUsd / toToken.priceUsd;
  const calculatedToAmount = (
    parseFloat(fromAmount || "0") * exchangeRate
  ).toFixed(4);

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount(calculatedToAmount);
  };

  const handleExecute = () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) return;
    onExecuteSwap({
      fromToken,
      toToken,
      fromAmount,
      toAmount: calculatedToAmount,
      slippage,
      timestamp: new Date().toLocaleTimeString(),
    });
    setFromAmount("");
  };

  return (
    <div className="max-w-md w-full mx-auto bg-slate-900/90 border border-purple-500/30 rounded-3xl p-6 shadow-2xl shadow-purple-950/50 space-y-4 backdrop-blur-xl">
      <div className="flex justify-between items-center">
        <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
          Swap Terminal
        </h2>
        <div className="flex gap-1 text-[10px]">
          {[0.1, 0.5, 1.0].map((s) => (
            <button
              key={s}
              onClick={() => setSlippage(s)}
              className={`px-2 py-1 rounded-lg border transition-all ${
                slippage === s
                  ? "bg-purple-600/20 border-purple-500 text-purple-300 font-bold"
                  : "bg-slate-950 border-slate-800 text-slate-400"
              }`}
            >
              {s}%
            </button>
          ))}
        </div>
      </div>

      {/* From Token Box */}
      <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2">
        <div className="flex justify-between text-[11px] text-slate-400">
          <span>You Pay</span>
          <span>
            Balance: {fromToken.balance} {fromToken.symbol}
          </span>
        </div>
        <div className="flex justify-between items-center gap-3">
          <input
            type="number"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
            placeholder="0.0"
            className="w-full bg-transparent text-xl font-black text-slate-100 focus:outline-none"
          />
          <select
            value={fromToken.symbol}
            onChange={(e) => {
              const found = TOKENS.find((t) => t.symbol === e.target.value);
              if (found) setFromToken(found);
            }}
            className="bg-purple-950/60 border border-purple-500/40 text-purple-200 px-3 py-2 rounded-xl text-xs font-bold focus:outline-none cursor-pointer"
          >
            {TOKENS.map((t) => (
              <option
                key={t.symbol}
                value={t.symbol}
                disabled={t.symbol === toToken.symbol}
              >
                {t.icon} {t.symbol}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Swap Direction Button */}
      <div className="flex justify-center -my-2 relative z-10">
        <button
          onClick={handleSwapTokens}
          className="bg-purple-900/80 hover:bg-purple-800 border border-purple-500/50 p-2.5 rounded-xl text-purple-300 shadow-lg transition-transform hover:scale-110"
        >
          ⇅
        </button>
      </div>

      {/* To Token Box */}
      <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2">
        <div className="flex justify-between text-[11px] text-slate-400">
          <span>You Receive (Estimated)</span>
          <span>
            Balance: {toToken.balance} {toToken.symbol}
          </span>
        </div>
        <div className="flex justify-between items-center gap-3">
          <input
            type="text"
            readOnly
            value={calculatedToAmount}
            className="w-full bg-transparent text-xl font-black text-cyan-400 focus:outline-none"
          />
          <select
            value={toToken.symbol}
            onChange={(e) => {
              const found = TOKENS.find((t) => t.symbol === e.target.value);
              if (found) setToToken(found);
            }}
            className="bg-purple-950/60 border border-purple-500/40 text-purple-200 px-3 py-2 rounded-xl text-xs font-bold focus:outline-none cursor-pointer"
          >
            {TOKENS.map((t) => (
              <option
                key={t.symbol}
                value={t.symbol}
                disabled={t.symbol === fromToken.symbol}
              >
                {t.icon} {t.symbol}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleExecute}
        className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-black py-3 rounded-2xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-purple-950/50 cursor-pointer"
      >
        Execute Swap ⚡
      </button>
    </div>
  );
};
