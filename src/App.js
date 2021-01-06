
import  React ,{ useState,useRef} from 'react';
import Player from "./Components/Player"
import Song from "./Components/Song"
import "./Styles/App.scss"
import data from "./Components/Util"
import Library from './Components/Library';
import Nav from "./Components/nav"




function App() {

  const [songs , setSongs] = useState(data());
  const [currentSong , SetCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const[SongInfo,SetSongInfo] = useState({
    currentTime: 0,
    duration:0,
    animationPercentage: 0,
})
const [status, setstatus] = useState(false);

const audioRef = useRef(null);
const TimeHandler = (e) => {
const current = e.target.currentTime;
const Dur = e.target.duration;
const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(Dur);
    const percentage = Math.round((roundedCurrent / roundedDuration) * 100);
SetSongInfo({...SongInfo , currentTime: current ,duration:Dur,animationPercentage: percentage})
                           }
                           const songEndHandler = async () => {
                            let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
                            await SetCurrentSong(songs[(currentIndex + 1) % songs.length]);
                            if(isPlaying){
                           
                                  audioRef.current.play()
                         
                          }
                            return;
                          };

  return (
    <div className={`App ${status ? "library-active" : ""}`}>
      <Nav status={status} setstatus={setstatus} />
      <Song currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        isPlaying={isPlaying}
        SongInfo={SongInfo}
        SetSongInfo={SetSongInfo}
        songs={songs}
        setSongs={setSongs}
        SetCurrentSong={SetCurrentSong}
      />
      <Library
        songs={songs}
        SetCurrentSong={SetCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        status={status}
      />
      <audio
        onLoadedMetadata={TimeHandler}
        onTimeUpdate={TimeHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;
