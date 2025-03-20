/* eslint-disable @typescript-eslint/no-explicit-any */

// "use client";
// import { signIn } from "next-auth/react";
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";

// export default function LoginPage() {
//   const [formData, setFormData] = useState({ email: "", password: "", remember: false });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Login data:", formData);
//     // Handle authentication logic here
//     signIn("credentials",{
//       email:formData?.email,
//       password:formData?.password,
//       redirect:true,
//       callbackUrl:"http://localhost:3000/profile"
//     })
//   };

//   const handleSocialLogin = (provider: string) => {
//     console.log(`Logging in with ${provider}`);
//     // Implement NextAuth or other OAuth logic here
//     if(provider == 'github'){
//       signIn('github',{
//         callbackUrl:"http://localhost:3000/profile"
//       })
//     }else if(provider == 'google'){
//       signIn('google',{
//         callbackUrl:"http://localhost:3000/profile"
//       })
//     };
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-2xl">
//         <h2 className="text-2xl font-semibold text-center text-gray-700">Login</h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-600">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               required
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-600">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               required
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
//             />
//           </div>

//           <div className="flex items-center justify-between">
//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 name="remember"
//                 checked={formData.remember}
//                 onChange={handleChange}
//                 className="text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
//               />
//               <span className="ml-2 text-sm text-gray-600">Remember me</span>
//             </label>
//             <a href="#" className="text-sm text-indigo-600 hover:underline">
//               Forgot password?
//             </a>
//           </div>

//           <button type="submit" className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-800">
//             Login
//           </button>
//         </form>

//         {/* Social Login Buttons */}
//         <div className="flex flex-col space-y-3">
//           <button
//             onClick={() => handleSocialLogin("github")}
//             className="flex items-center justify-center px-4 py-2 text-white bg-gray-900 rounded-lg hover:bg-gray-600"
//           >
//             <Image src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo" width={24} height={24} className="mr-2 rounded-full" />
//             Login with GitHub
//           </button>
//           <button
//             onClick={() => handleSocialLogin("google")}
//             className="flex items-center justify-center px-4 py-2 text-white bg-slate-800  rounded-lg hover:bg-slate-600"
//           >
//            <Image src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="GitHub Logo" width={24} height={24} className="mr-2 rounded-full" />
//             Login with Google
//           </button>
//         </div>

//         <p className="text-sm text-center text-gray-600">
//           Don&rsquo;t have an account? <Link href="/register" className="text-indigo-600 hover:underline">Sign up</Link>
//         </p>
//       </div>
//     </div>
//   );
// }






"use client";

import { Button, Row } from "antd";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import Link from "next/link";
import { verifyToken } from "@/utils/veryfyToken";

const Login = () => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm();
  const [login] = useLoginMutation();

  const onSubmit = async (data: any) => {
    console.log("Login data:", data);
    const toastId = toast.loading("Logging in...");

    try {
      const res = await login({ email: data.email, password: data.password }).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user, token: res.data.accessToken }));
      toast.success("Logged in successfully!", { id: toastId });

      window.location.href = "/"; // Redirect to homepage after login
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed", { id: toastId });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: "Email is required" }}
            render={({ field }) => (
              <input
                {...field}
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <input
                {...field}
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
              />
            )}
          />

          <Button
            htmlType="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-800"
          >
            Login
          </Button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link href="/register" className="text-indigo-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </Row>
  );
};

export default Login;
