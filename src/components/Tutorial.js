import React, { useState } from 'react';

function Tutorial({ onComplete }) {
  const [step, setStep] = useState(0);
  
  const tutorialSteps = [
    {
      title: "欢迎来到贪吃蛇",
      content: "让我们快速了解一下游戏的基本操作",
      icon: "🎮"
    },
    {
      title: "移动控制",
      content: "使用方向键（↑↓←→）或WASD键控制蛇的移动方向",
      icon: "⌨️"
    },
    {
      title: "得分规则",
      content: "吃到食物（红色方块）可以增加分数，蛇的身体会变长",
      icon: "🎯"
    },
    {
      title: "游戏规则",
      content: "撞到墙壁或自己的身体会导致游戏结束",
      icon: "⚠️"
    },
    {
      title: "移动端控制",
      content: "在手机上可以使用屏幕下方的虚拟按键或滑动屏幕来控制方向",
      icon: "📱"
    }
  ];

  const currentStep = tutorialSteps[step];

  return (
    <div className="tutorial-overlay">
      <div className="tutorial-content">
        <div className="tutorial-icon">
          {currentStep.icon}
        </div>
        <h2>{currentStep.title}</h2>
        <p>{currentStep.content}</p>
        
        <div className="tutorial-controls">
          {step > 0 && (
            <button onClick={() => setStep(step - 1)}>
              上一步
            </button>
          )}
          
          {step < tutorialSteps.length - 1 ? (
            <button onClick={() => setStep(step + 1)}>
              下一步
            </button>
          ) : (
            <button onClick={onComplete}>
              开始游戏
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tutorial; 