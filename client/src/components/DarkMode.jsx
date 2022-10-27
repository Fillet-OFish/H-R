import React, { useContext, useState } from 'react'


const DarkModeContext = React.createContext()

export function useDarkMode() {
  return useContext(DarkModeContext);
}

export function DarkModeProvider({children}) {
  const [darkMode, setDarkMode] = useState(false);

  darkMode ?
    (document.body.style.backgroundColor = '#202123', document.body.style.color = 'white')
    : (document.body.style.backgroundColor = '', document.body.style.color = '');

  function toggleDarkMode() {
    setDarkMode(darkMode => !darkMode)
  }



  return (
    <DarkModeContext.Provider value={darkMode}>
        {children}
        <button className={`dark-mode-button ${darkMode ? 'dark-mode-button-dark' : null}`} onClick={toggleDarkMode}>{darkMode ? 'Light' : 'Dark'}</button>
    </DarkModeContext.Provider>
  )
}

//303135
//3c4044