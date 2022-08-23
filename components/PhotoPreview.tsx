import { Group, Image, Stack } from '@mantine/core';
import { useState } from 'react';
import usePhotoStore from '../stores/photo';

const PhotoPreview = () => {
  const { photo } = usePhotoStore();
  return (
    <>
      <Stack spacing="xs">
        {photo && (
          <Image
            src={URL.createObjectURL(photo)}
            alt="uploaded photo"
            height={400}
            fit="contain"
            sx={{
              userSelect: 'none',
              pointerEvents: 'none'
            }}
            withPlaceholder
          />
        )}
      </Stack>
    </>
  );
};

export default PhotoPreview;
