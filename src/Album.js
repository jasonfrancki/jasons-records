import { useParams } from 'react-router-dom'

const Album = () => {
  const { deezerId } = useParams()
  return <div>Album {deezerId}</div>
}
export default Album
