
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string | null;
  cover_url: string | null;
  audio_url: string;
  duration: number;
}

interface SongCardProps {
  song: Song;
  playlistId?: string;
  isOwner?: boolean;
}

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const SongCard = ({ song, playlistId, isOwner = false }: SongCardProps) => {
  const [removing, setRemoving] = useState(false);
  
  const handlePlay = () => {
    // This would be implemented with the audio player context
    console.log("Play song:", song.title);
    toast.info(`Playing: ${song.title} by ${song.artist}`);
  };
  
  const handleRemoveFromPlaylist = async () => {
    if (!playlistId) return;
    
    try {
      setRemoving(true);
      
      const { error } = await supabase
        .from("playlist_songs")
        .delete()
        .eq("playlist_id", playlistId)
        .eq("song_id", song.id);
        
      if (error) throw error;
      
      toast.success("Song removed from playlist");
      // Reload the page to refresh the song list
      window.location.reload();
    } catch (error) {
      console.error("Error removing song from playlist:", error);
      toast.error("Failed to remove song");
    } finally {
      setRemoving(false);
    }
  };
  
  return (
    <div className="flex items-center justify-between rounded-lg border bg-card p-4 transition-colors hover:bg-accent/5">
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
          onClick={handlePlay}
        >
          <Play size={18} fill="currentColor" />
        </Button>
        
        {isOwner && playlistId && (
          <Button 
            variant="ghost" 
            size="icon"
            className="rounded-full text-muted-foreground hover:text-primary"
            onClick={handleRemoveFromPlaylist}
            disabled={removing}
          >
            <X size={18} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default SongCard;
