import './App.css'
import { Home, Input } from './components'
import { Link, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <header>
        <nav>
          <Link to="/"> <h2>Home</h2></Link>
          <Link to="/input"> <h2>Input</h2></Link>
        </nav>
        <hr />
      </header>
      <div className="card">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/input" element={<Input />} />
        </Routes>
      </div>
    </>
  )
}

export default App
