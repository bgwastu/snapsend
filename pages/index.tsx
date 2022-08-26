import { Container, LoadingOverlay, Modal } from '@mantine/core';
import type { NextPage } from 'next';
import { parse } from 'next-useragent';
import shallow from 'zustand/shallow';
import HomepageScreen from '../components/HomepageScreen';
import ImageDropzone from '../components/ImageDropzone';
import Logo from '../components/Logo';
import PreviewScreen from '../components/PreviewScreen';
import UploadedContent from '../components/UploadedContent';
import usePhotoStore from '../stores/photo';

const Home: NextPage = ({ uaString }: any) => {
  const ua = parse(uaString);
  const { photo, loading, snapUrl, reset } = usePhotoStore(
    (s) => ({
      photo: s.photo,
      loading: s.loading,
      snapUrl: s.snapUrl,
      reset: s.reset,
    }),
    shallow
  );

  return (
    <>
      <LoadingOverlay visible={!photo ? loading : false} />
      <ImageDropzone />
      <Modal
        opened={snapUrl !== null}
        onClose={reset}
        title="Uploaded successfully! ️🎉"
        closeOnEscape={false}
        closeOnClickOutside={false}
        centered={true}
      >
        <UploadedContent />
      </Modal>
      <Container my="lg">
        <Logo />
        {photo !== null ? <PreviewScreen /> : <HomepageScreen ua={ua} />}
      </Container>
    </>
  );
};

export default Home;

export function getServerSideProps(context: any) {
  return { props: { uaString: context.req.headers['user-agent'] } };
}
