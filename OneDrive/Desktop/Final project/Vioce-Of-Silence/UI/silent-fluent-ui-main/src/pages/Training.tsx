import { useState } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { useTranslation } from "react-i18next";

interface TrainingGesture {
  id: number;
  name: string;
  description: string;
  progress: number;
}

const Training = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gestures] = useState<TrainingGesture[]>([
    {
      id: 1,
      name: t('hello'),
      description: t('helloDesc'),
      progress: 100,
    },
    {
      id: 2,
      name: t('thankYou'),
      description: t('thankYouDesc'),
      progress: 75,
    },
    {
      id: 3,
      name: t('please'),
      description: t('pleaseDesc'),
      progress: 50,
    },
    {
      id: 4,
      name: t('help'),
      description: t('helpDesc'),
      progress: 0,
    },
  ]);

  const currentGesture = gestures[currentIndex];

  const handleNext = () => {
    if (currentIndex < gestures.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="relative min-h-full bg-background pb-24 md:pb-20" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="px-6 md:px-8 lg:px-12 pt-12 md:pt-16 lg:pt-20 pb-8 md:pb-12">
        <h1 className="text-responsive-3xl font-bold mb-2">{t('trainingMode')}</h1>
        <p className="text-responsive-sm text-muted-foreground">{t('learnGestures')}</p>
      </header>

      {/* Progress Indicator */}
      <div className="px-6 md:px-8 lg:px-12 mb-8 md:mb-12">
        <div className="flex gap-2 md:gap-3">
          {gestures.map((gesture, index) => (
            <div
              key={gesture.id}
              className={`flex-1 h-1 md:h-1.5 rounded-full transition-all duration-300 ${index === currentIndex
                  ? "bg-primary"
                  : index < currentIndex
                    ? "bg-primary/50"
                    : "bg-muted/20"
                }`}
            />
          ))}
        </div>
      </div>

      {/* Training Card */}
      <main className="px-6 md:px-8 lg:px-12 mb-8 md:mb-12">
        <div className="glass-card card-padding rounded-3xl animate-fade-in hover-lift max-w-2xl mx-auto">
          {/* Gesture Illustration Placeholder */}
          <div className="w-full aspect-square md:aspect-video lg:aspect-square rounded-2xl bg-accent/20 mb-6 md:mb-8 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl md:text-7xl lg:text-8xl mb-4">👋</div>
              <p className="text-responsive-sm text-muted-foreground">{t('gestureIllustration')}</p>
            </div>
          </div>

          {/* Gesture Info */}
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-responsive-2xl font-bold mb-2">{currentGesture.name}</h2>
            <p className="text-responsive-sm text-muted-foreground">{currentGesture.description}</p>
          </div>

          {/* Progress Circle */}
          <div className="flex items-center justify-center mb-6 md:mb-8">
            <div className="relative w-24 h-24 md:w-32 md:h-32">
              <svg className="w-24 h-24 md:w-32 md:h-32 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="hsl(var(--muted) / 0.2)"
                  strokeWidth="6"
                  fill="none"
                  className="md:hidden"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="hsl(var(--muted) / 0.2)"
                  strokeWidth="8"
                  fill="none"
                  className="hidden md:block"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="hsl(var(--primary))"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - currentGesture.progress / 100)}`}
                  className="transition-all duration-500 md:hidden"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="hsl(var(--primary))"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - currentGesture.progress / 100)}`}
                  className="transition-all duration-500 hidden md:block"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                {currentGesture.progress === 100 ? (
                  <Check className="h-8 w-8 md:h-12 md:w-12 text-primary" />
                ) : (
                  <span className="text-xl md:text-2xl font-bold">{currentGesture.progress}%</span>
                )}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4 md:gap-6">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="p-3 md:p-4 rounded-full glass-card hover-lift disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft className={`h-6 w-6 md:h-7 md:w-7 ${isRTL ? 'rotate-180' : ''}`} />
            </button>

            <button className="flex-1 py-4 md:py-5 px-6 md:px-8 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl font-medium transition-all hover:scale-105 shadow-primary text-responsive-base">
              {t('practiceGesture')}
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex === gestures.length - 1}
              className="p-3 md:p-4 rounded-full glass-card hover-lift disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronRight className={`h-6 w-6 md:h-7 md:w-7 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Training;
