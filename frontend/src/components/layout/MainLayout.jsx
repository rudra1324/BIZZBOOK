import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function MainLayout({ children }) {
  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Navbar />

        <main className="flex-1 overflow-y-auto">

          <div className="max-w-[1700px] mx-auto px-8 py-8">

            {children}

          </div>

        </main>

      </div>

    </div>
  );
}

export default MainLayout;