import { NextApiRequest, NextApiResponse } from 'next';
import { getViewerIds } from '../../../lib/deta';

export default async function header(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const id = req.query.id as string;

    if (!id) {
      return res.status(400).json({
        message: 'Missing snap id',
      });
    }

    try {
      const viewerIds = await getViewerIds(id);
      if (!viewerIds) {
        return res.status(404).json({
          message: 'Snap not found',
        });
      }

      return res.status(200).json({
        viewerIds,
      });
      
    } catch (e) {
      return res.status(500).json({
        message: 'Something went wrong',
      });
    }
  }

  return res.status(405).end();
}
