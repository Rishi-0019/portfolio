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
}

interface Gem extends GameObject {
  collected: boolean;
  sparkle: number;
}

export default function AsteroidBreaker({ onGameComplete }: AsteroidBreakerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef(0);

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(1);

  const playerSpeed = 4;
  const canvasWidth = 800;
  const canvasHeight = 600;

  // Using refs to hold mutable game state to avoid excess re-renders
  const gameStateRef = useRef({
    player: { x: 100, y: 250, width: 30, height: 30, color: "#00bfff" },
    asteroids: [] as Asteroid[],
    gems: [] as Gem[],
    keys: { left: false, right: false, up: false, down: false },
    gemsCollected: 0,
    gemsNeeded: 5,
  });

  // Helpers to create asteroids and gems
  const createAsteroid = (x: number, y: number, size: number): Asteroid => ({
    x,
    y,
    width: size,
    height: size,
    color: "#8b5a3c",
    dx: (Math.random() - 0.5) * 3,
    dy: (Math.random() - 0.5) * 3,
  });

  const createGem = (x: number, y: number): Gem => ({
    x,
    y,
    width: 15,
    height: 15,
    color: "#ffd700",
    collected: false,
    sparkle: Math.random() * Math.PI * 2,
  });

  // Initialize asteroids and gems for the current level
  const initializeLevel = useCallback(() => {
    const asteroids: Asteroid[] = [];
    for (let i = 0; i < 8 + level * 2; i++) {
      let x, y;
      do {
        x = Math.random() * (canvasWidth - 40);
        y = Math.random() * (canvasHeight - 40);
      } while (Math.hypot(x - 100, y - 250) < 100);
      asteroids.push(createAsteroid(x, y, 30 + Math.random() * 40));
    }

    const gems: Gem[] = [];
    for (let i = 0; i < gameStateRef.current.gemsNeeded; i++) {
      let x, y;
      do {
        x = Math.random() * (canvasWidth - 20);
        y = Math.random() * (canvasHeight - 20);
      } while (Math.hypot(x - 100, y - 250) < 80);
      gems.push(createGem(x, y));
    }

    gameStateRef.current = {
      ...gameStateRef.current,
      asteroids,
      gems,
      gemsCollected: 0,
    };
  }, [level]);

  // Keyboard handling for movement keys
  const handleKey = useCallback((event: KeyboardEvent, isDown: boolean) => {
    const keys = gameStateRef.current.keys;
    switch (event.code) {
      case "ArrowLeft":
      case "KeyA":
        keys.left = isDown;
        break;
      case "ArrowRight":
      case "KeyD":
        keys.right = isDown;
        break;
      case "ArrowUp":
      case "KeyW":
        keys.up = isDown;
        break;
      case "ArrowDown":
      case "KeyS":
        keys.down = isDown;
        break;
    }
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => handleKey(e, true);
  const handleKeyUp = (e: KeyboardEvent) => handleKey(e, false);

  // Simple AABB collision detection
  const checkCollision = (a: GameObject, b: GameObject) =>
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y;

  // Main game loop to update and render everything
  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || gameOver) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { player, asteroids, gems, keys } = gameStateRef.current;

    // Clear with space background and stars
    ctx.fillStyle = "#0a0a1a";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.fillStyle = "#fff";
    for (let i = 0; i < 50; i++) {
      ctx.fillRect((i * 137) % canvasWidth, (i * 73) % canvasHeight, 1, 1);
    }

    // Update player position based on keys pressed
    if (keys.left && player.x > 0) player.x -= playerSpeed;
    if (keys.right && player.x < canvasWidth - player.width) player.x += playerSpeed;
    if (keys.up && player.y > 0) player.y -= playerSpeed;
    if (keys.down && player.y < canvasHeight - player.height) player.y += playerSpeed;

    // Update asteroids positions and bounce off walls
    asteroids.forEach((a) => {
      a.x += a.dx;
      a.y += a.dy;
      if (a.x <= 0 || a.x >= canvasWidth - a.width) a.dx *= -1;
      if (a.y <= 0 || a.y >= canvasHeight - a.height) a.dy *= -1;
    });

    // Check collisions with asteroids - lose lives if hit
    for (const asteroid of asteroids) {
      if (checkCollision(player, asteroid)) {
        setLives((l) => {
          const next = l - 1;
          if (next <= 0) {
            setGameOver(true);
            onGameComplete(score);
          }
          return next;
        });
        player.x = 100;
        player.y = 250;
        break; // Prevent multiple lives lost per frame
      }
    }

    // Check gem collection
    gems.forEach((gem) => {
      if (!gem.collected && checkCollision(player, gem)) {
        gem.collected = true;
        gameStateRef.current.gemsCollected++;
        setScore((s) => s + 50);
      }
    });

    // If all gems collected, level up and initialize next level
    if (gameStateRef.current.gemsCollected >= gameStateRef.current.gemsNeeded) {
      setLevel((l) => l + 1);
      setScore((s) => s + level * 100);
      initializeLevel();
    }

    // Draw player with thruster effect if moving
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    if (keys.left || keys.right || keys.up || keys.down) {
      ctx.fillStyle = "#ff6b9d";
      ctx.fillRect(player.x + 10, player.y + 25, 10, 5);
    }

    // Draw asteroids with simple texture
    asteroids.forEach((a) => {
      ctx.fillStyle = a.color;
      ctx.fillRect(a.x, a.y, a.width, a.height);
      ctx.fillStyle = "#654321";
      ctx.fillRect(a.x + 5, a.y + 5, a.width - 10, a.height - 10);
    });

    // Draw gems with sparkle
    gems.forEach((gem) => {
      if (!gem.collected) {
        gem.sparkle += 0.1;
        const size = 15 + Math.sin(gem.sparkle) * 3;
        ctx.fillStyle = gem.color;
        ctx.fillRect(gem.x + 7.5 - size / 2, gem.y + 7.5 - size / 2, size, size);
        ctx.fillStyle = "#fff";
        ctx.fillRect(gem.x + 5, gem.y + 2, 5, 2);
        ctx.fillRect(gem.x + 2, gem.y + 5, 2, 5);
      }
    });

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [gameOver, onGameComplete, score, level, initializeLevel]);

  // Setup listeners and start game
  useEffect(() => {
    initializeLevel();

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(gameLoopRef.current);
    };
  }, [handleKeyDown, handleKeyUp, gameLoop, initializeLevel]);

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
      <div className="flex justify-between items-center mb-4 text-white">
        <div>Score: {score}</div>
        <div>Level: {level}</div>
        <div>Lives: {lives}</div>
        <div>
          Gems: {gameStateRef.current.gemsCollected}/{gameStateRef.current.gemsNeeded}
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className="border border-gray-600 rounded-lg bg-black"
      />

      {gameOver && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg">
          <div className="text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Game Over</h3>
            <p className="mb-2">Final Score: {score}</p>
            <p className="mb-4">Level Reached: {level}</p>
            <button
              onClick={restartGame}
              className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform"
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      <p className="mt-4 text-center text-gray-400 text-sm">
        Use WASD or Arrow Keys to move. Collect all gems to advance levels!
      </p>
    </div>
  );
}
