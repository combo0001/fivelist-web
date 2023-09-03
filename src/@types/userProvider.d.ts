declare interface UserProvider<User> {
  user: User | null | undefined
  signUp: (email: string, password: string, name: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  // signOut: () => Promise<void>
}
