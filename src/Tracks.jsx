import { useState, useRef } from 'react'
import './Tracks.css'

const Tracks = ({ tracks }) => {
  const [sampleUrl, setSampleUrl] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audio = useRef()
  console.log(tracks)

  return (
    <div>
      {/* track listing */}
      <ul className='track-listing'>
        {tracks.map((track, i) => {
          return (
            <li className='track' key={track.id}>
              <h3
                className='track-media-button'
                onClick={() => {
                  if (!isPlaying || sampleUrl !== track.preview) {
                    setIsPlaying(true)
                    setSampleUrl(track.preview)
                    audio.current.src = track.preview
                    audio.current.play()
                  } else {
                    audio.current.pause()
                    setIsPlaying(false)
                    setSampleUrl(null)
                  }
                }}
              >
                {sampleUrl === track.preview ? '⏹️' : '▶️'}
              </h3>
              <div className='track-number'>{`${i + 1}. `}</div>
              <div className='track-title'>{track.title}</div>
            </li>
          )
        })}
      </ul>
      <audio
        ref={audio}
        onEnded={() => {
          setIsPlaying(false)
          setSampleUrl(null)
        }}
      />
      {/* audio player */}
    </div>
  )
}
export default Tracks
