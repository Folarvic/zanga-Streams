
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Play, Pause, SkipBack, SkipForward, 
  Volume2, ListMusic, 
} from "lucide-react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  return (
    <div className="flex h-20 w-full items-center justify-between border-t bg-card px-4">
      {/* Now Playing */}
      <div className="flex w-1/4 items-center gap-4">
        <div className="h-12 w-12 overflow-hidden rounded">
          <img
            src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
            alt="Album cover"
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h4 className="text-sm font-medium">Deep Focus</h4>
          <p className="text-xs text-muted-foreground">Lo-Fi Study Beats</p>
        </div>
      </div>
      
      {/* Player Controls */}
      <div className="flex w-2/4 flex-col items-center gap-2">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white">
            <SkipBack size={16} />
          </Button>
          
          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            variant="ghost" 
            size="icon"
            className="h-10 w-10 rounded-full bg-zanga-purple text-white hover:bg-zanga-deep-purple hover:text-white"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </Button>
          
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white">
            <SkipForward size={16} />
          </Button>
        </div>
        
        <div className="flex w-full max-w-md items-center gap-2">
          <span className="text-xs text-muted-foreground">1:21</span>
          <Slider
            defaultValue={[33]}
            max={100}
            step={1}
            className="z-10"
          />
          <span className="text-xs text-muted-foreground">3:45</span>
        </div>
      </div>
      
      {/* Volume Controls */}
      <div className="flex w-1/4 items-center justify-end gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white">
          <ListMusic size={16} />
        </Button>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white">
            <Volume2 size={16} />
          </Button>
          
          <Slider
            defaultValue={[80]}
            max={100}
            step={1}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
