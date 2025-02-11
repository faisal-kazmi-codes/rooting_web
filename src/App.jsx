
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import StoryViewer from './Components/Pages/StoryViewerPage';
import SubfeedMessage from "./Components/Pages/SubFeedPage";
import Reels from "./Components/Pages/VideoPage";
import Chat from "./Components/Chat";

 

export default function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Reels />} />
      <Route path="/story-viewer" element={<StoryViewer />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="*" element={<SubfeedMessage />} />
    </Routes>
  </Router>
  );
}