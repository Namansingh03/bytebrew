import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { 
  authRoutes,
  publicRoutes,
  DEAFAULT_REDIRECT,
  apiAuthPrefix
 } from "./constants/route";

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicroutes = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if(isApiAuthRoute) return ;

  if(isAuthRoute){
    if(isLoggedIn){
      return Response.redirect(new URL(DEAFAULT_REDIRECT, nextUrl))
    }
    return ;
  }

  if(!isLoggedIn && !publicRoutes){
     return Response.redirect(new URL("/auth/sign-in", nextUrl))
  }

  return ;

})

export const config = {
  matcher: [
    '/((?!_next|favicon.ico|public|api/auth|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};