
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MusicCardProps {
  title: string;
  artist: string;
  coverUrl: string;
  linkTo?: string;
  playlistId?: string;
}

const MusicCard = ({ title, artist, coverUrl, linkTo, playlistId }: MusicCardProps) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (linkTo) {
      navigate(linkTo);
    } else if (playlistId) {
      navigate(`/playlist/${playlistId}`);
    }
  };
  
  return (
    <div className="music-card cursor-pointer" onClick={handleClick}>
      <div className="relative mb-2 overflow-hidden rounded-md">
        <img 
          src={coverUrl} 
          alt={`${title} by ${artist}`} 
          className="aspect-square w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <button 
          title="Play" 
          className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary opacity-0 transition-opacity hover:bg-primary/90 group-hover:opacity-100">
          <Play size={16} fill="white" />
        </button>
      </div>
      <h3 className="line-clamp-1 text-sm font-medium">{title}</h3>
      <p className="line-clamp-1 text-xs text-muted-foreground">{artist}</p>
    </div>
  );
};

export default MusicCard;
