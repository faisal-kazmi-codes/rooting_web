import { useRef, useState, useEffect } from "react";
import { Share2, Volume2, VolumeX, PlayCircle } from "lucide-react";
import video1 from '../../assets/Videos/5496733-uhd_2160_3840_30fps.mp4';

export default function VideoCard() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlayIcon, setShowPlayIcon] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current) {
        const rect = videoRef.current.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          videoRef.current.play();
          setIsPlaying(true);
        } else {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
      setShowPlayIcon(true);
      setTimeout(() => setShowPlayIcon(false), 1000);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Check this out!",
        url: window.location.href,
      });
    } else {
      alert("Sharing not supported in this browser.");
    }
  };

  return (
    <div className="relative w-full h-screen flex items-end">
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={video1}
        autoPlay
        loop
        playsInline
        muted={isMuted}
        onClick={togglePlayPause}
      ></video>
      
      {showPlayIcon && (
        <div style={{position:"absolute",display:"flex",inset:0,alignItems:"center",justifyContent:"center"}} className="absolute inset-0 flex items-center justify-center">
          <PlayCircle size={72} style={{color:"white",background:"rgba(0,0,0,.5)",padding:8,borderRadius:"100%"}} />
        </div>
      )}
      
      <div style={{position:"fixed",top:20,right:8,display:"flex",flexDirection:"column",gap:10}}>
        <button
          onClick={handleShare}
           style={{color:"white",background:"rgba(0,0,0,.5)",padding:2,borderRadius:"100%",height:"48px",width:"48px",border:"none"}}
        >
          <Share2 size={24} />
        </button>
        <button
          onClick={toggleMute}
          style={{color:"white",background:"rgba(0,0,0,.5)",padding:2,borderRadius:"100%",height:"48px",width:"48px",border:"none"}}
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      </div>
      
      <div style={{position:"relative",zIndex:10,width:"100%",padding:"10px",background:"transparent",color:"#fff"}} >
        <h2 style={{fontWeight:"700",fontSize:"16px"}}>Lorem ipsum</h2>
        <p style={{marginTop:"8px",marginBottom:"8px",fontWeight:"500",fontSize:"14px"}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <button style={{backgroundColor:"#FF003D",border:"none",width:"100%",padding:"10px 0px",height:"38px",borderRadius:"3px",fontWeight:600,color:"#fff"}}>Learn more</button>
      </div>
    </div>
  );
}
