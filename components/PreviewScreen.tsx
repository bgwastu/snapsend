import {
  Button,
  Input,
  SegmentedControl,
  SimpleGrid,
  Stack,
  Image,
  Text,
  AspectRatio,
  Box,
} from '@mantine/core';
import { IconChevronLeft } from 'tabler-icons';
import { useState } from 'react';
import { IconSend } from 'tabler-icons';
import usePhotoStore from '../stores/photo';
import { openConfirmModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { useMediaQuery, useViewportSize } from '@mantine/hooks';

const PreviewScreen = () => {
  const photo = usePhotoStore((s) => s.photo);
  const setPhoto = usePhotoStore((s) => s.setPhoto);

  const isMobile = useMediaQuery('(max-width: 480px)');

  function onBack() {
    openConfirmModal({
      title: 'Are you sure?',
      children: (
        <Text size="sm">You will lose your changes if you go back</Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: () => {
        setPhoto(null);
      },
    });
  }

  if (isMobile) {
    return (
      <Box my="sm">
        <Button
          leftIcon={<IconChevronLeft />}
          onClick={onBack}
          variant="outline"
          mb="sm"
        >
          Back
        </Button>
        <AspectRatio ratio={9 / 16} mx="auto" mb="sm">
          {photo && (
            <Image
              src={URL.createObjectURL(photo)}
              alt="uploaded photo"
              fit="contain"
              sx={{
                userSelect: 'none',
                pointerEvents: 'none',
                backgroundColor: 'black',
                borderRadius: '5px',
              }}
              withPlaceholder
            />
          )}
        </AspectRatio>
        <UploadInputs />
      </Box>
    );
  }

  return (
    <SimpleGrid
      my="sm"
      cols={2}
      breakpoints={[
        { maxWidth: 755, cols: 2, spacing: 'sm' },
        { maxWidth: 600, cols: 1, spacing: 'sm' },
      ]}
    >
      <Stack spacing="xs" align="start" justify="center">
        <Button
          leftIcon={<IconChevronLeft />}
          onClick={onBack}
          variant="outline"
        >
          Back
        </Button>

        {photo && (
          <Image
            src={URL.createObjectURL(photo)}
            alt="uploaded photo"
            fit="contain"
            height={550}
            sx={{
              userSelect: 'none',
              pointerEvents: 'none',
              backgroundColor: 'black',
            }}
            withPlaceholder
          />
        )}
      </Stack>
      <UploadInputs />
    </SimpleGrid>
  );
};

export default PreviewScreen;

const UploadInputs = () => {
  const photo = usePhotoStore((s) => s.photo);
  const setUploadedPhotoId = usePhotoStore((s) => s.setUploadedPhotoId);
  const setLoading = usePhotoStore((s) => s.setLoading);
  const loading = usePhotoStore((s) => s.loading);

  const [duration, setDuration] = useState(3);
  const [caption, setCaption] = useState('');

  function onUpload() {
    if (photo === null) return;

    // photo to base64
    const reader = new FileReader();
    reader.readAsDataURL(photo);
    reader.onload = () => {
      const base64 = reader.result as string;
      setLoading(true);

      fetch('/api/upload', {
        method: 'POST',
        body: JSON.stringify({
          photo: base64,
          duration,
          caption,
        }),
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            throw new Error('HTTP error: ' + res.status.toString());
          }
        })
        .then((body) => {
          if (body.id) {
            setUploadedPhotoId(body.id);
          } else {
            throw new Error('Upload failed, id is not returned');
          }
        })
        .catch((error) => {
          showNotification({
            color: 'red',
            title: 'Error',
            message: error.message,
          });
        })
        .finally(() => setLoading(false));
    };
  }

  return (
    <Stack>
      <Input.Wrapper
        label="Duration"
        description="Photo expiration time"
        withAsterisk
      >
        <SegmentedControl
          color="violet"
          onChange={(s) => setDuration(Number(s))}
          data={[
            { label: '3 seconds', value: '3' },
            { label: '5 seconds', value: '5' },
            { label: '10 seconds', value: '10' },
          ]}
        />
      </Input.Wrapper>
      <Input.Wrapper
        label="Caption"
        description="Write a caption for your photo (optional)"
      >
        <Input
          placeholder="Feeling cute today"
          size="md"
          sx={{ flex: 1 }}
          onChange={(e: any) => setCaption(e.target.value)}
        />
      </Input.Wrapper>
      <Button leftIcon={<IconSend />} onClick={onUpload} loading={loading}>
        Send
      </Button>
      <Text size="xs" color="grey" italic>
        The photo will be deleted within 24 hours if not opened.
      </Text>
    </Stack>
  );
};
