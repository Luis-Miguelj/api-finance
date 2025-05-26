import argon from 'argon2'
export async function encryptPassword(password: string) {
  const salt = await argon.hash(password, {
    type: 1,
  })
  if (!salt) {
    throw new Error('Failed to encrypt password')
  }

  return salt
}
