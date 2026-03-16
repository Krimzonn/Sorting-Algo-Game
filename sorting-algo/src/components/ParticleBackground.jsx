import { useEffect, useRef } from "react";

function ParticleBackground()
{
    const canvasRef = useRef(null);

    useEffect(() => {
       const canvas = canvasRef.current;
       const ctx = canvas.getContext('2d');

       canvas.width = window.innerWidth;
       canvas.height = window.innerHeight;

       const particles = [];
       const colors = ['#d946ef', '#a855f7', '#ffffff'];

       for (let i = 0; i < 80; i++) {
       particles.push({
       x: Math.random() * canvas.width,
       y: Math.random() * canvas.height,
       radius: Math.random() * 3 + 1,
       speedX: (Math.random() - 0.5) * 1.5,
       speedY: (Math.random() - 0.5) * 1.5,
       color: colors[Math.floor(Math.random() * colors.length)]
     })
                                     }
                                
       const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);


        particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
  });

  requestAnimationFrame(animate);
}

    const animationId = requestAnimationFrame(animate);

       return () => cancelAnimationFrame(animationId);
    }, [])

    return (
          <canvas ref={canvasRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1
          }}
          ></canvas>
    );

}

export default ParticleBackground;