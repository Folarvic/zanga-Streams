
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const FeaturedBanner = () => {
  return (
    <div className="relative mb-8 overflow-hidden rounded-xl bg-gradient-to-r from-zanga-purple to-zanga-deep-purple p-6">
      <div className="relative z-10 max-w-2xl">
        <p className="mb-2 text-sm font-medium text-white/80">FEATURED PLAYLIST</p>
        <h2 className="mb-2 text-4xl font-bold text-white">Discover Weekly</h2>
        <p className="mb-6 text-white/80">
          Your weekly mixtape of fresh music. Enjoy new discoveries and deep cuts chosen just for you. Updated every Monday.
        </p>
        <div className="flex gap-4">
          <Button className="gap-2 bg-white text-zanga-deep-purple hover:bg-white/90">
            <Play size={16} fill="currentColor" />
            Play Now
          </Button>
          <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
            Save to Library
          </Button>
        </div>
      </div>
      
      {/* Visual elements */}
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10"></div>
      <div className="absolute -bottom-8 right-36 h-40 w-40 rounded-full bg-white/5"></div>
    </div>
  );
};

export default FeaturedBanner;
