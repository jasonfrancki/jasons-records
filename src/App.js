import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { useState, useEffect } from 'react'
import AlbumList from './AlbumList'
import AlbumInfo from './AlbumInfo'

function App() {
  const [albums, setAlbums] = useState(null)
  const [results, setResults] = useState(null)

  const getAlbums = async () => {
    const response = await fetch(
      'https://8v3qbg1x.api.sanity.io/v2021-06-07/data/query/production?query=*[_type%20==%20%22album%22]'
    )
    const data = await response.json()
    setAlbums(data.result)
    setResults(data.result)
  }

  useEffect(() => {
    getAlbums()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AlbumList results={results} />} />
        <Route path='/album/:deezerId' element={<AlbumInfo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
