<div align="center">
  <img alt="Snapsend logo" width=60 src="https://user-images.githubusercontent.com/67826350/187028090-5fa001bc-f35f-4b6b-8a3b-729fa6e4ec29.png">
  <h1>Snapsend</h1>
</div>

Snapsend is a free and open-source application that allows you to share photos for a limited time and a limited number of recipients.

I built Snapsend to be participate in the [Redis Hackathon](https://dev.to/devteam/announcing-the-redis-hackathon-on-dev-3248).

[Demo](https://Snapsend.wastu.dev)

## Features

- Set the timer for the photos to expire
- The photo will be deleted after 24 hours if not opened
- Detect if the user is already viewed the photo
- Anonymous, no login required

## Screenshots
### Homepage
![Homepage](https://user-images.githubusercontent.com/67826350/187028255-ab1d6f86-079d-4234-a493-8c2a5a8e32a9.png)
### Share Snap
![Share Snap](https://user-images.githubusercontent.com/67826350/187028137-1f2da01a-4bc9-4a54-b0fa-63f08e04e1d7.png)
### Viewing Snap
![View Snap](https://user-images.githubusercontent.com/67826350/187028140-0df30e0b-a159-49ac-a068-a17e6efe49bf.png)


## Technologies Used

- Next.js
- Fingerprint.js
- Mantine
- RedisJSON
- Firebase dynamic links

## How it works
I have created a flowchart to give you a clear idea of how Snapsend works.  
### Uploading new snap
[![](https://mermaid.ink/img/pako:eNplkluL20AMhf-KGFhoISHveWhpnMSlhHbpbl5q50Gx5fWwmdEwl7Yhzn-vfEm2tH4wM9YnnXOQL6rimtRSPTzAi0fXwvO6tHLpn09F1nodosFwgPn8Q5dTBMOWzh2s3uUMoWXntH15f29Z9Rxkl11PEsRW29frvZoNU75Z6mBd7NBFdod_is-_uINNoR9b0fmv2HqS3m3R4LLBeYUeMvRClfbN_Oh8sQ_kIbkTYy02CFzLkRdDDlhddIAvj_nH64hProtSZWx_ko8jDdrKS7hSHf4Gu6_icVIajEmajI3zFMLY2cvI581kg2wkH6BOHqNmO4NKsg8HtDUY_K1NMmCTOQrMDXiqtNPSFRaT8GaQ2U7zqpOuXodUEEgmHFOMbG_sdmDzYj-GrzHimKQ_HTHQxOUD97nIyZIYI3hqWaLvv--g8Wxgqz31OKzPFo2uYCfLPKiZMuQN6lr-mks_qVTixFCplnKsqcF0iqUq7VXQ5ESUNrWO7JXs7BRopjBFfjrbSi2jT3SD1hplieZOObQ_mG_36x-sdNid)](https://mermaid.live/edit#pako:eNplkluL20AMhf-KGFhoISHveWhpnMSlhHbpbl5q50Gx5fWwmdEwl7Yhzn-vfEm2tH4wM9YnnXOQL6rimtRSPTzAi0fXwvO6tHLpn09F1nodosFwgPn8Q5dTBMOWzh2s3uUMoWXntH15f29Z9Rxkl11PEsRW29frvZoNU75Z6mBd7NBFdod_is-_uINNoR9b0fmv2HqS3m3R4LLBeYUeMvRClfbN_Oh8sQ_kIbkTYy02CFzLkRdDDlhddIAvj_nH64hProtSZWx_ko8jDdrKS7hSHf4Gu6_icVIajEmajI3zFMLY2cvI581kg2wkH6BOHqNmO4NKsg8HtDUY_K1NMmCTOQrMDXiqtNPSFRaT8GaQ2U7zqpOuXodUEEgmHFOMbG_sdmDzYj-GrzHimKQ_HTHQxOUD97nIyZIYI3hqWaLvv--g8Wxgqz31OKzPFo2uYCfLPKiZMuQN6lr-mks_qVTixFCplnKsqcF0iqUq7VXQ5ESUNrWO7JXs7BRopjBFfjrbSi2jT3SD1hplieZOObQ_mG_36x-sdNid)
### Viewing snap
[![](https://mermaid.ink/img/pako:eNpVkbFuwjAQhl_l5BmkDkwZWkGTQopUVaUd2pjhiA9ikdip7UBR4N3rhKQ0nmzdZ__fnWuWakEsYDuDZQbvIVfg1zT5sGRAl6TAZQS5VPs1jMf3MLsCszq2UGbaaYhDOGAuxcOlK7Xc-UWf4TFZZfoIk7sJlLij9QD4JHuGMJmTayMO0kqnDUjRYWGLRfU0N4Ti5AE69hnR7Ymna0ZkjDbrQdUbzBPO207SXKZ7EmAb1iosYVM5pxXn3Z15e2eRTIX4pwK-P4EON2h7-0ULxk3_jZEF-q4wt1Dgz0Axvik-JyHl5AhWPvg6xuUA8qbL5I1cZRS8NkP1WWzECjIFSuF_p25wzvycCuIs8FtBW6xyxxlXF49WpdekSDTeLNh6IRoxrJxenVTKAmcq6qFQov_s4o8qUX1p3Z8vvzIaqZg)](https://mermaid.live/edit#pako:eNpVkbFuwjAQhl_l5BmkDkwZWkGTQopUVaUd2pjhiA9ikdip7UBR4N3rhKQ0nmzdZ__fnWuWakEsYDuDZQbvIVfg1zT5sGRAl6TAZQS5VPs1jMf3MLsCszq2UGbaaYhDOGAuxcOlK7Xc-UWf4TFZZfoIk7sJlLij9QD4JHuGMJmTayMO0kqnDUjRYWGLRfU0N4Ti5AE69hnR7Ymna0ZkjDbrQdUbzBPO207SXKZ7EmAb1iosYVM5pxXn3Z15e2eRTIX4pwK-P4EON2h7-0ULxk3_jZEF-q4wt1Dgz0Axvik-JyHl5AhWPvg6xuUA8qbL5I1cZRS8NkP1WWzECjIFSuF_p25wzvycCuIs8FtBW6xyxxlXF49WpdekSDTeLNh6IRoxrJxenVTKAmcq6qFQov_s4o8qUX1p3Z8vvzIaqZg)

### How the data is stored:

The data for each snap is stored in the following schema:

```js
{
  photo: { type: 'string' },
  caption: { type: 'string' },
  duration: { type: 'number' },
  maxViews: { type: 'number' },
  viewedIds: { type: 'string[]' },
}
```

Details:

- photo: photos that have been encoded as base64 strings
- caption: photo caption
- duration: photo display duration in seconds
- maxViews: maximum number of recipients who can view photos
- viewedIds: array of visitor ids who have viewed the photo

### How the data is accessed:

The data was acessed with `redis-om` package.

Uploading a snap:

```js
export async function uploadSnap(snap: Snap): Promise<string> {
  await connect();
  const repository = client.fetchRepository(schema);

  const data = repository.createEntity(snap);

  const id = await repository.save(data);
  await repository.expire(id, 60 * 60 * 24); // expire in 24 hours
  return id;
}
```

Delete a snap:

```js
export async function deleteSnap(id: string): Promise<void> {
  await connect();
  const repository = client.fetchRepository(schema);
  await repository.remove(id);
}
```

Getting a snap based on id:

```js
export async function getSnap(id: string): Promise<Snap> {
  await connect();
  const repository = client.fetchRepository(schema);
  const data = await repository.fetch(id);
  return data;
}
```

Add viewer to a snap:

```js
export async function addViewer(userId: string, id: string): Promise<void> {
  await connect();
  const repository = client.fetchRepository(schema);
  const data = await repository.fetch(id);
  if (data.viewedIds) {
    data.viewedIds.push(userId);
    await repository.save(data);
  }
}
```

Get list of recipients that have viewed a snap:

```js
export async function getViewerIds(id: string): Promise<string[] | null> {
  await connect();
  const repository = client.fetchRepository(schema);
  const data = await repository.fetch(id);
  return data.viewedIds;
}
```

## How to run it locally

### Prerequisites

- [Redis Stack](https://redis.io/docs/stack/get-started/install/)
- [Firebase Dynamic Links](https://firebase.google.com/docs/dynamic-links/create-manage-links#create_a_dynamic_link) API Key (optional)
- Node.js
- Yarn

### Local installation

1. Clone the repository
2. [Install Redis Stack](https://redis.io/docs/stack/get-started/install/) if you haven't already
3. Copy the `.env.example` file to `.env.local` and fill the required values
4. Run `yarn`
5. Run `yarn start`

## Deployment

To make deploys work, you need to create free account on [Redis Cloud](https://redis.info/try-free-dev-to)

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbagaswastu%2FSnapsend&env=REDIS_URL&envDescription=SHORTENER_API_KEY%20and%20SHORTENER_DOMAIN%20is%20optional.&envLink=https%3A%2F%2Ffirebase.google.com%2Fdocs%2Freference%2Fdynamic-links%2Flink-shortener&project-name=Snapsend&repo-name=Snapsend)

## More Information about Redis Stack

Here some resources to help you quickly get started using Redis Stack. If you still have questions, feel free to ask them in the [Redis Discord](https://discord.gg/redis) or on [Twitter](https://twitter.com/redisinc).

### Getting Started

1. Sign up for a [free Redis Cloud account using this link](https://redis.info/try-free-dev-to) and use the [Redis Stack database in the cloud](https://developer.redis.com/create/rediscloud).
1. Based on the language/framework you want to use, you will find the following client libraries:
   - [Redis OM .NET (C#)](https://github.com/redis/redis-om-dotnet)
     - Watch this [getting started video](https://www.youtube.com/watch?v=ZHPXKrJCYNA)
     - Follow this [getting started guide](https://redis.io/docs/stack/get-started/tutorials/stack-dotnet/)
   - [Redis OM Node (JS)](https://github.com/redis/redis-om-node)
     - Watch this [getting started video](https://www.youtube.com/watch?v=KUfufrwpBkM)
     - Follow this [getting started guide](https://redis.io/docs/stack/get-started/tutorials/stack-node/)
   - [Redis OM Python](https://github.com/redis/redis-om-python)
     - Watch this [getting started video](https://www.youtube.com/watch?v=PPT1FElAS84)
     - Follow this [getting started guide](https://redis.io/docs/stack/get-started/tutorials/stack-python/)
   - [Redis OM Spring (Java)](https://github.com/redis/redis-om-spring)
     - Watch this [getting started video](https://www.youtube.com/watch?v=YhQX8pHy3hk)
     - Follow this [getting started guide](https://redis.io/docs/stack/get-started/tutorials/stack-spring/)

The above videos and guides should be enough to get you started in your desired language/framework. From there you can expand and develop your app. Use the resources below to help guide you further:

1. [Developer Hub](https://redis.info/devhub) - The main developer page for Redis, where you can find information on building using Redis with sample projects, guides, and tutorials.
1. [Redis Stack getting started page](https://redis.io/docs/stack/) - Lists all the Redis Stack features. From there you can find relevant docs and tutorials for all the capabilities of Redis Stack.
1. [Redis Rediscover](https://redis.com/rediscover/) - Provides use-cases for Redis as well as real-world examples and educational material
1. [RedisInsight - Desktop GUI tool](https://redis.info/redisinsight) - Use this to connect to Redis to visually see the data. It also has a CLI inside it that lets you send Redis CLI commands. It also has a profiler so you can see commands that are run on your Redis instance in real-time
1. Youtube Videos
   - [Official Redis Youtube channel](https://redis.info/youtube)
   - [Redis Stack videos](https://www.youtube.com/watch?v=LaiQFZ5bXaM&list=PL83Wfqi-zYZFIQyTMUU6X7rPW2kVV-Ppb) - Help you get started modeling data, using Redis OM, and exploring Redis Stack
   - [Redis Stack Real-Time Stock App](https://www.youtube.com/watch?v=mUNFvyrsl8Q) from Ahmad Bazzi
   - [Build a Fullstack Next.js app](https://www.youtube.com/watch?v=DOIWQddRD5M) with Fireship.io
   - [Microservices with Redis Course](https://www.youtube.com/watch?v=Cy9fAvsXGZA) by Scalable Scripts on freeCodeCamp
