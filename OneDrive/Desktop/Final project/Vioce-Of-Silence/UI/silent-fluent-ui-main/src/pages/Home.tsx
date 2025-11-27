import { useState } from "react";
import { Play, Activity } from "lucide-react";
import { GloveStatus } from "@/components/GloveStatus";
import { ActionButton } from "@/components/ActionButton";
import { BottomNav } from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t, i18n } = useTranslation();
  const [isConnected] = useState(true);
  const [batteryLevel] = useState(87);
  const navigate = useNavigate();
  const isRTL = i18n.language === 'ar';

  return (
    <div className="relative min-h-full bg-background pb-24 md:pb-20" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="px-6 md:px-8 lg:px-12 pt-12 md:pt-16 lg:pt-20 pb-8 md:pb-12 animate-fade-in">
        <h1 className="text-responsive-3xl font-bold mb-2">{t('appName')}</h1>
        <p className="text-responsive-sm text-muted-foreground">{t('appTagline')}</p>
      </header>

      {/* Main Content */}
      <main className="px-6 md:px-8 lg:px-12 space-y-6 md:space-y-8 lg:space-y-10">
        {/* Glove Status Card */}
        <GloveStatus isConnected={isConnected} batteryLevel={batteryLevel} />

        {/* Start Button */}
        <div className="flex justify-center pt-8 md:pt-12 lg:pt-16 animate-slide-up">
          <button
            onClick={() => navigate('/translate')}
            className="group relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{ boxShadow: '0 10px 40px hsl(var(--primary) / 0.3)' }}
          >
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ripple" />
            <Play className="h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 text-primary-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ml-1" fill="currentColor" />
          </button>
        </div>

        {/* Last Activity Card */}
        <div className="glass-card card-padding rounded-3xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="p-2 md:p-3 rounded-xl bg-accent">
              <Activity className="h-5 w-5 md:h-6 md:w-6 text-accent-foreground" />
            </div>
            <h2 className="text-responsive-lg font-semibold">{t('lastActivity')}</h2>
          </div>

          <div className="space-y-3 md:space-y-4">
            <div className="flex justify-between items-center py-2">
              <span className="text-responsive-sm text-muted-foreground">{t('sessionDuration')}</span>
              <span className="text-responsive-sm font-medium">12 {t('min', { defaultValue: 'min' })}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-responsive-sm text-muted-foreground">{t('gesturesRecognized')}</span>
              <span className="text-responsive-sm font-medium">47</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-responsive-sm text-muted-foreground">{t('accuracy')}</span>
              <span className="text-responsive-sm font-medium text-primary">94%</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid-responsive-2 pt-2">
          <ActionButton
            icon={Activity}
            label={t('practice')}
            variant="outline"
            onClick={() => navigate('/training')}
          />
          <ActionButton
            icon={Activity}
            label={t('viewStats')}
            variant="outline"
          />
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Home;

