import Sidebar from "./Sidebar.jsx";
import TopBar from "./TopBar.jsx";
import { PageContainer } from "./primitives.jsx";

const AppShell = ({ title, description, children, actions }) => {
  return (
    <div className="app-shell text-[var(--text-0)]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col lg:flex-row">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <TopBar title={title} description={description} actions={actions} />
          <main id="main-content" className="min-w-0">
            <PageContainer>{children}</PageContainer>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppShell;
