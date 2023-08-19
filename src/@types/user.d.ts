/* eslint-disable no-unused-vars */
declare namespace UserType {
  declare interface Provider<User, Session> {
    // user: User | null
    user: any
    signUp: (
      email: string,
      password: string,
      name: string,
    ) => Promise<{ user: User | null; session: Session | null }>
    signIn: (
      email: string,
      password: string,
    ) => Promise<{ user: User | null; session: Session | null }>
    // signOut: () => Promise<void>
  }
}
