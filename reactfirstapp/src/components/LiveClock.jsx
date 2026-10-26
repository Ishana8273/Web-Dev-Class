import { useEffect, useState } from "react";

function LiveClock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => window.clearInterval(timerId);
  }, []);

  const dateText = currentTime.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const timeText = currentTime.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="live-clock" aria-label={`Current time: ${dateText}, ${timeText}`}>
      <div className="clock-icon" aria-hidden="true">
        <span />
      </div>
      <div>
        <p className="clock-label">Today</p>
        <p className="clock-date">{dateText}</p>
      </div>
      <time className="clock-time" dateTime={currentTime.toISOString()}>
        {timeText}
      </time>
    </div>
  );
}

export default LiveClock;