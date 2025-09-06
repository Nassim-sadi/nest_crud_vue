export const isUserLoggedIn = (auth: any) => (auth ? !!(auth.user && auth.token) : false)
