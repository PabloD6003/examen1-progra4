import { Link } from "@tanstack/react-router";

const Home = () => {
  return (
    <main style={{ padding: "3rem 2rem", textAlign: "center" }}>
      <h2>Bienvenido al catálogo de repuestos</h2>
      <p>Encuentra los repuestos que necesitas para tu vehículo.</p>
      <Link to="/carparts" style={{ display: "inline-block", marginTop: "1rem", padding: "0.75rem 2rem", background: "#e94560", color: "#fff", borderRadius: "8px", textDecoration: "none" }}>
        Ver repuestos
      </Link>
    </main>
  );
};

export default Home;