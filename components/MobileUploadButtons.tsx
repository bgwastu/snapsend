import { Button, FileButton, Group } from '@mantine/core';
import { useRef } from 'react';
import { IconCamera, IconUpload } from 'tabler-icons';
import usePhotoStore from '../stores/photo';

const MobileUploadButton = () => {
  const uploadInput = useRef<HTMLInputElement>(null);
  const resetRef = useRef<() => void>(null);
  const { setPhoto } = usePhotoStore();


  usePhotoStore.subscribe(({ photo }) => {
    if (!photo) {
      resetRef.current?.();
    }
  });


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

export default MobileUploadButton;
