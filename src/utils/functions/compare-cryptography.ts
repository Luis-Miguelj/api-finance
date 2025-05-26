import argon from 'argon2'
export async function comparePassword(hash: string, password: string) {
  const verified = await argon.verify(hash, password)
  if (!verified) {
    throw new Error('Password does not match')
  }

  return verified
}
