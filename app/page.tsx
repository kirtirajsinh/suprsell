import HeroSection from "@/components/landing/HeroSection";
import Image from "next/image";

const getTopGuilds = async () => {
  const guilds = await fetch(
    "https://discord.com/api/v10/users/@me/guilds?with_counts=true",
    {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      },
    }
  );
  const response = await guilds.json();
  console.log(response, "response");
  return response;
};

export default async function Home() {
  const getGuilds = await getTopGuilds();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-36  bg-gradient-to-b from-indigo-100 via-purple-100 to-indigo-100 ">
      <HeroSection />
    </main>
  );
}
