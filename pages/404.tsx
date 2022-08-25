import { Button, Container, Stack, Text, Title } from '@mantine/core';
import Head from 'next/head';
import Link from 'next/link';
import Logo from '../components/Logo';

const NotFoundPage = () => {
  return (
    <>
      <Head>
        <title>SnapSend - 404 Not Found</title>
      </Head>
      <Container my="lg">
        <Logo />
        <Stack align="center" my={48}>
          <Title weight={800}>Snap Not Found :(</Title>
          <Text align='center'>
            The snap you are looking for was not found on the server, it may
            have been deleted or never existed in the first place.
          </Text>
          <Link href="/">
            <Button size="lg">Back to Main Page</Button>
          </Link>
        </Stack>
      </Container>
    </>
  );
};

export default NotFoundPage;
