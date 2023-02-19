import React, { useEffect, useState } from 'react'
import imageUrlBuilder from '@sanity/image-url'
import './AlbumList.css'

const AlbumList = () => {
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

  const builder = imageUrlBuilder({
    projectId: '8v3qbg1x',
    dataset: 'production',
    apiVersion: '2021-03-25',
  })

  function urlFor(source) {
    return builder.image(source)
  }

  if (!results) {
    return <h1>hi</h1>
  }

  return (
    <div>
      <ul className="albums">
        {results
          .sort((a, b) => {
            if (a.sortName.toLowerCase() < b.sortName.toLowerCase()) return -1
            if (a.sortName.toLowerCase() > b.sortName.toLowerCase()) return 1
            if (a.albumTitle.toLowerCase() < b.albumTitle.toLowerCase())
              return -1
            if (a.albumTitle.toLowerCase() > b.albumTitle.toLowerCase())
              return 1
            return 0
          })
          .map((album) => {
            const { artist, albumTitle, cover, altImg } = album
            return (
              <li
                className="album"
                id={artist[0]}
                key={album._id}
                onClick={(e) => {
                  if (altImg) {
                    if (
                      urlFor(cover.asset._ref).width(500).url() ===
                      e.currentTarget.children[0].src
                    ) {
                      e.currentTarget.children[0].src = urlFor(
                        altImg.asset._ref
                      )
                        .width(500)
                        .url()
                    } else {
                      e.currentTarget.children[0].src = urlFor(cover.asset._ref)
                        .width(500)
                        .url()
                    }
                  }
                }}
              >
                {cover ? (
                  <img
                    id="artwork"
                    className="artwork"
                    src={urlFor(cover.asset._ref).width(500).url()}
                  />
                ) : (
                  ''
                )}

                <h3>{artist}</h3>
                <h4>{albumTitle}</h4>
                {altImg ? <h3 className="more">...</h3> : ''}
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default AlbumList
