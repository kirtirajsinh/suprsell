import Image from "next/image";
import React from "react";

interface UserProfileProps {
  id: string;
  username: string;
  email: string;
  avatar: string;
  banner: string;
  global_name: string;
}

const UserProfile = (profile: UserProfileProps) => {
  return (
    <div className="rounded-lg p-4 max-w-2xl mx-auto">
      <div className="relative">
        <div className="h-48 bg-gray-700 rounded-t-lg"></div>
        <div className="absolute left-4 transform -translate-y-1/2 w-20 h-20 rounded-full overflow-hidden border-4 border-gray-800">
          <Image
            src={`https://cdn.discordapp.com/avatars/${profile?.id}/${profile?.avatar}.png`}
            alt="Profile"
            className="w-full h-full bg-gray-600 rounded-full object-cover"
            width={80}
            height={80}
          />
        </div>
      </div>
      <div className="mt-12 md:mt-4 md:ml-28">
        <h2 className="text-xl font-semibold">{profile.username}</h2>
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex justify-between items-center">
          <span>Display Name</span>
          <span>{profile?.global_name}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Username</span>
          <span>{profile?.username}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
