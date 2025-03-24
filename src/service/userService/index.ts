/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

// Create user
// export const createUser = async (data: any) => {
//   try {
//     const res = await fetch(`${process.env.SERVER_URL}/api/users`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });

//     const result = await res.json();
//     console.log({ result });
//     return result;
//   } catch (error) {
//     console.error("API Error:", error);
//     return { ok: false, error: "Network error" };
//   }
// };

// Get all users


// Get user by ID
// export const getUserById = async (userId: string) => {
//   try {
//     const res = await fetch(`${process.env.SERVER_URL}/api/user/${userId}`, { method: "GET" });
//     return await res.json();
//   } catch (error) {
//     console.error("API Error:", error);
//     return { ok: false, error: "Network error" };
//   }
// };

// export const getUsers = async () => {
//     try {
//       const res = await fetch(`${process.env.SERVER_URL}/api/user`, { method: "GET" });
//       return await res.json();
//     } catch (error) {
//       console.error("API Error:", error);
//       return { ok: false, error: "Network error" };
//     }
//   };
// Update user details
export const updateUser = async (userId: string, data: any) => {
  try {
    const res = await fetch(`${process.env.SERVER_URL}/api/user/${userId}`, {
      method: "PATCH",
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

export const getUsers = async () => {
    try {
      const res = await fetch(`${process.env.SERVER_URL}/api/user`, { method: "GET" });
      return await res.json();
    } catch (error) {
      console.error("API Error:", error);
      return { ok: false, error: "Network error" };
    }
  };

// // Change user status
// export const changeUserStatus = async (userId: string, data: any) => {
//   try {
//     const res = await fetch(`${process.env.SERVER_URL}/api/user/change-status/${userId}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });

//     const result = await res.json();
//     console.log({ result });
//     return result;
//   } catch (error) {
//     console.error("API Error:", error);
//     return { ok: false, error: "Network error" };
//   }
// };

// Delete user
export const deleteUser = async (userId: string) => {
  try {
    const res = await fetch(`${process.env.SERVER_URL}/api/user/${userId}`, { method: "DELETE" });
    const result = await res.json();
    console.log({ result });
    return result;
  } catch (error) {
    console.error("API Error:", error);
    return { ok: false, error: "Network error" };
  }
};
