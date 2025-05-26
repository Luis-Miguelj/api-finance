import { describe, expect, it } from 'bun:test'

describe('Teste de login', () => {
  it('deve retornar um token', async () => {
    const response = await fetch('http://localhost:3333/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'sb@gmail.com',
        password: 'password123',
      }),
    })

    expect(response.status).toBe(200)

    const body = await response.json()
    expect(body).toHaveProperty('token')
    expect(typeof body.token).toBe('string')
  })
})
