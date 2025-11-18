import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface AppShellProps {
  children: ReactNode;
  showNav?: boolean;
  title?: string;
  headerAction?: ReactNode;
}

export default function AppShell({ children, showNav = true, title, headerAction }: AppShellProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/log', label: 'Log', icon: '📝' },
    { path: '/weeks', label: 'Weeks', icon: '📅' },
    { path: '/insights', label: 'Insights', icon: '📈' },
    { path: '/settings', label: 'More', icon: '⚙️' }
  ];

  const getCurrentDay = () => {
    const today = new Date();
    const startDate = new Date('2024-01-01'); // TODO: Get from profile
    const diffTime = today.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const week = Math.floor(diffDays / 7) + 1;
    const day = (diffDays % 7) + 1;
    return { week, day };
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {(title || headerAction) && (
        <header className="sticky top-0 z-10 glass-strong border-b border-white/10">
          <div className="flex items-center justify-between p-4">
            {title && <h1 className="text-xl font-bold">{title}</h1>}
            {headerAction && <div>{headerAction}</div>}
          </div>
        </header>
      )}
      
      <main className={`${showNav ? 'pb-20' : ''}`}>{children}</main>
      
      {showNav && (
        <nav className="fixed bottom-0 left-0 right-0 glass-strong border-t border-white/10 z-20">
          <div className="flex justify-around items-center h-16 px-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center flex-1 py-1 transition-all tap-target ${
                  location.pathname === item.path
                    ? 'text-primary'
                    : 'text-white/60'
                }`}
              >
                <span className="text-2xl mb-0.5">{item.icon}</span>
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}

