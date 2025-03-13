import { registerUser } from "@/service/authService";
import { authOptions } from "@/utils/authOption";
import { getServerSession } from "next-auth";
import Image from "next/image";

const profile = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    await registerUser({ ...session?.user });
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      {session?.user && (
        <>
          <div className="flex justify-center">
            <Image
              src={
                session?.user?.image ||
                "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
              }
              width={150}
              height={150}
              alt="user image"
              className="rounded-full mt-5"
            />
          </div>
          <h1 className="text-4xl text-center mt-10">
            Welcome {session?.user?.name}
          </h1>
          <h1 className="text-4xl text-center mt-10">
            Logged-in user email: {session?.user?.email}
          </h1>
          <h1 className="text-4xl text-center mt-10">
            Logged-in user role: {session?.user?.role}
          </h1>
        </>
      )}
    </div>
  );
};

export default profile;
