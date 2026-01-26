"use client";

import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { store } from "./store";
import { CartBootstrap } from "@/components/CartBootstrap";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <CartBootstrap />
        {children}
      </Provider>
    </SessionProvider>
  );
}
