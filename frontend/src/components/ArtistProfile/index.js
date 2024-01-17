import { useDispatch, useSelector } from 'react-redux'
import './ArtistProfile.css'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { useEffect } from 'react'
import { getAllArtistsThunk } from '../../store/artists'
import { getAllShowsThunk } from '../../store/shows'
import { useState } from 'react'

function ArtistProfile() {
    const dispatch = useDispatch()
    const { artistId } = useParams()
    const user = useSelector((state) => state.session).user
    const allShows = useSelector((state) => state.shows)
    const allArtists = useSelector((state) => state.artists)[0]
    const [ updating, setUpdating ] =  useState(false)
    const [ profilePic, setProfilePic ] = useState('')
    const [ newProfilePic, setNewProfilePic ] = useState(false)
    const [ newProfilePicUrl, setNewProfilePicUrl ] = useState('')
    const [ holdProfilePicUrl, setHoldProfilePicUrl ] = useState('')
    const [ previewProfileUrl, setPreviewProfileUrl ] = useState('')

    useEffect(() => {
        dispatch(getAllArtistsThunk())
        dispatch(getAllShowsThunk())
    }, [dispatch])

    if (!user || !allShows.length || !allArtists) return <h1>loading...</h1>

    const artist = allArtists.filter((artist) => `${artist.id}` === artistId)[0]

    if (!previewProfileUrl) setPreviewProfileUrl(artist.profilePic)

    let ownProfile = false;
    if (artist.id === user.id) ownProfile = true



    return (
        <div>
            { !updating && <div className='top-profile-box'>
                <div className='left-top-profile-box'>
                    <img src={artist.profilePic} alt={`${artist.name}`}></img>
                    <p>Located in {artist.location}</p>
                </div>
                <div>
                    {ownProfile && <h2>Hi, {artist.username}!</h2>}
                    {!ownProfile && <h2>{artist.username}</h2>}
                    <p>{artist.bio}</p>
                </div>
                {ownProfile && <button onClick={(() => setUpdating(true))}>Update Profile</button>}
            </div>}
            { updating && <form>
                <img src={artist.profilePic} alt={`${artist.name}`}></img>
                <input value={holdProfilePicUrl} placeholder='Add a new profile picture url here.' onChange={(e) => setHoldProfilePicUrl(e.target.value)}></input>
                <button onClick={(() => {
                    setNewProfilePicUrl(holdProfilePicUrl)
                    setProfilePic(true)
                    setPreviewProfileUrl(holdProfilePicUrl)

                })}>Change</button>
                </form>}
            
        </div>
    )
}

export default ArtistProfile