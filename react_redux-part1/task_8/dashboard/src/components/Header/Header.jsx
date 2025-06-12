import { StyleSheet, css } from "aphrodite";
import logo from "../../assets/holberton-logo.jpg";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const styles = StyleSheet.create({
  header: { /* styles */ },
  title: { /* styles */ },
  logo: { /* styles */ },
  logoutSection: { /* styles */ },
});

export default function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  const handleLogout = (e) => {
    e.preventDefault();
    console.log("Logout clicked"); // debug
    dispatch(logout());
  };

  console.log("Header render", { isLoggedIn, user }); // debug

  return (
    <div className={css(styles.header)}>
      <img src={logo} className={css(styles.logo)} alt="holberton logo" />
      <h1 className={css(styles.title)}>School Dashboard</h1>
      {isLoggedIn && (
        <div className={css(styles.logoutSection)} id="logoutSection">
          Welcome <b>{user.email}</b>{" "}
          <a href="#" onClick={handleLogout}>
            (logout)
          </a>
        </div>
      )}
    </div>
  );
}
