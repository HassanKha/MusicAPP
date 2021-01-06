import react from "react";
import Song from './Song';

const LibrarySong = ({setSongs,id ,songs,Song , SetCurrentSong , isPlaying , audioRef}) =>{
const songselectorHandler = async () => {
 await SetCurrentSong(Song);

if(isPlaying){
        audioRef.current.play()
  

}
const newSong =
    songs.map((song)=> {
        if(song.id === id){
            return {
                ...song,
                active:true
            }
        }
        else {
            return {
                ...song,
                active:false
            }
        }
            
    })



setSongs(newSong);

}
return(
    <div onClick={songselectorHandler} className={ Song.active ? "library-song song selected": "library-song song"}>

        <img alt={Song.name} src={Song.cover}></img>
        <div className="song-description">
        <h3>{Song.name}</h3>
        <h4>{Song.artist}</h4>

    </div>
    </div>
)

}

export default LibrarySong; 