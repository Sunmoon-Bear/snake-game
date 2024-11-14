import React from 'react';
import { debounce } from 'lodash';

function TouchControls({ onDirectionChange }) {
  const debouncedDirectionChange = debounce((direction) => {
    onDirectionChange(direction);
  }, 100, { leading: true, trailing: false });

  return (
    <div className="touch-controls">
      <div className="touch-controls-inner">
        <button 
          className="touch-button up" 
          onTouchStart={() => debouncedDirectionChange('UP')}
        >
          ↑
        </button>
        <button 
          className="touch-button down" 
          onTouchStart={() => debouncedDirectionChange('DOWN')}
        >
          ↓
        </button>
        <button 
          className="touch-button left" 
          onTouchStart={() => debouncedDirectionChange('LEFT')}
        >
          ←
        </button>
        <button 
          className="touch-button right" 
          onTouchStart={() => debouncedDirectionChange('RIGHT')}
        >
          →
        </button>
      </div>
    </div>
  );
}

export default TouchControls; 