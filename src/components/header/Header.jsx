import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Header() {
  const cookie = new Cookies();
  const token = cookie.get("Bearer");
  const navigate = useNavigate();

  async function handleLogout() {
    await axios.post("http://127.0.0.1:8000/api/logout", null, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    cookie.remove("Bearer");
    navigate("/");
  }
  return (
    <div className="container shadow">
      <nav className="d-flex p-2">
        <div className="d-flex">
          <div style={{ padding: "10px" }}>
            <Link to="/">Home</Link>
          </div>
          <div style={{ padding: "10px" }}>
            <Link to="/about">About</Link>
          </div>
        </div>
        <div className="d-flex">
          {!token ? (
            <>
              <Link
                to="/register"
                style={{ textAlign: "center" }}
                className="register-nav"
              >
                Register
              </Link>
              <Link
                to="/login"
                style={{ textAlign: "center" }}
                className="register-nav"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                style={{ textAlign: "center" }}
                className="register-nav"
              >
                Dashboard
              </Link>
              <div
                style={{ textAlign: "center" }}
                className="register-nav"
                onClick={handleLogout}
              >
                Logout
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
