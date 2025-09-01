import { HeadlineDisplay } from "./components/HeadlineDisplay";
import { ControlPanel } from "./components/ControlPanel";
import { TypographyControls } from "./components/TypographyControls";
import { GradientControls } from "./components/GradientControls";
import { AnimationControls } from "./components/AnimationControls";
import { Card, CardContent } from "./components/ui/card";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Headline Widget Creator
          </h1>
          <p className="text-muted-foreground">
            Create stunning, customizable headlines with modern effects
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Headline Preview */}
          <Card className="min-h-[400px]">
            <CardContent className="p-8 flex items-center justify-center h-full">
              <HeadlineDisplay />
            </CardContent>
          </Card>
          
          {/* Controls */}
          <ControlPanel>
            <TypographyControls />
            <GradientControls />
            <AnimationControls />
          </ControlPanel>
        </div>
      </div>
    </div>
  );
}

export default App;
