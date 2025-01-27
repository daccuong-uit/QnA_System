import React from 'react'
import Home from '../../client/src/pages/Home'
import { Color } from './assets/color'

const App = () => {

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Color.background
    }}>
      <Home />
    </div>
  )
}

export default App