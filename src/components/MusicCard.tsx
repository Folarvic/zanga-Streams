
import { Play } from "lucide-react";

interface MusicCardProps {
  title: string;
  artist: string;
  coverUrl: string;
}

const MusicCard = ({ title, artist, coverUrl }: MusicCardProps) => {
  return (
    <div className="music-card">
      <div className="relative mb-2 overflow-hidden rounded-md">
        <img 
          src={coverUrl} 
          alt={`${title} by ${artist}`} 
          className="music-card-image"
        />
        <button className="music-card-play">
          <Play size={16} fill="white" />
        </button>
      </div>
      <h3 className="line-clamp-1 text-sm font-medium">{title}</h3>
      <p className="line-clamp-1 text-xs text-muted-foreground">{artist}</p>
    </div>
  );
};

export default MusicCard;
