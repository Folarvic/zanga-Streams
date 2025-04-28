
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { usePlaylist } from "@/context/PlaylistContext";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft, MoreHorizontal, Play, Plus } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import SongCard from "@/components/SongCard";

interface Playlist {
  id: string;
  title: string;
  description: string | null;
  is_public: boolean;
  user_id: string;
  created_at: string;
}

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string | null;
  cover_url: string | null;
  audio_url: string;
  duration: number;
}

const PlaylistDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { deletePlaylist } = usePlaylist();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      try {
        if (!id) return;

        // Fetch playlist details
        const { data: playlistData, error: playlistError } = await supabase
          .from("playlists")
          .select("*")
          .eq("id", id)
          .single();

        if (playlistError) throw playlistError;
        
        setPlaylist(playlistData);
        setIsOwner(user?.id === playlistData.user_id);
        
        // Fetch playlist songs
        const { data: songData, error: songError } = await supabase
          .from("playlist_songs")
          .select(`
            song_id,
            songs:song_id(*)
          `)
          .eq("playlist_id", id);
          
        if (songError) throw songError;
        
        if (songData && songData.length > 0) {
          const formattedSongs = songData.map((item: any) => item.songs);
          setSongs(formattedSongs);
        }
      } catch (error) {
        console.error("Error fetching playlist:", error);
        toast.error("Failed to load playlist");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylistDetails();
  }, [id, user]);

  const handleDeletePlaylist = async () => {
    if (!id || !isOwner) return;
    
    try {
      await deletePlaylist(id);
      toast.success("Playlist deleted successfully");
      navigate("/library");
    } catch (error) {
      console.error("Error deleting playlist:", error);
      toast.error("Failed to delete playlist");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="space-y-4 p-6">
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-6 w-1/2" />
          <div className="mt-8 space-y-4">
            {Array(5).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pb-20">
        <div className="mb-6 flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ChevronLeft size={20} />
          </Button>
          <h1 className="text-3xl font-bold">{playlist?.title}</h1>
        </div>
        
        <div className="mb-8 flex items-end justify-between rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 p-6">
          <div>
            <p className="mb-2 text-sm text-muted-foreground">
              {songs.length} songs
            </p>
            {playlist?.description && (
              <p className="mb-4 max-w-lg text-base">{playlist.description}</p>
            )}
            <div className="flex gap-3">
              <Button className="gap-2">
                <Play size={16} fill="currentColor" /> Play All
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate("/search")}
                className="gap-2"
              >
                <Plus size={16} /> Add Songs
              </Button>
            </div>
          </div>
          
          {isOwner && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate(`/edit-playlist/${id}`)}>
                  Edit Playlist
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-red-500 focus:text-red-500" 
                  onClick={handleDeletePlaylist}
                >
                  Delete Playlist
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        
        <div className="space-y-2">
          {songs.length > 0 ? (
            songs.map((song) => (
              <SongCard 
                key={song.id}
                song={song}
                playlistId={id}
                isOwner={isOwner}
              />
            ))
          ) : (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <p className="mb-4 text-lg font-medium">This playlist is empty</p>
              <Button onClick={() => navigate("/search")} className="gap-2">
                <Plus size={16} /> Add Songs
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PlaylistDetail;
