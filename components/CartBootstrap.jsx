"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCart } from "@/app/store/cartSlice";

export default function CartBootstrap() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return null;
}
