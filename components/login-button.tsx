"use client"

import { useRouter } from "next/navigation"
import React from "react"



export const LogInButton = ({children} : {children : React.ReactNode}) => {

    const router = useRouter();

    const onClickAction = () => {
        console.log("logIn button clicked")
        router.push("/auth/signIn")
    }

    return (
        <span className="cursor-pointer" onClick={onClickAction}>
            {children}
        </span>
    )
}