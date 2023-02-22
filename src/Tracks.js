import { useState, useRef } from 'react'

const Tracks = ({ tracks }) => {
  const [sampleUrl, setSampleUrl] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audio = useRef()
  console.log(tracks)

  return (
    <div>
      {/* track listing */}
      <ul
        style={{
          textAlign: 'left',
          padding: '5rem 2rem',
          listStyle: 'none',
        }}
      >
        {tracks.map((track, i) => {
          return (
            <li
              key={track.id}
              style={{
                fontSize: '1.5rem',
                padding: '.25rem',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <h3
                style={{
                  display: 'inline',
                  cursor: 'pointer',
                  paddingRight: '.75rem',
                }}
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
              <div>{`${i + 1}. ${track.title}`}</div>
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
