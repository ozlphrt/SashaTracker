import { useState } from 'react';
import { DailyEntry } from '../../data/models';
import Card from '../common/Card';
import ToggleRow from '../common/ToggleRow';
import SliderWithLabel from '../common/SliderWithLabel';
import PhotoUpload from './PhotoUpload';
import PhotoPreview from './PhotoPreview';

interface DailyEntryCardProps {
  dayIndex: number;
  entry: DailyEntry;
  onUpdate: (changes: Partial<DailyEntry>) => void;
}

export default function DailyEntryCard({ dayIndex, entry, onUpdate }: DailyEntryCardProps) {
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date(entry.date);
  const dayName = dayNames[date.getDay()];

  return (
    <>
      <Card className="mb-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">
            Day {dayIndex + 1} - {dayName}
          </h3>
          <p className="text-sm text-white/60">{entry.date}</p>
        </div>

        <div className="space-y-2">
          <ToggleRow
            label="Diet Compliance"
            checked={entry.dietCompliance}
            onChange={(checked) => onUpdate({ dietCompliance: checked })}
          />
          <ToggleRow
            label="Antibiotics Taken"
            checked={entry.antibioticsTaken}
            onChange={(checked) => onUpdate({ antibioticsTaken: checked })}
          />
          <ToggleRow
            label="Chlorhexidine Bath"
            checked={entry.bathApplied}
            onChange={(checked) => onUpdate({ bathApplied: checked })}
          />
          <ToggleRow
            label="Ear Treatment"
            checked={entry.earTreatment}
            onChange={(checked) => onUpdate({ earTreatment: checked })}
          />

          <SliderWithLabel
            label="Itching Level"
            value={entry.itchingLevel}
            min={0}
            max={5}
            onChange={(value) => onUpdate({ itchingLevel: value as 0 | 1 | 2 | 3 | 4 | 5 })}
          />

          <div className="py-2">
            <label className="text-sm font-medium mb-2 block">Wound Status</label>
            <select
              value={entry.woundStatus}
              onChange={(e) => onUpdate({ woundStatus: e.target.value as "stable" | "improving" | "worse" })}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="stable">Stable</option>
              <option value="improving">Improving</option>
              <option value="worse">Worse</option>
            </select>
          </div>

          <div className="py-2">
            <label className="text-sm font-medium mb-2 block">Notes</label>
            <textarea
              value={entry.notes || ''}
              onChange={(e) => onUpdate({ notes: e.target.value })}
              placeholder="Add notes..."
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
            />
          </div>

          <PhotoUpload
            photos={entry.photos}
            onPhotosChange={(photos) => onUpdate({ photos })}
          />

          {entry.photos.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {entry.photos.map((photo, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setPreviewPhoto(photo)}
                  className="aspect-square rounded-lg overflow-hidden bg-white/10 hover:opacity-80 transition-opacity"
                >
                  <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </Card>

      {previewPhoto && (
        <PhotoPreview photo={previewPhoto} onClose={() => setPreviewPhoto(null)} />
      )}
    </>
  );
}

