import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Tracks from './Tracks'
import './AlbumInfo.css'

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
  console.log(album)
  return (
    <div className='album-info'>
      <div className="album-details">
      <div className="album-image">
      <img
        src={album.cover_big}
        alt='album cover'
        style={{ borderRadius: '2%' }}
        width='100%'
      /></div>
      <div className="album-data">
      <h1 className='album-title'>{album.title}</h1>
      <h3 className='album-artist'>{album.artist.name}</h3>
      <h5 className='album-details'>
        {album.tracks.data.length} tracks - {Math.floor(album.duration / 60)}{' '}
        minutes
      </h5>
      <h5 className='album-details'>
        {`Released ${album.release_date.split('-')[1]}/${
          album.release_date.split('-')[2]
        }/${album.release_date.split('-')[0]}`}
      </h5>
      <h5 className='album-details'>
        {album.genres.data[0].name} - {album.label}
      </h5></div></div>
      <Tracks tracks={album.tracks.data} />
    </div>
  )
}
export default Album
