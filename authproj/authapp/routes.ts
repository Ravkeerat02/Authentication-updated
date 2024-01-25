// will contain all the routes - doesnt require auth
export const publicRoutes = ["/"];

// will redirect to the mention paged
export const authRoutes = ["/auth/login", "/auth/register", "/auth/error"];

//never block this route - should be accessible
// used for api AUTH purposes
export const apiAuthPrefix = "/api/auth";

//default redirect path
export const DEFAULT_LOIGIN_REDIRECT = "/settings";
