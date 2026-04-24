import { useState, useEffect } from "react";

const PAGE_SIZE = 10;

const CarParts = () => {
  const [parts, setParts] = useState([]);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParts = async () => {
      const headers = new Headers();
      const apiKey = import.meta.env.VITE_ACCESS_KEY;

      if (apiKey) {
        headers.append("X-Access-Key", apiKey);
      }

      try {
        const response = await fetch("https://api.jsonbin.io/v3/b/69e535e236566621a8ce210a", { headers });
        if (!response.ok) throw new Error("Error al obtener los datos");
        const data = await response.json();
        setParts(data.record.repuestos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchParts();
  }, []);

  if (loading) return <p style={{ padding: "2rem" }}>Cargando repuestos...</p>;
  if (error) return <p style={{ padding: "2rem", color: "red" }}>Error: {error}</p>;

  return (
    <main style={{ padding: "2rem" }}>
      <h2>Catálogo de Repuestos</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
        {parts.slice(0, visible).map((part, index) => (
          <div key={index} style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "1rem", background: "#f9f9f9" }}>
            <h3 style={{ margin: "0 0 0.5rem", color: "#1a1a2e" }}>{part.nombre}</h3>
            <p style={{ margin: "0.25rem 0" }}> Categoría: {part.categoria}</p>
            <p style={{ margin: "0.25rem 0" }}> Precio: ₡{part.precio}</p>
            <p style={{ margin: "0.25rem 0" }}> Stock: {part.stock}</p>
          </div>
        ))}
      </div>

      {visible < parts.length && (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button
            onClick={() => setVisible((prev) => prev + PAGE_SIZE)}
            style={{ padding: "0.75rem 2rem", background: "#e94560", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "1rem" }}
          >
            Ver más
          </button>
        </div>
      )}
    </main>
  );
};

export default CarParts;