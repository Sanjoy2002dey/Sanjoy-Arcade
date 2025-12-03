import React, { useState, useEffect, useCallback, useRef } from 'react';
import { RotateCw, Trophy, Home, Sparkles, Swords, X, Circle, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';


const GameHeader = ({ title, onBack, rightContent }) => (
    <div className="w-full max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 mb-6 sm:mb-8 bg-gray-800 p-3 sm:p-4 rounded-xl shadow-lg shadow-gray-900/50">
            <button
                onClick={onBack}
                className="bg-white/10 hover:bg-white/20 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 transition-all font-semibold text-sm sm:text-base w-full sm:w-auto justify-center"
            >
                <Home size={18} className="sm:w-5 sm:h-5" /> Back to Hub
            </button>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-wide text-center">{title}</h1>
            <div className="min-w-[100px] flex justify-end w-full sm:w-auto">{rightContent}</div>
        </div>
    </div>
);

const GameCard = ({ title, emoji, description, accentColor, onClick }) => (
    <button
        onClick={onClick}
        className={`
            bg-gray-800 p-8 rounded-xl shadow-2xl shadow-gray-900/50
            transform hover:scale-[1.03] transition-all duration-300 
            cursor-pointer 
            border-b-4 border-transparent hover:border-teal-400
            flex flex-col items-start text-left
        `}
    >
        <div className={`text-6xl mb-3 ${accentColor}`}>{emoji}</div>
        <h2 className="text-2xl font-bold text-white mb-2 tracking-wide">{title}</h2>
        <p className="text-gray-400">{description}</p>
        <div className="mt-4 text-sm font-semibold text-teal-400 flex items-center gap-1">
            Launch Game <Sparkles size={16} />
        </div>
    </button>
);


const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6], 
    ];
    for (const [a, b, c] of lines) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a], line: lines[lines.findIndex(l => l[0] === a && l[1] === b && l[2] === c)] };
        }
    }
    return null;
};


//  Tic-Tac-Toe Game Component
 
