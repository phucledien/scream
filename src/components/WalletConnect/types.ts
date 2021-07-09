import { FC } from "react";

export enum ConnectorNames {
  Injected = "injected",
  WalletConnect = "walletconnect",
}

export type Login = (connectorId: ConnectorNames) => void;

export interface Config {
  title: string;
  icon: any;
  connectorId: ConnectorNames;
}

export type Handler = () => void;
