import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Tracks from './Tracks'

const Album = () => {
  const [album, setAlbum] = useState(null)
  const { deezerId } = useParams()
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'bf23548d17mshfb9c42fc97ee039p1b61b4jsnf167bc0c5949',
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
    },
  }
  const getAlbum = async () => {
    const data = await fetch(
      `https://deezerdevs-deezer.p.rapidapi.com/album/${deezerId}`,
      options
    )
    const album = await data.json()
    setAlbum(album)
  }

  useEffect(() => {
    getAlbum()
  }, [])

  if (!album) {
    return <>loading</>
  }

  return (
    <div style={{ width: '50%', margin: 'auto', textAlign: 'center' }}>
      <img src={album.cover_big} alt='' />
      <h1>
        {album.artist.name} - {album.title}
      </h1>
      <Tracks tracks={album.tracks.data} />
    </div>
  )
}
export default Album
