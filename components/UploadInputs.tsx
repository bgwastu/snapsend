import { Button, Input, SegmentedControl, Stack, Text } from '@mantine/core';
import { IconSend } from 'tabler-icons';

const UploadInputs = () => {
  return (
    <Stack>
      <Input.Wrapper
        label="Duration"
        description="Photo expiration time"
        withAsterisk
      >
        <SegmentedControl
          color="violet"
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
        <Input placeholder="Feeling cute today" size="md" sx={{ flex: 1 }} />
      </Input.Wrapper>
      <Button leftIcon={<IconSend />}>Send</Button>
      <Text size="xs" color="grey" italic>
        The photo will be deleted within 24 hours if not opened.
      </Text>
    </Stack>
  );
};

export default UploadInputs;
