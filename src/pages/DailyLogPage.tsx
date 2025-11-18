import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTrackerStore } from '../store/useTrackerStore';
import AppShell from '../components/layout/AppShell';
import Card from '../components/common/Card';
import ToggleRow from '../components/common/ToggleRow';
import SliderWithLabel from '../components/common/SliderWithLabel';
import SegmentedControl from '../components/common/SegmentedControl';
import PhotoUpload from '../components/week/PhotoUpload';
import PhotoPreview from '../components/week/PhotoPreview';

export default function DailyLogPage() {
  const navigate = useNavigate();
  const params = useParams<{ weekNumber?: string; dayNumber?: string }>();
  const program = useTrackerStore((state) => state.program);
  const updateDay = useTrackerStore((state) => state.updateDay);

  const weekParam = params.weekNumber;
  const dayParam = params.dayNumber;

  // Find today's entry or use params
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  
  let weekIndex = 0;
  let dayIndex = 0;
  let entry = null;

  if (weekParam && dayParam) {
    weekIndex = parseInt(weekParam, 10) - 1;
    dayIndex = parseInt(dayParam, 10) - 1;
    entry = program.weeks[weekIndex]?.days[dayIndex];
  } else {
    // Find today
    for (let w = 0; w < program.weeks.length; w++) {
      const d = program.weeks[w].days.findIndex((d) => d.date === todayStr);
      if (d !== -1) {
        weekIndex = w;
        dayIndex = d;
        entry = program.weeks[w].days[d];
        break;
      }
    }
  }

  const [localEntry, setLocalEntry] = useState(entry || {
    date: todayStr,
    dietCompliance: false,
    antibioticsTaken: false,
    bathApplied: false,
    earTreatment: false,
    itchingLevel: 0,
    woundStatus: 'stable' as const,
    notes: '',
    photos: []
  });

  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (entry) {
      setLocalEntry(entry);
    }
  }, [entry]);

  const handleUpdate = (changes: Partial<typeof localEntry>) => {
    const updated = { ...localEntry, ...changes };
    setLocalEntry(updated);
    setIsSaved(false);
    
    // Auto-save after a delay
    setTimeout(() => {
      if (entry) {
        updateDay(weekIndex, dayIndex, updated);
        setIsSaved(true);
      }
    }, 500);
  };

  const handleSave = () => {
    if (entry) {
      updateDay(weekIndex, dayIndex, localEntry);
      setIsSaved(true);
    }
  };

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date(localEntry.date);
  const dayName = dayNames[date.getDay()];
  const weekNumber = weekIndex + 1;
  const dayNumber = dayIndex + 1;

  return (
    <>
      <AppShell
        title={`Week ${weekNumber} · Day ${dayNumber}`}
        headerAction={
          <button
            onClick={() => navigate(-1)}
            className="text-primary text-sm font-medium tap-target"
          >
            Done
          </button>
        }
      >
        <div className="p-4 space-y-6 max-w-md mx-auto pb-24">
          {/* Date Header */}
          <div className="text-center mb-2">
            <h2 className="text-2xl font-bold">{dayName}</h2>
            <p className="text-white/60">{date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>

          {/* Diet & Treatment Card */}
          <Card>
            <h3 className="text-lg font-semibold mb-4">Diet & Treatment</h3>
            <div className="space-y-1">
              <ToggleRow
                label="Diet followed exactly (Anallergenic only)"
                checked={localEntry.dietCompliance}
                onChange={(checked) => handleUpdate({ dietCompliance: checked })}
              />
              <ToggleRow
                label="Antibiotic given"
                checked={localEntry.antibioticsTaken}
                onChange={(checked) => handleUpdate({ antibioticsTaken: checked })}
              />
              <ToggleRow
                label="Chlorhexidine bath done"
                checked={localEntry.bathApplied}
                onChange={(checked) => handleUpdate({ bathApplied: checked })}
              />
              <ToggleRow
                label="Ear treatment applied"
                checked={localEntry.earTreatment}
                onChange={(checked) => handleUpdate({ earTreatment: checked })}
              />
            </div>
          </Card>

          {/* Symptoms Card */}
          <Card>
            <h3 className="text-lg font-semibold mb-4">Symptoms</h3>
            <div className="space-y-6">
              <div>
                <SliderWithLabel
                  label="Itching Level"
                  value={localEntry.itchingLevel}
                  min={0}
                  max={5}
                  onChange={(value) => handleUpdate({ itchingLevel: value as 0 | 1 | 2 | 3 | 4 | 5 })}
                />
                <div className="flex justify-between text-xs text-white/50 mt-1">
                  <span>None</span>
                  <span>Very Severe</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">Wound Status</label>
                <SegmentedControl
                  value={localEntry.woundStatus}
                  options={[
                    { value: 'improving', label: 'Improving', icon: '↗' },
                    { value: 'stable', label: 'Stable', icon: '→' },
                    { value: 'worse', label: 'Worse', icon: '↘' }
                  ]}
                  onChange={(value) => handleUpdate({ woundStatus: value as 'stable' | 'improving' | 'worse' })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Notes for today</label>
                <textarea
                  value={localEntry.notes || ''}
                  onChange={(e) => handleUpdate({ notes: e.target.value })}
                  placeholder="New lesions? More redness? Behavior?"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  rows={4}
                />
              </div>
            </div>
          </Card>

          {/* Photos Card */}
          <Card>
            <h3 className="text-lg font-semibold mb-4">Photos</h3>
            <PhotoUpload
              photos={localEntry.photos}
              onPhotosChange={(photos) => handleUpdate({ photos })}
            />
            {localEntry.photos.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-4">
                {localEntry.photos.map((photo, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setPreviewPhoto(photo)}
                    className="aspect-square rounded-xl overflow-hidden bg-white/10 hover:opacity-80 transition-opacity"
                  >
                    <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Sticky Bottom Bar */}
        <div className="fixed bottom-20 left-0 right-0 p-4 max-w-md mx-auto z-10">
          <div className="glass-strong rounded-2xl p-4">
            <button
              onClick={handleSave}
              className="w-full tap-target bg-primary hover:bg-primary-dark text-white font-semibold py-4 px-6 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
            >
              Save today's log
            </button>
            {isSaved && (
              <p className="text-center text-sm text-success mt-2">✓ Auto-saved</p>
            )}
          </div>
        </div>
      </AppShell>

      {previewPhoto && (
        <PhotoPreview photo={previewPhoto} onClose={() => setPreviewPhoto(null)} />
      )}
    </>
  );
}

