import React, { useRef, useEffect, useState } from "react";

interface Paddle {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Star {
  x: number;
  y: number;
  vy: number;
  caught?: boolean;
}

interface Keys {
  left: boolean;
  right: boolean;
}

export default function CatchTheStars() {
  const [score, setScore] = useState<number>(0);
  const [missed, setMissed] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const gameRef = useRef<{
    paddle: Paddle;
    stars: Star[];
    keys: Keys;
  }>({
    paddle: { x: 200, y: 370, w: 100, h: 18 },
    stars: [],
    keys: { left: false, right: false },
  });

  const canvasWidth = 500;
  const canvasHeight = 400;
  const starRadius = 12;
  const paddleSpeed = 7;

  function randomStar(): Star {
    return {
      x: Math.random() * (canvasWidth - starRadius * 2) + starRadius,
      y: -starRadius,
      vy: 3 + Math.random() * 2,
    };
  }

  function resetGame() {
    setScore(0);
    setMissed(0);
    setGameOver(false);
    gameRef.current.paddle.x = 200;
    gameRef.current.stars = [randomStar()];
  }

  useEffect(() => {
    function down(e: KeyboardEvent) {
      if (e.code === "ArrowLeft" || e.code === "KeyA")
        gameRef.current.keys.left = true;
      if (e.code === "ArrowRight" || e.code === "KeyD")
        gameRef.current.keys.right = true;
    }
    function up(e: KeyboardEvent) {
      if (e.code === "ArrowLeft" || e.code === "KeyA")
        gameRef.current.keys.left = false;
      if (e.code === "ArrowRight" || e.code === "KeyD")
        gameRef.current.keys.right = false;
    }
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useEffect(() => {
    resetGame();
    let anim = 0;
    function gameLoop() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.fillStyle = "#141832";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      const paddle = gameRef.current.paddle;

      if (gameRef.current.keys.left && paddle.x > 0) paddle.x -= paddleSpeed;
      if (gameRef.current.keys.right && paddle.x + paddle.w < canvasWidth)
        paddle.x += paddleSpeed;

      ctx.fillStyle = "#ffed8a";
      ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);

      for (let star of gameRef.current.stars) {
        star.y += star.vy;
        ctx.beginPath();
        ctx.arc(star.x, star.y, starRadius, 0, 2 * Math.PI);
        ctx.fillStyle = "#ffe186";
        ctx.fill();
        ctx.strokeStyle = "#ffd700";
        ctx.stroke();

        if (
          !star.caught &&
          star.y + starRadius > paddle.y &&
          star.x > paddle.x &&
          star.x < paddle.x + paddle.w
        ) {
          setScore((s) => s + 1);
          star.caught = true;
        }
      }

      gameRef.current.stars = gameRef.current.stars.filter((star) => {
        if (star.caught) return false;
        if (star.y - starRadius > canvasHeight) {
          setMissed((m) => {
            if (m + 1 >= 3) setGameOver(true);
            return m + 1;
          });
          return false;
        }
        return true;
      });

      if (gameRef.current.stars.length < 1 && !gameOver) {
        gameRef.current.stars.push(randomStar());
      }

      anim = requestAnimationFrame(gameLoop);
    }
    gameLoop();
    return () => cancelAnimationFrame(anim);
  }, [gameOver]);

  return (
    <div style={{ position: "relative" }}>
      <div style={{ color: "#fff", marginBottom: 8 }}>
        <span>Score: {score}</span>
        <span style={{ marginLeft: 28 }}>Missed: {missed} / 3</span>
      </div>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        style={{ background: "#141832", border: "2px solid #444", borderRadius: 8 }}
      />
      {gameOver && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: canvasWidth,
            height: canvasHeight,
            background: "rgba(20,24,50,0.87)",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <h2>Game Over</h2>
          <p>Final Score: {score}</p>
          <button
            onClick={resetGame}
            style={{
              padding: "10px 22px",
              borderRadius: 6,
              background: "#ffed8a",
              color: "#444",
              border: "none",
              fontWeight: "bold",
              marginTop: 7,
              cursor: "pointer",
            }}
          >
            Play Again
          </button>
        </div>
      )}
      <p style={{ color: "#aaa", marginTop: 12 }}>
        Move paddle with Arrow or A/D keys. Catch the falling stars!
      </p>
    </div>
  );
}
