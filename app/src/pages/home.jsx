import bgImg from "../../../public/Images/wallpaper.jpg";
import bgOverImg from "../../../public/Images/wallpaper-tech.png";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <div className="home-container text-center relative h-[700px] overflow-hidden pt-[80px]">
        {/* Background image */}
        <img
          src={bgImg}
          alt="Background"
          className="absolute inset-0 h-full w-full object-cover -z-10 opacity-50"
        />

        {/* Bottom fade overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

        {/* Hero content */}
        <div className="flex justify-around items-center text-white h-full px-4 md:px-20 relative flex-col md:flex-row gap-10">
          <div className="max-w-2xl text-center justify-around items-center flex flex-col gap-4">
            <h1 className="text-4xl sm:text-6xl font-bold mb-4">
              Turn Raw Data into Actionable Insights - Instantly
            </h1>
            <p className="text-sm sm:text-base text-gray-400 max-w-xl">
              Leaflet.ai is an advanced AI-powered Computer Vision platform
              designed to transform raw data into actionable insights.
            </p>
            <button className="text-white bg-blue-500 px-3 sm:px-4 py-1 sm:py-1.5 text-sm sm:text-base rounded-md hover:bg-blue-600 transition">
              Join Now
            </button>
          </div>

          <img
            src={bgOverImg}
            alt="Overlay"
            className="hidden md:block h-[400px]"
          />
        </div>
      </div>
      <div className="relative text-white">
        <div className="p-8">
          <h2 className="text-4xl font-bold text-center mb-8">
            Welcome to our Website
          </h2>
          <p className="text-lg max-w-4xl mx-auto text-center">
            This is where your main content begins. The negative margin pulls
            this section up, creating a smooth transition from the hero image's
            fade-out. You can add more sections and content here.
          </p>

          {/* Example content blocks */}
          <div className="space-y-8 p-8">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="p-8 bg-white/10 text-white rounded-lg shadow-lg mx-auto max-w-xl"
              >
                Main content block #{i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
