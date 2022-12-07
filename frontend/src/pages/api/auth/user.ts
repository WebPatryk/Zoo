import type { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { cookies } = req;

  const jwt = cookies.JWT;

  console.log(jwt);

  if (!jwt) {
    return res.json({ message: 'Invalid token!' });
  }

  res.send({ data: 'Great your token is correct!' });
}
