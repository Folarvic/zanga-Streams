
import Layout from "@/components/Layout";
import MusicCard from "@/components/MusicCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Library = () => {
  // Mock data for saved playlists
  const savedPlaylists = [
    {
      title: "My Favorites",
      artist: "Personal Playlist",
      coverUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
    },
    {
      title: "Workout Mix",
      artist: "Personal Playlist",
      coverUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
    },
    {
      title: "Road Trip",
      artist: "Personal Playlist",
      coverUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    }
  ];

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
        <button className="rounded-full bg-zanga-purple px-4 py-2 text-sm font-medium text-white hover:bg-zanga-deep-purple">
          Upgrade to Premium
        </button>
      </div>
      
      <Tabs defaultValue="playlists" className="w-full">
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
              {savedPlaylists.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {savedPlaylists.map((playlist, index) => (
                    <MusicCard 
                      key={index}
                      title={playlist.title}
                      artist={playlist.artist}
                      coverUrl={playlist.coverUrl}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl bg-card p-6 text-center">
                  <h3 className="mb-2 text-lg font-medium">No saved playlists yet</h3>
                  <p className="mb-4 text-muted-foreground">Create your first playlist to start organizing your music</p>
                  <button className="rounded-full bg-zanga-purple px-4 py-2 text-sm font-medium text-white hover:bg-zanga-deep-purple">
                    Create Playlist
                  </button>
                </div>
              )}
            </section>
            
            <section>
              <h2 className="mb-4 text-2xl font-medium">Recently Played</h2>
              <div className="rounded-xl bg-card p-6 text-center">
                <p className="text-muted-foreground">
                  Sign in to see your recently played items
                </p>
              </div>
            </section>
          </div>
        </TabsContent>
        
        <TabsContent value="artists" className="mt-0">
          <div className="space-y-6">
            <section>
              <h2 className="mb-4 text-2xl font-medium">Followed Artists</h2>
              {favoriteArtists.length > 0 ? (
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
                  <h3 className="mb-2 text-lg font-medium">No followed artists</h3>
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
