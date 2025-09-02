import { HeadlineDisplay } from "./components/HeadlineDisplay";
import { ControlPanel } from "./components/ControlPanel";
import { TypographyControls } from "./components/TypographyControls";
import { GradientControls } from "./components/GradientControls";
import { AnimationControls } from "./components/AnimationControls";
import { Card, CardContent } from "./components/ui/card";

function App() {
  return (
    <div className="dark min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent"></div>
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>

      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-2xl bg-slate-950/40 border-b border-slate-700/30 shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-3 tracking-tight">
              Headline Widget Creator
            </h1>
            <p className="text-slate-300 text-xl font-light">
              Create stunning, customizable headlines with modern glassy effects
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 lg:gap-12">
          {/* Headline Preview - Takes more space */}
          <div className="xl:col-span-3">
            <Card className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl shadow-black/20 hover:shadow-black/30 transition-all duration-500">
              <CardContent className="p-12 lg:p-20 min-h-[600px] flex items-center justify-center relative overflow-hidden">
                {/* Glass effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5"></div>
                <div className="w-full max-w-4xl relative z-10">
                  <HeadlineDisplay />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls - Compact sidebar */}
          <div className="xl:col-span-2">
            <div className="sticky top-40">
              <ControlPanel>
                <TypographyControls />
                <GradientControls />
                <AnimationControls />
              </ControlPanel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
