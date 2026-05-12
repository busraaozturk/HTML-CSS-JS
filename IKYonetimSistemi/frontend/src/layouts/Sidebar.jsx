import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        backgroundColor: "#334155",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h3>Menü</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <Link to="/" style={linkStyle}>
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/personel" style={linkStyle}>
            Personel
          </Link>
        </li>

        <li>
          <Link to="/izin" style={linkStyle}>
            İzin
          </Link>
        </li>

        <li>
          <Link to="/departman" style={linkStyle}>
            Departman
          </Link>
        </li>
      </ul>
    </div>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  display: "block",
  marginBottom: "10px",
};

export default Sidebar;