
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { usePlaylist } from "@/context/PlaylistContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";

const PlaylistManager = () => {
  const { createPlaylist } = usePlaylist();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isPublic: false,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in to create a playlist");
      return;
    }
    
    if (!formData.title.trim()) {
      toast.error("Please provide a playlist title");
      return;
    }
    
    setLoading(true);
    
    try {
      await createPlaylist(formData.title, formData.description, formData.isPublic);
      toast.success("Playlist created successfully!");
      navigate("/library");
    } catch (error) {
      console.error("Error creating playlist:", error);
      toast.error("Failed to create playlist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="pb-20">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(-1)}
              className="rounded-full"
            >
              <ChevronLeft size={20} />
            </Button>
            <h1 className="text-3xl font-bold">Create New Playlist</h1>
          </div>
        </div>
        
        <div className="mx-auto max-w-lg rounded-lg border bg-card p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Playlist Title</Label>
              <Input
                id="title"
                placeholder="Enter playlist name"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                placeholder="Add an optional description for your playlist"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="public"
                checked={formData.isPublic}
                onCheckedChange={(checked) => setFormData({ ...formData, isPublic: checked })}
              />
              <Label htmlFor="public">Make playlist public</Label>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-primary" 
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Playlist"}
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default PlaylistManager;
