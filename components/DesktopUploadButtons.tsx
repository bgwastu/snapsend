import { Button, FileButton, Stack, Text } from '@mantine/core';
import { useRef } from 'react';
import { IconUpload } from 'tabler-icons';
import usePhotoStore from '../stores/photo';

const DesktopUploadButtons = () => {
  const { setPhoto } = usePhotoStore();
  const resetRef = useRef<() => void>(null);

  usePhotoStore.subscribe(({ photo }) => {
    if (!photo) {
      resetRef.current?.();
    }
  });

  return (
    <Stack spacing="xs">
      <FileButton
        onChange={setPhoto}
        accept="image/png,image/jpeg,image/jpg"
        resetRef={resetRef}
      >
        {(props) => (
          <Button {...props} size="md" leftIcon={<IconUpload />}>
            Upload image
          </Button>
        )}
      </FileButton>
      <Text color="gray" italic sx={{ userSelect: 'none' }} align="center">
        or, drag photo here
      </Text>
    </Stack>
  );
};

export default DesktopUploadButtons;
