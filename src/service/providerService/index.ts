/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

// export const createMealProvider = async (data) => {
//   try {
//     const response = await fetch("http://localhost:5000/api/mealProvider/create", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error("❌ API Request Failed:", error);
//     return { success: false, message: "Network error", error };
//   }
// };

export const getMealProviders = async () => {
    try {
      const res = await fetch(`${process.env.SERVER_URL}/api/mealProvider`, { method: "GET" });
      const result = await res.json();
      console.log({ result });
      return result;
    } catch (error) {
      console.error("API Error:", error);
      return { ok: false, error: "Network error" };
    }
};

export const getSingleMealProvider = async (mealProviderId: string) => {
    try {
      const res = await fetch(`${process.env.SERVER_URL}/api/mealProvider/${mealProviderId}`, { method: "GET" });
      const result = await res.json();
      console.log({ result });
      return result;
    } catch (error) {
      console.error("API Error:", error);
      return { ok: false, error: "Network error" };
    }
};

export const updateMealProvider = async (id: string, data: any) => {
    try {
      const res = await fetch(`${process.env.SERVER_URL}/api/mealProvider/${id}`, {
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

export const deleteMealProvider = async (_id: string) => {
  try {
    const res = await fetch(`${process.env.SERVER_URL}/api/mealProvider/${_id}`, {
      method: 'DELETE',
    });
    const result = await res.json();
    console.log('Deletion result:', result); // Debug log
    return result; // Assuming the API returns { ok: true } on success, or { ok: false, error: 'error' } on failure.
  } catch (error) {
    console.error('API Error:', error);
    return { ok: false, error: 'Network error' };
  }
};
