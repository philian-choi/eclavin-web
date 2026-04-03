'use client';

import React, { useEffect } from 'react';

/**
 * SecurityProvider: Implements a multi-layered defense system.
 * 1. Blocks right-click and standard shortcuts.
 * 2. Periodically clears the console to hide data.
 * 3. Uses a debugger trap to stall unauthorized inspection.
 * 4. Disables printing and selection.
 */
export default function SecurityProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 1. Core Event Blocking
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      // F12, Ctrl+Shift+I/J/C
      if (
        e.keyCode === 123 || 
        (cmdOrCtrl && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) ||
        (cmdOrCtrl && e.keyCode === 85) || // View Source (U)
        (cmdOrCtrl && e.keyCode === 83) || // Save (S)
        (cmdOrCtrl && e.keyCode === 80)    // Print (P)
      ) {
        e.preventDefault();
        return false;
      }
    };

    // 2. Anti-Debugging Traps
    // Clear console periodically to hide any caught data
    const consoleClearInterval = setInterval(() => {
      console.clear();
      console.log("%cEclavin Security Active", "color: red; font-size: 20px; font-weight: bold;");
      console.log("Unauthorized access or content theft is strictly prohibited.");
    }, 2000);

    // This trap pauses execution if DevTools is open
    const debugTrapInterval = setInterval(() => {
      (function() {
        (function a() {
          try {
            (function b(i) {
              if (("" + i / i).length !== 1 || i % 20 === 0) {
                (function() {}).constructor("debugger")();
              } else {
                debugger;
              }
              b(++i);
            })(0);
          } catch (e) {}
        })();
      })();
    }, 5000);

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(consoleClearInterval);
      clearInterval(debugTrapInterval);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <div className="no-select">{children}</div>;
}
