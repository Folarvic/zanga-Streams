
import Layout from "@/components/Layout";
import FeaturedBanner from "@/components/FeaturedBanner";
import MusicCard from "@/components/MusicCard";

const Index = () => {
  // Mock data for recent releases
  const recentReleases = [
    {
      title: "Dawn FM",
      artist: "The Weeknd",
      coverUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
    },
    {
      title: "Un Verano Sin Ti",
      artist: "Bad Bunny",
      coverUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    },
    {
      title: "RENAISSANCE",
      artist: "Beyoncé",
      coverUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    },
    {
      title: "Harry's House",
      artist: "Harry Styles",
      coverUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
    },
    {
      title: "AM",
      artist: "Arctic Monkeys",
      coverUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
    }
  ];

  // Mock data for popular playlists
  const popularPlaylists = [
    {
      title: "Chill Lofi Study Beats",
      artist: "Zanga Editorial",
      coverUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
    },
    {
      title: "Today's Top Hits",
      artist: "Zanga Editorial",
      coverUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    },
    {
      title: "RapCaviar",
      artist: "Zanga Editorial",
      coverUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
    },
    {
      title: "Rock Classics",
      artist: "Zanga Editorial",
      coverUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    },
    {
      title: "Mood Booster",
      artist: "Zanga Editorial",
      coverUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
    }
  ];

  return (
    <Layout>
      <div className="pb-20">
        <FeaturedBanner />
        
        {/* Recent Releases */}
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recent Releases</h2>
            <button className="text-sm font-medium text-zanga-purple">
              View All
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {recentReleases.map((release, index) => (
              <MusicCard 
                key={index}
                title={release.title}
                artist={release.artist}
                coverUrl={release.coverUrl}
              />
            ))}
          </div>
        </section>
        
        {/* Popular Playlists */}
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Popular Playlists</h2>
            <button className="text-sm font-medium text-zanga-purple">
              View All
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {popularPlaylists.map((playlist, index) => (
              <MusicCard 
                key={index}
                title={playlist.title}
                artist={playlist.artist}
                coverUrl={playlist.coverUrl}
              />
            ))}
          </div>
        </section>
        
        {/* Made for You */}
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Made For You</h2>
            <button className="text-sm font-medium text-zanga-purple">
              View All
            </button>
          </div>
          <div className="rounded-xl bg-card p-4">
            <p className="mb-2 text-sm text-muted-foreground">
              Sign in to see personalized recommendations
            </p>
            <button className="rounded-full bg-zanga-purple px-4 py-1 text-sm font-medium text-white hover:bg-zanga-deep-purple">
              Sign In
            </button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
