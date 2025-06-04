import { useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";
import Dashboard from "../components/admin/Dashboard";
import Users from "../components/admin/Users";
import Courses from "../components/admin/Courses";
import Instructors from "../components/admin/Instructors";
import Reports from "../components/admin/Reports";
import Settings from "../components/admin/Settings";
import Support from "../components/admin/Support";

const AdminPanel = ({ toggleTheme }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const renderTab = () => {
    switch (activeTab) {
      case "dashboard": return <Dashboard />;
      case "users": return <Users />;
      case "courses": return <Courses />;
      case "instructors": return <Instructors />;
      case "reports": return <Reports />;
      case "settings": return <Settings />;
      case "support": return <Support />;
      default: return <Dashboard />;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Topbar />
        <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem" }}>
          {renderTab()}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;