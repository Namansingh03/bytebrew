import { GalleryVerticalEnd } from "lucide-react"
import { SignUpForm } from "@/components/auth/signup-form"

export default function SignUpPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 bg-[radial-gradient(ellipse_at_top,_white,_purple)]">
      <div className="flex w-[450px] flex-col gap-6">
        <a href="#" className="flex items-center gap-2 text-3xl self-center font-semiBold">
          ByteBrew
        </a>
        <SignUpForm />
      </div>
    </div>
  )
}
