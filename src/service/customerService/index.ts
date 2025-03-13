/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const postPreference = async (data: any) => {
    try {
      const res = await fetch(`${process.env.SERVER_URL}/api/postPreference`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      const result = await res.json();
      console.log({result});
      return result;
    } catch (error) {
      console.error("API Error:", error);
      return { ok: false, error: "Network error" };
    }
  };
  

  // Get all post preferences
export const getPostPreferences = async () => {
  try {
    const res = await fetch(`${process.env.SERVER_URL}/api/postPreference/gain`, { method: "GET" });
    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    return { ok: false, error: "Network error" };
  }
};

export const updatePostPreference = async (id: string, data: any) => {
  try {
    const res = await fetch(`${process.env.SERVER_URL}/api/postPreference/${id}`, {
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


export const deletePostPreference = async (_id: string) => {
  try {
    const res = await fetch(`${process.env.SERVER_URL}/api/postPreference/${_id}`, {
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

