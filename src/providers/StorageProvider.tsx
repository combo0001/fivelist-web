/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Database } from '@/@types/supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { Context, createContext, useCallback, useContext, useEffect } from 'react'

type ProviderProps = StorageProvider

const StorageCtx = createContext<ProviderProps | null>(null)

export const StorageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const supabase = createClientComponentClient<Database>()

  const getFileURL = useCallback(
    async (bucket: string, path: string): Promise<string> => {
        const { data } = await supabase.storage
            .from(bucket)
            .getPublicUrl(path)

        return data.publicUrl
    },
    [supabase],
  )

  const uploadFile = useCallback(
    async (bucket: string, fileName: string, fileBody: ArrayBuffer): Promise<string | null> => {
        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(fileName, fileBody, { upsert: true, contentType: 'image/png' })
    
        if (!error) {
            return getFileURL(bucket, data.path)
        } else {
            return null
        }
    },
    [supabase],
  )

  return (
    <StorageCtx.Provider
      value={{
        getFileURL,
        uploadFile
      }}
    >
      {children}
    </StorageCtx.Provider>
  )
}

export const useStorage = () =>
  useContext<ProviderProps>(StorageCtx as Context<ProviderProps>)
