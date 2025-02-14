import { Session } from "next-auth";
import React from "react";

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="admin-header">
      <div>
        {/* Title here: Welcome + Username */}
        <h2 className="text-dark-400 text-2xl font-semibold">
          Welcome, {session?.user?.name}
        </h2>
        {/* Subtitle here */}
        <p className="text-slate-500 text-base">
          Monitor all of your users and books here
        </p>
      </div>
      <p>Search</p>
    </header>
  );
};

export default Header;
