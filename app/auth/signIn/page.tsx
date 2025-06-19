import { GalleryVerticalEnd } from "lucide-react"
import { SignInForm } from "@/components/auth/signin-form"

export default function SignInPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 bg-[radial-gradient(ellipse_at_top,_white,_purple)]">
      <div className="flex w-[450px] flex-col gap-6">
        <a href="#" className="flex items-center gap-2 text-3xl self-center font-semiBold">
          ByteBrew
        </a>
        <SignInForm />
      </div>
    </div>
  )
}
