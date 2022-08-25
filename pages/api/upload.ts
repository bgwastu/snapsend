import { NextApiRequest, NextApiResponse } from 'next';
import { uploadSnap } from '../../lib/redis';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const snap = JSON.parse(req.body);

    // validation
    if (!snap.photo || !snap.duration || !snap.maxViews) {
      return res.status(400).json({
        message: 'Invalid request body',
      });
    }

    uploadSnap({
      ...snap,
      viewedIds: [],
    })
      .then((id) => {
        res.status(200).json({ id });
      })
      .catch((e) => {
        console.error(e);
        res.status(500).send({
          message: e.message,
        });
      });
    return;
  }

  return res.status(405).end();
}
