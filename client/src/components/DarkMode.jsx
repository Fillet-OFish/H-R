import React, { useContext, useState } from 'react'
import { FaMoon, FaSun } from "react-icons/fa";


const DarkModeContext = React.createContext()

export function useDarkMode() {
  return useContext(DarkModeContext);
}

export function DarkModeProvider({children}) {
  const [darkMode, setDarkMode] = useState(() => (JSON.parse(localStorage.getItem('darkMode')) || false));

  darkMode ?
    (document.body.style.backgroundColor = '#202123', document.body.style.color = 'white')
    : (document.body.style.backgroundColor = '', document.body.style.color = '');

  function toggleDarkMode() {
    localStorage.setItem('darkMode', !darkMode);
    setDarkMode(darkMode => !darkMode)
  }

  return (
    <DarkModeContext.Provider value={darkMode}>
        {children}
        <button className={`dark-mode-button ${darkMode ? 'dark-mode-button-dark' : null}`} onClick={toggleDarkMode}>{darkMode ? <FaSun/> : <FaMoon/>}</button>
    </DarkModeContext.Provider>
  )
}

//303135
//3c4044