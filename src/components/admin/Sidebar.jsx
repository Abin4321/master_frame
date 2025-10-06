

const Sidebar = ({ activeTab, setActiveTab }) => {
  const items = [
    { key: "dashboard", label: "Dashboard" },
    { key: "users", label: "Users" },
    { key: "courses", label: "Courses" },
    { key: "instructors", label: "Instructors" },
    { key: "reports", label: "Reports" },
    { key: "settings", label: "Settings" },
    { key: "support", label: "Support" },
  ];

  return (
    <div style={{
      width: "240px", background: "#1e1e2f", color: "#fff", padding: "1rem",
      display: "flex", flexDirection: "column", gap: "1rem"
    }}>
      <h2 style={{ marginBottom: "2rem" }}>Admin</h2>
      {items.map(item => (
        <div
          key={item.key}
          onClick={() => setActiveTab(item.key)}
          style={{
            padding: "0.75rem 1rem",
            background: activeTab === item.key ? "#34344a" : "transparent",
            borderRadius: "0.5rem",
            cursor: "pointer"
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
