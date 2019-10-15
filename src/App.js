import React from 'react'

import FullScreenCircuralProgress from './components/FullScreenCircuralProgress'
import Snackbars from './components/Snackbars'
import ScrollToTop from './components/ScrollToTop'
import AppBar from './components/AppBar'
import Drawer from './components/Drawer'

const App = props => {
  return (
    <div>
      <AppBar />
      <Drawer />

      <FullScreenCircuralProgress />
      <Snackbars />
      <ScrollToTop />
    </div>
  )
}

export default App