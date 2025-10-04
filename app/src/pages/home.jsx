import bgImg from "../../../public/Images/wallpaper.jpg";
import bgOverImg from "../../../public/Images/wallpaper-tech.png";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6">
        {/* Background with overlay */}
        <div className="absolute inset-0">
          <img
            src={bgImg}
            alt="Background"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto py-16 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left fade-in">
              <div className="mb-4 sm:mb-6">
                <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500/20 text-blue-300 rounded-full text-xs sm:text-sm font-medium border border-blue-400/30 backdrop-blur-sm">
                  ✨ AI-Powered Computer Vision
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Turn Raw Data into
                <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent glow-text mt-2">
                  Actionable Insights
                </span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-white mb-6 sm:mb-8 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                Leaflet.ai is an advanced AI-powered Computer Vision platform
                designed to transform raw data into actionable insights with
                unprecedented accuracy and speed.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-12">
                <button className="modern-btn text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold w-full sm:w-auto">
                  Get Started Free
                </button>
                <button className="glass-effect text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-white/10 transition-all duration-300 font-medium border border-white/20 hover:border-white/40 w-full sm:w-auto">
                  Watch Demo
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-sm sm:max-w-md mx-auto lg:mx-0">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-white">
                    99.9%
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400">
                    Accuracy
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-white">
                    10x
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400">Faster</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-white">
                    24/7
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400">
                    Monitoring
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Content */}
            <div className="relative slide-up mt-8 lg:mt-0 order-first lg:order-last">
              <div className="relative">
                <img
                  src={bgOverImg}
                  alt="AI Technology Visualization"
                  className="w-full max-w-xs sm:max-w-md lg:max-w-lg mx-auto drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Hidden on mobile */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6">
              Why Choose <span className="text-blue-400">Leaflet.ai</span>?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Experience the future of data analysis with our cutting-edge AI
              technology
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Real-time Processing",
                description:
                  "Process and analyze data streams in real-time with minimal latency",
                icon: "⚡",
              },
              {
                title: "Advanced ML Models",
                description:
                  "State-of-the-art machine learning models trained on massive datasets",
                icon: "🧠",
              },
              {
                title: "Seamless Integration",
                description:
                  "Easy integration with existing systems and workflows",
                icon: "🔗",
              },
              {
                title: "Scalable Architecture",
                description:
                  "Built to scale from startup to enterprise level requirements",
                icon: "📈",
              },
              {
                title: "Secure & Compliant",
                description:
                  "Enterprise-grade security with full compliance standards",
                icon: "🔒",
              },
              {
                title: "24/7 Support",
                description:
                  "Round-the-clock support from our expert technical team",
                icon: "🛠️",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="modern-card p-6 sm:p-8 text-center group"
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="modern-card p-6 sm:p-8 lg:p-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
              Ready to Transform Your Data?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 px-4">
              Join thousands of companies already using Leaflet.ai to unlock
              insights from their data
            </p>
            <button className="modern-btn text-white px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-semibold w-full sm:w-auto">
              Start Your Free Trial
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
