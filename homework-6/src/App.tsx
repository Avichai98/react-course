import './App.css'
import { UserRegistrationForm } from './components'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Forms Homework</h1>
        <p>Advanced 3 - React Hook Form + Zod Validation</p>
      </header>
      <main>
        <UserRegistrationForm />
      </main>
    </div>
  )
}

export default App