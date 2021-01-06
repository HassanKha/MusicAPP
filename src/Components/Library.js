import react from "react";
import LibrarySong from './LibrarySong';


const Library = ({ status ,setSongs ,songs , SetCurrentSong , isPlaying ,audioRef}) => {
    return(
        <div className={status ? "library active-library ": "library"}>
         <h2>Library</h2>
        <div className="library-songs">
       
{songs.map((Song) => (
    <LibrarySong setSongs={setSongs}  id={Song.id} songs={songs} Song={Song} id={Song.id} key={Song.id} SetCurrentSong={SetCurrentSong}  isPlaying={isPlaying} audioRef={audioRef} />
) )}
        </div>
        </div>
    )
}
export default Library; 