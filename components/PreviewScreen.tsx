import {
  AspectRatio,
  Box,
  Button,
  Image,
  Input,
  NumberInput,
  SegmentedControl,
  SimpleGrid,
  Stack,
  Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { openConfirmModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { memo } from 'react';
import { IconChevronLeft, IconSend, IconUser } from 'tabler-icons';
import usePhotoStore from '../stores/photo';

const ImageMobileMemo = memo(function ImagePreview(props: { photo: File }) {
  return (
    <Image
      src={URL.createObjectURL(props.photo)}
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
  );
});
const ImageDesktopMemo = memo(function ImagePreview(props: { photo: File }) {
  return (
    <Image
      src={URL.createObjectURL(props.photo)}
      alt="uploaded photo"
      fit="contain"
      height={500}
      sx={{
        userSelect: 'none',
        pointerEvents: 'none',
        backgroundColor: 'black',
        borderRadius: '5px',
      }}
      withPlaceholder
    />
  );
});

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
          size="md"
          mb="sm"
        >
          Back
        </Button>
        <AspectRatio ratio={9 / 16} mx="auto" mb="sm">
          {photo && <ImageMobileMemo photo={photo} />}
        </AspectRatio>
        <UploadInputs />
      </Box>
    );
  }

  return (
    <Box>
      <Button
        leftIcon={<IconChevronLeft />}
        onClick={onBack}
        size="md"
        my="sm"
        variant="outline"
      >
        Back
      </Button>
      <SimpleGrid
        cols={2}
        breakpoints={[
          { maxWidth: 755, cols: 2, spacing: 'sm' },
          { maxWidth: 600, cols: 1, spacing: 'sm' },
        ]}
      >
        <Stack spacing="xs" align="start" justify="center">
          {photo && <ImageDesktopMemo photo={photo} />}
        </Stack>
        <UploadInputs />
      </SimpleGrid>
    </Box>
  );
};

export default PreviewScreen;

const UploadInputs = () => {
  const photo = usePhotoStore((s) => s.photo);
  const setSnapUrl = usePhotoStore((s) => s.setSnapUrl);
  const setLoading = usePhotoStore((s) => s.setLoading);
  const loading = usePhotoStore((s) => s.loading);

  const form = useForm({
    initialValues: {
      duration: 3,
      caption: '',
      maxViews: 1,
    },
    validate: {
      caption: (value) => {
        if (value.length > 100) {
          return 'Caption must be less than 100 characters';
        }
      },
      maxViews: (value) => {
        if (value <= 0) {
          return 'Really?';
        }
      },
    },
  });

  function onUpload(duration: number, caption: string, maxViews: number) {
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
          maxViews,
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
          if (body.url) {
            setSnapUrl(body.url);
          } else {
            throw new Error('Upload failed, url is not returned');
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
    <form
      onSubmit={form.onSubmit((values) =>
        onUpload(values.duration, values.caption, values.maxViews)
      )}
    >
      <Stack>
        <Input.Wrapper
          label="Duration"
          size="md"
          description="Photo expiration time"
          withAsterisk
        >
          <SegmentedControl
            size="md"
            color="violet"
            {...form.getInputProps('duration')}
            data={[
              { label: '3 seconds', value: 3 },
              { label: '5 seconds', value: 5 },
              { label: '10 seconds', value: 10 },
            ]}
          />
        </Input.Wrapper>
        <Input.Wrapper
          label="Caption"
          size="md"
          description="Write a caption for your photo (optional)"
        >
          <Input
            placeholder="Write your witty caption here"
            size="md"
            maxLength={100}
            sx={{ flex: 1 }}
            {...form.getInputProps('caption')}
          />
        </Input.Wrapper>
        <NumberInput
          label="Maximal Views"
          description="Maximal person can view this photo (default is 1)"
          withAsterisk
          icon={<IconUser size={18} />}
          size="md"
          {...form.getInputProps('maxViews')}
        />
        <Button
          leftIcon={<IconSend />}
          type="submit"
          loading={loading}
          size="md"
        >
          Send
        </Button>
        <Text size="xs" color="grey" italic>
          The photo will be deleted within 24 hours if not opened.
        </Text>
      </Stack>
    </form>
  );
};
