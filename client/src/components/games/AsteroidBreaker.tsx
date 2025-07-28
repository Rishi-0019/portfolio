import { useEffect, useRef, useState, useCallback } from "react";

interface AsteroidBreakerProps {
  onGameComplete: (score: number) => void;
}

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

interface Asteroid extends GameObject {
  dx: number;
  dy: number;
  size: number;
}

interface Gem extends GameObject {
  collected: boolean;
  sparkle: number;
}

export default function AsteroidBreaker({ onGameComplete }: AsteroidBreakerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number>();
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(1);

  const gameStateRef = useRef({
    player: { x: 100, y: 250, width: 30, height: 30, color: '#00bfff' },
    asteroids: [] as Asteroid[],
    gems: [] as Gem[],
    keys: { left: false, right: false, up: false, down: false },
    playerSpeed: 4,
    gemsCollected: 0,
    gemsNeeded: 5
  });

  const createAsteroid = (x: number, y: number, size: number): Asteroid => ({
    x,
    y,
    width: size,
    height: size,
    color: '#8b5a3c',
    dx: (Math.random() - 0.5) * 3,
    dy: (Math.random() - 0.5) * 3,
    size
  });

  const createGem = (x: number, y: number): Gem => ({
    x,
    y,
    width: 15,
    height: 15,
    color: '#ffd700',
    collected: false,
    sparkle: Math.random() * Math.PI * 2
  });

  const initializeLevel = useCallback(() => {
    const asteroids: Asteroid[] = [];
    const gems: Gem[] = [];
    
    // Create asteroids
    for (let i = 0; i < 8 + level * 2; i++) {
      let x, y;
      do {
        x = Math.random() * 700;
        y = Math.random() * 500;
      } while (Math.sqrt((x - 100) ** 2 + (y - 250) ** 2) < 100); // Keep away from player start
      
      asteroids.push(createAsteroid(x, y, 30 + Math.random() * 40));
    }

    // Create gems
    for (let i = 0; i < gameStateRef.current.gemsNeeded; i++) {
      let x, y;
      do {
        x = Math.random() * 750;
        y = Math.random() * 550;
      } while (Math.sqrt((x - 100) ** 2 + (y - 250) ** 2) < 80);
      
      gems.push(createGem(x, y));
    }

    gameStateRef.current.asteroids = asteroids;
    gameStateRef.current.gems = gems;
    gameStateRef.current.gemsCollected = 0;
  }, [level]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const keys = gameStateRef.current.keys;
    switch (e.code) {
      case 'ArrowLeft':
      case 'KeyA':
        keys.left = true;
        break;
      case 'ArrowRight':
      case 'KeyD':
        keys.right = true;
        break;
      case 'ArrowUp':
      case 'KeyW':
        keys.up = true;
        break;
      case 'ArrowDown':
      case 'KeyS':
        keys.down = true;
        break;
    }
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const keys = gameStateRef.current.keys;
    switch (e.code) {
      case 'ArrowLeft':
      case 'KeyA':
        keys.left = false;
        break;
      case 'ArrowRight':
      case 'KeyD':
        keys.right = false;
        break;
      case 'ArrowUp':
      case 'KeyW':
        keys.up = false;
        break;
      case 'ArrowDown':
      case 'KeyS':
        keys.down = false;
        break;
    }
  }, []);

  const checkCollision = (rect1: GameObject, rect2: GameObject) => {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
  };

  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || gameOver) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gameState = gameStateRef.current;

    // Clear canvas with space background
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw stars
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 50; i++) {
      const x = (i * 137) % canvas.width;
      const y = (i * 73) % canvas.height;
      ctx.fillRect(x, y, 1, 1);
    }

    // Update player
    if (gameState.keys.left && gameState.player.x > 0) {
      gameState.player.x -= gameState.playerSpeed;
    }
    if (gameState.keys.right && gameState.player.x < canvas.width - gameState.player.width) {
      gameState.player.x += gameState.playerSpeed;
    }
    if (gameState.keys.up && gameState.player.y > 0) {
      gameState.player.y -= gameState.playerSpeed;
    }
    if (gameState.keys.down && gameState.player.y < canvas.height - gameState.player.height) {
      gameState.player.y += gameState.playerSpeed;
    }

    // Update asteroids
    gameState.asteroids.forEach(asteroid => {
      asteroid.x += asteroid.dx;
      asteroid.y += asteroid.dy;

      // Bounce off walls
      if (asteroid.x <= 0 || asteroid.x >= canvas.width - asteroid.width) {
        asteroid.dx *= -1;
      }
      if (asteroid.y <= 0 || asteroid.y >= canvas.height - asteroid.height) {
        asteroid.dy *= -1;
      }
    });

    // Check player-asteroid collisions
    gameState.asteroids.forEach(asteroid => {
      if (checkCollision(gameState.player, asteroid)) {
        setLives(prev => {
          const newLives = prev - 1;
          if (newLives <= 0) {
            setGameOver(true);
            onGameComplete(score);
          }
          return newLives;
        });
        // Reset player position
        gameState.player.x = 100;
        gameState.player.y = 250;
      }
    });

    // Check player-gem collisions
    gameState.gems.forEach(gem => {
      if (!gem.collected && checkCollision(gameState.player, gem)) {
        gem.collected = true;
        gameState.gemsCollected++;
        setScore(prev => prev + 50);
      }
    });

    // Check if level complete
    if (gameState.gemsCollected >= gameState.gemsNeeded) {
      setLevel(prev => prev + 1);
      setScore(prev => prev + level * 100);
      initializeLevel();
    }

    // Draw player with thruster effect
    ctx.fillStyle = gameState.player.color;
    ctx.fillRect(gameState.player.x, gameState.player.y, gameState.player.width, gameState.player.height);
    
    // Thruster trail
    if (gameState.keys.left || gameState.keys.right || gameState.keys.up || gameState.keys.down) {
      ctx.fillStyle = '#ff6b9d';
      ctx.fillRect(gameState.player.x + 10, gameState.player.y + 25, 10, 5);
    }

    // Draw asteroids
    gameState.asteroids.forEach(asteroid => {
      ctx.fillStyle = asteroid.color;
      ctx.fillRect(asteroid.x, asteroid.y, asteroid.width, asteroid.height);
      
      // Add some texture
      ctx.fillStyle = '#654321';
      ctx.fillRect(asteroid.x + 5, asteroid.y + 5, asteroid.width - 10, asteroid.height - 10);
    });

    // Draw gems with sparkle effect
    gameState.gems.forEach(gem => {
      if (!gem.collected) {
        gem.sparkle += 0.1;
        const sparkleSize = 15 + Math.sin(gem.sparkle) * 3;
        
        ctx.fillStyle = gem.color;
        ctx.fillRect(gem.x - sparkleSize/2 + 7.5, gem.y - sparkleSize/2 + 7.5, sparkleSize, sparkleSize);
        
        // Sparkle effect
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(gem.x + 5, gem.y + 2, 5, 2);
        ctx.fillRect(gem.x + 2, gem.y + 5, 2, 5);
      }
    });

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [gameOver, onGameComplete, score, level, initializeLevel]);

  useEffect(() => {
    initializeLevel();
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [initializeLevel, handleKeyDown, handleKeyUp, gameLoop]);

  const restartGame = () => {
    setScore(0);
    setLives(3);
    setLevel(1);
    setGameOver(false);
    gameStateRef.current.player.x = 100;
    gameStateRef.current.player.y = 250;
    initializeLevel();
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <div className="text-[hsl(195,100%,45%)]">Score: {score}</div>
        <div className="text-[hsl(260,70%,60%)]">Level: {level}</div>
        <div className="text-[hsl(220,70%,50%)]">Lives: {lives}</div>
        <div className="text-[hsl(195,100%,45%)]">
          Gems: {gameStateRef.current.gemsCollected}/{gameStateRef.current.gemsNeeded}
        </div>
      </div>
      
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="border border-[hsl(220,10%,55%)]/30 rounded-lg bg-black"
      />

      {gameOver && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-[hsl(195,100%,45%)] mb-4">Game Over</h3>
            <p className="text-[hsl(210,100%,98%)] mb-2">Final Score: {score}</p>
            <p className="text-[hsl(210,100%,98%)] mb-4">Level Reached: {level}</p>
            <button
              onClick={restartGame}
              className="bg-gradient-to-r from-[hsl(195,100%,45%)] to-[hsl(260,70%,60%)] px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform"
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      <div className="mt-4 text-center text-sm text-[hsl(220,10%,55%)]">
        Use WASD or Arrow Keys to navigate. Collect all gems to advance levels!
      </div>
    </div>
  );
}