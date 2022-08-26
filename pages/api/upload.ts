import { NextApiRequest, NextApiResponse } from 'next';
import absoluteUrl from 'next-absolute-url';
import { uploadSnap } from '../../lib/redis';

async function generateShortUrl(url: string): Promise<string> {
  const res = await fetch(
    `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${process.env.SHORTENER_API_KEY}`,
    {
      method: 'POST',
      body: JSON.stringify({
        dynamicLinkInfo: {
          domainUriPrefix: process.env.SHORTENER_DOMAIN,
          link: url,
        },
        suffix: {
          option: 'SHORT',
        },
      }),
    }
  );

  const body = await res.json();

  if (!body.shortLink) {
    throw new Error('Short link not found');
  }

  return body.shortLink;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { origin } = absoluteUrl(req);
    const snap = JSON.parse(req.body);

    if (!snap.photo || !snap.duration || !snap.maxViews) {
      return res.status(400).json({
        message: 'Invalid request body',
      });
    }
    try {
      const id = await uploadSnap({
        ...snap,
        viewedIds: [],
      });

      try {
        const shortUrl = await generateShortUrl(`${origin}/${id}`);
        return res.status(200).json({
          url: shortUrl,
        });
      } catch (e) {
        console.error(e);
        return res.status(200).json({
          url: `${origin}/${id}`,
        });
      }
    } catch (e: any) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  return res.status(405).end();
}
