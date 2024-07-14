"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

export const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <div>
      <button onClick={handleDarkMode}>
        {isDarkMode ? (
          <>
            <div className="dark:bg-neutral-800 dark:text-neutral-100 p-2 rounded-md">
              <MoonIcon className="w-6 h-6" />
            </div>
          </>
        ) : (
          <>
            <div className="bg-neutral-200 text-neutral-900 p-2 rounded-md">
              <SunIcon className="w-6 h-6" />
            </div>
          </>
        )}
      </button>
    </div>
  );
};
