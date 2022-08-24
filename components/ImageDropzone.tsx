import { ActionIcon, Box, Group, Stack, Text } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { useState } from 'react';
import { IconUpload, IconX } from 'tabler-icons';
import usePhotoStore from '../stores/photo';

const ImageDropzone = () => {
  const [active, setActive] = useState(true);
  const setPhoto = usePhotoStore((s) => s.setPhoto);

  return (
    <Dropzone.FullScreen
      active={active}
      accept={['image/png', 'image/jpg', 'image/jpeg']}
      maxFiles={1}
      onDrop={(files) => {
        if (files[0]) {
          setPhoto(files[0]);
        }
      }}
    >
      <Group
        position="center"
        spacing="xl"
        style={{ minHeight: 220, pointerEvents: 'none' }}
      >
        <Dropzone.Accept>
          <Stack align="center" justify="center" sx={{ textAlign: 'center' }}>
            <ActionIcon size="xl" variant="filled" color="violet">
              <IconUpload />
            </ActionIcon>
            <Box>
              <Text size="xl" weight={500}>
                Drop file to upload
              </Text>
              <Text size="lg" color="gray">
                Max size photo is 3MB
              </Text>
            </Box>
          </Stack>
        </Dropzone.Accept>
        <Dropzone.Reject>
          <Stack align="center" justify="center" sx={{ textAlign: 'center' }}>
            <ActionIcon size="xl" variant="filled" color="red">
              <IconX />
            </ActionIcon>
            <Box>
              <Text size="xl" weight={500}>
                Cannot process photo
              </Text>
              <Text size="lg" color="gray">
                Only accept png, jpg, jpeg. Maximum photo size below 3mb
              </Text>
            </Box>
          </Stack>
        </Dropzone.Reject>
      </Group>
    </Dropzone.FullScreen>
  );
};

export default ImageDropzone;
