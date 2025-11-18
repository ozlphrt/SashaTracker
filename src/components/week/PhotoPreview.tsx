interface PhotoPreviewProps {
  photo: string;
  onClose: () => void;
}

export default function PhotoPreview({ photo, onClose }: PhotoPreviewProps) {
  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-2xl w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20"
      >
        ×
      </button>
      <img
        src={photo}
        alt="Preview"
        className="max-w-full max-h-full object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

