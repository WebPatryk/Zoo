import { serialize } from 'cookie';
import { sign } from '../../../services/jwt_sign_verify';
import fetch from 'node-fetch';
import { NextApiRequest, NextApiResponse } from 'next';

interface UserData {
  username: string;
  password: string;
}
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { username, password }: UserData = req.body;

  const secret = process.env.SECRET;

  try {
    const response = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const { access_token }: any = await response.json();
    if (access_token) {
      const token = await sign(access_token, secret);

      const serialised = serialize('OutsiteJWT', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      });

      res.setHeader('Set-Cookie', serialised);

      res.status(200).json({ message: 'Success!' });
    } else {
      res.status(401).json({ message: 'Invalid credentials!' });
    }
  } catch (error) {
    res.status(401).json({ message: error + 'Error!' });
    console.log(error, 'err');
  }
}
