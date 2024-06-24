import { auth } from "@/lib/auth";
import React from "react";
import { prisma } from "@/lib/prisma";
import UserProfile from "@/components/user/UserProfile";

const getUser = async (access_token: string) => {
  const user = await fetch(
    `https://discord.com/api/v10/users/@me
  `,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  const response = await user.json();
  console.log(response, "response");
  return response;
};

const Profile = async () => {
  const session = await auth();
  console.log(session, "session from page");

  const account = await prisma.account.findFirst({
    where: {
      userId: session?.user?.id,
    },
  });
  console.log(account, "account from the profile page");

  const profile = account?.access_token
    ? await getUser(account.access_token)
    : null;

  return (
    <div>
      <UserProfile {...profile} />
    </div>
  );
};

export default Profile;
