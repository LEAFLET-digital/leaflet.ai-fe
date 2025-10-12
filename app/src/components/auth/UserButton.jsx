import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui";

const UserButton = ({ className = "" }) => {
  const { user, logout, isLoading } = useAuth();

  if (isLoading || !user) {
    return (
      <div className="w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
    );
  }

  const handleLogout = async () => {
    await logout();
  };

  const getUserInitials = () => {
    if (user.first_name || user.last_name) {
      return `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase();
    }
    return user.email?.[0]?.toUpperCase() || 'U';
  };

  return (
    <div className={`relative group ${className}`}>
      {/* User Avatar */}
      <button className="flex items-center space-x-2 p-1 rounded-lg hover:bg-white/10 transition-colors">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
          {user.profile_picture ? (
            <img 
              src={user.profile_picture} 
              alt="Profile" 
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            getUserInitials()
          )}
        </div>
        <span className="text-white text-sm hidden md:block">
          {user.first_name || user.email?.split('@')[0] || 'User'}
        </span>
      </button>

      {/* Dropdown Menu */}
      <div className="absolute right-0 top-full mt-2 w-48 bg-slate-800/95 backdrop-blur-sm border border-white/20 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="p-3 border-b border-white/10">
          <p className="text-white font-medium text-sm truncate">
            {user.first_name && user.last_name 
              ? `${user.first_name} ${user.last_name}`
              : user.email
            }
          </p>
          <p className="text-gray-400 text-xs truncate">{user.email}</p>
        </div>
        
        <div className="p-2">
          <button 
            className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-md text-sm transition-colors"
            onClick={() => window.location.href = '/dashboard/profile'}
          >
            Profile
          </button>
          <button 
            className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-md text-sm transition-colors"
            onClick={() => window.location.href = '/dashboard/settings'}
          >
            Settings
          </button>
          <hr className="border-white/10 my-2" />
          <button 
            className="w-full text-left px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-md text-sm transition-colors"
            onClick={handleLogout}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserButton;