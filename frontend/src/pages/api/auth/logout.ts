import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { cookies } = req;

  const jwt = cookies.JWT;

  console.log(jwt);

  if (!jwt) {
    return res.json({ message: 'You are already not login!' });
  } else {
    const serialized = serialize('JWT', '', {
      httpOnly: true,
      maxAge: -1,
      path: '/'
    });

    res.setHeader('Set-Cookie', serialized);
    res.status(200).json({ message: 'Successes!' });
  }
}
