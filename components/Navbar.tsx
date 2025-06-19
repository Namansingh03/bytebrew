"use client"

import { Button } from "@/components/ui/button"
import React from 'react'
import { LogInButton } from "./login-button"

function Navbar() {
  return (
    <nav className="w-full h-auto py-3 px-4 shadow-xl flex items-center justify-between">
     <h1 className="text-2xl font-semibold">
        ByteBrew
     </h1>
     
     <LogInButton>
        <Button className="hover:bg-teal-600">
        log-in
     </Button>
     </LogInButton>
    </nav>
  )
}

export default Navbar
