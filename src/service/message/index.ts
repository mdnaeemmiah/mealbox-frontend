/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const postMessage = async (data: any) => {
    try {
      const res = await fetch(`${process.env.SERVER_URL}/api/message/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      const result = await res.json();
      // console.log({ result });
      return result;
    } catch (error) {
      console.error("API Error:", error);
      return { ok: false, error: "Network error" };
    }
};

export const getMessages = async () => {
    try {
      const res = await fetch(`${process.env.SERVER_URL}/api/message`, { method: "GET" });
      return await res.json();
    } catch (error) {
      console.error("API Error:", error);
      return { ok: false, error: "Network error" };
    }
};

// export const updateMessage = async (id: string, data: any) => {
//     try {
//       const res = await fetch(`${process.env.SERVER_URL}/api/messages/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });
  
//       const result = await res.json();
//       console.log({ result });
//       return result;
//     } catch (error) {
//       console.error("API Error:", error);
//       return { ok: false, error: "Network error" };
//     }
// };

// export const deleteMessage = async (_id: string) => {
//     try {
//       const res = await fetch(`${process.env.SERVER_URL}/api/messages/${_id}`, {
//         method: "DELETE",
//       });
  
//       const result = await res.json();
//       console.log({ result });
//       return result;
//     } catch (error) {
//       console.error("API Error:", error);
//       return { ok: false, error: "Network error" };
//     }
// };
