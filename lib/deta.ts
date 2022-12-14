import { Deta } from "deta";
import { Snap } from "./types";

const deta = Deta();

const db = deta.Base("snaps");

export async function uploadSnap(snap: Snap): Promise<string> {
  const daySeconds = 60 * 60 * 24;

  const res = await db.put(snap, undefined, { expireIn: daySeconds });

  if (res === null) {
    throw new Error("Failed to upload snap");
  }

  if (!res.key || typeof res.key !== "string") {
    throw new Error("Failed to upload snap");
  }

  return res.key;
}

export async function deleteSnap(id: string): Promise<void> {
  await db.delete(id.toLowerCase());
}

export async function getSnap(id: string): Promise<Snap | null> {
  const res = await db.get(id.toLowerCase());

  return res as Snap | null;
}

export async function addViewer(userId: string, id: string): Promise<void> {
  const daySeconds = 60 * 60 * 24;

  const snap = await getSnap(id);

  if (snap === null) {
    throw new Error("Snap not found");
  }

  const res = await db.update(
    { viewedIds: [...snap.viewedIds, userId] },
    id.toLowerCase(),
    {
      expireIn: daySeconds,
    }
  );

  if (res === null) {
    throw new Error("Failed to add viewer");
  }
}

export async function getViewerIds(id: string): Promise<string[] | null> {
  const res = await db.get(id.toLowerCase());

  if (res === null) {
    return null;
  }

  if (!res.viewedIds || !Array.isArray(res.viewedIds)) {
    return null;
  }

  return res.viewedIds as string[];
}
