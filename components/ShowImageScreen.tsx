import {
  Box,
  Container,
  Image,
  Progress,
  Spoiler,
  Stack,
  Text
} from '@mantine/core';
import { useInterval, useMediaQuery, useViewportSize } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Snap } from '../lib/types';

const ShowImageScreen = ({ photo, duration, caption }: Snap) => {
  const { height } = useViewportSize();
  const [countdown, setCountdown] = useState(duration);
  const [isFinished, setIsFinished] = useState(false);
  const isMobile = useMediaQuery('(max-width: 480px)');
  const interval = useInterval(() => setCountdown((s) => s - 0.1), 100);
  const router = useRouter();

  useEffect(() => {
    interval.start();
    return interval.stop;
  }, []);

  useEffect(() => {
    if (Math.ceil(countdown) <= 0) {
      setIsFinished(true);
    }
  }, [countdown]);

  useEffect(() => {
    if (isFinished) {
      router.push('/');
      showNotification({
        title: 'Snap closed',
        message: 'Snap closed because the photo has been expired',
      });
    }
  }, [isFinished, router]);

  const percentage = 100 - (countdown / duration) * 100;

  return (
    <>
      <style jsx global>
        {`
          body {
            background-color: rgba(0, 0, 0, 0.9);
          }
        `}
      </style>
      <Container sx={{ position: 'relative' }} size="xs">
        <Box
          sx={{
            backgroundColor: 'black',
          }}
        >
          <Image
            height={height}
            fit="contain"
            src={photo}
            alt="snap photo"
            sx={{ pointerEvents: 'none' }}
          />
        </Box>
        <Progress
          value={percentage}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          }}
          size="sm"
          radius="xs"
          color="white"
          mx={isMobile ? 0 : 'lg'}
          my="xs"
        />
        {caption !== '' && (
          <Stack
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            }}
            align="center"
            justify="center"
            mb="lg"
            p="xs"
          >
            <Spoiler maxHeight={25} showLabel="Show more" hideLabel="Hide">
              <Text color="white" sx={{ wordBreak: 'break-all' }}>
                {caption}
              </Text>
            </Spoiler>
          </Stack>
        )}
      </Container>
    </>
  );
};

export default ShowImageScreen;
