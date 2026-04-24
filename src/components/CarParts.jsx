import { useState, useEffect } from "react";

const PAGE_SIZE = 10;

const CarParts = () => {
  const [parts, setParts] = useState([]);
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParts = async () => {
      const headers = new Headers();
      const apiKey = import.meta.env.VITE_JSONBIN_ACCESS_KEY;

      if (apiKey) {
        headers.append("X-Access-Key", apiKey);
      }

      try {
        const response = await fetch("https://api.jsonbin.io/v3/b/69e535e236566621a8ce210a", { headers });
        if (!response.ok) throw new Error("Error al obtener los datos");
        const data = await response.json();
        setParts(data.record.articles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchParts();
  }, []);

  const filtered = parts.filter((part) =>
    part.articleProductName.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setVisible(PAGE_SIZE);
  };

  //  Loading state
  if (loading) return (
    <div style={{ padding: "3rem", textAlign: "center" }}>
      <p style={{ fontSize: "1.2rem", color: "#555" }}> Cargando repuestos...</p>
    </div>
  );

  //  Error state
  if (error) return (
    <div style={{ padding: "3rem", textAlign: "center" }}>
      <p style={{ fontSize: "1.2rem", color: "red" }}> Error: {error}</p>
      <button
        onClick={() => window.location.reload()}
        style={{ marginTop: "1rem", padding: "0.75rem 2rem", background: "#e94560", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}
      >
        Reintentar
      </button>
    </div>
  );

  return (
    <main style={{ padding: "2rem" }}>
      <h2>Catálogo de Repuestos</h2>

      <input
        type="text"
        placeholder="Buscar repuesto por nombre..."
        value={search}
        onChange={handleSearch}
        style={{ width: "100%", padding: "0.75rem 1rem", fontSize: "1rem", borderRadius: "8px", border: "1px solid #ccc", marginTop: "1rem", marginBottom: "1.5rem", boxSizing: "border-box" }}
      />

      {/*  Empty state */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "#888" }}>
          <p style={{ fontSize: "1.5rem" }}> No se encontraron repuestos</p>
          <p>Intenta con otro término de búsqueda.</p>
        </div>
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1rem" }}>
            {filtered.slice(0, visible).map((part) => (
              <div key={part.articleId} style={{ border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden", background: "#f9f9f9" }}>
                <img
                  src={part.s3image}
                  alt={part.articleProductName}
                  style={{ width: "100%", height: "160px", objectFit: "cover" }}
                  onError={(e) => e.target.style.display = "none"}
                />
                <div style={{ padding: "1rem" }}>
                  <h3 style={{ margin: "0 0 0.5rem", color: "#1a1a2e" }}>{part.articleProductName}</h3>
                  <p style={{ margin: "0.25rem 0", color: "#555" }}> {part.articleNo}</p>
                  <p style={{ margin: "0.25rem 0", color: "#555" }}> {part.supplierName}</p>
                </div>
              </div>
            ))}
          </div>

          {visible < filtered.length && (
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <button
                onClick={() => setVisible((prev) => prev + PAGE_SIZE)}
                style={{ padding: "0.75rem 2rem", background: "#e94560", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "1rem" }}
              >
                Ver más
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default CarParts;