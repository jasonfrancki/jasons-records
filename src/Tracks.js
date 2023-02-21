import { useState, useRef } from 'react'

const Tracks = ({ tracks }) => {
  const [sampleUrl, setSampleUrl] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audio = useRef()
  console.log(tracks)

  return (
    <div>
      {/* track listing */}
      <ol
        style={{
          textAlign: 'left',
        }}
      >
        {tracks.map((track) => {
          return (
            <li key={track.id}>
              <h3
                style={{
                  display: 'inline',
                  cursor: 'pointer',
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
              {track.title}
            </li>
          )
        })}
      </ol>
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
