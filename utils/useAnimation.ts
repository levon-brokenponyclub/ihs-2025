
import { CSSProperties } from 'react';
import { AnimationConfig } from './overlayAnimations';

export const useAnimation = (
  config: AnimationConfig,
  isOpen: boolean
) => {
  return {
    className: `${config.base ?? ''} ${isOpen ? config.open : config.closed}`,
    style: config.style,
  };
};
