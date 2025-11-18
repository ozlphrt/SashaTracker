import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import { DogProfile } from '../data/models';
import { useTrackerStore } from '../store/useTrackerStore';

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Partial<DogProfile>>({
    name: '',
    breed: '',
    age: 12,
    weight: 0,
    protocolStartDate: new Date().toISOString().split('T')[0]
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStart = () => {
    // TODO: Save profile to store
    navigate('/');
  };

  const isComplete = profile.name && profile.breed && profile.weight > 0 && profile.protocolStartDate;

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-4 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to Anallergenic Tracker</h1>
          <p className="text-white/60">Let's set up your dog's profile</p>
        </div>

        <Card variant="strong">
          <div className="text-center mb-6">
            <div className="w-24 h-24 mx-auto rounded-full bg-white/10 flex items-center justify-center overflow-hidden mb-4">
              {photoPreview ? (
                <img src={photoPreview} alt="Dog" className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl">🐶</span>
              )}
            </div>
            <label className="tap-target inline-block px-4 py-2 bg-primary/20 text-primary rounded-xl cursor-pointer hover:bg-primary/30 transition-colors">
              {photoPreview ? 'Change Photo' : 'Add Photo'}
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold mb-4">Dog Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Dog Name *</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                placeholder="e.g., Sasha"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Breed *</label>
              <input
                type="text"
                value={profile.breed}
                onChange={(e) => setProfile({ ...profile, breed: e.target.value })}
                placeholder="e.g., Havanese"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Age</label>
                <input
                  type="number"
                  value={profile.age}
                  onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) || 0 })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Weight (kg) *</label>
                <input
                  type="number"
                  step="0.1"
                  value={profile.weight}
                  onChange={(e) => setProfile({ ...profile, weight: parseFloat(e.target.value) || 0 })}
                  placeholder="0.0"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold mb-4">Veterinary Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Vet Name</label>
              <input
                type="text"
                value={profile.vetName || ''}
                onChange={(e) => setProfile({ ...profile, vetName: e.target.value })}
                placeholder="Optional"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Clinic</label>
              <input
                type="text"
                value={profile.vetClinic || ''}
                onChange={(e) => setProfile({ ...profile, vetClinic: e.target.value })}
                placeholder="Optional"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold mb-4">Protocol Start Date *</h2>
          <input
            type="date"
            value={profile.protocolStartDate}
            onChange={(e) => setProfile({ ...profile, protocolStartDate: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </Card>

        <Card variant="strong">
          <p className="text-sm text-white/80 leading-relaxed">
            We'll track 12 weeks of diet, meds, baths and ears to see if the allergy improves.
          </p>
        </Card>

        <button
          onClick={handleStart}
          disabled={!isComplete}
          className="w-full tap-target bg-primary hover:bg-primary-dark text-white font-semibold py-4 px-6 rounded-2xl shadow-lg shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
        >
          Start 12-week plan
        </button>
      </div>
    </div>
  );
}

