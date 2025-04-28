
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePlaylist } from "@/context/PlaylistContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string | null;
  cover_url: string | null;
  audio_url: string;
  duration: number;
}

const Search = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [searching, setSearching] = useState(false);
  const [addingToPlaylist, setAddingToPlaylist] = useState<string | null>(null);
  const { user } = useAuth();
  const { playlists } = usePlaylist();
  
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setSearching(true);
    
    try {
      // Search songs by title or artist
      const { data, error } = await supabase
        .from("songs")
        .select("*")
        .or(`title.ilike.%${searchQuery}%,artist.ilike.%${searchQuery}%`)
        .limit(20);
        
      if (error) throw error;
      
      setSearchResults(data || []);
    } catch (error) {
      console.error("Error searching songs:", error);
      toast.error("Failed to search songs");
    } finally {
      setSearching(false);
    }
  };
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await performSearch(query);
  };
  
  const addSongToPlaylist = async (songId: string, playlistId: string) => {
    try {
      setAddingToPlaylist(songId);
      
      // Check if song is already in the playlist
      const { data: existing, error: checkError } = await supabase
        .from("playlist_songs")
        .select("*")
        .eq("playlist_id", playlistId)
        .eq("song_id", songId)
        .single();
        
      if (!checkError && existing) {
        toast.info("This song is already in the playlist");
        return;
      }
      
      // Add song to playlist
      const { error } = await supabase
        .from("playlist_songs")
        .insert({ playlist_id: playlistId, song_id: songId });
        
      if (error) throw error;
      
      toast.success("Added to playlist");
    } catch (error) {
      console.error("Error adding song to playlist:", error);
      toast.error("Failed to add song to playlist");
    } finally {
      setAddingToPlaylist(null);
    }
  };

  useEffect(() => {
    // Load featured songs on initial load
    const loadFeaturedSongs = async () => {
      try {
        const { data, error } = await supabase
          .from("songs")
          .select("*")
          .limit(10);
          
        if (error) throw error;
        
        setSearchResults(data || []);
      } catch (error) {
        console.error("Error loading featured songs:", error);
      }
    };
    
    loadFeaturedSongs();
  }, []);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="mb-4 text-3xl font-bold">Search</h1>
        
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            placeholder="Search songs, artists, albums..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="max-w-xl"
          />
          <Button type="submit" disabled={searching}>
            <SearchIcon size={18} className="mr-2" />
            {searching ? "Searching..." : "Search"}
          </Button>
        </form>
      </div>
      
      <Tabs defaultValue="songs">
        <TabsList>
          <TabsTrigger value="songs">Songs</TabsTrigger>
          <TabsTrigger value="artists">Artists</TabsTrigger>
          <TabsTrigger value="albums">Albums</TabsTrigger>
        </TabsList>
        
        <TabsContent value="songs" className="mt-6">
          {query && (
            <p className="mb-4 text-sm text-muted-foreground">
              {searchResults.length} results for "{query}"
            </p>
          )}
          
          {searchResults.length > 0 ? (
            <div className="space-y-2">
              {searchResults.map((song) => (
                <div 
                  key={song.id} 
                  className="flex items-center justify-between rounded-lg border bg-card p-4 transition-colors hover:bg-accent/5"
                >
                  <div className="flex items-center gap-4">
                    {song.cover_url ? (
                      <img 
                        src={song.cover_url} 
                        alt={song.title}
                        className="h-12 w-12 rounded object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded bg-secondary/20">
                        <span className="text-xs text-muted-foreground">No Cover</span>
                      </div>
                    )}
                    
                    <div>
                      <h3 className="font-medium">{song.title}</h3>
                      <p className="text-sm text-muted-foreground">{song.artist}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="mr-4 text-sm text-muted-foreground">
                      {formatDuration(song.duration)}
                    </span>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full text-primary"
                      onClick={() => {
                        // This would be implemented with the audio player context
                        toast.info(`Playing: ${song.title} by ${song.artist}`);
                      }}
                    >
                      <SearchIcon size={18} />
                    </Button>
                    
                    {user && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="rounded-full text-muted-foreground hover:text-primary"
                          >
                            <Plus size={18} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add to Playlist</DialogTitle>
                          </DialogHeader>
                          <div className="mt-4 space-y-2">
                            {playlists.length > 0 ? (
                              playlists.map((playlist) => (
                                <Button
                                  key={playlist.id}
                                  variant="outline"
                                  className="w-full justify-start"
                                  disabled={addingToPlaylist === song.id}
                                  onClick={() => addSongToPlaylist(song.id, playlist.id)}
                                >
                                  {playlist.title}
                                </Button>
                              ))
                            ) : (
                              <div className="text-center">
                                <p className="mb-2">You don't have any playlists yet</p>
                                <Button 
                                  onClick={() => window.location.href = "/create-playlist"}
                                  className="gap-2"
                                >
                                  <Plus size={16} /> Create Playlist
                                </Button>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : query ? (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <p className="text-lg text-muted-foreground">
                No results found for "{query}"
              </p>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <p className="text-lg text-muted-foreground">
                Search for songs to see results
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="artists" className="mt-6">
          <div className="rounded-lg border border-dashed p-8 text-center">
            <p className="text-lg text-muted-foreground">
              Artist search coming soon
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="albums" className="mt-6">
          <div className="rounded-lg border border-dashed p-8 text-center">
            <p className="text-lg text-muted-foreground">
              Album search coming soon
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Search;
