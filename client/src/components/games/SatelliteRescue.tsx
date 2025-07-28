import { useEffect, useRef, useState, useCallback } from "react";

interface SatelliteRescueProps {
  onGameComplete: (score: number) => void;
}

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

interface Satellite extends GameObject {
  dx: number;
  dy: number;
  rescued: boolean;
  health: number;
  maxHealth: number;
}

interface Debris extends GameObject {
  dx: number;
  dy: number;
  rotation: number;
  rotationSpeed: number;
}

interface Particle {
  x: number;
  y: number;
  dx: number;
  dy: number;
  life: number;
  maxLife: number;
  color: string;
}

export default function SatelliteRescue({ onGameComplete }: SatelliteRescueProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number>();
  const [score, setScore] = useState(0);
  const [fuel, setFuel] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const gameStateRef = useRef({
    player: { x: 50, y: 300, width: 40, height: 25, color: '#00bfff' },
    satellites: [] as Satellite[],
    debris: [] as Debris[],
    particles: [] as Particle[],
    keys: { left: false, right: false, up: false, down: false },
    playerSpeed: 3,
    satellitesRescued: 0,
    satellitesNeeded: 8,
    earthZone: { x: 0, y: 250, width: 100, height: 100 }
  });

  const createSatellite = (x: number, y: number): Satellite => ({
    x,
    y,
    width: 25,
    height: 25,
    color: '#ffd700',
    dx: (Math.random() - 0.5) * 2,
    dy: (Math.random() - 0.5) * 2,
    rescued: false,
    health: 100,
    maxHealth: 100
  });

  const createDebris = (x: number, y: number): Debris => ({
    x,
    y,
    width: 15 + Math.random() * 20,
    height: 15 + Math.random() * 20,
    color: '#8b5a3c',
    dx: (Math.random() - 0.5) * 4,
    dy: (Math.random() - 0.5) * 4,
    rotation: 0,
    rotationSpeed: (Math.random() - 0.5) * 0.2
  });

  const createParticle = (x: number, y: number, color: string): Particle => ({
    x,
    y,
    dx: (Math.random() - 0.5) * 4,
    dy: (Math.random() - 0.5) * 4,
    life: 30,
    maxLife: 30,
    color
  });

  const initializeGame = useCallback(() => {
    const satellites: Satellite[] = [];
    const debris: Debris[] = [];

    // Create satellites scattered around the map
    for (let i = 0; i < gameStateRef.current.satellitesNeeded; i++) {
      let x, y;
      do {
        x = 200 + Math.random() * 500;
        y = 50 + Math.random() * 500;
      } while (Math.sqrt((x - 50) ** 2 + (y - 300) ** 2) < 100);
      
      satellites.push(createSatellite(x, y));
    }

    // Create space debris
    for (let i = 0; i < 15; i++) {
      debris.push(createDebris(
        150 + Math.random() * 600,
        Math.random() * 600
      ));
    }

    gameStateRef.current.satellites = satellites;
    gameStateRef.current.debris = debris;
    gameStateRef.current.particles = [];
    gameStateRef.current.satellitesRescued = 0;
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
    if (!canvas || gameOver || gameWon) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gameState = gameStateRef.current;

    // Clear canvas with space background
    ctx.fillStyle = '#050510';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw stars
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 100; i++) {
      const x = (i * 137) % canvas.width;
      const y = (i * 73) % canvas.height;
      const size = Math.sin(i) > 0.8 ? 2 : 1;
      ctx.fillRect(x, y, size, size);
    }

    // Draw Earth zone (safe area)
    ctx.fillStyle = 'rgba(0, 191, 255, 0.2)';
    ctx.fillRect(gameState.earthZone.x, gameState.earthZone.y, gameState.earthZone.width, gameState.earthZone.height);
    ctx.strokeStyle = '#00bfff';
    ctx.strokeRect(gameState.earthZone.x, gameState.earthZone.y, gameState.earthZone.width, gameState.earthZone.height);

    // Update player
    let moving = false;
    if (gameState.keys.left && gameState.player.x > 0) {
      gameState.player.x -= gameState.playerSpeed;
      moving = true;
    }
    if (gameState.keys.right && gameState.player.x < canvas.width - gameState.player.width) {
      gameState.player.x += gameState.playerSpeed;
      moving = true;
    }
    if (gameState.keys.up && gameState.player.y > 0) {
      gameState.player.y -= gameState.playerSpeed;
      moving = true;
    }
    if (gameState.keys.down && gameState.player.y < canvas.height - gameState.player.height) {
      gameState.player.y += gameState.playerSpeed;
      moving = true;
    }

    // Consume fuel when moving
    if (moving) {
      setFuel(prev => {
        const newFuel = prev - 0.2;
        if (newFuel <= 0) {
          setGameOver(true);
          onGameComplete(score);
        }
        return Math.max(0, newFuel);
      });

      // Add thruster particles
      gameState.particles.push(
        createParticle(gameState.player.x, gameState.player.y + gameState.player.height, '#ff6b9d')
      );
    }

    // Update satellites
    gameState.satellites.forEach(satellite => {
      if (!satellite.rescued) {
        satellite.x += satellite.dx;
        satellite.y += satellite.dy;

        // Bounce off walls
        if (satellite.x <= 0 || satellite.x >= canvas.width - satellite.width) {
          satellite.dx *= -1;
        }
        if (satellite.y <= 0 || satellite.y >= canvas.height - satellite.height) {
          satellite.dy *= -1;
        }

        // Slowly lose health when not rescued
        satellite.health -= 0.1;
        if (satellite.health <= 0) {
          satellite.rescued = true; // Mark as lost
        }
      }
    });

    // Update debris
    gameState.debris.forEach(debris => {
      debris.x += debris.dx;
      debris.y += debris.dy;
      debris.rotation += debris.rotationSpeed;

      // Wrap around screen
      if (debris.x < -debris.width) debris.x = canvas.width;
      if (debris.x > canvas.width) debris.x = -debris.width;
      if (debris.y < -debris.height) debris.y = canvas.height;
      if (debris.y > canvas.height) debris.y = -debris.height;
    });

    // Update particles
    gameState.particles = gameState.particles.filter(particle => {
      particle.x += particle.dx;
      particle.y += particle.dy;
      particle.life--;
      return particle.life > 0;
    });

    // Check player-satellite collisions (rescue)
    gameState.satellites.forEach(satellite => {
      if (!satellite.rescued && satellite.health > 0 && checkCollision(gameState.player, satellite)) {
        // Check if in Earth zone
        if (checkCollision(gameState.player, gameState.earthZone)) {
          satellite.rescued = true;
          gameState.satellitesRescued++;
          setScore(prev => prev + Math.floor(satellite.health));
          
          // Add rescue particles
          for (let i = 0; i < 10; i++) {
            gameState.particles.push(createParticle(satellite.x, satellite.y, '#ffd700'));
          }
        }
      }
    });

    // Check player-debris collisions
    gameState.debris.forEach(debris => {
      if (checkCollision(gameState.player, debris)) {
        setFuel(prev => {
          const newFuel = prev - 5;
          if (newFuel <= 0) {
            setGameOver(true);
            onGameComplete(score);
          }
          return Math.max(0, newFuel);
        });
        
        // Add damage particles
        for (let i = 0; i < 5; i++) {
          gameState.particles.push(createParticle(gameState.player.x, gameState.player.y, '#ff4757'));
        }
      }
    });

    // Check win condition
    if (gameState.satellitesRescued >= gameState.satellitesNeeded) {
      setGameWon(true);
      onGameComplete(score + Math.floor(fuel * 10));
      return;
    }

    // Draw player
    ctx.fillStyle = gameState.player.color;
    ctx.fillRect(gameState.player.x, gameState.player.y, gameState.player.width, gameState.player.height);

    // Draw satellites
    gameState.satellites.forEach(satellite => {
      if (!satellite.rescued && satellite.health > 0) {
        ctx.fillStyle = satellite.color;
        ctx.fillRect(satellite.x, satellite.y, satellite.width, satellite.height);
        
        // Health bar
        const barWidth = satellite.width;
        const barHeight = 4;
        ctx.fillStyle = '#ff4757';
        ctx.fillRect(satellite.x, satellite.y - 8, barWidth, barHeight);
        ctx.fillStyle = '#2ed573';
        ctx.fillRect(satellite.x, satellite.y - 8, barWidth * (satellite.health / satellite.maxHealth), barHeight);
      }
    });

    // Draw debris
    gameState.debris.forEach(debris => {
      ctx.save();
      ctx.translate(debris.x + debris.width/2, debris.y + debris.height/2);
      ctx.rotate(debris.rotation);
      ctx.fillStyle = debris.color;
      ctx.fillRect(-debris.width/2, -debris.height/2, debris.width, debris.height);
      ctx.restore();
    });

    // Draw particles
    gameState.particles.forEach(particle => {
      const alpha = particle.life / particle.maxLife;
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = alpha;
      ctx.fillRect(particle.x, particle.y, 3, 3);
      ctx.globalAlpha = 1;
    });

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [gameOver, gameWon, onGameComplete, score, fuel]);

  useEffect(() => {
    initializeGame();
    
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
  }, [initializeGame, handleKeyDown, handleKeyUp, gameLoop]);

  const restartGame = () => {
    setScore(0);
    setFuel(100);
    setGameOver(false);
    setGameWon(false);
    gameStateRef.current.player.x = 50;
    gameStateRef.current.player.y = 300;
    initializeGame();
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <div className="text-[hsl(195,100%,45%)]">Score: {score}</div>
        <div className="text-[hsl(260,70%,60%)]">Fuel: {fuel.toFixed(0)}%</div>
        <div className="text-[hsl(220,70%,50%)]">
          Rescued: {gameStateRef.current.satellitesRescued}/{gameStateRef.current.satellitesNeeded}
        </div>
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
              {gameWon ? 'Mission Success!' : 'Mission Failed'}
            </h3>
            <p className="text-[hsl(210,100%,98%)] mb-2">Final Score: {score}</p>
            <p className="text-[hsl(210,100%,98%)] mb-4">
              Satellites Rescued: {gameStateRef.current.satellitesRescued}/{gameStateRef.current.satellitesNeeded}
            </p>
            <button
              onClick={restartGame}
              className="bg-gradient-to-r from-[hsl(195,100%,45%)] to-[hsl(260,70%,60%)] px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform"
            >
              New Mission
            </button>
          </div>
        </div>
      )}

      <div className="mt-4 text-center text-sm text-[hsl(220,10%,55%)]">
        Navigate with WASD/Arrow Keys. Rescue satellites by bringing them to the blue Earth zone!
      </div>
    </div>
  );
}