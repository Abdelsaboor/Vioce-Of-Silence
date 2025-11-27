import { useState } from "react";
import { ArrowLeft, Volume2, Mic, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { useTranslation } from "react-i18next";

const Translate = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [text, setText] = useState(t('hello', { defaultValue: 'Hello, how are you today?' }));
  const [confidence, setConfidence] = useState(94);
  const [isDetecting, setIsDetecting] = useState(true);

  return (
    <div className="relative min-h-full bg-background pb-24 md:pb-20" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Confidence Indicator */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-muted/20">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${confidence}%` }}
        />
      </div>

      {/* Header */}
      <header className="flex items-center justify-between px-6 md:px-8 lg:px-12 pt-12 md:pt-16 pb-8 md:pb-12">
        <button
          onClick={() => navigate('/')}
          className="p-2 md:p-3 rounded-xl hover:bg-accent transition-colors"
        >
          <ArrowLeft className="h-6 w-6 md:h-7 md:w-7" />
        </button>
        <span className="text-responsive-sm text-muted-foreground">{confidence}% {t('confident')}</span>
      </header>

      {/* Main Translation Display */}
      <main className="flex flex-col items-center justify-center px-8 md:px-12 lg:px-16 min-h-[60vh] md:min-h-[65vh]">
        {isDetecting && (
          <div className="mb-8 md:mb-12 pulse-glow p-4 md:p-5 rounded-full bg-primary/10">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary" />
          </div>
        )}

        <div className="text-center animate-fade-in max-w-3xl">
          <p className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-4 md:mb-6">
            {text}
          </p>
          <p className="text-responsive-sm text-muted-foreground">
            {t('listeningToGestures')}
          </p>
        </div>
      </main>

      {/* Floating Actions */}
      <div className="absolute inset-x-0 bottom-24 md:bottom-20 px-6 md:px-8">
        <div className="flex items-center justify-center gap-4 md:gap-6">
          <button
            className="p-4 md:p-5 rounded-full glass-card hover-lift"
            onClick={() => setText("")}
          >
            <RotateCcw className="h-6 w-6 md:h-7 md:w-7" />
          </button>

          <button
            className="p-6 md:p-8 rounded-full bg-primary hover:bg-primary/90 transition-all hover:scale-105 shadow-primary"
            style={{ boxShadow: '0 8px 32px hsl(var(--primary) / 0.4)' }}
          >
            <Volume2 className="h-8 w-8 md:h-10 md:w-10 text-primary-foreground" />
          </button>

          <button
            className="p-4 md:p-5 rounded-full glass-card hover-lift"
          >
            <Mic className="h-6 w-6 md:h-7 md:w-7" />
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Translate;

