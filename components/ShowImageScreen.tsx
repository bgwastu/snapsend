import Head from 'next/head';
import {
  Box,
  Text,
  Image,
  AspectRatio,
  Progress,
  Stack,
  Spoiler,
  Container,
} from '@mantine/core';
import {
  useInterval,
  useShallowEffect,
  useTimeout,
  useViewportSize,
} from '@mantine/hooks';
import { useState, useEffect } from 'react';
import { Snap } from '../lib/types';
import { useRouter } from 'next/router';
import { showNotification } from '@mantine/notifications';

const ShowImageScreen = ({ photo, duration, caption }: Snap) => {
  const { height } = useViewportSize();
  const [countdown, setCountdown] = useState(duration);
  const [isFinished, setIsFinished] = useState(false);
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
    console.log('triggered');
    if (isFinished) {
      router.push('/');
      showNotification({
        message: 'Snap closed',
      });
    }
  }, [isFinished, router]);


  // incremental percentage from countdown reverse
  const percentage = 100 - ((countdown / duration) * 100);


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
          <Image height={height} fit="contain" src={photo} alt="snap photo" />
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
          mx="lg"
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
              <Text color="white">{caption}</Text>
            </Spoiler>
          </Stack>
        )}
      </Container>
    </>
  );
};

export default ShowImageScreen;
