import React from 'react';
import { RoleType, DurationType, ViewMode, UserProfile } from '../types';

interface NavbarProps {
  currentUser: UserProfile;
  currentRole: RoleType;
  onSelectRole: (role: RoleType) => void;
  currentDuration: DurationType;
  onSelectDuration: (duration: DurationType) => void;
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  onOpenLoginModal: () => void;
  onOpenAssessmentModal: () => void;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  currentRole,
  onSelectRole,
  currentView,
  onSelectView,
  onOpenLoginModal,
  onOpenAssessmentModal,
  onSignOut,
}) => {
  return (
    <header className="border-b border-neutral-800/80 bg-[#080808]/90 sticky top-0 z-40 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => onSelectView('explore')}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 to-orange-400 flex items-center justify-center font-black text-black text-sm shadow-md shadow-orange-500/30 group-hover:scale-105 transition">
            ⚡
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base text-white tracking-tight leading-none group-hover:text-orange-400 transition">
              NexusIntern
            </span>
            <span className="text-[10px] text-neutral-400 font-mono tracking-widest uppercase">
              Engineering Portal
            </span>
          </div>
        </div>

        {/* User Session & Auth Action */}
        <div className="flex items-center space-x-3 text-xs">
          {currentUser ? (
            <div className="flex items-center space-x-3">
              {!currentUser.assessmentTaken && currentUser.role === 'student' && (
                <button
                  onClick={onOpenAssessmentModal}
                  className="px-3 py-1.5 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/40 text-[11px] font-bold hover:bg-orange-500 hover:text-black transition animate-pulse"
                >
                  Take 15-Q Quiz
                </button>
              )}

              <button
                onClick={onOpenLoginModal}
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-extrabold text-xs transition shadow-md shadow-orange-500/20 hover:scale-105 active:scale-95"
              >
                Sign In / Switch Role
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLoginModal}
              className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-extrabold transition shadow-md shadow-orange-500/20 hover:scale-105"
            >
              Sign In / Register
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
