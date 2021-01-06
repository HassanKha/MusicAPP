
import { React , useRef , useState , useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay,faAngleLeft,faAngleRight,faPause } from '@fortawesome/free-solid-svg-icons'

const Player = ({songs, SetCurrentSong , currentSong , isPlaying , setSongs, setIsPlaying , audioRef , SongInfo , SetSongInfo}) => {
  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((song) => {
      if (song.id === nextPrev.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });

    setSongs(newSongs);
  };
  useEffect(() => {
    const newSong =
    songs.map((song)=> {
        if(song.id === currentSong.id){
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
  }, [currentSong]);

const HandleSong = async (dir) => {
let currentindex = songs.findIndex((song) => song.id === currentSong.id);

if(dir === "front"){
  await SetCurrentSong(songs[(currentindex +1) % songs.length]);
  activeLibraryHandler(songs[(currentindex +1) % songs.length]);
  if(isPlaying){
   
        audioRef.current.play()
    

}
  return;
}
if(dir === "back"){
  if((currentindex -1) % songs.length === -1){
    await SetCurrentSong(songs[songs.length-1]);
    activeLibraryHandler(songs[songs.length-1]);
    if(isPlaying){
   
      audioRef.current.play()
  

}
    return;
  }
}
 await SetCurrentSong(songs[(currentindex -1) % songs.length]);
 activeLibraryHandler(songs[(currentindex -1) % songs.length]);
 if(isPlaying){
   
  audioRef.current.play()


}

}
const playSongHandler = () => {
   
   if(isPlaying){
    audioRef.current.pause();
    setIsPlaying(!isPlaying);
   }
   else {
     audioRef.current.play();
     setIsPlaying(!isPlaying);
   }

    }

const GetTime = (Time) =>{
  return(
    Math.floor(Time/60)+ ":" + ("0" + Math.floor(Time%60)).slice(-2)
  )
}
const trackAnim = {
  transform: `translateX(${SongInfo.animationPercentage}%)`,
};
const DragHandler = (e) => {
  audioRef.current.currentTime=e.target.value;
SetSongInfo({...SongInfo , currentTime: e.target.value})
}
  return (
    <div className="Player">
      <div className="Time-Control">
       <p>{GetTime(SongInfo.currentTime)}</p>
       <div  style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }}
          className="track" >
       <input min={0} max={SongInfo.duration || 0} onChange={DragHandler} value ={SongInfo.currentTime} type="range"></input>
       <div style={trackAnim} className="animate-track"></div>
      
      </div>
      <p>{SongInfo.duration ? GetTime(SongInfo.duration) : "0:00"}</p>
      </div>
      <div className="Play-Control">
      <FontAwesomeIcon onClick={()=>HandleSong("back")} className="SkipBack" size="2x" icon={faAngleLeft}/>
    <FontAwesomeIcon onClick= {playSongHandler} className="Play" size="2x" icon={isPlaying ? faPause : faPlay}/>
    <FontAwesomeIcon onClick={()=> HandleSong("front")} className="SkipFront"size="2x"  icon={faAngleRight}/>
      </div>
     
    </div>
  );
};

export default Player;
