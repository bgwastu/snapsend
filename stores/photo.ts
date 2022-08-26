import { compressAccurately } from 'image-conversion';
import { compress } from 'jpegasus';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface PhotoState {
  photo: File | null;
  loading: boolean;
  snapUrl: string | null;
  setSnapUrl: (url: string | null) => void;
  reset: () => void;
  setLoading: (loading: boolean) => void;
  setPhoto: (photo: File | null) => Promise<void>;
}

const usePhotoStore = create<PhotoState>()(
  devtools((set, get) => ({
    photo: null,
    loading: false,
    snapUrl: null,
    setSnapUrl: (url: string | null) =>
      set((state) => ({ ...state, snapUrl: url })),
    reset: () => {
      set({
        photo: null,
        loading: false,
        snapUrl: null,
      });
    },
    setLoading: (loading) => set({ loading }),
    setPhoto: async (photo: File | null) => {
      if (photo === null) {
        set({ photo: null, loading: false });
        return;
      }

      set((state) => ({ ...state, loading: true }));

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
  }))
);

export default usePhotoStore;
