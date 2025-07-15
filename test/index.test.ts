import { env } from '@/types/env'
import { describe, expect, it } from 'bun:test'

describe('Teste de login', () => {
  it('Deve retornar um token', async () => {
    const response = await fetch('http://localhost:3333/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'luis@gmail.com',
        password: 'password123',
      }),
    })

    expect(response.status).toBe(200)

    const body = await response.json()
    expect(body).toHaveProperty('token')
    expect(typeof body.token).toBe('string')
  })
})

describe('Teste de criação de finança', () => {
  it('Deve criar uma nova finança', async () => {
    const financeResponse = await fetch(
      'http://localhost:3333/finance/e8161b14-0159-4646-93ec-d42f5b6732bb',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: env.JWT_ACCESS,
        },
        body: JSON.stringify({
          description: 'Compra de material de escritório',
          type: 'e',
          value: 1500.5,
        }),
      }
    )
    expect(financeResponse.status).toBe(201)
    const data = await financeResponse.json()
    expect(data).toHaveProperty('message')
    expect(data).toHaveProperty('data')

    expect(typeof data.data).toBe('object')
  })
})
