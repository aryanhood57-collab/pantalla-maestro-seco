import { useState, useEffect, useRef } from "react";

// ════════════════════════════════════════════════════════════
// PANTALLA MAESTRA — OPERACIÓN: CÓDIGO VERDE
// Técnico Superior en Servicios Empresariales + Construcción
// EDA1001 | II Cuatrimestre 2026 | Solo para la Directora
// ════════════════════════════════════════════════════════════

const EQUIPOS = [
  { nombre: "ALFA",    version: "A", color: "#4A7C59", icono: "🏗️" },
  { nombre: "BETA",    version: "B", color: "#1565C0", icono: "🏢" },
  { nombre: "GAMMA",   version: "A", color: "#6B5B95", icono: "📊" },
  { nombre: "DELTA",   version: "B", color: "#6A1B9A", icono: "🔧" },
  { nombre: "ÉPSILON", version: "A", color: "#C0622F", icono: "♻️" },
];

const DURACION_GLOBAL = 90 * 60;

const RETOS_INFO = [
  { id:1, bloque:"CALENTAMIENTO", tiempo:10 },
  { id:2, bloque:"CALENTAMIENTO", tiempo:10 },
  { id:3, bloque:"CALENTAMIENTO", tiempo:10 },
  { id:4, bloque:"NÚCLEO TÉCNICO", tiempo:8 },
  { id:5, bloque:"NÚCLEO TÉCNICO", tiempo:8 },
  { id:6, bloque:"NÚCLEO TÉCNICO", tiempo:8 },
  { id:7, bloque:"NÚCLEO TÉCNICO", tiempo:8 },
  { id:8, bloque:"SPRINT FINAL",  tiempo:5 },
  { id:9, bloque:"SPRINT FINAL",  tiempo:5 },
  { id:10,bloque:"SPRINT FINAL",  tiempo:5 },
];

