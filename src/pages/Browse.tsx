
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Browse = () => {
  const genres = [
    "Pop", "Hip-Hop", "Rock", "Electronic", "R&B", "Latin",
    "K-Pop", "Classical", "Jazz", "Metal", "Country", "Blues"
  ];

  return (
    <Layout>
      <h1 className="mb-6 text-3xl font-bold">Browse</h1>
      
      <div className="mb-8 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search for songs, artists, or albums" 
            className="pl-10"
          />
        </div>
        <Button>
          Search
        </Button>
      </div>
      
      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Genres</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {genres.map((genre) => (
            <Button 
              key={genre}
              variant="outline" 
              className="h-24 bg-card hover:bg-zanga-purple hover:text-white"
            >
              {genre}
            </Button>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="mb-4 text-2xl font-bold">Charts</h2>
        <div className="space-y-2">
          <div className="flex cursor-pointer items-center gap-4 rounded-md bg-card p-3 hover:bg-card/80">
            <div className="flex h-12 w-12 items-center justify-center bg-zanga-purple font-bold">
              1
            </div>
            <div>
              <p className="font-medium">Global Top 50</p>
              <p className="text-sm text-muted-foreground">Your daily update of the most played tracks right now</p>
            </div>
          </div>
          
          <div className="flex cursor-pointer items-center gap-4 rounded-md bg-card p-3 hover:bg-card/80">
            <div className="flex h-12 w-12 items-center justify-center bg-zanga-deep-purple font-bold">
              2
            </div>
            <div>
              <p className="font-medium">Top Tracks - USA</p>
              <p className="text-sm text-muted-foreground">The most played tracks in the United States right now</p>
            </div>
          </div>
          
          <div className="flex cursor-pointer items-center gap-4 rounded-md bg-card p-3 hover:bg-card/80">
            <div className="flex h-12 w-12 items-center justify-center bg-zanga-deep-purple/80 font-bold">
              3
            </div>
            <div>
              <p className="font-medium">Viral Hits</p>
              <p className="text-sm text-muted-foreground">Tracks that are trending across social media platforms</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Browse;
