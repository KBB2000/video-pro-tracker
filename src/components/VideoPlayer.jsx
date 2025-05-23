import { useRef, useState, useEffect } from 'react';
import '../App.css';

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const lastRecordedTime = useRef(-1);

  const [watchedIntervals, setWatchedIntervals] = useState([]);
  const [progress, setProgress] = useState(0);
  const [lastWatched, setLastWatched] = useState(0);
  const [isDark, setIsDark] = useState(false);

  // Load saved progress and theme from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('video-progress')) || {};
    if (saved.intervals) setWatchedIntervals(saved.intervals);
    if (saved.lastTime) setLastWatched(saved.lastTime);

    const savedTheme = localStorage.getItem('video-theme');
    if (savedTheme === 'dark') setIsDark(true);
  }, []);

  // Resume video from last watched position
  useEffect(() => {
    if (videoRef.current && lastWatched && lastWatched < videoRef.current.duration) {
      videoRef.current.currentTime = lastWatched;
    }
  }, [lastWatched]);

  // Save progress & update progress bar
  useEffect(() => {
    const video = videoRef.current;
    if (video && video.duration) {
      const newProgress = calculateProgress(watchedIntervals, video.duration);
      setProgress(newProgress);
      localStorage.setItem('video-progress', JSON.stringify({
        intervals: watchedIntervals,
        lastTime: video.currentTime,
      }));
    }
  }, [watchedIntervals]);

  // Save theme on toggle
  useEffect(() => {
    localStorage.setItem('video-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const currentTime = Math.floor(video.currentTime);
    if (currentTime === lastRecordedTime.current) return;

    lastRecordedTime.current = currentTime;

    // Check if current second already tracked
    if (!watchedIntervals.some(interval => currentTime >= interval.start && currentTime <= interval.end)) {
      const updated = mergeIntervals([...watchedIntervals, { start: currentTime, end: currentTime }]);
      setWatchedIntervals(updated);
    }
  };

  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <div className={`app ${isDark ? 'dark-mode' : 'light-mode'}`}>
      <h1>📘 Lecture Video</h1>
      <button onClick={toggleTheme} className="theme-toggle-btn">
        Switch to {isDark ? 'Light' : 'Dark'} Mode
      </button>
      <div className="video-container">
        <video
          ref={videoRef}
          controls
          onTimeUpdate={handleTimeUpdate}
          src="https://www.w3schools.com/html/mov_bbb.mp4"
        />
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          <span>{progress}% watched</span>
        </div>
      </div>
    </div>
  );
};

function mergeIntervals(intervals) {
  if (!intervals.length) return [];
  intervals.sort((a, b) => a.start - b.start);
  const merged = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    const current = intervals[i];

    if (current.start <= last.end + 1) {
      last.end = Math.max(last.end, current.end);
    } else {
      merged.push(current);
    }
  }
  return merged;
}

function calculateProgress(intervals, duration) {
  if (!duration) return 0;
  const merged = mergeIntervals(intervals);
  const watched = merged.reduce((sum, interval) => sum + (interval.end - interval.start + 1), 0);
  return Math.floor((watched / Math.floor(duration)) * 100);
}

export default VideoPlayer;
