
export const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
export const NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY


export interface User {
    id: string | number
    name?: string
    avatar?: string | number 
}


export interface IMessage {
  id: string | number
  text?: string
  createdAt: Date | number
    userId: number
    chatId: number
  image?: string
  video?: string
  audio?: string
  sent?: boolean
 // received?: boolean
  pending?: boolean
}