export default function PantallaMaestra() {
  const [tiempoGlobal, setTiempoGlobal] = useState(DURACION_GLOBAL);
  const [corriendo, setCorriendo] = useState(false);
  const [progreso, setProgreso] = useState(
    Object.fromEntries(EQUIPOS.map(e => [e.nombre, 0]))
  );
  const intervalo = useRef(null);

  useEffect(() => {
    if (corriendo && tiempoGlobal > 0) {
      intervalo.current = setInterval(() => setTiempoGlobal(t => t - 1), 1000);
    } else {
      clearInterval(intervalo.current);
    }
    return () => clearInterval(intervalo.current);
  }, [corriendo, tiempoGlobal]);

  const formatTiempo = (seg) => {
    const m = Math.floor(seg / 60).toString().padStart(2, "0");
    const s = (seg % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const avanzarEquipo = (nombre) => {
    setProgreso(prev => ({
      ...prev,
      [nombre]: Math.min(prev[nombre] + 1, 10)
    }));
  };

  const retrocederEquipo = (nombre) => {
    setProgreso(prev => ({
      ...prev,
      [nombre]: Math.max(prev[nombre] - 1, 0)
    }));
  };

  const resetear = () => {
    setCorriendo(false);
    setTiempoGlobal(DURACION_GLOBAL);
    setProgreso(Object.fromEntries(EQUIPOS.map(e => [e.nombre, 0])));
  };

  const porcentajeGlobal = ((DURACION_GLOBAL - tiempoGlobal) / DURACION_GLOBAL) * 100;
  const colorCronometro = tiempoGlobal > 1800 ? "#2E7D32" : tiempoGlobal > 600 ? "#F57C00" : "#C62828";

  return (
    <div style={{ minHeight:"100vh", background:"#0D1B0F", fontFamily:"Arial,sans-serif", padding:"20px" }}>
      {/* ENCABEZADO */}
      <div style={{ textAlign:"center", marginBottom:"24px" }}>
        <h1 style={{ color:"#69F0AE", margin:0, fontSize:"22px", letterSpacing:"3px" }}>
          🌿 OPERACIÓN: CÓDIGO VERDE — PANTALLA MAESTRA
        </h1>
        <p style={{ color:"#A5D6A7", margin:"4px 0 0", fontSize:"13px" }}>
          SE+CO · EDA1001 · II Cuatrimestre 2026 · Solo Directora Operativa
        </p>
      </div>

      {/* CRONÓMETRO GLOBAL */}
      <div style={{ background:"#1B2B1C", borderRadius:"16px", padding:"24px", marginBottom:"20px", textAlign:"center", border:`2px solid ${colorCronometro}` }}>
        <p style={{ color:"#888", margin:"0 0 8px", fontSize:"12px", letterSpacing:"3px" }}>TIEMPO GLOBAL RESTANTE</p>
        <div style={{ fontSize:"72px", fontWeight:"900", color: colorCronometro, letterSpacing:"6px", lineHeight:1 }}>
          {formatTiempo(tiempoGlobal)}
        </div>
        {/* Barra de progreso */}
        <div style={{ background:"#2E3F2F", borderRadius:"8px", height:"10px", margin:"16px 0 20px", overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${porcentajeGlobal}%`, background: colorCronometro, transition:"width 1s linear", borderRadius:"8px" }} />
        </div>
        <div style={{ display:"flex", justifyContent:"center", gap:"12px", flexWrap:"wrap" }}>
          {!corriendo ? (
            <button onClick={() => setCorriendo(true)}
              style={{ padding:"12px 32px", background:"#2E7D32", color:"#fff", border:"none", borderRadius:"10px", fontSize:"15px", fontWeight:"bold", cursor:"pointer", letterSpacing:"1px" }}>
              ▶ INICIAR
            </button>
          ) : (
            <button onClick={() => setCorriendo(false)}
              style={{ padding:"12px 32px", background:"#E65100", color:"#fff", border:"none", borderRadius:"10px", fontSize:"15px", fontWeight:"bold", cursor:"pointer" }}>
              ⏸ PAUSAR
            </button>
          )}
          <button onClick={resetear}
            style={{ padding:"12px 24px", background:"#37474F", color:"#CFD8DC", border:"none", borderRadius:"10px", fontSize:"14px", cursor:"pointer" }}>
            ↺ REINICIAR
          </button>
        </div>
      </div>

      {/* PROGRESO POR EQUIPO */}
      <div style={{ marginBottom:"20px" }}>
        <h2 style={{ color:"#69F0AE", fontSize:"14px", letterSpacing:"2px", marginBottom:"12px" }}>
          📊 PROGRESO DE EQUIPOS
        </h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"12px" }}>
          {EQUIPOS.map(eq => {
            const retos = progreso[eq.nombre];
            const pct = (retos / 10) * 100;
            return (
              <div key={eq.nombre} style={{ background:"#1B2B1C", borderRadius:"12px", padding:"16px", border:`1px solid ${eq.color}44` }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"10px" }}>
                  <div>
                    <span style={{ fontSize:"20px" }}>{eq.icono}</span>
                    <span style={{ color: eq.color, fontWeight:"bold", fontSize:"16px", marginLeft:"8px" }}>
                      EQUIPO {eq.nombre}
                    </span>
                    <span style={{ color:"#888", fontSize:"11px", marginLeft:"8px" }}>v{eq.version}</span>
                  </div>
                  <div style={{ color:"#fff", fontWeight:"bold", fontSize:"18px" }}>{retos}/10</div>
                </div>
                {/* Barra de progreso del equipo */}
                <div style={{ background:"#2E3F2F", borderRadius:"6px", height:"8px", marginBottom:"12px", overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${pct}%`, background: eq.color, transition:"width 0.3s", borderRadius:"6px" }} />
                </div>
                {/* Indicadores de retos */}
                <div style={{ display:"flex", gap:"4px", flexWrap:"wrap", marginBottom:"12px" }}>
                  {Array.from({length:10}, (_,i) => (
                    <div key={i} style={{ width:"22px", height:"22px", borderRadius:"4px", background: i < retos ? eq.color : "#2E3F2F", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"10px", color: i < retos ? "#fff" : "#546E7A", fontWeight:"bold" }}>
                      {i+1}
                    </div>
                  ))}
                </div>
                {/* Controles */}
                <div style={{ display:"flex", gap:"8px" }}>
                  <button onClick={() => retrocederEquipo(eq.nombre)} disabled={retos === 0}
                    style={{ flex:1, padding:"6px", background: retos === 0 ? "#263238" : "#37474F", color: retos === 0 ? "#546E7A" : "#CFD8DC", border:"none", borderRadius:"6px", cursor: retos === 0 ? "not-allowed" : "pointer", fontSize:"16px" }}>
                    ◀
                  </button>
                  <button onClick={() => avanzarEquipo(eq.nombre)} disabled={retos === 10}
                    style={{ flex:2, padding:"6px", background: retos === 10 ? "#1B5E20" : eq.color, color:"#fff", border:"none", borderRadius:"6px", cursor: retos === 10 ? "default" : "pointer", fontWeight:"bold", fontSize:"13px" }}>
                    {retos === 10 ? "✅ COMPLETO" : `RETO ${retos + 1} ✓`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* REFERENCIA RÁPIDA DE BLOQUES */}
      <div style={{ background:"#1B2B1C", borderRadius:"12px", padding:"16px" }}>
        <h2 style={{ color:"#69F0AE", fontSize:"13px", letterSpacing:"2px", marginBottom:"12px" }}>⏱️ ESTRUCTURA DE TIEMPOS</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"8px" }}>
          {[
            { bloque:"🟢 CALENTAMIENTO", retos:"Retos 1–3", tiempo:"10 min c/u", color:"#2E7D32" },
            { bloque:"🟡 NÚCLEO TÉCNICO", retos:"Retos 4–7", tiempo:"8 min c/u", color:"#E65100" },
            { bloque:"🔴 SPRINT FINAL",   retos:"Retos 8–10", tiempo:"5 min c/u", color:"#C62828" },
          ].map((b, i) => (
            <div key={i} style={{ background:"#263238", borderRadius:"8px", padding:"12px", borderLeft:`3px solid ${b.color}` }}>
              <p style={{ color:"#fff", margin:"0 0 4px", fontWeight:"bold", fontSize:"13px" }}>{b.bloque}</p>
              <p style={{ color:"#90A4AE", margin:0, fontSize:"12px" }}>{b.retos} · {b.tiempo}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop:"12px", background:"#263238", borderRadius:"8px", padding:"12px", textAlign:"center" }}>
          <p style={{ color:"#80CBC4", margin:0, fontSize:"12px" }}>
            Apertura: 8 min · Retos: 77 min · Cierre: 5 min = <strong style={{ color:"#69F0AE" }}>90 min ✅</strong>
          </p>
          <p style={{ color:"#888", margin:"6px 0 0", fontSize:"11px" }}>
            Versión A: COMPACTADOR · Versión B: VERTIMIENTO
          </p>
        </div>
      </div>
    </div>
  );
}
