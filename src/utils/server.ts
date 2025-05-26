import { Elysia } from 'elysia'
import jwt from '@elysiajs/jwt'
import { env } from '@/types/env'

export const server = new Elysia().use(
  jwt({
    secret: env.JWT_SECRET,
    b64: true,
  })
)
