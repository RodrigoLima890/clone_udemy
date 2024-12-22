import authConfig from "./auth.config"
import NextAuth from "next-auth"
import {publicRoutes, authRoutes, apiAuthPrefix, DEFAULT_REDIRECT} from './routes'
import { NextResponse } from "next/server"
const { auth } = NextAuth(authConfig)

export default auth(async function middleware(req) {
  const {nextUrl} = req
  const isLoggedIn = !!req.auth
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname);
  const isApiAuth = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isWebHookRoutes = nextUrl.pathname.includes(nextUrl.pathname);

  if(isApiAuth || isWebHookRoutes){
    return
  }

  if(isAuthRoutes){
    if(isLoggedIn){
        return NextResponse.redirect(new URL(DEFAULT_REDIRECT, nextUrl))
    }
    return 
  }

  if(!isLoggedIn && !isPublicRoutes && !isAuthRoutes){
    let callbackUrl = nextUrl.pathname

    if(nextUrl.search){
        callbackUrl += nextUrl.search
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl)

    return NextResponse.redirect(new URL(`/sign-in?callbackUrl=${encodedCallbackUrl}`, nextUrl))
  }

})

export const config = {
    matcher: [
      '/((?!.*\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)',
    ],
};