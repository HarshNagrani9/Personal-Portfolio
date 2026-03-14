import { useState, useEffect, useRef } from "react";

const EVENTS = [
  {
    id: 0,
    type: "education",
    title: "High Secondary Education",
    org: "St Xavier's High School, Adipur, Gujarat",
    period: "2020 — 2022",
    description:
      "Completed high secondary education with a focus on science and mathematics.",
    tag: "EDUCATION",
  },
  {
    id: 1,
    type: "education",
    title: "Bachelors in Computer Engineering",
    org: "KJ Somaiya College of Engineering, Mumbai",
    period: "2022 — 2026",
    description:
      "Pursuing a comprehensive education in computer engineering, focusing on software development, data structures, and algorithms.",
    tag: "EDUCATION",
  },
  {
    id: 2,
    type: "experience",
    title: "Software Engineering Intern",
    org: "Inventurus Knowledge Solutions",
    period: "Jan 2026 — Present",
    description:
      "Working with their Engineering Tech Team to build scalable systems.",
    tag: "INTERNSHIP",
  },
  {
    id: 3,
    type: "experience",
    title: "Software Engineering Intern",
    org: "ConnectWise",
    period: "Jun 2025 — Aug 2025",
    description:
      "Designed a data pipeline from Snowflake for large-scale data ingestion and transformation, fueling a recommendation system efficiently recommending 81% users. Developed and optimized clustering algorithms, identifying 20-90 optimal groups to derive actionable insights from complex operational data.",
    tag: "INTERNSHIP",
  },
  {
    id: 4,
    type: "experience",
    title: "Frontend React Developer",
    org: "PressX India",
    period: "Mar — Apr 2024",
    description:
      "Programmed seamless user profiles utilizing React JS, resulting in enhanced access to order history; streamlined the onboarding process resulted in collecting over 500 new users within one month. Engineered an interactive platform with custom profiles that streamlined access to order history and personal information; resulted in 150+ new daily active users within the first month of launch.",
    tag: "INTERNSHIP",
  },
  {
    id: 5,
    type: "extracurricular",
    title: "Council Head",
    org: "DataZen",
    period: "Jul 2024 — Jul 2025",
    description:
      "Lead a team of 25+ members to promote data science, AI, and ML among students. Foster collaboration and knowledge sharing within the council and across disciplines. Organize workshops, events, and online meets to engage the community.",
    tag: "EXTRACURRICULAR",
  },
];

const PALETTES = [
  { primary: [70, 140, 255] as number[], glow: [40, 100, 255] as number[], accent: [100, 180, 255] as number[] },
  { primary: [60, 200, 180] as number[], glow: [30, 170, 150] as number[], accent: [100, 225, 200] as number[] },
  { primary: [180, 80, 255] as number[], glow: [140, 40, 255] as number[], accent: [200, 140, 255] as number[] },
  { primary: [255, 80, 90] as number[], glow: [255, 40, 60] as number[], accent: [255, 140, 150] as number[] },
  { primary: [255, 160, 50] as number[], glow: [240, 120, 20] as number[], accent: [255, 195, 100] as number[] },
  { primary: [80, 200, 255] as number[], glow: [20, 160, 255] as number[], accent: [140, 220, 255] as number[] },
];

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOutCubic = (t: number) => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2;

