import {
  ActionIcon,
  Button, CopyButton,
  Group,
  Input, Stack,
  Text
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconBrandFacebook,
  IconBrandTelegram,
  IconBrandWhatsapp,
  IconCheck,
  IconCopy,
  IconLink
} from 'tabler-icons';
import usePhotoStore from '../stores/photo';

const UploadedContent = () => {
  const isMobile = useMediaQuery('(max-width: 480px)');
  const uploadedPhotoId = usePhotoStore((s) => s.uploadedPhotoId);
  const snapUrl = window.location.origin + '/' + uploadedPhotoId?.toLowerCase();

  return (
    <Stack>
      {isMobile ? (
        <Stack>
          <Input icon={<IconLink />} value={snapUrl} />
          <CopyButton value={snapUrl}>
            {({ copied, copy }) =>
              copied ? (
                <Button leftIcon={<IconCheck />} color="green">
                  URL Copied!
                </Button>
              ) : (
                <Button leftIcon={<IconCopy />} onClick={copy}>
                  Copy
                </Button>
              )
            }
          </CopyButton>
        </Stack>
      ) : (
        <Group>
          <Input icon={<IconLink />} value={snapUrl} sx={{ flex: 1 }} />
          <CopyButton value={snapUrl}>
            {({ copied, copy }) =>
              copied ? (
                <Button leftIcon={<IconCheck />} color="green">
                  URL Copied!
                </Button>
              ) : (
                <Button leftIcon={<IconCopy />} onClick={copy}>
                  Copy
                </Button>
              )
            }
          </CopyButton>
        </Group>
      )}

      <Stack spacing="xs">
        <Text>Share on:</Text>
        <Group spacing="xs">
          <ActionIcon
            color="green"
            variant="filled"
            size="lg"
            title="Share on WhatsApp"
            onClick={() => {
              window.open(`https://wa.me/?text=${snapUrl}`, '_blank');
            }}
          >
            <IconBrandWhatsapp />
          </ActionIcon>
          <ActionIcon
            color="blue"
            variant="filled"
            size="lg"
            title="Share on Telegram"
            onClick={() => {
              window.open(
                `https://telegram.me/share/url?url=${snapUrl}`,
                '_blank'
              );
            }}
          >
            <IconBrandTelegram />
          </ActionIcon>
          <ActionIcon
            color="indigo"
            variant="filled"
            size="lg"
            title="Share on Facebook"
            onClick={() => {
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${snapUrl}`,
                '_blank'
              );
            }}
          >
            <IconBrandFacebook />
          </ActionIcon>
        </Group>
      </Stack>
    </Stack>
  );
};

export default UploadedContent;