const TicTacToe = ({ onBack }) => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [gameStatus, setGameStatus] = useState('playing'); 

    useEffect(() => {
        const result = calculateWinner(board);
        if (result) {
            setGameStatus(result.winner === 'X' ? 'X_won' : 'O_won');
        } else if (board.every(cell => cell !== null)) {
            setGameStatus('draw');
        } else {
            setGameStatus('playing');
        }
    }, [board]);

    const handleSquareClick = (i) => {
        if (gameStatus !== 'playing' || board[i]) return;
        const newBoard = board.slice();
        newBoard[i] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setGameStatus('playing');
    };

    const result = calculateWinner(board);
    const winner = result ? result.winner : null;
    const winningLine = result ? result.line : [];
    
    const getStatusText = () => {
        if (winner) {
            return winner === 'X' ? (<span className="text-teal-400 flex items-center justify-center gap-2"><Trophy size={24} /> X Wins!</span>) : (<span className="text-pink-400 flex items-center justify-center gap-2"><Trophy size={24} /> O Wins!</span>);
        } else if (gameStatus === 'draw') {
            return <span className="text-yellow-400">It's a Draw! 🤝</span>;
        } else {
            return isXNext ? (<span className="text-teal-400">Next Player: X</span>) : (<span className="text-pink-400">Next Player: O</span>);
        }
    };

    const Square = ({ value, onClick, isWinning }) => {
        const playerColor = value === 'X' ? 'text-teal-400' : 'text-pink-400';
        const winningStyle = isWinning ? 'bg-teal-900/50 border-teal-400' : 'bg-gray-700 hover:bg-gray-600 border-gray-600';
    
        return (
            <button
                onClick={onClick}
                className={`
                    aspect-square rounded-lg flex items-center justify-center text-7xl font-extrabold 
                    transition-all duration-200 shadow-xl border-4 
                    ${winningStyle}
                `}
                disabled={!!value}
            >
                {value === 'X' ? <X className={`w-16 h-16 ${playerColor}`} /> : value === 'O' ? <Circle className={`w-16 h-16 ${playerColor}`} /> : ''}
            </button>
        );
    };

    return (
        <div className="min-h-screen bg-gray-950 p-8 text-white flex flex-col items-center">
            <GameHeader
                title="Tic-Tac-Toe Showdown"
                onBack={onBack}
                rightContent={
                    <button
                        onClick={resetGame}
                        className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all font-semibold"
                    >
                        <RotateCw size={20} /> Reset
                    </button>
                }
            />
            <div className="max-w-xl mx-auto w-full">
                <div className="text-center mb-6 bg-gray-800 p-4 rounded-xl shadow-xl">
                    <div className="text-2xl font-bold">{getStatusText()}</div>
                </div>

                <div className="grid grid-cols-3 gap-3 p-6 bg-gray-900 rounded-2xl shadow-3xl shadow-teal-800/40 w-full aspect-square">
                    {board.map((value, i) => (
                        <Square
                            key={i}
                            value={value}
                            onClick={() => handleSquareClick(i)}
                            isWinning={winningLine.includes(i)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};


// Snake Game Component
 
const SnakeGame = ({ onBack }) => {
    const BOARD_SIZE = 15;
    const INITIAL_SNAKE = [{ x: 7, y: 7 }];
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [food, setFood] = useState({ x: 3, y: 3 });
    const [direction, setDirection] = useState({ x: 1, y: 0 }); 
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    
    const directionRef = useRef(direction);
    directionRef.current = direction; 

    const generateFood = useCallback((currentSnake) => {
        let newFood;
        do {
            newFood = {
                x: Math.floor(Math.random() * BOARD_SIZE),
                y: Math.floor(Math.random() * BOARD_SIZE)
            };
        } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
        setFood(newFood);
    }, []);

    const moveSnake = useCallback(() => {
        if (isGameOver) return;

        const newSnake = [...snake];
        const head = newSnake[0];
        const newHead = { 
            x: head.x + directionRef.current.x, 
            y: head.y + directionRef.current.y 
        };

        if (newHead.x < 0 || newHead.x >= BOARD_SIZE ||
            newHead.y < 0 || newHead.y >= BOARD_SIZE ||
            newSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
            setIsGameOver(true);
            return;
        }

        newSnake.unshift(newHead);

        
        if (newHead.x === food.x && newHead.y === food.y) {
            setScore(prevScore => prevScore + 10);
            generateFood(newSnake);
        } else {
            newSnake.pop(); 
        }

        setSnake(newSnake);

    }, [snake, food, isGameOver, generateFood]);


   
    useEffect(() => {
        const interval = setInterval(moveSnake, 200); 
        return () => clearInterval(interval);
    }, [moveSnake]);
    
    
    const changeDirection = useCallback((newDirection) => {
        if (newDirection.x * -1 === direction.x && newDirection.y * -1 === direction.y) return;
        setDirection(newDirection);
    }, [direction]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isGameOver) return;
            switch (e.key) {
                case 'ArrowUp':
                case 'w':
                    changeDirection({ x: 0, y: -1 });
                    break;
                case 'ArrowDown':
                case 's':
                    changeDirection({ x: 0, y: 1 });
                    break;
                case 'ArrowLeft':
                case 'a':
                    changeDirection({ x: -1, y: 0 });
                    break;
                case 'ArrowRight':
                case 'd':
                    changeDirection({ x: 1, y: 0 });
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isGameOver, changeDirection]);

    const resetGame = () => {
        setSnake(INITIAL_SNAKE);
        setDirection({ x: 1, y: 0 });
        setScore(0);
        setIsGameOver(false);
        generateFood(INITIAL_SNAKE);
    };

    const getCellClass = (x, y) => {
        if (snake.some(segment => segment.x === x && segment.y === y)) {
            return 'bg-green-500 shadow-lg border-2 border-green-800'; 
        }
        if (food.x === x && food.y === y) {
            return 'bg-red-500 rounded-full shadow-lg animate-pulse'; 
        }
        return 'bg-gray-800/50'; 
    };


    return (
        <div className="min-h-screen bg-gray-950 p-8 text-white flex flex-col items-center">
            <GameHeader
                title="Snake Challenge"
                onBack={onBack}
                rightContent={
                    <button
                        onClick={resetGame}
                        className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all font-semibold"
                    >
                        <RotateCw size={20} /> Reset
                    </button>
                }
            />
            <div className="max-w-xl mx-auto w-full">
                <div className="text-center mb-6 bg-gray-800 p-4 rounded-xl shadow-xl">
                    <div className="text-2xl font-bold text-teal-400">Score: {score}</div>
                </div>

                
                <div 
                    className="grid bg-gray-900 rounded-2xl shadow-3xl shadow-purple-800/40 p-2 border-4 border-gray-700 mx-auto"
                    style={{
                        gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
                        gridTemplateRows: `repeat(${BOARD_SIZE}, 1fr)`,
                        width: '500px', 
                        height: '500px'
                    }}
                >
                    {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, index) => {
                        const x = index % BOARD_SIZE;
                        const y = Math.floor(index / BOARD_SIZE);
                        return (
                            <div 
                                key={index} 
                                className={`
                                    w-full h-full 
                                    ${getCellClass(x, y)} 
                                    transition-colors duration-50
                                `} 
                            />
                        );
                    })}
                </div>

                {isGameOver && (
                    <div className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center">
                         <div className="bg-red-900/80 backdrop-blur-lg p-12 rounded-2xl shadow-2xl border-4 border-red-500 text-center">
                            <h2 className="text-4xl font-bold text-white mb-4">Game Over! 😭</h2>
                            <p className="text-white text-2xl mb-6">Final Score: {score}</p>
                            <button
                                onClick={resetGame}
                                className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all"
                            >
                                Play Again
                            </button>
                        </div>
                    </div>
                )}
                
                <div className="mt-8 text-center text-gray-400 text-lg">
                    Use Arrow Keys or WASD to control the snake.
                </div>
                <div className="mt-4 grid grid-cols-3 w-48 mx-auto gap-2">
                     <div className="col-span-1"></div>
                     <button className="bg-gray-700 p-2 rounded-lg hover:bg-gray-600" onClick={() => changeDirection({ x: 0, y: -1 })}><ChevronUp /></button>
                     <div className="col-span-1"></div>
                     
                     <button className="bg-gray-700 p-2 rounded-lg hover:bg-gray-600" onClick={() => changeDirection({ x: -1, y: 0 })}><ChevronLeft /></button>
                     <button className="bg-gray-700 p-2 rounded-lg hover:bg-gray-600" onClick={() => changeDirection({ x: 0, y: 1 })}><ChevronDown /></button>
                     <button className="bg-gray-700 p-2 rounded-lg hover:bg-gray-600" onClick={() => changeDirection({ x: 1, y: 0 })}><ChevronRight /></button>
                </div>
            </div>
        </div>
    );
};


 // Memory Game Component

const MemoryGame = ({ onBack }) => {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [moves, setMoves] = useState(0);

    const emojis = ['🎮', '🎯', '🎲', '🎪', '🎨', '🎭', '🎬', '🎸'];

    useEffect(() => { initGame(); }, []);

    const initGame = () => {
        const shuffled = [...emojis, ...emojis]
            .sort(() => Math.random() - 0.5)
            .map((emoji, i) => ({ id: i, emoji }));
        setCards(shuffled);
        setFlipped([]); setMatched([]); setMoves(0);
    };

    const handleCardClick = (id) => {
        if (flipped.length === 2 || flipped.includes(id) || matched.includes(id)) return;
        const newFlipped = [...flipped, id];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(moves + 1);
            const [first, second] = newFlipped;
            if (cards[first].emoji === cards[second].emoji) {
                setMatched([...matched, first, second]);
                setFlipped([]);
            } else {
                setTimeout(() => setFlipped([]), 1000);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 p-8 text-white flex flex-col items-center">
            <GameHeader
                title="Memory Match"
                onBack={onBack}
                rightContent={
                    <button onClick={initGame} className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all font-semibold">
                        <RotateCw size={20} /> Reset
                    </button>
                }
            />
            <div className="max-w-4xl mx-auto w-full">
                <div className="text-center mb-6 bg-gray-800 p-4 rounded-xl shadow-xl">
                    <div className="text-2xl font-bold text-yellow-400">Moves: {moves}</div>
                </div>
                <div className="grid grid-cols-4 gap-4 p-6 bg-gray-800 rounded-xl shadow-3xl shadow-purple-900/40">
                    {cards.map((card) => (
                        <button
                            key={card.id}
                            onClick={() => handleCardClick(card.id)}
                            className={`
                                aspect-square rounded-xl text-4xl font-bold transition-all duration-300 transform 
                                shadow-lg border-4 border-transparent
                                ${
                                    flipped.includes(card.id) || matched.includes(card.id)
                                        ? matched.includes(card.id) 
                                            ? 'bg-green-700/80 text-white shadow-green-900/50' 
                                            : 'bg-gray-200 text-gray-800' 
                                        : 'bg-gray-700 hover:bg-gray-600 text-white/50 hover:scale-105 border-purple-500/50'
                                }
                            `}
                        >
                            {flipped.includes(card.id) || matched.includes(card.id) ? card.emoji : '?'}
                        </button>
                    ))}
                </div>

                {matched.length === cards.length && (
                    <div className="mt-8 text-center bg-teal-600/80 backdrop-blur-lg p-8 rounded-xl shadow-2xl">
                        <Trophy className="w-16 h-16 text-yellow-300 mx-auto mb-4" />
                        <h2 className="text-3xl font-bold text-white mb-2">Victory! 🎉</h2>
                        <p className="text-white text-xl">Completed in {moves} optimal moves.</p>
                    </div>
                )}
            </div>
        </div>
    );
};


  // 2048 Game Component
 
const Game2048 = ({ onBack }) => {
    const [board, setBoard] = useState([]);
    const [gameScore, setGameScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => { initBoard(); }, []);

    const initBoard = () => {
        const newBoard = Array(4).fill(null).map(() => Array(4).fill(0));
        const addRandomTile = (currentBoard) => {
            const empty = [];
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    if (currentBoard[i][j] === 0) empty.push({ i, j });
                }
            }
            if (empty.length > 0) {
                const { i, j } = empty[Math.floor(Math.random() * empty.length)];
                currentBoard[i][j] = Math.random() < 0.9 ? 2 : 4;
            }
        };
        addRandomTile(newBoard);
        addRandomTile(newBoard);
        setBoard(newBoard);
        setGameScore(0);
        setGameOver(false);
    };

    
    const move = (direction) => {
        let newBoard = board.map(row => [...row]);
        let moved = false;
        let points = 0;

        const moveLeft = () => {
            for (let i = 0; i < 4; i++) {
                let row = newBoard[i].filter(x => x !== 0);
                for (let j = 0; j < row.length - 1; j++) {
                    if (row[j] === row[j + 1]) {
                        row[j] *= 2;
                        points += row[j];
                        row.splice(j + 1, 1);
                        moved = true;
                    }
                }
                while (row.length < 4) row.push(0);
                if (JSON.stringify(row) !== JSON.stringify(newBoard[i])) moved = true;
                newBoard[i] = row;
            }
        };

        const rotate = () => { newBoard = newBoard[0].map((_, i) => newBoard.map(row => row[i]).reverse()); };
        
        const checkGameOver = (currentBoard) => {
             for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    if (currentBoard[i][j] === 0) return;
                    if (j < 3 && currentBoard[i][j] === currentBoard[i][j + 1]) return;
                    if (i < 3 && currentBoard[i][j] === currentBoard[i + 1][j]) return;
                }
            }
            setGameOver(true);
        };

        if (direction === 'ArrowLeft') moveLeft();
        else if (direction === 'ArrowRight') { rotate(); rotate(); moveLeft(); rotate(); rotate(); }
        else if (direction === 'ArrowUp') { rotate(); rotate(); rotate(); moveLeft(); rotate(); }
        else if (direction === 'ArrowDown') { rotate(); moveLeft(); rotate(); rotate(); rotate(); }

        if (moved) {
            const addRandomTile = (currentBoard) => {
                const empty = [];
                for (let i = 0; i < 4; i++) {
                    for (let j = 0; j < 4; j++) {
                        if (currentBoard[i][j] === 0) empty.push({ i, j });
                    }
                }
                if (empty.length > 0) {
                    const { i, j } = empty[Math.floor(Math.random() * empty.length)];
                    currentBoard[i][j] = Math.random() < 0.9 ? 2 : 4;
                }
            };
            const oldBoardString = JSON.stringify(board);
            addRandomTile(newBoard);
            if (JSON.stringify(newBoard) !== oldBoardString) {
                setBoard(newBoard);
                setGameScore(gameScore + points);
                checkGameOver(newBoard);
            }
        }
    };

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (gameOver) return;
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
                move(e.key);
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [board, gameOver]);

    const getTileColor = (value) => {
        const colors = {
            0: 'bg-gray-700/50', 2: 'bg-[#f4f3e6] text-gray-900', 4: 'bg-[#ede0c8] text-gray-900',
            8: 'bg-[#f2b179]', 16: 'bg-[#f59563]', 32: 'bg-[#f67c5f]',
            64: 'bg-[#f65e3e]', 128: 'bg-[#edcf72]', 256: 'bg-[#edcc61]',
            512: 'bg-[#edc850]', 1024: 'bg-[#edc53f]', 2048: 'bg-[#edc22e]', 
        };
        return colors[value] || 'bg-black text-white';
    };

    return (
        <div className="min-h-screen bg-gray-950 p-8 text-white flex flex-col items-center">
            <GameHeader
                title="2048 Challenge"
                onBack={onBack}
                rightContent={
                    <button onClick={initBoard} className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all font-semibold">
                        <RotateCw size={20} /> Reset
                    </button>
                }
            />
            <div className="max-w-2xl mx-auto w-full">
                <div className="text-center mb-6 bg-gray-800 p-4 rounded-xl shadow-xl">
                    <div className="text-2xl font-bold text-pink-400">Score: {gameScore}</div>
                </div>

                <div className="bg-gray-900 p-4 rounded-2xl shadow-3xl shadow-pink-800/40">
                    <div className="grid grid-cols-4 gap-4">
                        {board.map((row, i) =>
                            row.map((cell, j) => (
                                <div
                                    key={`${i}-${j}`}
                                    className={`
                                        aspect-square ${getTileColor(cell)} rounded-xl 
                                        flex items-center justify-center 
                                        text-3xl font-extrabold 
                                        ${cell > 4 ? 'text-white' : 'text-gray-900'}
                                        transition-transform duration-100 ease-out shadow-inner
                                    `}
                                >
                                    {cell > 0 ? cell : ''}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="mt-6 text-center text-gray-400 text-lg">Use arrow keys to slide tiles.</div>

                {gameOver && (
                    <div className="mt-8 text-center bg-red-900/50 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border-4 border-red-500">
                        <h2 className="text-3xl font-bold text-white mb-2">Game Over! 😢</h2>
                        <p className="text-white text-xl">Final Score: {gameScore}</p>
                    </div>
                )}
            </div>
        </div>
    );
};


 // Simon Says Game Component
 
const SimonGame = ({ onBack }) => {
    const [sequence, setSequence] = useState([]);
    const [userSeq, setUserSeq] = useState([]);
    const [playing, setPlaying] = useState(false);
    const [active, setActive] = useState(null);
    const [level, setLevel] = useState(0);
    const [gameState, setGameState] = useState('start');

    const colors = ['red', 'green', 'blue', 'yellow'];
    const colorClasses = {
        red: 'bg-red-600', green: 'bg-green-600', blue: 'bg-blue-600', yellow: 'bg-yellow-400'
    };
    const activeClasses = {
        red: 'shadow-red-500/80 ring-4 ring-red-300', green: 'shadow-green-500/80 ring-4 ring-green-300',
        blue: 'shadow-blue-500/80 ring-4 ring-blue-300', yellow: 'shadow-yellow-300/80 ring-4 ring-yellow-200'
    };

    const startGame = () => {
        setSequence([]); setUserSeq([]); setLevel(0); setGameState('playing');
        nextRound([]);
    };

    const nextRound = (currentSeq) => {
        const newColor = colors[Math.floor(Math.random() * 4)];
        const newSeq = [...currentSeq, newColor];
        setSequence(newSeq);
        setLevel(newSeq.length);
        playSequence(newSeq);
    };

    const playSequence = async (seq) => {
        setPlaying(true);
        for (let color of seq) {
            await new Promise(resolve => setTimeout(resolve, 600));
            setActive(color);
            await new Promise(resolve => setTimeout(resolve, 400));
            setActive(null);
        }
        setPlaying(false);
    };

    const handleColorClick = (color) => {
        if (playing || gameState !== 'playing') return;

        const newUserSeq = [...userSeq, color];
        setUserSeq(newUserSeq);
        setActive(color);
        setTimeout(() => setActive(null), 300);

        if (newUserSeq[newUserSeq.length - 1] !== sequence[newUserSeq.length - 1]) {
            setGameState('lost');
            return;
        }

        if (newUserSeq.length === sequence.length) {
            setUserSeq([]);
            setTimeout(() => nextRound(sequence), 1000);
        }
    };

    const StatusDisplay = () => {
        if (gameState === 'playing' && playing) return <p className="text-xl font-bold text-teal-400">Simon is thinking...</p>;
        if (gameState === 'playing' && !playing) return <p className="text-xl font-bold text-pink-400">Your Turn!</p>;
        if (gameState === 'lost') return <p className="text-xl font-bold text-red-400">Sequence Broken!</p>;
        return <p className="text-xl font-bold text-gray-400">Ready to start?</p>;
    }
    
    return (
        <div className="min-h-screen bg-gray-950 p-8 text-white flex flex-col items-center">
            <GameHeader
                title="Simon Says"
                onBack={onBack}
                rightContent={
                    <button onClick={startGame} className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all font-semibold">
                        <Sparkles size={20} /> Reset
                    </button>
                }
            />
            <div className="max-w-xl w-full mx-auto mt-6">
                <div className="text-center mb-6 bg-gray-800 p-4 rounded-xl shadow-xl">
                    <StatusDisplay />
                    <p className="text-3xl font-extrabold text-yellow-400 mt-2">Level: {level}</p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8 p-8 bg-gray-800 rounded-2xl shadow-3xl shadow-green-800/40">
                    {colors.map(color => (
                        <button
                            key={color}
                            onClick={() => handleColorClick(color)}
                            disabled={playing || gameState !== 'playing'}
                            className={`
                                aspect-square rounded-3xl ${colorClasses[color]} 
                                ${active === color ? `opacity-100 scale-105 shadow-xl ${activeClasses[color]}` : 'opacity-70'}
                                transition-all duration-200 shadow-2xl disabled:cursor-not-allowed disabled:opacity-50
                            `}
                        />
                    ))}
                </div>

                {(gameState === 'start' || gameState === 'lost') && (
                    <div className="mt-8 text-center bg-gray-700/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl">
                        <h2 className="text-3xl font-bold text-white mb-2">{gameState === 'lost' ? "Sequence Lost!" : "Simon Says"}</h2>
                        <p className="text-white text-xl mb-4">{gameState === 'lost' ? `Reached Level: ${level}` : "Watch the pattern and repeat it."}</p>
                        <button
                            onClick={startGame}
                            className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-xl hover:bg-green-500 transition-all"
                        >
                            {gameState === 'start' ? 'Start Challenge' : 'Try Again'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const RPSGame = ({ onBack }) => {
    const choices = [
        { name: 'Rock', emoji: '✊', beats: 'Scissors' },
        { name: 'Paper', emoji: '✋', beats: 'Rock' },
        { name: 'Scissors', emoji: '✌️', beats: 'Paper' }
    ];

    const [playerChoice, setPlayerChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [result, setResult] = useState('Select your move'); 
    const [score, setScore] = useState({ wins: 0, losses: 0, draws: 0 });
    const [isProcessing, setIsProcessing] = useState(false);

    const determineWinner = useCallback((player, computer) => {
        if (!player || !computer) return 'draw';
        if (player.name === computer.name) return 'draw';
        if (player.beats === computer.name) return 'win';
        return 'lose';
    }, []);

    const playGame = (choiceName) => {
        if (isProcessing) return;

        setIsProcessing(true);
        setPlayerChoice(null);
        setComputerChoice(null);
        setResult('Shuffling...');

        const player = choices.find(c => c.name === choiceName);
        const computer = choices[Math.floor(Math.random() * choices.length)];

        // Use a slight delay function to make suspense
        setTimeout(() => {
            setPlayerChoice(player);
            setComputerChoice(computer);
            
            const gameResult = determineWinner(player, computer);

            let newResultText;
            let newScore = { ...score };
            
            if (gameResult === 'win') {
                newResultText = 'You Win! 🎉';
                newScore.wins += 1;
            } else if (gameResult === 'lose') {
                newResultText = 'You Lose! 😔';
                newScore.losses += 1;
            } else {
                newResultText = "It's a Draw! 🤝";
                newScore.draws += 1;
            }

            setResult(newResultText);
            setScore(newScore);
            setIsProcessing(false);
        }, 1200);
    };
    
    const resetScore = () => {
        setScore({ wins: 0, losses: 0, draws: 0 });
        setPlayerChoice(null);
        setComputerChoice(null);
        setResult('Select your move');
    }

    const getResultColor = () => {
        if (result.includes('Win')) return 'text-green-400';
        if (result.includes('Lose')) return 'text-red-400';
        if (result.includes('Draw')) return 'text-yellow-400';
        return 'text-white';
    };

    return (
        <div className="min-h-screen bg-gray-950 p-8 text-white flex flex-col items-center">
            <GameHeader
                title="Rock, Paper, Scissors"
                onBack={onBack}
                rightContent={
                    <button onClick={resetScore} className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all font-semibold">
                        <RotateCw size={20} /> Reset Score
                    </button>
                }
            />
            <div className="max-w-2xl mx-auto w-full">
                <div className="text-center mb-6 bg-gray-800 p-4 rounded-xl shadow-xl">
                    <h2 className={`text-3xl font-bold ${getResultColor()} transition-colors duration-500`}>
                        {result}
                    </h2>
                </div>
                
                <div className="flex justify-between items-center text-center bg-gray-800 p-6 rounded-xl shadow-xl mb-12">
                    <div className="flex flex-col items-center">
                        <p className="text-xl font-semibold mb-2 text-teal-400">You</p>
                        <div className="text-8xl w-32 h-32 flex items-center justify-center bg-gray-700 rounded-lg shadow-inner">
                            {playerChoice ? playerChoice.emoji : '?'}
                        </div>
                    </div>
                    <p className="text-5xl font-extrabold text-gray-500 mx-8">VS</p>
                    <div className="flex flex-col items-center">
                        <p className="text-xl font-semibold mb-2 text-red-400">AI</p>
                        <div className="text-8xl w-32 h-32 flex items-center justify-center bg-gray-700 rounded-lg shadow-inner">
                            {computerChoice ? computerChoice.emoji : '?'}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    {choices.map(choice => (
                        <button
                            key={choice.name}
                            onClick={() => playGame(choice.name)}
                            disabled={isProcessing}
                            className={`
                                bg-gray-700 p-6 rounded-xl shadow-2xl text-center 
                                transform hover:scale-105 transition-all duration-300
                                disabled:opacity-50 disabled:cursor-wait
                                ${playerChoice?.name === choice.name ? 'border-4 border-teal-400' : 'border-4 border-gray-700'}
                            `}
                        >
                            <div className="text-5xl mb-2">{choice.emoji}</div>
                            <span className="text-lg font-bold text-white">{choice.name}</span>
                        </button>
                    ))}
                </div>
                
                <div className="mt-12 bg-gray-800 p-4 rounded-xl shadow-xl flex justify-around font-semibold text-xl">
                    <span className="text-green-400">Wins: {score.wins}</span>
                    <span className="text-red-400">Losses: {score.losses}</span>
                    <span className="text-yellow-400">Draws: {score.draws}</span>
                </div>
            </div>
        </div>
    );
};



const PuzzleGameCollection = () => {
    const [currentGame, setCurrentGame] = useState('menu');

    
     // The main menu screen where all games are present
     
    const GameMenu = () => (
        <div className="min-h-screen bg-gray-950 p-8 text-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-6xl font-extrabold text-white mb-4 tracking-tighter drop-shadow-lg">
                        <Swords className="inline w-10 h-10 text-teal-400 mr-2" /> Sanjoy Arcade
                    </h1>
                    <p className="text-xl text-gray-400"> Old-school challenges, new-age elegance...</p>
                </div>

                <div className="grid md:grid-cols-4 gap-8">
                    <GameCard
                        title="Snake"
                        emoji="🐍"
                        description="Classic retro challenge: eat and grow, but don't crash!"
                        accentColor="text-purple-400"
                        onClick={() => setCurrentGame('snake')}
                    />
                    <GameCard
                        title="Tic-Tac-Toe"
                        emoji="⚔️"
                        description="Classic 3-in-a-row strategy game."
                        accentColor="text-teal-400"
                        onClick={() => setCurrentGame('tictactoe')}
                    />
                    <GameCard
                        title="Memory Match"
                        emoji="🧠"
                        description="Test your cognitive memory with matching pairs."
                        accentColor="text-cyan-400"
                        onClick={() => setCurrentGame('memory')}
                    />
                    <GameCard
                        title="2048"
                        emoji="🔢"
                        description="Combine numbered tiles strategically to reach 2048."
                        accentColor="text-orange-400"
                        onClick={() => setCurrentGame('2048')}
                    />
                    <GameCard
                        title="Simon Says"
                        emoji="🎵"
                        description="Recall and repeat the increasing color sequence."
                        accentColor="text-green-400"
                        onClick={() => setCurrentGame('simon')}
                    />
                    <GameCard
                        title="Rock Paper Scissors"
                        emoji="✊✋✌️"
                        description="Fast rounds vs AI — best of luck!"
                        accentColor="text-indigo-400"
                        onClick={() => setCurrentGame('rps')}
                    />

                </div>
            </div>
        </div>
    );


   
    // Controls which game component is currently displayed based on the currentGame state.
    return (
        <div className="font-sans">
            {currentGame === 'menu' && <GameMenu />}
            {currentGame === 'snake' && <SnakeGame onBack={() => setCurrentGame('menu')} />}
            {currentGame === 'tictactoe' && <TicTacToe onBack={() => setCurrentGame('menu')} />}
            {currentGame === 'memory' && <MemoryGame onBack={() => setCurrentGame('menu')} />}
            {currentGame === '2048' && <Game2048 onBack={() => setCurrentGame('menu')} />}
            {currentGame === 'simon' && <SimonGame onBack={() => setCurrentGame('menu')} />}
            {currentGame === 'rps' && <RPSGame onBack={() => setCurrentGame('menu')} />}

        </div>
    );
};

export default PuzzleGameCollection;