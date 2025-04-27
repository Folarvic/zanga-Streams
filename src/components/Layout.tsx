
import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import MusicPlayer from "./MusicPlayer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
      <MusicPlayer />
    </div>
  );
};

export default Layout;
