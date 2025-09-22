import { GlassCard } from "@developer-hub/liquid-glass";
import uniqoLogo from "figma:asset/logo.png";
import UnicornScene from "./components/unicorn";

export default function App() {
  return (
    <div
      className="min-h-[100dvh] relative flex items-center justify-center px-4 md:p-4 overflow-hidden"
    >
      {/* UnicornScene as background */}
      <UnicornScene
        projectId="maxeURXzzAdZxKLTDzsU"
        className="absolute inset-0 w-full h-full"
      />

      {/* Contrast overlay to improve text readability */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

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
            className="glass-wordmark text-6xl md:text-8xl font-extrabold mx-auto"
            data-text="UNIQO"
            style={{ fontFamily: "'League Spartan', sans-serif", letterSpacing: "0.12em" }}
          >
            UNIQO
          </h1>
        </div>

        {/* Hero Content */}
        <div className="space-y-1">
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            A social network that <i className="font-accent lowercase text-3xl mr-1">actually</i> brings you closer to
            people.
            <br className="hidden md:block" />{" "}
            Quality over quantity. Real meetings over digital
            metrics.
          </p>
        </div>

        {/* Bottom tagline */}
        <div>
          <p
            className="text-3xl sm:text-4xl text-white/80 drop-shadow-lg mx-auto md:max-w-none font-normal"
            style={{ fontFamily: "'Amatic SC', cursive" }}
          >
            "...in a world of endless connections,<br />we decided to
            choose breadth over depth."
          </p>
        </div>

        {/* Coming Soon Button (Liquid Glass) */}
        <div className="mx-auto mt-12 w-fit">
          <GlassCard
            displacementScale={120}
            blurAmount={0.1}
            cornerRadius={10}
            padding="10px 22px"
            className="cursor-default select-none"
            shadowMode={false}
          >
            <span className="text-base text-white font-semibold tracking-wide">Coming Soon</span>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
