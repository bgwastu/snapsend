import create from 'zustand';
import { compressAccurately } from 'image-conversion';
import { compress } from 'jpegasus';
import { devtools } from 'zustand/middleware';

interface PhotoState {
  photo: File | null;
  loading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setPhoto: (photo: File | null) => Promise<void>;
  deletePhoto: () => void;
}

const usePhotoStore = create<PhotoState>()(
  devtools((set, get) => ({
    photo: null,
    error: null,
    loading: false,
    setLoading: loading => set({ loading }),
    setPhoto: async (photo: File | null) => {
      if (photo === null) {
        set({ photo: null, error: null, loading: false });
        return;
      }

      set((state) => ({ ...state, loading: true }));

      // check if the file is an image
      if (!photo.type.startsWith('image/')) {
        set((state) => ({ ...state, error: 'File is not an image' }));
        return;
      }

      // Resize & convert to blob
      const file = await compressAccurately(photo, 200).catch((error) => {
        set((state) => ({ ...state, error: error.message }));
        return null;
      });
      const compressedPhoto = await compress(file as File, {
        quality: 0.8,
      }).catch((error) => {
        set((state) => ({ ...state, error: error.message }));
        return null;
      });

      set((state) => ({
        ...state,
        photo: compressedPhoto as File,
        loading: false,
      }));
    },
    deletePhoto: () => {
      set((state) => ({ ...state, photo: null }));
    },
  }))
);

export default usePhotoStore;
