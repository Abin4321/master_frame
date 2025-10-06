

const Topbar = () => {
  return (
    <div style={{
      height: "60px",
      background: "#fff",
      borderBottom: "1px solid #eee",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 1.5rem"
    }}>
      <h3>Admin Panel</h3>
      <div>
        <span style={{ marginRight: "1rem" }}>Welcome, Admin</span>
        <button style={{ padding: "0.5rem 1rem" }}>Logout</button>
      </div>
    </div>
  );
};

export default Topbar;
