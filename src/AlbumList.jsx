import React, { useEffect, useState } from 'react'
import imageUrlBuilder from '@sanity/image-url'
import './AlbumList.css'
import { Link, ScrollRestoration } from 'react-router-dom'

const AlbumList = ({ results, query, setQuery }) => {
  const builder = imageUrlBuilder({
    projectId: '8v3qbg1x',
    dataset: 'production',
    apiVersion: '2021-03-25',
  })

  function urlFor(source) {
    return builder.image(source)
  }

  if (!results) {
    return <h1>Loading</h1>
  }

  return (
    <div>
      <header className='header'>
      {/* Search Bar */}

      <form className='search-form'>
        <input
          className='search-query'
          type='text'
          value={query}
          placeholder='search'
          onChange={(e) => {
            setQuery(e.target.value)
          }}
        />

        <input
          className='reset-button'
          type='button'
          value='x'
          onClick={() => setQuery('')}
        />
      </form>

      {/* End of Search Bar */}
      </header>
      <ul className='albums'>
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
            const { artist, albumTitle, cover, altImg, deezerId } = album
            return (
              <Link
                key={album._id}
                className='album'
                to={`/album/${deezerId}`}
                style={{
                  textDecoration: 'none',
                  color: 'black',
                  fontSize: '1.5rem',
                  textAlign: 'center',
                }}
              >
                <li
                // id={artist[0]}
                // onClick={(e) => {
                //   if (altImg) {
                //     if (
                //       urlFor(cover.asset._ref).width(500).url() ===
                //       e.currentTarget.children[0].src
                //     ) {
                //       e.currentTarget.children[0].src = urlFor(
                //         altImg.asset._ref
                //       )
                //         .width(500)
                //         .url()
                //     } else {
                //       e.currentTarget.children[0].src = urlFor(
                //         cover.asset._ref
                //       )
                //         .width(500)
                //         .url()
                //     }
                //   }
                // }}
                >
                  {cover ? (
                    <img
                      id='artwork'
                      className='artwork'
                      src={urlFor(cover.asset._ref).width(500).url()}
                    />
                  ) : (
                    ''
                  )}
                  <div style={{ padding: '1rem' }}>
                    <h3>{artist}</h3>
                    <h5 style={{ color: '#666' }}>{albumTitle}</h5>
                  </div>
                  {/* {altImg ? <h3 className='more'>...</h3> : ''} */}
                </li>
              </Link>
            )
          })}
      </ul>
    </div>
  )
}

export default AlbumList
