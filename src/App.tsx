import { Badge } from "./components/ui/badge";
import uniqoLogo from "figma:asset/538c265f96e3133ede1c7c8ce9bdb2c610b03bb2.png";
import UnicornScene from "./components/unicorn";

export default function App() {
  return (
    <div
      className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden"
    >
      {/* UnicornScene as background */}
      <UnicornScene
        projectId="maxeURXzzAdZxKLTDzsU"
        className="absolute inset-0 w-full h-full"
      />

      {/* Contrast overlay to improve text readability */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
        {/* Logo and App Name */}
        <div className="space-y-6">
          <img
            src={uniqoLogo}
            alt="Uniqo Logo"
            className="w-50 h-50 md:w-70 md:h-70 mx-auto drop-shadow-lg"
          />
          <h1
            style={{ fontFamily: "'League Spartan', sans-serif" }}
            className="text-6xl md:text-8xl text-white font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text drop-shadow-lg"
          >
            UNIQO
          </h1>
        </div>

        {/* Hero Content */}
        <div className="space-y-1">
          <p className="text-sm md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            A social network that actually brings you closer to
            people.
            <br />
            Quality over quantity. Real meetings over digital
            metrics.
          </p>
        </div>

        {/* Bottom tagline */}
        <div>
          <p className="text-sm md:text-xl text-white/80 italic drop-shadow-lg max-w-xs mx-auto md:max-w-none">
            "In a world of endless connections, we decided to
            choose breadth over depth"
          </p>
        </div>

        {/* Coming Soon Badge */}
        <Badge
          variant="secondary"
          className="mx-auto text-base px-6 py-2 bg-white/20 text-white border-white/30 backdrop-blur-sm"
        >
          Coming Soon
        </Badge>
      </div>
    </div>
  );
}
