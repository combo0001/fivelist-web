declare interface StorageProvider {
  getFileURL: (bucket: string, path: string) => Promise<string>
  uploadFile: (bucket: string, fileName: string, fileBody: ArrayBuffer) => Promise<string | null>
}
  