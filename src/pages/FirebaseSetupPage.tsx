import Card from '../components/common/Card';
import AppShell from '../components/layout/AppShell';

export default function FirebaseSetupPage() {
  return (
    <AppShell showNav={false}>
      <div className="p-4 space-y-6 max-w-md mx-auto">
        <Card variant="strong">
          <div className="text-center mb-6">
            <div className="text-4xl mb-4">☁️</div>
            <h1 className="text-2xl font-bold mb-2">Firebase Configuration Required</h1>
            <p className="text-white/70 mb-2">
              This app requires Firebase configuration for multi-device synchronization.
            </p>
            <p className="text-sm text-warning/80">
              ⚠️ This setup is for developers/deployers only. End users do not need to configure Firebase.
            </p>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold mb-4">Setup Instructions</h2>
          <div className="space-y-4 text-sm text-white/80">
            <div>
              <h3 className="font-semibold text-white mb-2">1. Create Firebase Project</h3>
              <p className="text-white/70">
                Go to <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">Firebase Console</a> and create a new project.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">2. Enable Firestore Database</h3>
              <p className="text-white/70">
                In Firebase Console, go to <strong>Build → Firestore Database</strong> and create a database in production mode.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">3. Set Security Rules</h3>
              <p className="text-white/70 font-mono text-xs bg-black/30 p-2 rounded">
                rules_version = '2';<br/>
                service cloud.firestore {'{'}<br/>
                &nbsp;&nbsp;match /databases/{'{'}database{'}'}/documents {'{'}<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;match /programs/{'{'}document=**{'}'} {'{'}<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;allow read, write: if request.auth != null;<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;{'}'}<br/>
                &nbsp;&nbsp;{'}'}<br/>
                {'}'}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">4. Enable Anonymous Authentication</h3>
              <p className="text-white/70">
                Go to <strong>Build → Authentication → Sign-in method</strong> and enable <strong>Anonymous</strong> authentication.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">5. Get Firebase Config</h3>
              <p className="text-white/70">
                Go to <strong>Project Settings → Your apps</strong>, click the Web icon, and copy your <code className="bg-black/30 px-1 rounded">firebaseConfig</code>.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">6. Configure App</h3>
              <p className="text-white/70">
                Open <code className="bg-black/30 px-1 rounded">src/config/firebase.ts</code> and replace the placeholder values with your Firebase config, or set environment variables:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-white/70 font-mono text-xs">
                <li>VITE_FIREBASE_API_KEY</li>
                <li>VITE_FIREBASE_AUTH_DOMAIN</li>
                <li>VITE_FIREBASE_PROJECT_ID</li>
                <li>VITE_FIREBASE_STORAGE_BUCKET</li>
                <li>VITE_FIREBASE_MESSAGING_SENDER_ID</li>
                <li>VITE_FIREBASE_APP_ID</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">7. Restart App</h3>
              <p className="text-white/70">
                After configuring Firebase, restart the development server or rebuild the app.
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-sm text-white/60 mb-4">
              For detailed instructions, see <code className="bg-black/30 px-1 rounded">FIREBASE_SETUP.md</code>
            </p>
            <button
              onClick={() => window.location.reload()}
              className="tap-target px-6 py-3 bg-primary rounded-xl font-semibold hover:bg-primary/80 transition-colors"
            >
              Reload App
            </button>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

