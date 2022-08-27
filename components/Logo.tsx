import { Box, Group, Image, Text, useMantineTheme } from '@mantine/core';
import { useRouter } from 'next/router';
import { IconBrandTelegram } from 'tabler-icons';

const Logo = () => {
  const theme = useMantineTheme();
  const router = useRouter();

  return (
    <Group
      spacing="xs"
      sx={{
        userSelect: 'none',
        cursor: 'pointer',
      }}
      onClick={() => router.push('/')}
    >
      <Box
        sx={{
          backgroundColor: theme.colors.violet[7],
          padding: '8px',
          borderRadius: '5px',
          display: 'flex',
        }}
      >
        <IconBrandTelegram color="white" size={20} />
      </Box>
      <Text
        size={24}
        weight={700}
        component="span"
        color={theme.colors.gray[8]}
        sx={{
          letterSpacing: '0px',
        }}
      >
        Snap
        <Text color={theme.colors.violet[7]} inherit component="span">
          send
        </Text>
      </Text>
    </Group>
  );
};

export default Logo;
