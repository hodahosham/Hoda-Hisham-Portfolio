import { useEffect, useRef } from "react";

const COLORS = ["#8052ff", "#ffb829", "#15846e", "#b14cff", "#4e7cff", "#ff5fb7"];

export default function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;
    let particles = [];
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    function resize() {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(900, Math.floor((width * height) / 1450));
      particles = Array.from({ length: count }, (_, i) => {
        const a = Math.random() * Math.PI * 2;
        const r = Math.pow(Math.random(), 0.58);
        const cx = width * 0.69;
        const cy = height * 0.50;
        const rx = width * 0.27;
        const ry = height * 0.42;
        return {
          x: cx + Math.cos(a) * rx * r,
          y: cy + Math.sin(a) * ry * r,
          ox: cx + Math.cos(a) * rx * r,
          oy: cy + Math.sin(a) * ry * r,
          s: Math.random() * 2.2 + 0.7,
          p: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.008 + 0.002,
          color: COLORS[i % COLORS.length],
          rot: Math.random() * Math.PI
        };
      });
    }

    function triangle(x, y, s, rot) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.lineTo(s * 0.85, s);
      ctx.lineTo(-s * 0.85, s);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      mouse.x += (mouse.tx - mouse.x) * 0.055;
      mouse.y += (mouse.ty - mouse.y) * 0.055;

      particles.forEach((p, i) => {
        p.p += p.speed;
        const driftX = Math.sin(p.p + i) * 8;
        const driftY = Math.cos(p.p * 1.25 + i) * 8;
        const dx = (mouse.x - width * 0.72) * 0.018;
        const dy = (mouse.y - height * 0.5) * 0.018;

        const x = p.ox + driftX + dx;
        const y = p.oy + driftY + dy;

        ctx.globalAlpha = 0.32 + ((Math.sin(p.p * 2) + 1) * 0.22);
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 0.75;
        triangle(x, y, p.s, p.rot + p.p * 0.2);
      });

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }

    function move(e) {
      const r = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - r.left;
      mouse.ty = e.clientY - r.top;
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />;
}
