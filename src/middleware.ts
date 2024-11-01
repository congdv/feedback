import { publicRoutes } from './components/routes';
import paths from './paths';

import { auth } from "@/auth"
 
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  if(isApiAuthRoute) {
    return;
  }

  if(!isLoggedIn && !isPublicRoute) {

    return Response.redirect(
      new URL(paths.home(), nextUrl)
    );
  }


  return;
})


// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
