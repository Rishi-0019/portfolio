import { motion } from "framer-motion";
import { useState } from "react";
import { Gamepad, Trophy, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import SpaceInvaders from "./games/SpaceInvaders";
import AsteroidBreaker from "./games/AsteroidBreaker";
import SatelliteRescue from "./games/SatelliteRescue";

// TypeScript interface for game components
interface GameComponentProps {
  onGameComplete: (score: number) => void;
}

// Placeholder fallback component
function GamePlaceholder({ onGameComplete, gameTitle }: { onGameComplete: (score: number) => void; gameTitle: string }) {
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
    // Simulate a game session
    let currentScore = 0;
    const gameInterval = setInterval(() => {
      currentScore += Math.floor(Math.random() * 10) + 1;
      setScore(currentScore);
    }, 200);

    // End game after 10 seconds
    setTimeout(() => {
      clearInterval(gameInterval);
      onGameComplete(currentScore);
      setGameStarted(false);
      setScore(0);
    }, 10000);
  };

  return (
    <div className="text-center p-8">
      <h3 className="text-2xl font-bold text-[hsl(195,100%,45%)] mb-4">{gameTitle}</h3>
      {!gameStarted ? (
        <div>
          <p className="text-[hsl(220,10%,55%)] mb-6">
            This is a demo version of {gameTitle}. Click start to begin a 10-second simulation!
          </p>
          <Button
            onClick={startGame}
            className="bg-gradient-to-r from-[hsl(195,100%,45%)] to-[hsl(260,70%,60%)] hover:scale-105 transition-transform"
          >
            Start Game
          </Button>
        </div>
      ) : (
        <div>
          <p className="text-xl text-[hsl(210,100%,98%)] mb-4">Playing {gameTitle}...</p>
          <p className="text-lg text-[hsl(195,100%,45%)]">Score: {score}</p>
          <div className="mt-4 w-full bg-[hsl(220,50%,8%)] rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-[hsl(195,100%,45%)] to-[hsl(260,70%,60%)] h-2 rounded-full transition-all duration-200"
              style={{ width: `${(10000 - (Date.now() % 10000)) / 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// TypeScript games configuration with proper typing
interface GameConfig {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  color: string;
  component: React.ComponentType<GameComponentProps>;
  controls: string[];
  tech: string[];
}

const games: GameConfig[] = [
  {
    id: 'space-invaders',
    title: 'Space Invaders',
    description: 'Classic arcade game with a modern twist. Defend Earth from alien invasion!',
    difficulty: 'Medium',
    color: 'hsl(195,100%,45%)',
    component: SpaceInvaders,
    controls: ['Arrow Keys / WASD', 'Space to Shoot'],
    tech: ['TypeScript', 'Canvas API', 'Game Physics', 'Collision Detection']
  },
  {
    id: 'asteroid-breaker',
    title: 'Asteroid Breaker',
    description: 'Navigate through an asteroid field and collect space gems.',
    difficulty: 'Easy',
    color: 'hsl(260,70%,60%)',
    component: AsteroidBreaker,
    controls: ['Arrow Keys / WASD', 'Avoid Asteroids', 'Collect Gems'],
    tech: ['TypeScript', 'Canvas API', 'Level Progression', 'Particle Effects']
  },
  {
    id: 'satellite-rescue',
    title: 'Satellite Rescue',
    description: 'Guide satellites back to Earth orbit while avoiding space debris.',
    difficulty: 'Hard',
    color: 'hsl(220,70%,50%)',
    component: SatelliteRescue,
    controls: ['Mouse Movement', 'Click & Drag', 'Physics Simulation'],
    tech: ['TypeScript', 'Canvas API', 'Physics Engine', 'Advanced Algorithms']
  }
];

export default function Games() {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({});

  const handleGameComplete = (gameId: string, score: number): void => {
    setScores(prev => ({
      ...prev,
      [gameId]: Math.max(prev[gameId] || 0, score)
    }));
    setActiveGame(null);
  };

  const activeGameConfig = activeGame ? games.find(g => g.id === activeGame) : null;
  const ActiveGameComponent = activeGameConfig?.component;

  return (
    <section id="games" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold gradient-text mb-4">Interactive Games</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[hsl(195,100%,45%)] to-[hsl(260,70%,60%)] mx-auto"></div>
          <p className="text-xl text-[hsl(220,10%,55%)] mt-6">Experience my coding skills through interactive gameplay</p>
        </motion.div>

        {activeGame && ActiveGameComponent ? (
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-[hsl(250,45%,25%)]/20 backdrop-blur-sm rounded-3xl p-8 border border-[hsl(260,70%,60%)]/30">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-[hsl(195,100%,45%)]">
                  {games.find(g => g.id === activeGame)?.title}
                </h3>
                <Button
                  onClick={() => setActiveGame(null)}
                  variant="outline"
                  size="sm"
                  className="border-[hsl(220,10%,55%)]/30 text-[hsl(210,100%,98%)]"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Back to Games
                </Button>
              </div>
              {ActiveGameComponent && (
                <ActiveGameComponent 
                  onGameComplete={(score: number) => handleGameComplete(activeGame!, score)} 
                />
              )}
            </div>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                className="bg-[hsl(250,45%,25%)]/20 backdrop-blur-sm rounded-3xl p-8 border border-[hsl(260,70%,60%)]/30 hover:border-[hsl(195,100%,45%)]/50 transition-all group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br from-[${game.color}] to-[hsl(220,70%,50%)] rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Gamepad className="w-8 h-8 text-[hsl(220,50%,8%)]" />
                  </div>
                  <h3 className={`text-xl font-bold text-[${game.color}] group-hover:text-[hsl(210,100%,98%)] transition-colors`}>
                    {game.title}
                  </h3>
                  <span className={`inline-block bg-[${game.color}]/20 px-3 py-1 rounded-full text-sm border border-[${game.color}]/30 mt-2`}>
                    {game.difficulty}
                  </span>
                </div>

                <p className="text-[hsl(220,10%,55%)] text-center mb-4 leading-relaxed">
                  {game.description}
                </p>

                {/* Controls Information */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-[hsl(210,100%,98%)] mb-2">Controls:</h4>
                  <div className="space-y-1">
                    {game.controls.map((control, idx) => (
                      <div key={idx} className="text-xs text-[hsl(220,10%,55%)] flex items-center">
                        <div className="w-1 h-1 bg-[hsl(195,100%,45%)] rounded-full mr-2"></div>
                        {control}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-[hsl(210,100%,98%)] mb-2">TypeScript Tech:</h4>
                  <div className="flex flex-wrap gap-1">
                    {game.tech.map((tech, idx) => (
                      <span 
                        key={idx} 
                        className="text-xs bg-[hsl(195,100%,45%)]/10 px-2 py-1 rounded border border-[hsl(195,100%,45%)]/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {scores[game.id] && (
                  <div className="flex items-center justify-center gap-2 mb-4 text-[hsl(195,100%,45%)]">
                    <Trophy className="w-4 h-4" />
                    <span className="text-sm">High Score: {scores[game.id]}</span>
                  </div>
                )}

                <div className="text-center">
                  <Button
                    onClick={() => setActiveGame(game.id)}
                    className={`bg-gradient-to-r from-[${game.color}] to-[hsl(260,70%,60%)] hover:scale-105 transition-transform`}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Play Game
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Tech Stack Info */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-[hsl(220,20%,35%)]/20 backdrop-blur-sm rounded-3xl p-8 border border-[hsl(220,10%,55%)]/30 max-w-4xl mx-auto">
            <h4 className="text-xl font-semibold text-[hsl(195,100%,45%)] mb-4">TypeScript Game Development</h4>
            <p className="text-[hsl(220,10%,55%)] mb-6">
              These games are fully implemented in <strong className="text-[hsl(210,100%,98%)]">TypeScript</strong> with 
              proper interfaces, type safety, and modern React patterns. Each game demonstrates advanced programming 
              concepts including collision detection, physics simulation, state management, and real-time rendering.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'TypeScript Interfaces', 'React Hooks', 'Canvas API', 'Game Physics', 
                'Collision Detection', 'State Management', 'Event Handling', 'Type Safety'
              ].map((tech, index) => (
                <span 
                  key={index}
                  className="bg-[hsl(195,100%,45%)]/20 px-4 py-2 rounded-full text-sm border border-[hsl(195,100%,45%)]/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}