import { SignJWT, jwtVerify } from 'jose';
import { Token } from '@typescript-eslint/types/dist/generated/ast-spec';

export async function sign(
  payload: Token,
  secret: string | undefined
): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60; // one hour

  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(secret));
}

export async function verify(
  token: string,
  secret: string | undefined
): Promise<Token | unknown> {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
  // run some checks on the returned payload, perhaps you expect some specific values

  return payload;
}
