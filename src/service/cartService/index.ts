/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

const BASE_URL = process.env.SERVER_URL || "";

// ✅ Add an item to the cart
export const addToCart = async (data: any) => {
  try {
    const res = await fetch(`${BASE_URL}/api/cart`, {
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

// ✅ Get all cart items
export const getCartItems = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/cart`, { method: "GET" });
    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    return { ok: false, error: "Network error" };
  }
};

// ✅ Update the quantity of an item
export const updateCartItem = async (id: string, quantity: number) => {
  try {
    const res = await fetch(`${BASE_URL}/api/cart/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });

    const result = await res.json();
    console.log({ result });
    return result;
  } catch (error) {
    console.error("API Error:", error);
    return { ok: false, error: "Network error" };
  }
};

// ✅ Remove an item from the cart
export const removeFromCart = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/api/cart/${id}`, {
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

// ✅ Clear the entire cart
export const clearCart = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/cart/clear`, { method: "DELETE" });

    const result = await res.json();
    console.log({ result });
    return result;
  } catch (error) {
    console.error("API Error:", error);
    return { ok: false, error: "Network error" };
  }
};
