import { useState, useEffect, useCallback } from 'react';
import { themes, DEFAULT_THEME, getTheme } from '../themes/themes';

const GRID_SIZE = 20;
const CANVAS_SIZE = 400;

// 初始蛇的位置
const initialSnake = [
    [8, 7],
    [8, 8],
    [8, 9]
];

// 生成随机食物位置
const generateFood = (snake) => {
    while (true) {
        const food = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE)
        };
        if (!snake.some(([x, y]) => x === food.x && y === food.y)) {
            return food;
        }
    }
};

export function useGameState() {
    const [snake, setSnake] = useState(initialSnake);
    const [food, setFood] = useState(() => generateFood(initialSnake));
    const [direction, setDirection] = useState('RIGHT');
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [difficulty, setDifficulty] = useState('NORMAL');
    const [currentTheme, setCurrentTheme] = useState('classic');
    const [highScores, setHighScores] = useState({
        EASY: 0,
        NORMAL: 0,
        HARD: 0
    });

    // 使用 useCallback 定义 resetGame 函数
    const resetGame = useCallback((newDifficulty = difficulty) => {
        setSnake(initialSnake);
        setFood(generateFood(initialSnake));
        setDirection('RIGHT');
        setGameOver(false);
        setScore(0);
        setDifficulty(newDifficulty);
        setIsPaused(false);
    }, [difficulty]);

    // 键盘控制
    useEffect(() => {
        const handleKeyPress = (e) => {
            switch (e.code) {
                case 'Space':
                    e.preventDefault();
                    if (gameOver) {
                        resetGame();
                    } else {
                        setIsPaused(prev => !prev);
                    }
                    break;
                case 'ArrowUp':
                case 'KeyW':
                    e.preventDefault();
                    if (!gameOver && direction !== 'DOWN') setDirection('UP');
                    break;
                case 'ArrowDown':
                case 'KeyS':
                    e.preventDefault();
                    if (!gameOver && direction !== 'UP') setDirection('DOWN');
                    break;
                case 'ArrowLeft':
                case 'KeyA':
                    e.preventDefault();
                    if (!gameOver && direction !== 'RIGHT') setDirection('LEFT');
                    break;
                case 'ArrowRight':
                case 'KeyD':
                    e.preventDefault();
                    if (!gameOver && direction !== 'LEFT') setDirection('RIGHT');
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [direction, gameOver, resetGame]);

    // 蛇的移动逻辑
    useEffect(() => {
        if (gameOver || isPaused) return;

        const moveSnake = () => {
            setSnake(prevSnake => {
                const head = [...prevSnake[0]];
                switch (direction) {
                    case 'UP':
                        head[1] -= 1;
                        break;
                    case 'DOWN':
                        head[1] += 1;
                        break;
                    case 'LEFT':
                        head[0] -= 1;
                        break;
                    case 'RIGHT':
                        head[0] += 1;
                        break;
                    default:
                        break;
                }

                if (head[0] === food.x && head[1] === food.y) {
                    setScore(prev => prev + 1);
                    setFood(generateFood([head, ...prevSnake]));
                    return [head, ...prevSnake];
                }

                if (
                    head[0] < 0 || head[0] >= GRID_SIZE ||
                    head[1] < 0 || head[1] >= GRID_SIZE ||
                    prevSnake.some(([x, y]) => x === head[0] && y === head[1])
                ) {
                    setGameOver(true);
                    return prevSnake;
                }

                return [head, ...prevSnake.slice(0, -1)];
            });
        };

        const gameSpeed = {
            EASY: 200,
            NORMAL: 150,
            HARD: 100
        }[difficulty];

        const gameLoop = setInterval(moveSnake, gameSpeed);
        return () => clearInterval(gameLoop);
    }, [direction, gameOver, isPaused, food, difficulty]);

    const theme = getTheme(currentTheme);

    const handleThemeChange = (newTheme) => {
        setCurrentTheme(newTheme);
        setIsPaused(false);
    };

    const handleDifficultyChange = (newDifficulty) => {
        setDifficulty(newDifficulty);
        resetGame(newDifficulty);
        setIsPaused(false);
    };

    return {
        snake,
        food,
        score,
        gameOver,
        isPaused,
        direction,
        difficulty,
        currentTheme,
        theme,
        resetGame,
        setIsPaused,
        setDifficulty,
        setCurrentTheme,
        highScores,
        GRID_SIZE,
        CANVAS_SIZE,
        handleThemeChange,
        handleDifficultyChange
    };
}