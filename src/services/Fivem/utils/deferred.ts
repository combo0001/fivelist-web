/* eslint-disable no-empty-function, @typescript-eslint/no-empty-function */

export class Deferred<T = undefined> {
  public resolve: {
    (): void
    (v: T): void
  } = () => {}

  public reject: (err?: any) => void = () => {}

  public promise: Promise<T>

  constructor() {
    this.promise = new Promise<T>((resolve, reject) => {
      this.resolve = resolve as any
      this.reject = reject
    })
  }
}
