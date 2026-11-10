export interface Token {
  symbol: string;
  name: string;
  icon: string;
  balance: number;
  priceUsd: number;
}

export interface SwapOrder {
  fromToken: Token;
  toToken: Token;
  fromAmount: string;
  toAmount: string;
  slippage: number;
  timestamp: string;
}
