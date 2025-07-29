import { useEffect, useRef, useState, useCallback } from "react";

interface SpaceInvadersProps {
  onGameComplete: (score: number) => void;
}

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

interface Bullet extends GameObject {
  dy: number;
}

interface Enemy extends GameObject {
  dx: number;
  dy: number;
}

export default function SpaceInvaders({ onGameComplete }: SpaceInvadersProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number>();
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const gameStateRef = useRef({
    player: { x: 350, y: 520, width: 40, height: 30, color: '#00bfff' },
    bullets: [] as Bullet[],
    enemies: [] as Enemy[],
    keys: { left: false, right: false, space: false },
    lastShotTime: 0
  });

  const initializeEnemies = useCallback(() => {
    const enemies: Enemy[] = [];
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 10; col++) {
        enemies.push({
          x: col * 60 + 50,
          y: row * 50 + 50,
          width: 40,
          height: 30,
          color: row < 2 ? '#ff6b9d' : row < 4 ? '#c44569' : '#f8b500',
          dx: 1,
          dy: 0
        });
      }
    }
    gameStateRef.current.enemies = enemies;
  }, []);

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
      case 'Space':
        e.preventDefault();
        keys.space = true;
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
      case 'Space':
        keys.space = false;
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
    if (!canvas || gameOver || gameWon) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gameState = gameStateRef.current;
    const currentTime = Date.now();

    // Clear canvas
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update player
    if (gameState.keys.left && gameState.player.x > 0) {
      gameState.player.x -= 5;
    }
    if (gameState.keys.right && gameState.player.x < canvas.width - gameState.player.width) {
      gameState.player.x += 5;
    }

    // Shoot bullets
    if (gameState.keys.space && currentTime - gameState.lastShotTime > 200) {
      gameState.bullets.push({
        x: gameState.player.x + gameState.player.width / 2 - 2,
        y: gameState.player.y,
        width: 4,
        height: 10,
        color: '#00bfff',
        dy: -8
      });
      gameState.lastShotTime = currentTime;
    }

    // Update bullets
    gameState.bullets = gameState.bullets.filter(bullet => {
      bullet.y += bullet.dy;
      return bullet.y > -bullet.height && bullet.y < canvas.height;
    });

    // Update enemies
    let shouldMoveDown = false;
    gameState.enemies.forEach(enemy => {
      enemy.x += enemy.dx;
      if (enemy.x <= 0 || enemy.x >= canvas.width - enemy.width) {
        shouldMoveDown = true;
      }
    });

    if (shouldMoveDown) {
      gameState.enemies.forEach(enemy => {
        enemy.dx *= -1;
        enemy.y += 20;
      });
    }

    // Check bullet-enemy collisions
    gameState.bullets = gameState.bullets.filter(bullet => {
      let bulletHit = false;
      gameState.enemies = gameState.enemies.filter(enemy => {
        if (checkCollision(bullet, enemy)) {
          bulletHit = true;
          setScore(prev => prev + 10);
          return false;
        }
        return true;
      });
      return !bulletHit;
    });

    // Check if all enemies are defeated
    if (gameState.enemies.length === 0) {
      setGameWon(true);
      onGameComplete(score + 100);
      return;
    }

    // Check enemy-player collisions
    gameState.enemies.forEach(enemy => {
      if (checkCollision(enemy, gameState.player)) {
        setLives(prev => {
          const newLives = prev - 1;
          if (newLives <= 0) {
            setGameOver(true);
            onGameComplete(score);
          }
          return newLives;
        });
        // Reset player position
        gameState.player.x = 350;
      }
    });

    // Check if enemies reached bottom
    if (gameState.enemies.some(enemy => enemy.y + enemy.height >= gameState.player.y)) {
      setGameOver(true);
      onGameComplete(score);
      return;
    }

    // Draw player
    ctx.fillStyle = gameState.player.color;
    ctx.fillRect(gameState.player.x, gameState.player.y, gameState.player.width, gameState.player.height);

    // Draw bullets
    gameState.bullets.forEach(bullet => {
      ctx.fillStyle = bullet.color;
      ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });

    // Draw enemies
    gameState.enemies.forEach(enemy => {
      ctx.fillStyle = enemy.color;
      ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [gameOver, gameWon, onGameComplete, score]);

  useEffect(() => {
    initializeEnemies();
    
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
  }, [initializeEnemies, handleKeyDown, handleKeyUp, gameLoop]);

  const restartGame = () => {
    setScore(0);
    setLives(3);
    setGameOver(false);
    setGameWon(false);
    gameStateRef.current.player.x = 350;
    gameStateRef.current.bullets = [];
    initializeEnemies();
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <div className="text-[hsl(195,100%,45%)]">Score: {score}</div>
        <div className="text-[hsl(260,70%,60%)]">Lives: {lives}</div>
      </div>
      
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="border border-[hsl(220,10%,55%)]/30 rounded-lg bg-black"
      />

      {(gameOver || gameWon) && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-[hsl(195,100%,45%)] mb-4">
              {gameWon ? 'Victory!' : 'Game Over'}
            </h3>
            <p className="text-[hsl(210,100%,98%)] mb-4">Final Score: {score}</p>
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
        Use Arrow Keys or A/D to move, Space to shoot
      </div>
    </div>
  );
}