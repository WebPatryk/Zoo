import type { NextApiRequest, NextApiResponse } from 'next';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';

const secret = 'Asdainejq23n1231231232';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { name, password } = req.body;

  if (name == 'admin123' && password) {
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        name
      },
      secret
    );

    const serialized = serialize('JWT', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
      path: '/'
    });

    res.setHeader('Set-Cookie', serialized);
    res.status(200).json({ message: 'Successes!' });
  } else {
    return res.status(401).json({ message: 'Invalid credentials!' });
  }
}
