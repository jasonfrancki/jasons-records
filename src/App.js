import { Routes, Route } from 'react-router-dom'
import AlbumList from './AlbumList'
import Album from './Album'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path='/' element={<AlbumList />} />
      <Route path='/album/:deezerId' element={<Album />} />
    </Routes>
  )
}

export default App
