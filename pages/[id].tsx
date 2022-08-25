import {
  Button, Container,
  LoadingOverlay,
  Stack,
  Text,
  Title
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IconLockOpen } from 'tabler-icons';
import Logo from '../components/Logo';
import ShowImageScreen from '../components/ShowImageScreen';
import { getSnap } from '../lib/redis';
import { Snap } from '../lib/types';

const Detail = ({ id, error }: { id: string; error: string }) => {
  const router = useRouter();
  const [snap, setSnap] = useState<Snap>();
  const [loading, setLoading] = useState(false);

  function openSnap() {
    setLoading(true);
    fetch(`/api/view?id=${id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('HTTP error: ' + res.status.toString());
      })
      .then((body) => {
        setSnap(body);
      })
      .catch((error) => {
        showNotification({
          color: 'red',
          title: 'Error',
          message: error.message,
        });
      })
      .finally(() => setLoading(false));
  }

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
          Someone sent you a snap 📸
        </Title>
        <Stack align="center">
          <Button
            size="lg"
            leftIcon={<IconLockOpen />}
            onClick={openSnap}
            loading={loading}
          >
            View Snap
          </Button>
          <Text color="gray" italic sx={{ userSelect: 'none' }}>
            {"You won't be able to open this snap again after viewing it"}
          </Text>
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
    return { props: { id: id.toUpperCase() } };
  } catch (err: any) {
    return {
      props: {
        error: err.toString(),
      },
    };
  }
}
