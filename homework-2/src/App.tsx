import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Layout } from './Layout'
import { Post } from './Post'
import { Posts } from './Posts'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Posts />} />
        <Route path="posts/:id" element={<Post />} />
      </Route>
    </Routes>
  )
}

export default App
