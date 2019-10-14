import React from 'react'

import FullScreenCircuralProgress from './components/FullScreenCircuralProgress'
import Snackbars from './components/Snackbars'
import ScrollToTop from './components/ScrollToTop'

const App = props => {
  return (
    <div>
      <FullScreenCircuralProgress />
      <Snackbars />
      <ScrollToTop />
    </div>
  )
}

export default App