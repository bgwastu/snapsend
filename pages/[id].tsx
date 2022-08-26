import fingerprintjs from '@fingerprintjs/fingerprintjs';
import {
  Button,
  Container,
  LoadingOverlay,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { IconLockOpen } from 'tabler-icons';
import Logo from '../components/Logo';
import ShowImageScreen from '../components/ShowImageScreen';
import { getSnap } from '../lib/redis';
import { Snap } from '../lib/types';

type Props = {
  id: string;
  error: string | null;
};

const fetcher = (url: string) =>
  fetch(url)
    .then((r) => r.json())
    .then((b) => b.viewerIds);

const Detail = ({ id, error }: Props) => {
  const router = useRouter();
  const [snap, setSnap] = useState<Snap>();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isViewed, setIsViewed] = useState<boolean | null>(null);

  const { data: viewedIds, error: err } = useSWR<string[]>(
    `/api/viewer?id=${id}`,
    fetcher
  );

  useEffect(() => {
    if (!viewedIds) return;

    setLoading(true);
    fingerprintjs
      .load()
      .then((res) => res.get())
      .then((res) => {
        setUserId(res.visitorId);
        setIsViewed(viewedIds.includes(res.visitorId));
      })
      .catch(() => {
        showNotification({
          color: 'red',
          title: 'Error has been occurred',
          message: 'Failed to get visitor id',
        });
      })
      .finally(() => setLoading(false));
  }, [viewedIds]);

  async function openSnap() {
    setLoading(true);

    try {
      const res = await fetch(`/api/view?id=${id}&userId=${userId}`);
      const body = await res.json();

      if (res.ok) {
        setSnap(body);
      } else {
        showNotification({
          color: 'red',
          title: 'Error',
          message: body.message,
        });
      }
    } catch (e) {
      showNotification({
        color: 'red',
        title: 'Error',
        message: 'Unknown error',
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (err) {
      router.push('/');
      showNotification({
        color: 'red',
        title: 'Error',
        message: err,
      });
    }
  }, [router, err]);

  useEffect(() => {
    if (error) {
      router.push('/');
      showNotification({
        color: 'red',
        title: 'Error',
        message: error,
      });
    }
  }, [router, error]);

  if (error) {
    return <LoadingOverlay visible />;
  }

  if (snap) {
    return <ShowImageScreen {...snap} />;
  }

  return (
    <Container my="lg">
      <Logo />
      <Stack
        align="center"
        justify="center"
        spacing="md"
        my={48}
        sx={{ textAlign: 'center' }}
      >
        <Title weight={800} size="h1" sx={{ userSelect: 'none' }}>
          {isViewed === null
            ? 'Loading...'
            : isViewed
            ? 'Sorry, you cannot see this snap :('
            : 'Someone sent you a snap 📸'}
        </Title>
        <Text color="gray" italic sx={{ userSelect: 'none' }}>
          {"You won't be able to open this snap again after viewing it"}
        </Text>
        <Stack align="center">
          <Button
            size="lg"
            leftIcon={<IconLockOpen />}
            disabled={isViewed ?? false}
            onClick={openSnap}
            loading={loading}
          >
            View Snap
          </Button>
          {viewedIds && viewedIds.length !== 0 && (
            <Text color="dark" weight="600">
              Snap has been viewed{' '}
              <Text component="span" color="violet" weight="800" underline>
                {viewedIds.length}
              </Text>{' '}
              times
            </Text>
          )}
        </Stack>
      </Stack>
    </Container>
  );
};

export default Detail;

export async function getServerSideProps(context: NextPageContext) {
  const id = context.query.id as string;

  try {
    const snap = await getSnap(id.toUpperCase());

    if (snap.duration === null) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        id: id.toUpperCase(),
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        error: 'Error has been occurred when fetching snap',
      },
    };
  }
}
