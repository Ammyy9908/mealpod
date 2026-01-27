"use client";

import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { store } from "./store";
import CartBootstrap from "@/components/CartBootstrap";
import SubscriptionBootstrap from "@/components/SubscriptionBootstrap";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <CartBootstrap />
        <SubscriptionBootstrap />
        {children}
      </Provider>
    </SessionProvider>
  );
}
