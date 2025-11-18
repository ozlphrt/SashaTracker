import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTrackerStore } from './store/useTrackerStore';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import DailyLogPage from './pages/DailyLogPage';
import WeeksPage from './pages/WeeksPage';
import WeekDetailPage from './pages/WeekDetailPage';
import ChartsPage from './pages/ChartsPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const loadProgram = useTrackerStore((state) => state.loadProgram);

  useEffect(() => {
    loadProgram();
  }, [loadProgram]);

  // TODO: Check if onboarding is complete
  const showOnboarding = false; // Set to true to show onboarding

  return (
    <BrowserRouter>
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

