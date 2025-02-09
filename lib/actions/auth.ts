"use server";

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { error } from "console";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import ratelimit from "../ratelimit";
import { redirect } from "next/navigation";

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params;
  // get access to user ip
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);
  if (!success) return redirect("/too-fast");

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.error) {
      return { success: false, error: "signin err" };
    }
    return { success: true };
  } catch (error) {
    console.log(error, "sign in err");
    return { success: false, error: "signin err" };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { fullName, email, universityId, universityCard, password } = params;
  // get access to user ip
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);
  if (!success) return redirect("/too-fast");

  // check if user already exist
  const exsitUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (exsitUser.length > 0) {
    // user exist
    return { success: false, error: "user already exists" };
  }
  const hashedPassword = await hash(password, 10);
  try {
    await db.insert(users).values({
      fullName,
      email,
      universityCard,
      universityId,
      password: hashedPassword,
    });
    // auto sign in if user already signed in
    await signInWithCredentials({
      email,
      password,
    });
    return { success: true };
  } catch (error) {
    console.log(error, "Signup err");
    return { success: false, error: "signup err" };
  }
};
