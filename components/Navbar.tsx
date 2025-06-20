"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { LogInButton } from "./login-button";
import { useSession } from "next-auth/react";

function Navbar() {
  const session = useSession();

  return (
    <nav className="max-w-[90%] bg-blue-50 min-w-[90%] h-auto py-3 px-4 shadow-lg flex items-center border-1 border-accent justify-between rounded-br-xl rounded-bl-xl ">
      <h1 className="text-2xl font-semibold">ByteBrew</h1>

      {session.status == "authenticated" && <Button>welcome</Button>}
      {session.status == "unauthenticated" && (
        <LogInButton>
          <Button>login</Button>
        </LogInButton>
      )}
    </nav>
  );
}

export default Navbar;
