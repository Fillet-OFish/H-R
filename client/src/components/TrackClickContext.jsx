import React, { useContext, useState } from 'react'
import { fromUnixTime } from 'date-fns'

const TrackClickContext = React.createContext()

export function useTracker() {
  return useContext(TrackClickContext);
}

export function TrackProvider({children}) {
  const [tracker, setTracker] = useState([]);

  // console.log(tracker)

  function trackClick(e, module) {
    const click = {
      element: e.target.outerHTML,
      module: module,
      time: fromUnixTime(new Date().getTime())
    }
    setTracker([click, ...tracker])
  }

  return (
    <TrackClickContext.Provider value={trackClick}>
      {children}
    </TrackClickContext.Provider>
  )
}