/* eslint-disable @typescript-eslint/no-explicit-any */

// "use client";




// import { registerUser } from "@/service/authService";
// import { signIn } from "next-auth/react";
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";

// export default function RegisterPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     role:"customer",
//     password: "",
//     confirmPassword: "",
//     agreeTerms: false,
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? e.target.checked : value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }
//     console.log("Register data:", formData);
//     // Handle registration logic here
//     registerUser(formData)
//   };


//   const handleSocialRegister = (provider: string) => {
//       console.log(`Logging in with ${provider}`);
//       // Implement NextAuth or other OAuth logic here
//       if(provider == 'github'){
//         signIn('github',{
//           callbackUrl:"http://localhost:3000/profile"
//         })
//       }else if(provider == 'google'){
//         signIn('google',{
//           callbackUrl:"http://localhost:3000/profile"
//         })
//       };
      
//     };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-2xl">
//         <h2 className="text-2xl font-semibold text-center text-gray-700">Register</h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-600">
//               Full Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               required
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
//             />
//           </div>

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
//             <label htmlFor="role" className="block text-sm font-medium text-gray-600">
//               Role
//             </label>
//             <select
//               id="role"
//               name="role"
//               required
//               value={formData.role}
//               onChange={handleChange}
//               className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
//             >
//               <option value="customer">Customer</option>
//               <option value="mealProvider">MealProvider</option>
//               <option value="admin">Admin</option>
//             </select>
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

//           <div>
//             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               id="confirmPassword"
//               name="confirmPassword"
//               required
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
//             />
//           </div>

//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               name="agreeTerms"
//               checked={formData.agreeTerms}
//               onChange={handleChange}
//               className="text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
//             />
//             <span className="ml-2 text-sm text-gray-600">
//               I agree to the <a href="#" className="text-indigo-600 hover:underline">Terms & Conditions</a>
//             </span>
//           </div>

//           <button type="submit" className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
//             Register
//           </button>
//         </form>

//         {/* Social Register Buttons */}
//         <div className="flex flex-col space-y-3">
//           <button
//             onClick={() => handleSocialRegister("github")}
//             className="flex items-center justify-center px-4 py-2 text-white bg-gray-900 rounded-lg hover:bg-gray-600"
//           >
//             <Image src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo" width={24} height={24} className="mr-2 rounded-full" />
//             Sign Up with GitHub
//           </button>
//           <button
//             onClick={() => handleSocialRegister("google")}
//             className="flex items-center justify-center px-4 py-2 text-white bg-slate-800 rounded-lg hover:bg-slate-600"
//           >
//             <Image src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="GitHub Logo" width={24} height={24} className="mr-2 rounded-full" />
//             Sign Up with Google
//           </button>
//         </div>

//         <p className="text-sm text-center text-gray-600">
//           Already have an account? <Link href="/login" className="text-indigo-600 hover:underline">Login</Link>
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
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { verifyToken } from "@/utils/veryfyToken";

const Register = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { control, handleSubmit } = useForm();
  const [register] = useRegisterMutation();

  const onSubmit = async (data: any) => {
    console.log("Registering user:", data);
    const toastId = toast.loading("Registering...");

    try {
      const res = await register({ name: data.name, email: data.email, password: data.password }).unwrap();

      if (!res?.data?.accessToken) {
        throw new Error("No accessToken received");
      }

      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user, token: res.data.accessToken }));

      toast.success("Registration successful!", { id: toastId });
      router.push("/"); // Redirect to homepage after registration
    } catch (error: any) {
      toast.error(error?.message || "Registration failed", { id: toastId });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
              />
            )}
          />

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
            rules={{ required: "Password is required", minLength: 6 }}
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
            Register
          </Button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </Row>
  );
};

export default Register;
