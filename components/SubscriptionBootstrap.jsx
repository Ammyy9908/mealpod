"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserSubscriptions } from "@/app/store/subscriptionSlice";

export default function SubscriptionBootstrap() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserSubscriptions());
  }, [dispatch]);

  return null;
}
