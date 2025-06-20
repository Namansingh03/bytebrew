"use client"

import React from "react";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react"


export default function Home() {
  const session = useSession();
  return (
    <main>
      <Navbar />
      {JSON.stringify(session)}
    </main>
  );
}
