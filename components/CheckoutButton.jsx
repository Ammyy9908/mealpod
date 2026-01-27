"use client";

import loadRazorpay from "@/lib/loadRazorpay";


export default function CheckoutButton({
  product,
  user,
  address,
  deliverySlot,
  startDate,
  specialInstructions,
  orderType
}) {
  const handleCheckout = async () => {
    // 1️⃣ Load Razorpay SDK
    const sdkLoaded = await loadRazorpay();
    if (!sdkLoaded) {
      alert("Failed to load Razorpay SDK");
      return;
    }

    // 2️⃣ Call backend → create-order
    const res = await fetch(
      `https://api.mealpod.shop/payment/create-order`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // if using cookies/session
        body: JSON.stringify({
          productId: product._id,
          userId: user.id, // TEMP — will remove once auth middleware added,
          address: address,
          slot: deliverySlot,
          start_date: startDate,
          special_instruction: specialInstructions,
          orderType: orderType
        })
      }
    );

    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "Failed to create order");
      return;
    }

    const data = await res.json();

    // 3️⃣ Configure Razorpay Checkout
    const options = {
      key: data.key, // rzp_test_xxx
      amount: data.amount * 100,
      currency: data.currency,

      name: "Meal Subscription",
      description: product.name,
      order_id: data.orderId,

      handler: async function (response) {
        // 4️⃣ Verify payment on backend (fallback)
        const verifyRes = await fetch(
          `https://api.mealpod.shop/payment/verify-payment`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId: user.id,
              productId: product._id
            })
          }
        );

        const verifyData = await verifyRes.json();

        if (verifyData.success) {
          alert("🎉 Subscription activated!");
          window.location.href = "/my-account/my-orders";
        } else {
          alert("Payment verification failed");
        }
      },

      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phone
      },

      theme: {
        color: "#16a34a"
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium"
    >
      Subscribe for ₹{product.pricing.price}
    </button>
  );
}
