import { NextApiRequest, NextApiResponse } from "next";
import absoluteUrl from "next-absolute-url";
import { uploadSnap } from "../../lib/deta";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    let { origin } = absoluteUrl(req);

    if (process.env.DETA_SPACE_APP_HOSTNAME) {
      origin = `https://${process.env.DETA_SPACE_APP_HOSTNAME}`;
    }
    const snap = JSON.parse(req.body);

    if (!snap.photo || !snap.duration || !snap.maxViews) {
      return res.status(400).json({
        message: "Invalid request body",
      });
    }
    try {
      const id = await uploadSnap({
        ...snap,
        viewedIds: [],
      });

      return res.status(200).json({
        url: `${origin}/${id}`,
      });
    } catch (e: any) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  return res.status(405).end();
}
