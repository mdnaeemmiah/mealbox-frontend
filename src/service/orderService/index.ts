/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

const BASE_URL = process.env.SERVER_URL || "";

// ✅ Create a new order
export const createOrder = async (data: any) => {
  try {
    const res = await fetch(`${BASE_URL}/api/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    console.log({ result });
    return result;
  } catch (error) {
    console.error("API Error:", error);
    return { ok: false, error: "Network error" };
  }
};

// ✅ Get all orders
export const getOrders = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/order`, { method: "GET" });
    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    return { ok: false, error: "Network error" };
  }
};

// ✅ Verify Payment
export const verifyPayment = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/order/verify`, { method: "GET" });
    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    return { ok: false, error: "Network error" };
  }
};

// ✅ Update an order
export const updateOrder = async (id: string, data: any) => {
  try {
    const res = await fetch(`${BASE_URL}/api/order/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    console.log({ result });
    return result;
  } catch (error) {
    console.error("API Error:", error);
    return { ok: false, error: "Network error" };
  }
};

// // ✅ Delete an order
export const deleteOrder = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/api/order/${id}`, {
      method: "DELETE",
    });

    const result = await res.json();
    console.log({ result });
    return result;
  } catch (error) {
    console.error("API Error:", error);
    return { ok: false, error: "Network error" };
  }
};
