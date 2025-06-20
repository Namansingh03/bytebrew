"use client"
import { SignUpForm } from "@/components/auth/signup-form"

export default function SignUpPage() {
  return (
    <div className="bg-[radial-gradient(ellipse_at_top,_white,_purple)] flex min-h-9/12 flex-col items-center max-h-full justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <SignUpForm />
      </div>
    </div>
  )
}
