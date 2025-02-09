"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getInitials } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Image from "next/image";
import { Session } from "next-auth";

const Header = ({ session }: { session: Session }) => {
  const pathName = usePathname();
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
      </Link>
      <ul className="flex flex-row items-center gap-5">
        <li>
          <Link
            href="/library"
            className={cn(
              "cursor-pointer text-base capitalize",
              pathName === "/library" ? "text-light-200" : "text-light-500"
            )}
          >
            Library
          </Link>
        </li>
        <li>
          <Link href="/my-profile" className="flex flex-row items-center gap-2">
            <Avatar>
              {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
              <AvatarFallback className="bg-blue-400">
                {getInitials(session?.user?.name || "IN")}
              </AvatarFallback>
            </Avatar>
            <p className="text-light-100 text-border">{session?.user?.name} </p>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
