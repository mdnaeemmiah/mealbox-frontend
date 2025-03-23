
import Image from "next/image";

const profile = async () => {

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
 
        <>
          <div className="flex justify-center">
            <Image
              src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
              
              width={150}
              height={150}
              alt="user image"
              className="rounded-full mt-5"
            />
          </div>
          <h1 className="text-4xl text-center mt-10">
            Welcome 
          </h1>
          <h1 className="text-4xl text-center mt-10">
            Logged-in user email
          </h1>
          <h1 className="text-4xl text-center mt-10">
            Logged-in user role: 
          </h1>
        </>
 
    </div>
  );
};

export default profile;
