import { NextApiRequest, NextApiResponse } from 'next';
import { deleteSnap, getSnap } from '../../lib/redis';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const id = req.query.id as string;

    if (!id) {
      return res.status(400).json({
        message: 'Invalid request body',
      });
    }

    try {
      // get snap, then delete snap
      const snap = await getSnap(id.toUpperCase());

      if (!snap.duration) {
        return res.status(404).json({
          message: 'Snap not found',
        });
      }

      await deleteSnap(snap.entityId);

      return res.json(snap);
    } catch (e) {
      return res.status(500).send(e);
    }
  }

  return res.status(405).end();
}
