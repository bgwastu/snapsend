import {
  Container,
  LoadingOverlay,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import type { NextPage } from 'next';
import { parse } from 'next-useragent';
import DesktopUploadButtons from '../components/DesktopUploadButtons';
import ImageDropzone from '../components/ImageDropzone';
import Logo from '../components/Logo';
import MobileUploadButton from '../components/MobileUploadButtons';
import PhotoPreview from '../components/PhotoPreview';
import UploadInputs from '../components/UploadInputs';
import usePhotoStore from '../stores/photo';

const Home: NextPage = ({ uaString }: any) => {
  const theme = useMantineTheme();
  const ua = parse(uaString);
  const { photo, setPhoto, loading } = usePhotoStore();

  const isMobile = useMediaQuery('(max-width: 600px)');

  return (
    <>
      <LoadingOverlay visible={loading} />
      <ImageDropzone />
      <Modal
        opened={photo !== null}
        onClose={() => setPhoto(null)}
        fullScreen={isMobile}
        closeButtonLabel="close modal image"
        title="Send Photo"
        size="xl"
        centered
      >
        <SimpleGrid
          cols={2}
          breakpoints={[
            { maxWidth: 755, cols: 2, spacing: 'sm' },
            { maxWidth: 600, cols: 1, spacing: 'sm' },
          ]}
        >
          <PhotoPreview />
          <UploadInputs />
        </SimpleGrid>
      </Modal>
      <Container my={20}>
        <Logo />
        <Stack>
          <Stack my={48} align="center" spacing="xl">
            <Stack spacing="md" sx={{ userSelect: 'none' }}>
              <Title weight={800} size="h1" align="center">
                Send a photo now{' '}
                <Text color="violet" inherit component="span" underline>
                  worry-free
                </Text>
              </Title>
              <Text color="gray" size="lg" align="center">
                Send limited photos to your friends, and photos will be deleted
                instantly 😉
              </Text>
            </Stack>
            {ua.isMobile ? <MobileUploadButton /> : <DesktopUploadButtons />}
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default Home;

export function getServerSideProps(context: any) {
  return { props: { uaString: context.req.headers['user-agent'] } };
}