/* ── Geodesic sphere generation ── */
function genGeo(sub: number) {
  const phi = (1 + Math.sqrt(5)) / 2;
  let verts: number[][] = [
    [-1,phi,0],[1,phi,0],[-1,-phi,0],[1,-phi,0],
    [0,-1,phi],[0,1,phi],[0,-1,-phi],[0,1,-phi],
    [phi,0,-1],[phi,0,1],[-phi,0,-1],[-phi,0,1],
  ].map(v => { const l=Math.sqrt(v[0]**2+v[1]**2+v[2]**2); return [v[0]/l,v[1]/l,v[2]/l]; });
  let faces: number[][] = [
    [0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],
    [1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],
    [3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],
    [4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1],
  ];
  for (let s=0;s<sub;s++) {
    const nf: number[][]=[];
    const mc: Record<string, number>={};
    const gm=(i1: number,i2: number)=>{
      const k=Math.min(i1,i2)+"_"+Math.max(i1,i2);
      if(mc[k]!==undefined)return mc[k];
      const a=verts[i1],b=verts[i2];
      const m=[(a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2];
      const l=Math.sqrt(m[0]**2+m[1]**2+m[2]**2);
      m[0]/=l;m[1]/=l;m[2]/=l;verts.push(m);mc[k]=verts.length-1;return mc[k];
    };
    for(const[a,b,c]of faces){const ab=gm(a,b),bc=gm(b,c),ca=gm(c,a);nf.push([a,ab,ca],[b,bc,ab],[c,ca,bc],[ab,bc,ca]);}
    faces=nf;
  }
  const es=new Set<string>(),edges: number[][]=[];
  for(const[a,b,c]of faces)for(const[i,j]of[[a,b],[b,c],[c,a]]){const k=Math.min(i,j)+"_"+Math.max(i,j);if(!es.has(k)){es.add(k);edges.push([i,j]);}}
  return{verts,edges};
}
const GEO_H=genGeo(2), GEO_L=genGeo(1);

function drawGeoSphere(ctx: CanvasRenderingContext2D,x: number,y: number,radius: number,color: string,alpha: number,rotY: number,rotX: number,geo: {verts: number[][], edges: number[][]},lineW?: number) {
  ctx.save();ctx.globalAlpha=alpha;ctx.strokeStyle=color;ctx.lineWidth=lineW||0.6;
  const cY=Math.cos(rotY),sY=Math.sin(rotY),cX=Math.cos(rotX),sX=Math.sin(rotX);
  const proj=geo.verts.map(v=>{
    let px=v[0]*cY+v[2]*sY,py=v[1],pz=-v[0]*sY+v[2]*cY;
    let py2=py*cX-pz*sX,pz2=py*sX+pz*cX;
    return[x+px*radius,y+py2*radius,pz2];
  });
  for(const[i,j]of geo.edges){
    const a=proj[i],b=proj[j];
    ctx.globalAlpha=alpha*(0.12+0.88*(((a[2]+b[2])/2+1)/2));
    ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke();
  }
  ctx.fillStyle=color;ctx.globalAlpha=alpha*0.5;
  for(const p of proj){if(p[2]>0.1){ctx.beginPath();ctx.arc(p[0],p[1],(0.5+p[2]*0.5)*(radius/24),0,Math.PI*2);ctx.fill();}}
  ctx.globalAlpha=1;ctx.restore();
}

/* ── All spheres in the universe: background + event nodes mixed together ── */
function generateUniverse(w: number, h: number, eventPos: {x: number, y: number}[]) {
  const wW = w * 5, wH = h * 5;
  const allSpheres: {x: number, y: number, baseRadius: number, rotSpeed: number, rotOffset: number, alpha: number, pulsePhase: number, isEvent: boolean}[] = [];

  // ~100 background spheres — same visual style as event nodes
  for (let i = 0; i < 110; i++) {
    const x = (Math.random() - 0.5) * wW;
    const y = (Math.random() - 0.5) * wH;
    // Don't place too close to event nodes
    let skip = false;
    for (const ep of eventPos) { if (Math.hypot(x - ep.x, y - ep.y) < 120) { skip = true; break; } }
    if (skip) { continue; }
    allSpheres.push({
      x, y,
      baseRadius: Math.random() * 16 + 7, // same range as inactive event nodes
      rotSpeed: (Math.random() - 0.5) * 0.0008,
      rotOffset: Math.random() * Math.PI * 2,
      alpha: Math.random() * 0.18 + 0.06,
      pulsePhase: Math.random() * Math.PI * 2,
      isEvent: false,
    });
  }

  // 500+ sparkle particles
  const sparkles: {x: number, y: number, r: number, phase: number, maxAlpha: number, twinkleSpeed: number}[] = [];
  for (let i = 0; i < 500; i++) {
    sparkles.push({
      x: (Math.random() - 0.5) * wW,
      y: (Math.random() - 0.5) * wH,
      r: Math.random() * 1.4 + 0.2,
      phase: Math.random() * Math.PI * 2,
      maxAlpha: Math.random() * 0.4 + 0.03,
      twinkleSpeed: Math.random() * 0.0025 + 0.0006,
    });
  }

  return { bgSpheres: allSpheres, sparkles };
}

function getEventPositions(w: number, h: number) {
  const s = Math.max(w, h) * 0.58;
  return [
    { x: -s * 0.58, y: -s * 0.42 },
    { x: -s * 0.08, y: -s * 0.3 },
    { x: s * 0.38, y: -s * 0.1 },
    { x: s * 0.12, y: s * 0.24 },
    { x: -s * 0.4, y: s * 0.18 },
    { x: s * 0.5, y: s * 0.44 },
  ];
}

/* ── Canvas ── */
function UniverseCanvas({ activeIdx, transitionT, width, height }: { activeIdx: number, transitionT: number, width: number, height: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const S = useRef({
    universe: null as ReturnType<typeof generateUniverse> | null,
    eventPositions: null as ReturnType<typeof getEventPositions> | null,
    camera: { x: 0, y: 0, zoom: 0.4 },
    cc: [...PALETTES[0].primary], cg: [...PALETTES[0].glow], ca: [...PALETTES[0].accent],
    // Smooth activation level per event node (0 = hidden, 1 = fully revealed)
    activationLevels: EVENTS.map(() => 0),
    init: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let running = true;
    const st = S.current;
    const ep = getEventPositions(width, height);

    if (!st.init) {
      st.universe = generateUniverse(width, height, ep);
      st.camera = { x: ep[0].x, y: ep[0].y, zoom: 0.4 };
      st.init = true;
    }
    st.eventPositions = ep;

    function draw(time: number) {
      if (!running) return;
      ctx!.clearRect(0, 0, width, height);
      const cam = st.camera;
      const tp = PALETTES[activeIdx % PALETTES.length];

      // Smooth color interpolation
      for (let c = 0; c < 3; c++) {
        st.cc[c] += (tp.primary[c] - st.cc[c]) * 0.025;
        st.cg[c] += (tp.glow[c] - st.cg[c]) * 0.025;
        st.ca[c] += (tp.accent[c] - st.ca[c]) * 0.025;
      }
      const col = st.cc.map(Math.round);
      const glC = st.cg.map(Math.round);
      const acC = st.ca.map(Math.round);

      // Smoothly animate activation levels for each event node
      for (let i = 0; i < EVENTS.length; i++) {
        const target = (i === activeIdx && transitionT > 0.15) ? transitionT : 0;
        st.activationLevels[i] += (target - st.activationLevels[i]) * 0.04;
        if (st.activationLevels[i] < 0.005) st.activationLevels[i] = 0;
      }

      // Camera — ultra smooth drift
      const t = easeInOutCubic(clamp(transitionT, 0, 1));
      const tX = ep[activeIdx].x;
      const tY = ep[activeIdx].y;
      const tZ = lerp(0.4, 1.5, t);
      // Slower camera follow for cinematic drift
      cam.x += (tX - cam.x) * 0.028;
      cam.y += (tY - cam.y) * 0.028;
      cam.zoom += (tZ - cam.zoom) * 0.032;

      ctx!.save();
      ctx!.translate(width / 2, height / 2);
      ctx!.scale(cam.zoom, cam.zoom);
      ctx!.translate(-cam.x, -cam.y);

      // ── Sparkles ──
      const baseCol = `${Math.round(lerp(col[0],220,0.5))},${Math.round(lerp(col[1],230,0.5))},${Math.round(lerp(col[2],240,0.5))}`;
      for (const sp of st.universe!.sparkles) {
        const tw = Math.sin(time * sp.twinkleSpeed + sp.phase);
        const sa = sp.maxAlpha * (0.15 + 0.85 * Math.max(0, tw));
        const burst = Math.max(0, Math.sin(time * sp.twinkleSpeed * 2.5 + sp.phase));
        const r = sp.r * (1 + burst * 0.5);
        ctx!.beginPath();
        ctx!.arc(sp.x, sp.y, r / Math.sqrt(cam.zoom), 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${baseCol},${sa})`;
        ctx!.fill();
        // Rare cross sparkle
        if (tw > 0.92 && sp.maxAlpha > 0.25) {
          const cr = r * 4 / Math.sqrt(cam.zoom);
          ctx!.strokeStyle = `rgba(${baseCol},${sa * 0.15})`;
          ctx!.lineWidth = 0.25 / cam.zoom;
          ctx!.beginPath(); ctx!.moveTo(sp.x - cr, sp.y); ctx!.lineTo(sp.x + cr, sp.y); ctx!.stroke();
          ctx!.beginPath(); ctx!.moveTo(sp.x, sp.y - cr); ctx!.lineTo(sp.x, sp.y + cr); ctx!.stroke();
        }
      }

      // ── Background spheres — look identical to inactive event nodes ──
      const dormantColor = `rgba(${col[0]},${col[1]},${col[2]},1)`;
      for (const bs of st.universe!.bgSpheres) {
        const pulse = 1 + 0.05 * Math.sin(time * 0.0015 + bs.pulsePhase);
        const rY = time * bs.rotSpeed + bs.rotOffset;
        const rX = time * bs.rotSpeed * 0.6;
        drawGeoSphere(ctx!, bs.x, bs.y, bs.baseRadius * pulse,
          dormantColor, bs.alpha, rY, rX, GEO_L, 0.35 / cam.zoom);
        // Subtle center glow — same as inactive events
        const g = ctx!.createRadialGradient(bs.x, bs.y, 0, bs.x, bs.y, bs.baseRadius * 0.5);
        g.addColorStop(0, `rgba(${col[0]},${col[1]},${col[2]},${bs.alpha * 0.5})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx!.beginPath(); ctx!.arc(bs.x, bs.y, bs.baseRadius * 0.5, 0, Math.PI * 2);
        ctx!.fillStyle = g; ctx!.fill();
      }

      // ── Event nodes — identical to bg spheres when dormant, reveal on activation ──
      for (let i = 0; i < ep.length; i++) {
        const pos = ep[i];
        const act = st.activationLevels[i]; // 0 = dormant, 1 = fully active

        // Dormant size matches background spheres exactly
        const dormantR = 14;
        const activeR = 55;
        const nR = lerp(dormantR, activeR, easeInOutCubic(act));

        const dormantAlpha = 0.12;
        const activeAlpha = 0.55;
        const alpha = lerp(dormantAlpha, activeAlpha, act);

        const rY = time * lerp(0.0004, 0.0008, act) + i * 2;
        const rX = time * lerp(0.0003, 0.0005, act) + i;

        // When dormant: low detail. When active: high detail + inner shell
        const useHighDetail = act > 0.3;
        const sphereColor = act > 0.2
          ? `rgba(${Math.round(lerp(col[0], acC[0], act))},${Math.round(lerp(col[1], acC[1], act))},${Math.round(lerp(col[2], acC[2], act))},1)`
          : dormantColor;

        // Aura — only appears as activation grows
        if (act > 0.05) {
          const aura = ctx!.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, nR * 4);
          aura.addColorStop(0, `rgba(${glC[0]},${glC[1]},${glC[2]},${0.12 * act})`);
          aura.addColorStop(0.35, `rgba(${glC[0]},${glC[1]},${glC[2]},${0.025 * act})`);
          aura.addColorStop(1, "rgba(0,0,0,0)");
          ctx!.beginPath(); ctx!.arc(pos.x, pos.y, nR * 4, 0, Math.PI * 2);
          ctx!.fillStyle = aura; ctx!.fill();
        }

        // Concentric rings — fade in with activation
        if (act > 0.2) {
          for (let r = 0; r < 3; r++) {
            const rPulse = 1 + 0.1 * Math.sin(time * 0.003 + r * 1.4);
            const rr = nR * (1.5 + r * 0.7) * rPulse;
            ctx!.beginPath(); ctx!.arc(pos.x, pos.y, rr, 0, Math.PI * 2);
            ctx!.strokeStyle = `rgba(${acC[0]},${acC[1]},${acC[2]},${(0.07 - r * 0.018) * act})`;
            ctx!.lineWidth = Math.max((0.9 - r * 0.2) / cam.zoom, 0.2);
            ctx!.stroke();
          }
        }

        // Outer wireframe sphere
        drawGeoSphere(ctx!, pos.x, pos.y, nR * 1.15,
          sphereColor, alpha, rY, rX,
          useHighDetail ? GEO_H : GEO_L,
          Math.max(lerp(0.35, 0.75, act) / cam.zoom, 0.2));

        // Inner shell — only when activating
        if (act > 0.25) {
          drawGeoSphere(ctx!, pos.x, pos.y, nR * 0.65,
            "rgba(255,255,255,1)", 0.15 * act,
            -rY * 1.3, -rX, GEO_L,
            Math.max(0.4 / cam.zoom, 0.18));
        }

        // Core glow — scales with activation
        const gOff = nR * 0.15;
        const gw = ctx!.createRadialGradient(pos.x - gOff, pos.y - gOff, 0, pos.x, pos.y, nR * 0.6);
        const coreAlpha = lerp(0.15, 0.85, act);
        gw.addColorStop(0, `rgba(255,255,255,${coreAlpha})`);
        gw.addColorStop(0.3, `rgba(${acC[0]},${acC[1]},${acC[2]},${0.35 * act})`);
        gw.addColorStop(0.7, `rgba(${glC[0]},${glC[1]},${glC[2]},${0.08 * act})`);
        gw.addColorStop(1, "rgba(0,0,0,0)");
        ctx!.beginPath(); ctx!.arc(pos.x, pos.y, nR * 0.6, 0, Math.PI * 2);
        ctx!.fillStyle = gw; ctx!.fill();

        // Center dot
        const dotR = lerp(1.2, 4, act);
        ctx!.beginPath(); ctx!.arc(pos.x, pos.y, dotR, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,255,255,${lerp(0.3, 0.95, act)})`;
        ctx!.fill();

        // Orbiting sparks — only when mostly active
        if (act > 0.5) {
          const sparkAct = (act - 0.5) * 2; // 0→1 over second half
          for (let s = 0; s < 6; s++) {
            const sa = time * 0.004 + (s * Math.PI * 2) / 6;
            const sr = nR * 1.6;
            ctx!.beginPath();
            ctx!.arc(pos.x + Math.cos(sa) * sr, pos.y + Math.sin(sa) * sr * 0.45,
              1.6 / cam.zoom, 0, Math.PI * 2);
            ctx!.fillStyle = `rgba(${acC[0]},${acC[1]},${acC[2]},${(0.25 + 0.2 * Math.sin(time * 0.005 + s)) * sparkAct})`;
            ctx!.fill();
          }
        }
      }

      ctx!.restore();
      frameRef.current = requestAnimationFrame(draw);
    }

    frameRef.current = requestAnimationFrame(draw);
    return () => { running = false; cancelAnimationFrame(frameRef.current); };
  }, [activeIdx, transitionT, width, height]);

  return <canvas ref={canvasRef} width={width} height={height}
    style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />;
}

/* ── Split Info ── */
function SplitInfo({ event, isActive, index, total, palette, isMobile }: {
  event: typeof EVENTS[0], isActive: boolean, index: number, total: number,
  palette: typeof PALETTES[0], isMobile: boolean
}) {
  const acc = palette.accent;
  const cs = `${acc[0]},${acc[1]},${acc[2]}`;
  const show = isActive;

  if (isMobile) {
    return (
      <div style={{
        position: "absolute", left: "50%", transform: "translateX(-50%)",
        bottom: "5%", width: "90vw", maxWidth: "400px",
        opacity: show ? 1 : 0, pointerEvents: show ? "auto" : "none",
        transition: "all 0.9s cubic-bezier(0.22, 1, 0.36, 1)", zIndex: 20,
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px",
          transform: show ? "translateY(0)" : "translateY(20px)", opacity: show ? 1 : 0,
          transition: "all 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s",
        }}>
          <span style={{
            fontFamily: "'IBM Plex Mono',monospace", fontSize: "40px",
            fontWeight: 800, lineHeight: 1, color: `rgba(${cs},0.07)`,
          }}>{String(index + 1).padStart(2, "0")}</span>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span style={{
              padding: "2px 10px", borderRadius: "3px",
              background: `rgba(${cs},0.1)`, border: `1px solid rgba(${cs},0.2)`,
              fontSize: "9px", fontWeight: 700, letterSpacing: "2.5px",
              color: `rgb(${cs})`, textTransform: "uppercase",
              fontFamily: "'IBM Plex Mono',monospace", width: "fit-content",
            }}>{event.tag}</span>
            <span style={{ fontSize: "11px", color: `rgba(${cs},0.45)`, fontFamily: "'IBM Plex Mono',monospace" }}>{event.period}</span>
          </div>
        </div>
        <div style={{
          transform: show ? "translateY(0)" : "translateY(20px)", opacity: show ? 1 : 0,
          transition: "all 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s",
        }}>
          <h2 style={{ fontSize: "20px", fontWeight: 700, lineHeight: 1.3, margin: "0 0 2px", color: "#eaf2ff", fontFamily: "'Outfit',sans-serif" }}>{event.title}</h2>
          <div style={{ fontSize: "13px", fontWeight: 500, color: `rgb(${cs})`, marginBottom: "10px", fontFamily: "'Outfit',sans-serif" }}>{event.org}</div>
          <div style={{ width: "28px", height: "2px", borderRadius: "1px", background: `linear-gradient(90deg, rgb(${cs}), transparent)`, marginBottom: "10px" }} />
          <p style={{ fontSize: "12px", lineHeight: 1.75, color: "rgba(160,190,230,0.55)", margin: 0, fontWeight: 300, fontFamily: "'Outfit',sans-serif" }}>{event.description}</p>
        </div>
        <div style={{ display: "flex", gap: "4px", marginTop: "16px", opacity: show ? 1 : 0, transition: "opacity 0.5s ease 0.35s" }}>
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} style={{
              width: i === index ? "24px" : "4px", height: "2px", borderRadius: "1px",
              background: i === index ? `linear-gradient(90deg,rgb(${cs}),rgba(${cs},0.3))` : i < index ? `rgba(${cs},0.2)` : "rgba(30,60,130,0.12)",
              transition: "all 0.6s cubic-bezier(0.22,1,0.36,1)",
            }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* LEFT — big number, badge, period */}
      <div style={{
        position: "absolute", left: "clamp(40px, 6vw, 100px)", top: "50%",
        transform: `translateY(-50%) translateX(${show ? "0" : "-30px"})`,
        opacity: show ? 1 : 0, pointerEvents: "none",
        transition: "all 0.9s cubic-bezier(0.22, 1, 0.36, 1)", zIndex: 20,
        textAlign: "right", maxWidth: "280px",
      }}>
        <div style={{
          fontSize: "clamp(60px, 8vw, 100px)", fontWeight: 800, lineHeight: 0.85,
          color: `rgba(${cs}, 0.06)`, fontFamily: "'Outfit',sans-serif",
          marginBottom: "8px", letterSpacing: "-3px",
          transform: show ? "translateY(0)" : "translateY(15px)", opacity: show ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.22,1,0.36,1) 0.08s",
        }}>{String(index + 1).padStart(2, "0")}</div>

        <div style={{
          display: "inline-block", padding: "3px 12px", borderRadius: "3px",
          background: `rgba(${cs}, 0.07)`, border: `1px solid rgba(${cs}, 0.15)`,
          fontSize: "9px", fontWeight: 700, letterSpacing: "2.5px",
          color: `rgb(${cs})`, textTransform: "uppercase",
          fontFamily: "'IBM Plex Mono',monospace", marginBottom: "12px",
          transform: show ? "translateY(0)" : "translateY(12px)", opacity: show ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s",
        }}>{event.tag}</div>

        <div style={{
          fontSize: "12px", color: `rgba(${cs}, 0.35)`,
          fontFamily: "'IBM Plex Mono',monospace",
          transform: show ? "translateY(0)" : "translateY(8px)", opacity: show ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s",
        }}>{event.period}</div>
      </div>

      {/* RIGHT — title, org, description */}
      <div style={{
        position: "absolute", right: "clamp(40px, 6vw, 100px)", top: "50%",
        transform: `translateY(-50%) translateX(${show ? "0" : "30px"})`,
        opacity: show ? 1 : 0, pointerEvents: "none",
        transition: "all 0.9s cubic-bezier(0.22, 1, 0.36, 1)", zIndex: 20,
        maxWidth: "360px",
      }}>
        <h2 style={{
          fontSize: "clamp(22px, 2.8vw, 32px)", fontWeight: 700, lineHeight: 1.25,
          margin: "0 0 4px", color: "#eef4ff", fontFamily: "'Outfit',sans-serif",
          transform: show ? "translateY(0)" : "translateY(15px)", opacity: show ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.22,1,0.36,1) 0.12s",
        }}>{event.title}</h2>

        <div style={{
          fontSize: "clamp(14px, 1.6vw, 17px)", fontWeight: 500,
          color: `rgb(${cs})`, marginBottom: "18px", fontFamily: "'Outfit',sans-serif",
          transform: show ? "translateY(0)" : "translateY(12px)", opacity: show ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.22,1,0.36,1) 0.18s",
        }}>{event.org}</div>

        <div style={{
          width: "36px", height: "2px", borderRadius: "1px",
          background: `linear-gradient(90deg, rgb(${cs}), transparent)`,
          marginBottom: "16px",
          transform: show ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left",
          transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.24s",
        }} />

        <p style={{
          fontSize: "clamp(12.5px, 1.2vw, 14px)", lineHeight: 1.8,
          color: "rgba(165, 190, 230, 0.5)", margin: 0, fontWeight: 300,
          fontFamily: "'Outfit',sans-serif", maxWidth: "340px",
          transform: show ? "translateY(0)" : "translateY(12px)", opacity: show ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.22,1,0.36,1) 0.28s",
        }}>{event.description}</p>

        <div style={{
          display: "flex", gap: "4px", marginTop: "24px",
          transform: show ? "translateY(0)" : "translateY(8px)", opacity: show ? 1 : 0,
          transition: "all 0.7s cubic-bezier(0.22,1,0.36,1) 0.38s",
        }}>
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} style={{
              width: i === index ? "26px" : "4px", height: "2.5px", borderRadius: "2px",
              background: i === index ? `linear-gradient(90deg,rgb(${cs}),rgba(${cs},0.35))` : i < index ? `rgba(${cs},0.15)` : "rgba(30,60,130,0.1)",
              transition: "all 0.6s cubic-bezier(0.22,1,0.36,1)",
            }} />
          ))}
        </div>
      </div>
    </>
  );
}

/* ── Scroll nav (minimal) ── */
function ScrollNav({ activeIdx, palette }: { activeIdx: number, palette: typeof PALETTES[0] }) {
  const acc = palette.accent;
  const cs = `${acc[0]},${acc[1]},${acc[2]}`;
  return (
    <div style={{
      position: "fixed", left: "14px", top: "50%",
      transform: "translateY(-50%)", display: "flex",
      flexDirection: "column", alignItems: "center", zIndex: 30,
    }}>
      {EVENTS.map((_, i) => {
        const isA = i === activeIdx, isP = i < activeIdx;
        return (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {i > 0 && <div style={{
              width: "1px", height: "16px",
              background: isP ? `rgba(${cs},0.2)` : "rgba(35,65,130,0.08)",
              transition: "background 0.8s ease",
            }} />}
            <div style={{
              width: isA ? "7px" : "3px", height: isA ? "7px" : "3px", borderRadius: "50%",
              background: isA ? `rgb(${cs})` : isP ? `rgba(${cs},0.25)` : "rgba(35,70,150,0.15)",
              boxShadow: isA ? `0 0 10px rgba(${cs},0.45)` : "none",
              transition: "all 0.6s ease",
            }} />
          </div>
        );
      })}
    </div>
  );
}

/* ── Main ── */
export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollT, setScrollT] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const [transitionT, setTransitionT] = useState(0);
  const [dims, setDims] = useState({ w: 900, h: 600 });
  const [isMobile, setIsMobile] = useState(false);
  const [currentPalette, setCurrentPalette] = useState(PALETTES[0]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    ["https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap",
      "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&display=swap",
    ].forEach((href) => {
      const l = document.createElement("link"); l.href = href; l.rel = "stylesheet";
      document.head.appendChild(l);
    });
  }, []);

  useEffect(() => {
    const hr = () => { setDims({ w: window.innerWidth, h: window.innerHeight }); setIsMobile(window.innerWidth < 768); };
    hr(); window.addEventListener("resize", hr);
    return () => window.removeEventListener("resize", hr);
  }, []);

  useEffect(() => { setCurrentPalette(PALETTES[activeIdx % PALETTES.length]); }, [activeIdx]);

  useEffect(() => {
    const sH = window.innerHeight;
    const tS = EVENTS.length * sH;
    const hs = () => {
      const section = sectionRef.current;
      if (!section) return;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const relativeY = window.scrollY - sectionTop;

      // Only active when scrolling through this section
      // Hide the overlay one full viewport before the section ends
      // so it doesn't bleed into the next section
      if (relativeY < -sH * 0.1 || relativeY > sectionHeight - sH * 1.2) {
        setIsVisible(false);
        return;
      }

      setIsVisible(true);
      const y = Math.max(0, relativeY);
      setScrollT(clamp(y / tS, 0, 1));
      const p = y / sH;
      setActiveIdx(clamp(Math.floor(p), 0, EVENTS.length - 1));
      const w = p - Math.floor(p);
      let tv;
      if (w < 0.12) tv = w / 0.12;
      else if (w > 0.82) tv = (1 - w) / 0.18;
      else tv = 1;
      setTransitionT(clamp(tv, 0, 1));
    };
    window.addEventListener("scroll", hs, { passive: true }); hs();
    return () => window.removeEventListener("scroll", hs);
  }, []);

  return (
    <div id="experience" ref={sectionRef} style={{
      minHeight: `${(EVENTS.length + 1) * 100}vh`,
      background: "radial-gradient(ellipse at 35% 40%, #080e22 0%, #050a18 40%, #020610 100%)",
      position: "relative", fontFamily: "'Outfit',sans-serif",
    }}>
      <div style={{
        position: "fixed", inset: 0, overflow: "hidden",
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
        visibility: isVisible ? "visible" : "hidden",
        transition: "opacity 0.4s ease",
        zIndex: isVisible ? 10 : -1,
      }}>
        <UniverseCanvas activeIdx={activeIdx} transitionT={transitionT} width={dims.w} height={dims.h} />

        {/* Title */}
        <div style={{
          position: "absolute", top: "4.5%", left: "50%",
          transform: "translateX(-50%)", textAlign: "center",
          zIndex: 15, opacity: 1,
        }}>
          <div style={{
            fontSize: "9px", fontWeight: 600, letterSpacing: "6px",
            textTransform: "uppercase", color: "rgba(70,145,255,0.3)",
            fontFamily: "'IBM Plex Mono',monospace", marginBottom: "5px",
          }}>Journey So Far</div>
          <h1 style={{
            fontSize: "clamp(22px,3.2vw,40px)", fontWeight: 800, margin: 0,
            background: "linear-gradient(135deg,#fff 0%,#5a9fff 55%,#2a58b0 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>The Orbital Timeline</h1>
        </div>

        {EVENTS.map((ev, i) => (
          <SplitInfo key={ev.id} event={ev}
            isActive={i === activeIdx && transitionT > 0.4}
            index={i} total={EVENTS.length}
            palette={currentPalette} isMobile={isMobile} />
        ))}

        {!isMobile && isVisible && <ScrollNav activeIdx={activeIdx} palette={currentPalette} />}

        {/* Scroll hint */}
        <div style={{
          position: "absolute", bottom: "24px", left: "50%",
          transform: "translateX(-50%)", display: "flex",
          flexDirection: "column", alignItems: "center", gap: "6px",
          opacity: scrollT < 0.01 ? 1 : 0, transition: "opacity 0.5s ease", zIndex: 15,
        }}>
          <span style={{
            fontSize: "9px", fontWeight: 500, letterSpacing: "4px",
            textTransform: "uppercase", color: "rgba(90,165,255,0.25)",
            fontFamily: "'IBM Plex Mono',monospace",
          }}>Scroll to explore</span>
          <div style={{
            width: "16px", height: "26px", borderRadius: "8px",
            border: "1.5px solid rgba(55,120,240,0.18)",
            display: "flex", justifyContent: "center", paddingTop: "4px",
          }}>
            <div style={{
              width: "2px", height: "6px", borderRadius: "2px",
              background: "rgba(70,150,255,0.35)",
              animation: "scrollPulse 2s ease-in-out infinite",
            }} />
          </div>
        </div>

        <style>{`
          @keyframes scrollPulse { 0%,100%{transform:translateY(0);opacity:1} 50%{transform:translateY(6px);opacity:0.12} }
        `}</style>
      </div>
    </div>
  );
}
