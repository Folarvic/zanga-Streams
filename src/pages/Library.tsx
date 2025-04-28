
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import MusicCard from "@/components/MusicCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePlaylist } from "@/context/PlaylistContext";
import { useAuth } from "@/context/AuthContext";
import { Plus } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

const Library = () => {
  const { playlists } = usePlaylist();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("playlists");

  // Mock data for favorite artists
  const favoriteArtists = [
    {
      title: "The Weeknd",
      artist: "Artist",
      coverUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    },
    {
      title: "Doja Cat",
      artist: "Artist",
      coverUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
    }
  ];

  return (
    <Layout>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Library</h1>
        <div className="flex gap-3">
          {user && (
            <Button 
              onClick={() => navigate("/create-playlist")}
              className="gap-2"
            >
              <Plus size={16} /> Create Playlist
            </Button>
          )}
          <Button 
            className="bg-primary"
            onClick={() => navigate("/upgrade")}
          >
            Upgrade to Premium
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
          <TabsTrigger value="artists">Artists</TabsTrigger>
          <TabsTrigger value="albums">Albums</TabsTrigger>
          <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="playlists" className="mt-0">
          <div className="space-y-6">
            <section>
              <h2 className="mb-4 text-2xl font-medium">Your Playlists</h2>
              {user ? (
                playlists.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {playlists.map((playlist) => (
                      <Card 
                        key={playlist.id} 
                        className="cursor-pointer transition-transform hover:scale-[1.02]"
                        onClick={() => navigate(`/playlist/${playlist.id}`)}
                      >
                        <CardHeader className="pb-2">
                          <CardTitle>{playlist.title}</CardTitle>
                          <CardDescription>
                            {playlist.is_public ? "Public playlist" : "Private playlist"}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p className="line-clamp-2 text-sm text-muted-foreground">
                            {playlist.description || "No description"}
                          </p>
                        </CardContent>
                        <CardFooter>
                          <p className="text-xs text-muted-foreground">
                            Created on {new Date(playlist.created_at).toLocaleDateString()}
                          </p>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl bg-card p-6 text-center">
                    <h3 className="mb-2 text-lg font-medium">No saved playlists yet</h3>
                    <p className="mb-4 text-muted-foreground">Create your first playlist to start organizing your music</p>
                    <Button 
                      className="bg-primary"
                      onClick={() => navigate("/create-playlist")}
                    >
                      Create Playlist
                    </Button>
                  </div>
                )
              ) : (
                <div className="rounded-xl bg-card p-6 text-center">
                  <h3 className="mb-2 text-lg font-medium">Sign in to see your playlists</h3>
                  <p className="mb-4 text-muted-foreground">Create and manage your own music collections</p>
                  <Button 
                    className="bg-primary"
                    onClick={() => document.getElementById("sign-in-trigger")?.click()}
                  >
                    Sign In
                  </Button>
                </div>
              )}
            </section>
            
            <section>
              <h2 className="mb-4 text-2xl font-medium">Recently Played</h2>
              {user ? (
                <div className="rounded-xl bg-card p-6 text-center">
                  <p className="text-muted-foreground">
                    No recently played items
                  </p>
                </div>
              ) : (
                <div className="rounded-xl bg-card p-6 text-center">
                  <p className="text-muted-foreground">
                    Sign in to see your recently played items
                  </p>
                </div>
              )}
            </section>
          </div>
        </TabsContent>
        
        <TabsContent value="artists" className="mt-0">
          <div className="space-y-6">
            <section>
              <h2 className="mb-4 text-2xl font-medium">Followed Artists</h2>
              {user ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {favoriteArtists.map((artist, index) => (
                    <MusicCard 
                      key={index}
                      title={artist.title}
                      artist={artist.artist}
                      coverUrl={artist.coverUrl}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl bg-card p-6 text-center">
                  <h3 className="mb-2 text-lg font-medium">Sign in to follow artists</h3>
                  <p className="text-muted-foreground">Follow your favorite artists to see them here</p>
                </div>
              )}
            </section>
          </div>
        </TabsContent>
        
        <TabsContent value="albums" className="mt-0">
          <div className="rounded-xl bg-card p-6 text-center">
            <h3 className="mb-2 text-lg font-medium">No saved albums</h3>
            <p className="text-muted-foreground">Save albums to your library to see them here</p>
          </div>
        </TabsContent>
        
        <TabsContent value="podcasts" className="mt-0">
          <div className="rounded-xl bg-card p-6 text-center">
            <h3 className="mb-2 text-lg font-medium">No followed podcasts</h3>
            <p className="text-muted-foreground">Follow podcasts to see them here</p>
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Library;
