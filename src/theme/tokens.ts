/**
 * NexusIntern - Design System Tokens & Color Palette
 * Pure High-Contrast "Electric Orange & Pure Jet Black" Theme
 */

export const THEME_COLORS = {
  // Brand Foundation
  brand: {
    primary: '#F97316',     // Electric Vivid Orange
    primaryDark: '#EA580C', // Deep Blaze Orange
    primaryLight: '#FB923C',// Bright Neon Orange
    gradient: 'from-orange-500 via-orange-600 to-amber-500',
  },

  // Role-Specific Accent Tokens (Pure Orange & Black Harmony)
  roles: {
    individual: {
      name: 'Individual Intern',
      color: '#F97316',     // Vivid Orange
      bgLight: 'rgba(249, 115, 22, 0.15)',
      border: 'rgba(249, 115, 22, 0.4)',
      text: '#FB923C',
      description: 'Solo deep-work track with personal repository and dedicated 1-on-1 trainer reviews',
    },
    group: {
      name: 'Group / Team Track',
      color: '#FB923C',     // Bright Amber Orange
      bgLight: 'rgba(251, 146, 60, 0.15)',
      border: 'rgba(251, 146, 60, 0.4)',
      text: '#FDBA74',
      description: 'Collaborative engineering squad with shared branch merges and team PR reviews',
    },
    trainer: {
      name: 'Trainer / Code Reviewer',
      color: '#EA580C',     // Deep Blaze Orange
      bgLight: 'rgba(234, 88, 12, 0.15)',
      border: 'rgba(234, 88, 12, 0.4)',
      text: '#FB923C',
      description: 'Reviewer console for code diff inspection, test validation, and milestone sign-offs',
    },
    admin: {
      name: 'Platform Admin',
      color: '#C2410C',     // Deep Rust Orange
      bgLight: 'rgba(194, 65, 12, 0.15)',
      border: 'rgba(194, 65, 12, 0.4)',
      text: '#EA580C',
      description: 'Governance command center for cohort analytics, trainer SLA metrics, and certificates',
    },
  },

  // Internship Duration Tiers (All Orange & Black)
  durations: {
    1: {
      label: '1 Month',
      title: 'Fast-Track Sprint',
      color: '#FB923C',
      badgeBg: 'bg-orange-500/15',
      badgeText: 'text-orange-400',
      badgeBorder: 'border-orange-500/40',
      description: '4-week intensive acceleration. Focuses on Git mastery, core REST APIs, security, and cloud deployment.',
      weeksCount: 4,
    },
    2: {
      label: '2 Months',
      title: 'Standard Core Architecture',
      color: '#F97316',
      badgeBg: 'bg-orange-600/25',
      badgeText: 'text-orange-300',
      badgeBorder: 'border-orange-500/60',
      description: '8-week full-stack depth. Covers database design, microservices, caching, automated CI/CD, and trainer sign-offs.',
      weeksCount: 8,
    },
    6: {
      label: '6 Months',
      title: 'Industrial Capstone',
      color: '#EA580C',
      badgeBg: 'bg-orange-700/20',
      badgeText: 'text-orange-400',
      badgeBorder: 'border-orange-600/50',
      description: '24-week enterprise immersion. Kubernetes orchestration, distributed consensus, production load testing, and job placement defense.',
      weeksCount: 24,
    },
  },

  // Code Diff Highlighting & Verification
  codeReview: {
    addition: {
      bg: 'rgba(249, 115, 22, 0.15)',
      border: '#F97316',
      text: '#FB923C',
    },
    deletion: {
      bg: 'rgba(239, 68, 68, 0.15)',
      border: '#EF4444',
      text: '#F87171',
    },
    status: {
      pending: { color: '#F97316', label: 'Pending Review' },
      changesRequested: { color: '#FB923C', label: 'Changes Requested' },
      approved: { color: '#F97316', label: 'Approved & Verified' },
    }
  },

  // Canvas & Surfaces
  surface: {
    darkCanvas: '#000000',
    darkSurface: '#0A0A0A',
    darkElevated: '#141414',
    darkBorder: 'rgba(249, 115, 22, 0.25)',
    lightCanvas: '#FAFAFA',
    lightSurface: '#FFFFFF',
    lightElevated: '#F4F4F5',
    lightBorder: '#E4E4E7',
  }
};
