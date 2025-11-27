import { Bluetooth, Battery } from "lucide-react";
import { useTranslation } from "react-i18next";

interface GloveStatusProps {
  isConnected: boolean;
  batteryLevel: number;
}

export const GloveStatus = ({ isConnected, batteryLevel }: GloveStatusProps) => {
  const { t } = useTranslation();

  return (
    <div className="glass-card card-padding rounded-3xl animate-fade-in">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-3 md:gap-4">
          <div className={`p-3 md:p-4 rounded-2xl ${isConnected ? 'pulse-glow bg-primary/10' : 'bg-muted/20'}`}>
            <Bluetooth className={`h-6 w-6 md:h-7 md:w-7 ${isConnected ? 'text-primary' : 'text-muted-foreground'}`} />
          </div>
          <div>
            <p className="text-responsive-sm font-medium text-muted-foreground">{t('smartGlove')}</p>
            <p className={`text-responsive-base font-semibold ${isConnected ? 'text-primary' : 'text-muted-foreground'}`}>
              {isConnected ? t('connected') : t('disconnected')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <Battery className="h-5 w-5 md:h-6 md:w-6 text-muted-foreground" />
          <span className="text-responsive-sm font-medium">{batteryLevel}%</span>
        </div>
      </div>

      {isConnected && (
        <div className="flex gap-2 mt-4 md:mt-6">
          <div className="flex-1 h-1 md:h-1.5 bg-primary/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: '100%' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

