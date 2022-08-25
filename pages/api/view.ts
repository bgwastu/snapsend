import { NextApiRequest, NextApiResponse } from 'next';
import { addViewer, deleteSnap, getSnap } from '../../lib/redis';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const id = req.query.id as string;
    const userId = req.query.userId as string;

    if (!id || !userId) {
      return res.status(400).json({
        message: 'Invalid request body',
      });
    }

    try {
      // get snap, then delete snap
      const snap = await getSnap(id.toUpperCase());

      if (!snap.duration) {
        return res.status(404).json({
          message: 'Snap not found, or has expired',
        });
      }

      if (snap.viewedIds.includes(userId)) {
        return res.status(400).json({
          message: 'You already viewed this snap',
        });
      }

      // check if snap has reached max views
      if (snap.viewedIds.length >= snap.maxViews - 1) {
        await deleteSnap(snap.entityId);
      }

      addViewer(userId, snap.entityId);

      return res.json(snap);

      // add userId to viewedIds
    } catch (e) {
      console.error(e);
      return res.status(500).end();
    }
  }
  return res.status(405).end();
}
