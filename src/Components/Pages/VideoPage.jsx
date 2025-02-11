import { useRef, useState, useEffect } from "react";
import { Share2, Volume2, VolumeX, PlayCircle } from "lucide-react";
import video2 from '../../assets/Videos/SampleVideo_1280x720_1mb.mp4'
import Drawer from "../Drawer";
import api from "../Helper/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { useInView } from "react-intersection-observer";
import { Keyboard, Mousewheel, Virtual } from "swiper/modules";
const videos = [{
  src: video2, overlays: [
    { type: "text", content: "50% OFF", x: 10, y: 20 },
    { type: "button", content: "Buy Now", x: 15, y: 30, url: "https://shop.com/product" }
  ]
}, {
  src: "https://d3u1ihaf1zi6y0.cloudfront.net/users/65450be53846e2adbb8b804c/posts/afc77cd7-2402-45f9-ae4a-aa2f926f1378-1700408275_50D00079-AB4D-4A03-975F-809D738E9402.mp4", overlays: [
    { type: "text", content: "New Arrival!", x: 20, y: 50 }
  ]
}, {
  src: "https://avtshare01.rz.tu-ilmenau.de/avt-vqdb-uhd-1/test_1/segments/bigbuck_bunny_8bit_15000kbps_1080p_60.0fps_h264.mp4", overlays: [
    { type: "button", content: "Watch Now", x: 30, y: 70, url: "https://example.com/watch" }
  ]
}, {
  src: "https://avtshare01.rz.tu-ilmenau.de/avt-vqdb-uhd-1/test_1/segments/cutting_orange_tuil_15000kbps_1080p_59.94fps_h264.mp4", overlays: [{
    type: "emoji",
    content: "🔥",
    x: 120,
    y: 300,
  }
  ]
}, {
  src: "https://avtshare01.rz.tu-ilmenau.de/avt-vqdb-uhd-1/test_1/segments/vegetables_tuil_15000kbps_1080p_59.94fps_h264.mp4", overlays: [
    { type: "button", content: "Watch Now", x: 30, y: 70, url: "https://example.com/watch" }
  ]
}]

export default function Reels() {
  const [isOpen, setIsOpen] = useState(false);
  const [videoData, setVideoData] = useState([])
  const swiperRef = useRef(null);
  const videoRefs = useRef([]);
  useEffect(() => {
    api.get(`/profile-posts/65450be53846e2adbb8b804c`)
      .then(response => {
        setVideoData(response.data)
        console.log(response.data, "====profile-post");
      })
      .catch(err => {
        console.log(err);

      });
  }, []);
  useEffect(() => {
    api.get(`/feeds`)
      .then(response => {
        console.log(response.data, "====feeds");
      })
      .catch(err => {
        console.log(err);

      });
  }, []);
  useEffect(() => {
    setTimeout(() => {
      if (videoRefs.current[0]) {
        videoRefs.current[0].play();
      }
    }, 500);
  }, []);

  return (
    <Swiper
      className="video-container"
      ref={swiperRef}
      direction="vertical"
      slidesPerView={1}
      spaceBetween={0}
      initialSlide={0}
      allowSlideNext={true}
      allowSlidePrev={true}
      mousewheel={{
        forceToAxis: true,  // Ensures scrolling happens only vertically
        sensitivity: .5,   // Reduces scrolling speed
        releaseOnEdges: true, // Prevents skipping slides too fast
      }}
      keyboard={{ enabled: true, onlyInViewport: true }} // Enable arrow key navigation
      modules={[Mousewheel, Keyboard, Virtual]}
    >
      {videos.map((video, index) => (
        <SwiperSlide virtualIndex={index} key={video} style={{ padding: "0px", margin: "0px" }}>
          <VideoCard video={video} isOpen={isOpen} setIsOpen={setIsOpen} />
        </SwiperSlide>
      )
      )}
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} />
    </Swiper>
  );
}
function VideoCard({ video, isOpen, setIsOpen }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showPlayIcon, setShowPlayIcon] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.5 });
  const videoRefs = useRef(null)
  useEffect(() => {
    if (videoRefs.current) {
      if (inView) {
        videoRefs.current.play();
      } else {
        videoRefs.current.pause();
      }
    }
  }, [inView]);
  const togglePlayPause = () => {
    if (videoRefs.current) {
      if (isPlaying) {
        videoRefs.current.pause();
      } else {
        videoRefs.current.play();
      }
      setIsPlaying(!isPlaying);
      setShowPlayIcon(true);
      setTimeout(() => setShowPlayIcon(false), 1000);
    }
  };

  const toggleMute = () => {
    if (videoRefs.current) {
      videoRefs.current.muted = !isMuted;
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
    <div ref={ref} className="video-frame relative h-screen flex items-end">
      <video
        ref={videoRefs}
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={video.src}
        autoPlay
        loop
        playsInline
        muted={isMuted}
        onClick={() => togglePlayPause()}
      ></video>
      {video.overlays &&
        video.overlays.map((overlay, index) => (
          <div
            key={index}
            className="absolute"
            style={{
              top: overlay.y,
              left: overlay.x,
              color: "white",
              background: (overlay.type === "text") || (overlay.type === "emoji") ? "rgba(0,0,0,0.6)" : "transparent",
              padding: (overlay.type === "text") || (overlay.type === "emoji") ? "5px 10px" : "0px",
              borderRadius: "5px",
              // height: overlay.height,
              // width: overlay.width,
            }}
          >
            {(overlay.type === "text") || (overlay.type === "emoji") ? (
              <span style={{ fontWeight: "bold" }}>{overlay.content}</span>
            ) : overlay.type === "button" ? (
              <a
                href={overlay.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: "#FF003D",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  fontWeight: "600",
                  textDecoration: "none",
                  color: "white"
                }}
              >
                {overlay.content}
              </a>
            ) : null}
          </div>
        ))}

      {showPlayIcon && (
        <div style={{ position: "absolute", display: "flex", inset: 0, alignItems: "center", justifyContent: "center" }} className="absolute inset-0 flex items-center justify-center">
          <PlayCircle size={72} style={{ color: "white", background: "rgba(0,0,0,.5)", padding: 8, borderRadius: "100%" }} />
        </div>
      )}

      <div style={{ position: "absolute", top: 20, right: 8, display: "flex", flexDirection: "column", gap: 10 }}>
        <button
          onClick={handleShare}
          style={{ color: "white", background: "rgba(0,0,0,.5)", padding: 2, borderRadius: "100%", height: "48px", width: "48px", border: "none",display:"flex",alignItems:"center",justifyContent:'center' }}
        >
          <Share2 size={24} />
        </button>
        <button
          onClick={toggleMute}
          style={{ color: "white", background: "rgba(0,0,0,.5)", padding: 2, borderRadius: "100%", height: "48px", width: "48px", border: "none",display:"flex",alignItems:"center",justifyContent:'center' }}
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      </div>

      <div style={{ zIndex: 10, maxWidth: 400, width: "100%", padding: "10px", background: "transparent", color: "#fff" }} >
        <h2 style={{ fontWeight: "700", fontSize: "16px" }}>Lorem ipsum</h2>
        <p style={{ marginTop: "8px", marginBottom: "8px", fontWeight: "500", fontSize: "14px" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <button onClick={() => setIsOpen(!isOpen)} style={{ backgroundColor: "#FF003D", border: "none", width: "100%", padding: "10px 0px", height: "38px", borderRadius: "3px", fontWeight: 600, color: "#fff" }}>Learn more</button>
        {isOpen && <Drawer isOpen={isOpen} setIsOpen={setIsOpen} />}
      </div>
    </div>
  );
}
