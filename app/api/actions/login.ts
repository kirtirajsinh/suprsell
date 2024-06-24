"use server";

import { signIn, signOut } from "@/lib/auth";
import { fleekSdk } from "@/lib/fleek";

export const Login = async (provider: string) => {
  await signIn(provider);
};

export const Logout = async () => {
  await signOut();
};


