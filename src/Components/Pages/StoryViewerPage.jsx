import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Share, Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";

import image1 from "../../assets/Videos/story/image1.jpg";
import image2 from "../../assets/Videos/story/image2.jpg";
import image3 from "../../assets/Videos/story/image3.jpg";
import image4 from "../../assets/Videos/story/image4.jpg";
import image5 from "../../assets/Videos/story/image5.jpg";

import video2 from "../../assets/Videos/story/video2.mp4";
import video3 from "../../assets/Videos/story/video3.mp4";
import video4 from "../../assets/Videos/story/video5.mp4";
import Drawer from "../Drawer";

const stories = [
//   { id: 1, type: "video", src: video1 },
  { id: 2, type: "image", src: image1 },
  { id: 3, type: "image", src: image2 },
  { id: 5, type: "image", src: image3 },
  { id: 6, type: "video", src: video3 },
  { id: 7, type: "image", src: image4 },
  { id: 8, type: "video", src: video4 },
  { id: 9, type: "image", src: image5 },
  { id: 2, type: "image", src: image1 },
  { id: 3, type: "image", src: image2 },
  { id: 4, type: "video", src: video2 },
  { id: 5, type: "image", src: image3 },
  { id: 6, type: "video", src: video3 },
  { id: 7, type: "image", src: image4 },
  { id: 8, type: "video", src: video4 },
  { id: 9, type: "image", src: image5 },
];

export default function StoryViewer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const currentStory = stories[currentIndex];
  useEffect(() => {
    let interval;
    setProgress(0);

    if (currentStory.type === "image") {
      let duration = 5000; // 5 seconds for images
      let step = 100 / (duration / 100);

      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            nextStory();
            return 100;
          }
          return prev + step;
        });
      }, 100);
    } else if (currentStory.type === "video" && videoRef.current) {
      const video = videoRef.current;

      const handleMetadata = () => {
        setProgress(0);
        let duration = video.duration * 1000;
        let step = 100 / (duration / 100);

        interval = setInterval(() => {
          setProgress((video.currentTime / video.duration) * 100);
        }, 100);
      };

      const handleEnded = () => {
        clearInterval(interval);
        nextStory();
      };

      if (video.readyState >= 1) {
        handleMetadata();
      } else {
        video.onloadedmetadata = handleMetadata;
      }

      video.addEventListener("ended", handleEnded);

      return () => {
        clearInterval(interval);
        video.removeEventListener("ended", handleEnded);
      };
    }

    return () => clearInterval(interval);
  }, [currentIndex]);
  
  const nextStory = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="story-viewer">
      <div className="story-container">
      <div className="progress-bar-container">
      {stories.map((_, index) => (
        <div key={index} className="progress-bar">
          <div
            className={`progress-fill ${index === currentIndex ? "active" : ""}`}
            style={{ width: index === currentIndex ? `${progress}%` : "0%" }}
          ></div>
        </div>
      ))}
     </div>
        {currentStory.type === "image" ? (
          <img src={currentStory.src} alt="story" className="story-image" />
        ) : (
          <div className="video-wrapper" onClick={togglePlayPause}>
            <video
              ref={videoRef}
              src={currentStory.src}
              autoPlay
              // loop
              playsInline
              muted={isMuted}
              // onEnded={nextStory}
              className="story-video"
            />
            {!isPlaying && <Play className="video-play-icon" size={50} />}
          </div>
        )}

        {/* Mute Button */}
        {currentStory.type === "video" && (
          <button className="mute-button" onClick={toggleMute}>
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        )}

        {/* Share Button */}
        <button className="share-button" onClick={() => setIsShareOpen(true)}>
          <Share size={24} />
        </button>

        {/* Order Now Section */}
        <div className="order-now">
        <div>
          <h3 className="order-title">Lorem Ipsum</h3>
          <p style={{color:"grey"}}>Lorem ipsum dolor sit amet... </p>
          </div>
          <div >
          <button onClick={()=>setIsOpen(!isOpen)} style={{padding:"10px 10px",borderRadius:"50px",backgroundColor:"black",color:"white",border:0}}>Order Now →</button>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="nav-left-btn" onClick={prevStory}>
        </div>
        <div className="nav-right-btn" onClick={nextStory}>
        </div>
        <Drawer isOpen={isOpen} setIsOpen={setIsOpen}/>
      </div>

      {/* Share Modal */}
      {isShareOpen && (
        <div className="share-modal">
          <div className="share-content">
            <h2 className="share-title">Share this story</h2>
            <button className="share-option">Copy Link</button>
            <button className="share-option">Share to WhatsApp</button>
            <button className="share-close" onClick={() => setIsShareOpen(false)}>Close</button>
          </div>
        </div>
      )}
      
    </div>
  );
}
