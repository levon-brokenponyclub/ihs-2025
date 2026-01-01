
import { CSSProperties } from 'react';

export type AnimationConfig = {
  open: string;
  closed: string;
  base?: string;
  style?: CSSProperties;
};

/**
 * Overlay tray (dominant animation)
 * Uses scale-x and transform-origin-right for a "drawer/tray" reveal feel.
 */
export const overlayTray: AnimationConfig = {
  base:
    'transition-transform transition-opacity duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)]',
  open: 'opacity-100 scale-x-100 visible',
  closed: 'opacity-0 scale-x-95 invisible',
  style: {
    transformOrigin: 'right',
  },
};

/**
 * Column entrance animations
 * Sequenced delays to create a wave effect from left to right after the tray opens.
 */
export const columnEntrance = {
  left: (delay = 150): AnimationConfig => ({
    base: `transition-all duration-700 delay-[${delay}ms]`,
    open: 'opacity-100 translate-y-0',
    closed: 'opacity-0 translate-y-6',
  }),

  center: (delay = 250): AnimationConfig => ({
    base: `transition-all duration-700 delay-[${delay}ms]`,
    open: 'opacity-100 translate-y-0',
    closed: 'opacity-0 translate-y-6',
  }),

  right: (delay = 350): AnimationConfig => ({
    base: `transition-all duration-800 delay-[${delay}ms]`,
    open: 'opacity-100 translate-x-0',
    closed: 'opacity-0 translate-x-10',
  }),
};

/**
 * Staggered text/link animation
 */
export const staggerItem = (delay: number): AnimationConfig => ({
  base: 'transition-all duration-500',
  open: 'opacity-100 translate-x-0',
  closed: 'opacity-0 -translate-x-4',
  style: {
    transitionDelay: `${delay}ms`,
  },
});

/**
 * Featured card animation (Open Day)
 * Adds a subtle scale effect for prominence.
 */
export const featuredCard: AnimationConfig = {
  base: 'transition-all duration-500',
  open: 'opacity-100 translate-y-0 scale-100',
  closed: 'opacity-0 translate-y-4 scale-[0.98]',
};
