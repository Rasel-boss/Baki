import React from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Home, Settings, Info, ArrowLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Layout: React.FC = () => {
  const { t } = useStore();
  const location = useLocation();
  const navigate = useNavigate();

  const showBackButton = location.pathname.includes('/shop/') || location.pathname.includes('/add-entry');

  return (
    <div className="flex flex-col h-screen bg-gray-100 text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-primary text-white shadow-md z-10 sticky top-0">
        <div className="h-14 flex items-center px-4 justify-between">
            <div className="flex items-center gap-3">
                {showBackButton && (
                    <button onClick={() => navigate(-1)} className="p-1 rounded-full hover:bg-white/20">
                        <ArrowLeft size={24} />
                    </button>
                )}
                <h1 className="text-xl font-bold truncate">{t.appTitle}</h1>
            </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-20 p-4 scroll-smooth">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-20">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full ${
              isActive ? 'text-primary font-medium' : 'text-gray-500'
            }`
          }
        >
          <Home size={24} />
          <span className="text-xs mt-1">{t.dashboard}</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full ${
              isActive ? 'text-primary font-medium' : 'text-gray-500'
            }`
          }
        >
          <Settings size={24} />
          <span className="text-xs mt-1">{t.settings}</span>
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full ${
              isActive ? 'text-primary font-medium' : 'text-gray-500'
            }`
          }
        >
          <Info size={24} />
          <span className="text-xs mt-1">{t.about}</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Layout;