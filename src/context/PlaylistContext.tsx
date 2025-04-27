
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface Playlist {
  id: string;
  title: string;
  description?: string;
  is_public: boolean;
  user_id: string;
  created_at: string;
}

interface PlaylistContextType {
  playlists: Playlist[];
  createPlaylist: (title: string, description?: string, isPublic?: boolean) => Promise<void>;
  deletePlaylist: (id: string) => Promise<void>;
  updatePlaylist: (id: string, title: string, description?: string, isPublic?: boolean) => Promise<void>;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export function PlaylistProvider({ children }: { children: React.ReactNode }) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchPlaylists();
    }
  }, [user]);

  const fetchPlaylists = async () => {
    try {
      const { data, error } = await supabase
        .from('playlists')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPlaylists(data || []);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    }
  };

  const createPlaylist = async (title: string, description?: string, isPublic: boolean = false) => {
    try {
      const { error } = await supabase.from('playlists').insert([
        { title, description, is_public: isPublic, user_id: user?.id }
      ]);

      if (error) throw error;
      fetchPlaylists();
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  const deletePlaylist = async (id: string) => {
    try {
      const { error } = await supabase
        .from('playlists')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchPlaylists();
    } catch (error) {
      console.error('Error deleting playlist:', error);
    }
  };

  const updatePlaylist = async (id: string, title: string, description?: string, isPublic?: boolean) => {
    try {
      const { error } = await supabase
        .from('playlists')
        .update({ title, description, is_public: isPublic })
        .eq('id', id);

      if (error) throw error;
      fetchPlaylists();
    } catch (error) {
      console.error('Error updating playlist:', error);
    }
  };

  return (
    <PlaylistContext.Provider value={{ playlists, createPlaylist, deletePlaylist, updatePlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = () => {
  const context = useContext(PlaylistContext);
  if (context === undefined) {
    throw new Error('usePlaylist must be used within a PlaylistProvider');
  }
  return context;
};
