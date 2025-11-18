import { useRef, useState } from 'react';

interface PhotoUploadProps {
  photos: string[];
  maxPhotos?: number;
  onPhotosChange: (photos: string[]) => void;
}

export default function PhotoUpload({ photos, maxPhotos = 3, onPhotosChange }: PhotoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const remainingSlots = maxPhotos - photos.length;
    const filesToProcess = files.slice(0, remainingSlots);

    setIsUploading(true);

    try {
      const newPhotos: string[] = [];
      for (const file of filesToProcess) {
        const base64 = await fileToBase64(file);
        newPhotos.push(base64);
      }
      onPhotosChange([...photos, ...newPhotos]);
    } catch (error) {
      console.error('Failed to process photos:', error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    onPhotosChange(newPhotos);
  };

  const canAddMore = photos.length < maxPhotos;

  return (
    <div className="py-2">
      <label className="text-sm font-medium mb-2 block">Photos ({photos.length}/{maxPhotos})</label>
      
      <div className="grid grid-cols-3 gap-2 mb-2">
        {photos.map((photo, index) => (
          <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-white/10">
            <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => removePhoto(index)}
              className="absolute top-1 right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs hover:bg-red-600"
            >
              ×
            </button>
          </div>
        ))}
        
        {canAddMore && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="aspect-square rounded-lg border-2 border-dashed border-white/30 flex items-center justify-center text-white/60 hover:border-white/50 hover:text-white/80 transition-colors disabled:opacity-50"
          >
            {isUploading ? '...' : '+'}
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
        disabled={!canAddMore || isUploading}
      />
    </div>
  );
}

