import { Client, Entity, Schema } from 'redis-om';

let client: Client;

async function connect() {
  if (client === undefined) {
    client = new Client();
  } else {
    return client;
  }

  if (!client.isOpen()) {
    await client.open(process.env.REDIS_URL);
  }
}

export interface Snap {
  photo: string;
  caption: string;
  duration: number;
  maxViews: number;
  viewedIds: string[];
}

export class Snap extends Entity {}

let schema = new Schema(Snap, {
  photo: { type: 'string' },
  caption: { type: 'string' },
  duration: { type: 'number' },
  maxViews: { type: 'number' },
  viewedIds: { type: 'string[]' },
});

export async function uploadSnap(snap: Snap): Promise<string> {
  await connect();
  const repository = client.fetchRepository(schema);

  //@ts-ignore
  const data = repository.createEntity(snap);

  const id = await repository.save(data);
  await repository.expire(id, 60 * 60 * 24); // expire in 24 hours
  return id;
}

export async function deleteSnap(id: string): Promise<void> {
  await connect();
  const repository = client.fetchRepository(schema);
  await repository.remove(id);
}

export async function getSnap(id: string): Promise<Snap> {
  await connect();
  const repository = client.fetchRepository(schema);
  const data = await repository.fetch(id);
  return data;
}

export async function addViewer(userId: string, id: string): Promise<void> {
  await connect();
  const repository = client.fetchRepository(schema);
  const data = await repository.fetch(id);
  if (data.viewedIds) {
    data.viewedIds.push(userId);
    await repository.save(data);
  }
}
