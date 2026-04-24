const Navbar = () => {
  return (
    <nav style={{ background: "#1a1a2e", padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <h1 style={{ color: "#e94560", margin: 0 }}>🔧 CarParts</h1>
      <ul style={{ listStyle: "none", display: "flex", gap: "1.5rem", margin: 0, padding: 0 }}>
        <li><a href="/" style={{ color: "#fff", textDecoration: "none" }}>Home</a></li>
        <li><a href="/carparts" style={{ color: "#fff", textDecoration: "none" }}>Repuestos</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;