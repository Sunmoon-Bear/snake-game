import React, { useState, useEffect } from 'react';

function AchievementNotification({ achievement, onDismiss }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onDismiss, 300); // 等待淡出动画完成
    }, 3000);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className={`achievement-notification ${isVisible ? 'visible' : ''}`}>
      <div className="achievement-icon">{achievement.icon}</div>
      <div className="achievement-info">
        <h4>{achievement.title}</h4>
        <p>{achievement.description}</p>
      </div>
    </div>
  );
}

export default AchievementNotification; 