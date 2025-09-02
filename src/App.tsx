import { HeadlineDisplay } from "./components/HeadlineDisplay";
import { ControlPanel } from "./components/ControlPanel";
import { TypographyControls } from "./components/TypographyControls";
import { GradientControls } from "./components/GradientControls";
import { AnimationControls } from "./components/AnimationControls";
import { Card, CardContent } from "./components/ui/card";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-slate-100 dark:via-slate-300 dark:to-slate-100 bg-clip-text text-transparent mb-2">
              Headline Widget Creator
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Create stunning, customizable headlines with modern effects
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 lg:gap-12">
          {/* Headline Preview - Takes more space */}
          <div className="xl:col-span-3">
            <Card className="backdrop-blur-sm bg-white/60 dark:bg-slate-900/60 border-slate-200/50 dark:border-slate-700/50 shadow-2xl shadow-slate-900/10 dark:shadow-slate-950/40">
              <CardContent className="p-12 lg:p-16 min-h-[500px] flex items-center justify-center">
                <div className="w-full max-w-4xl">
                  <HeadlineDisplay />
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Controls - Compact sidebar */}
          <div className="xl:col-span-2">
            <div className="sticky top-32">
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
}export default App;
