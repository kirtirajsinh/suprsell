import React from "react";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { SignIn, SignOut } from "../auth-components";

const LoginButton = async () => {
  const session = await auth();
  if (!session?.user) return <SignIn />;
  return (
    <div className="">
      {session?.user && (
        <div className="">
          <div className="flex flex-row rounded-full  items-center space-x-4">
            {session?.user?.image && (
              <Image
                src={session?.user?.image ?? ""}
                alt={session?.user?.name ?? ""}
                width={40}
                height={40}
                className="rounded-full min-w-[20%]"
              />
            )}
            <p className="text-sm sm:text-md ">{session?.user?.name}</p>
          </div>
        </div>
      )}
      {/* <SignOut /> */}
    </div>
  );
};

export default LoginButton;
