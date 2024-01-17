import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ChipComponent from './components/ChipInput'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ChipComponent/>
    </>
  )
}

export default App
