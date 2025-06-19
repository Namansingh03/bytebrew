"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInSchema } from "@/schemas/authenticationSchema";
import { signIn } from "next-auth/react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const router = useRouter();

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const fields = signInSchema.safeParse({ email, password });

      if (!fields.success) {
        const fieldErrors = fields.error.flatten().fieldErrors;
        setErrors({
          email: fieldErrors.email?.[0],
          password: fieldErrors.password?.[0],
        });
        return;
      }

      const res = await signIn("credentials", {
        email: fields.data.email,
        password : fields.data.password,
        redirect: false,
      });

      if (res?.error) {
        setErrors({ password: res.error });
      } else {
        console.log(email, password)
        router.push("/");
      }
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleCredentialsSignIn} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your ByteBrew account
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isPending}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs ">{errors.email}</p>
                )}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isPending}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs ">{errors.password}</p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Signing In..." : "Sign In"}
              </Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  onClick={() => signIn("google")}
                  type="button"
                  className="w-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Login with Google</span>
                </Button>

                <Button
                  variant="outline"
                  type="button"
                  onClick={() => signIn("github")}
                  className="w-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="h-5 w-5 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 0C5.37 0 0 5.373 0 12a12.07 12.07 0 008.208 11.387c.6.113.82-.258.82-.577v-2.042c-3.338.728-4.042-1.415-4.042-1.415-.546-1.387-1.333-1.756-1.333-1.756-1.09-.75.084-.735.084-.735 1.204.085 1.838 1.245 1.838 1.245 1.07 1.834 2.808 1.304 3.492.996.107-.775.417-1.304.76-1.603-2.665-.3-5.467-1.354-5.467-6.022 0-1.332.47-2.42 1.236-3.273-.124-.3-.536-1.512.117-3.152 0 0 1.01-.322 3.31 1.248A11.51 11.51 0 0112 6.844c1.022.005 2.05.138 3.012.405 2.297-1.57 3.305-1.248 3.305-1.248.656 1.64.244 2.852.12 3.152.77.854 1.234 1.94 1.234 3.273 0 4.68-2.807 5.72-5.48 6.014.43.373.814 1.1.814 2.22v3.293c0 .322.216.694.824.577A12.075 12.075 0 0024 12c0-6.627-5.373-12-12-12z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Login with GitHub</span>
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a
                  href="/auth/sign-up"
                  className="underline underline-offset-4"
                >
                  Sign up
                </a>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/images/Email-campaign-amico.svg"
              alt="login image"
              className="absolute bg-purple-300 inset-0 h-full w-full object-contain p-10"
            />
            <a
              href="https://storyset.com/communication"
              className="text-xs text-muted hover:text-black"
            >
              Communication illustrations by Storyset
            </a>
          </div>
        </CardContent>
      </Card>
      <div className="font-semibold *:[a]:hover:text-primary text-center text-sm text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
