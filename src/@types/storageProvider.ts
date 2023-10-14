/* eslint-disable @typescript-eslint/no-unused-vars */

declare interface StorageProvider {
  getFileURL: (bucket: string, path: string) => string
  uploadFile: (
    bucket: string,
    filePath: string,
    file: File,
  ) => Promise<string | null>
}
