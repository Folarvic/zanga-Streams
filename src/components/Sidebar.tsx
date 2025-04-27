import { HomeIcon, ListMusic, Search, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "./ui/button";
import { AuthForm } from "./auth/AuthForm";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Sidebar = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <aside className="h-full w-64 flex-shrink-0 border-r bg-sidebar p-4">
      <div className="mb-8 flex items-center gap-2 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-zanga-purple">
          <span className="text-lg font-bold text-white">Z</span>
        </div>
        <h1 className="text-xl font-bold text-white">ZANGA</h1>
      </div>
      
      <div className="space-y-2">
        <p className="px-2 text-xs font-semibold text-muted-foreground">
          MAIN
        </p>
        <nav className="space-y-1">
          <Link to="/" className="flex items-center gap-3 rounded-md px-2 py-2 text-white hover:bg-accent">
            <HomeIcon size={20} className="text-zanga-purple" />
            <span>Home</span>
          </Link>
          <Link to="/browse" className="flex items-center gap-3 rounded-md px-2 py-2 text-white hover:bg-accent">
            <Search size={20} className="text-white" />
            <span>Browse</span>
          </Link>
          <Link to="/library" className="flex items-center gap-3 rounded-md px-2 py-2 text-white hover:bg-accent">
            <ListMusic size={20} className="text-white" />
            <span>Your Library</span>
          </Link>
        </nav>
      </div>
      
      <div className="mt-6 space-y-2">
        <p className="px-2 text-xs font-semibold text-muted-foreground">
          PLAYLISTS
        </p>
        <div className="space-y-1">
          <button className="w-full text-left">
            <p className="line-clamp-1 rounded-md px-2 py-2 text-sm hover:bg-accent">Favorites</p>
          </button>
          <button className="w-full text-left">
            <p className="line-clamp-1 rounded-md px-2 py-2 text-sm hover:bg-accent">Chill Vibes</p>
          </button>
          <button className="w-full text-left">
            <p className="line-clamp-1 rounded-md px-2 py-2 text-sm hover:bg-accent">Workout Mix</p>
          </button>
          <button className="w-full text-left">
            <p className="line-clamp-1 rounded-md px-2 py-2 text-sm hover:bg-accent">Study Session</p>
          </button>
        </div>
      </div>
      
      <div className="mt-auto pt-8">
        {user ? (
          <div className="flex items-center justify-between rounded-md bg-card p-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <User size={14} />
              </div>
              <div>
                <p className="text-sm font-medium">{user.email}</p>
                <p className="text-xs text-muted-foreground">Premium User</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Sheet>
            <SheetTrigger asChild>
              <Button className="w-full">Sign In</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Authentication</SheetTitle>
                <SheetDescription>
                  Sign in to access all features
                </SheetDescription>
              </SheetHeader>
              <AuthForm />
            </SheetContent>
          </Sheet>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
