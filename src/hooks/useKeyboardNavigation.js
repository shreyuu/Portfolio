import { useEffect, useCallback } from 'react';

const useKeyboardNavigation = (options = {}) => {
  const { onEnter, onEscape, onArrowUp, onArrowDown, onArrowLeft, onArrowRight, onTab, onSpace } =
    options;

  const handleKeyDown = useCallback(
    event => {
      switch (event.key) {
        case 'Enter':
          onEnter?.(event);
          break;
        case 'Escape':
          onEscape?.(event);
          break;
        case 'ArrowUp':
          onArrowUp?.(event);
          break;
        case 'ArrowDown':
          onArrowDown?.(event);
          break;
        case 'ArrowLeft':
          onArrowLeft?.(event);
          break;
        case 'ArrowRight':
          onArrowRight?.(event);
          break;
        case 'Tab':
          onTab?.(event);
          break;
        case ' ':
          onSpace?.(event);
          break;
        default:
          break;
      }
    },
    [onEnter, onEscape, onArrowUp, onArrowDown, onArrowLeft, onArrowRight, onTab, onSpace]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return {
    handleKeyDown,
  };
};

export default useKeyboardNavigation;
