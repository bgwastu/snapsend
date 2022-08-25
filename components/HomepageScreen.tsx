import { Button, FileButton, Group, Stack, Text, Title } from '@mantine/core';
import { UserAgent } from 'next-useragent';
import { useRef } from 'react';
import { IconCamera, IconUpload } from 'tabler-icons';
import usePhotoStore from '../stores/photo';

const HomepageScreen = ({ ua }: { ua: UserAgent }) => {
  return (
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
  );
};

export default HomepageScreen;

const MobileUploadButton = () => {
  const uploadInput = useRef<HTMLInputElement>(null);
  const resetRef = useRef<() => void>(null);
  const setPhoto = usePhotoStore((s) => s.setPhoto);

  return (
    <Group position="center">
      <Button
        size="md"
        leftIcon={<IconCamera />}
        onClick={() => {
          uploadInput.current?.click();
        }}
      >
        Take Photo
      </Button>
      <input
        id="cameraFileInput"
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        capture="environment"
        ref={uploadInput}
        onChange={(e) => {
          if (e.target.files === null) return;

          if (e.target.files.length > 0) {
            setPhoto(e.target.files[0]);
          }
        }}
        hidden
      />
      <FileButton
        onChange={setPhoto}
        resetRef={resetRef}
        accept="image/png,image/jpeg"
      >
        {(props) => (
          <Button
            size="md"
            variant="outline"
            leftIcon={<IconUpload />}
            {...props}
          >
            Upload Photo
          </Button>
        )}
      </FileButton>
    </Group>
  );
};

const DesktopUploadButtons = () => {
  const setPhoto = usePhotoStore((s) => s.setPhoto);
  return (
    <Stack spacing="xs">
      <FileButton onChange={setPhoto} accept="image/png,image/jpeg,image/jpg">
        {(props) => (
          <Button {...props} size="lg" leftIcon={<IconUpload />}>
            Upload Photo
          </Button>
        )}
      </FileButton>
      <Text color="gray" italic sx={{ userSelect: 'none' }} align="center">
        or, drag photo here
      </Text>
    </Stack>
  );
};
