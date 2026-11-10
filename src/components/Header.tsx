import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="border-b border-purple-900/50 bg-slate-950/80 px-8 py-4 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-slate-950 font-black text-sm shadow-lg shadow-purple-950/50">
          DEX
        </div>
        <div>
          <h1 className="text-sm font-black text-cyan-400 tracking-wider uppercase">
            NEXUS-SWAP // Liquidity Protocol
          </h1>
          <p className="text-[10px] text-purple-400">
            DECENTRALIZED AMM EXCHANGE TERMINAL
          </p>
        </div>
      </div>
      <div className="text-xs bg-purple-950/40 border border-purple-500/30 px-4 py-2 rounded-xl text-purple-300 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>
          Gas: <strong className="text-emerald-400">14 Gwei</strong>
        </span>
      </div>
    </header>
  );
};
