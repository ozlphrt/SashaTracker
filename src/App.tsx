import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTrackerStore } from './store/useTrackerStore';
import { isFirebaseConfigured } from './config/firebase';
import OnboardingPage from './pages/OnboardingPage';
import FirebaseSetupPage from './pages/FirebaseSetupPage';
import DashboardPage from './pages/DashboardPage';
import DailyLogPage from './pages/DailyLogPage';
import WeeksPage from './pages/WeeksPage';
import WeekDetailPage from './pages/WeekDetailPage';
import ChartsPage from './pages/ChartsPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const loadProgram = useTrackerStore((state) => state.loadProgram);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);

  useEffect(() => {
    // Check Firebase configuration first
    if (!isFirebaseConfigured) {
      setFirebaseError('Firebase not configured');
      return;
    }

    // Try to load program
    loadProgram().catch((error) => {
      if (error instanceof Error && error.message.includes('Firebase')) {
        setFirebaseError(error.message);
      } else {
        console.error('Failed to load program:', error);
      }
    });
  }, [loadProgram]);

  // Show Firebase setup page if not configured or if sync initialization failed
  if (!isFirebaseConfigured || firebaseError) {
    return (
      <BrowserRouter basename="/SashaTracker">
        <Routes>
          <Route path="*" element={<FirebaseSetupPage />} />
        </Routes>
      </BrowserRouter>
    );
  }

  // TODO: Check if onboarding is complete
  const showOnboarding = false; // Set to true to show onboarding

  return (
    <BrowserRouter basename="/SashaTracker">
      <Routes>
        {showOnboarding ? (
          <Route path="/" element={<OnboardingPage />} />
        ) : (
          <>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/log" element={<DailyLogPage />} />
            <Route path="/weeks" element={<WeeksPage />} />
            <Route path="/week/:weekNumber/day/:dayNumber" element={<DailyLogPage />} />
            <Route path="/week/:weekNumber" element={<WeekDetailPage />} />
            <Route path="/insights" element={<ChartsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

