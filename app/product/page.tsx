import PostForm from "@/components/post/PostForm";
import { prisma } from "@/lib/prisma";
import React from "react";

type ActiveGuildType = {
  serverId: string;
  name: string;
  serverIcon: string | null;
  channelId: string | null;
  memberCount: number | null;
  active: boolean;
  createdAt: Date;
  description: string | null;
  tags: {
    id: string;
    name: string;
  }[];
};

async function getGuilds(): Promise<ActiveGuildType[]> {
  const guilds = await prisma.guild.findMany({
    where: {
      active: true,
    },
    include: {
      tags: true,
    },
  });
  return guilds;
}

const page = async () => {
  const guilds = await getGuilds();
  console.log(guilds);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <PostForm activeGuilds={guilds} />
    </div>
  );
};

export default page;
