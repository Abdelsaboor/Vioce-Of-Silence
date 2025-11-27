import { ChevronRight, User, Bell, Volume2, Shield, HelpCircle, LogOut, Moon, Sun, Languages } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/ThemeProvider";
import { useTranslation } from "react-i18next";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('i18nextLng', newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  return (
    <div className="relative min-h-full bg-background pb-24 md:pb-20" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="px-6 md:px-8 lg:px-12 pt-12 md:pt-16 lg:pt-20 pb-8 md:pb-12">
        <h1 className="text-responsive-3xl font-bold mb-2">{t('settings')}</h1>
        <p className="text-responsive-sm text-muted-foreground">{t('customizeExperience')}</p>
      </header>

      {/* Profile Card */}
      <div className="px-6 md:px-8 lg:px-12 mb-8 md:mb-12">
        <div className="glass-card card-padding rounded-3xl hover-lift max-w-2xl mx-auto lg:max-w-none">
          <div className="flex items-center gap-4 md:gap-6">
            <div
              className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 flex items-center justify-center"
              style={{ boxShadow: '0 0 20px hsl(var(--primary) / 0.2)' }}
            >
              <User className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-responsive-lg">John Doe</h3>
              <p className="text-responsive-sm text-muted-foreground">johndoe@email.com</p>
            </div>
            <ChevronRight className={`h-5 w-5 md:h-6 md:w-6 text-muted-foreground ${isRTL ? 'rotate-180' : ''}`} />
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <main className="px-6 md:px-8 lg:px-12 space-y-6 md:space-y-8 max-w-2xl mx-auto lg:max-w-none">
        {/* Preferences */}
        <section>
          <h2 className="text-responsive-sm font-medium text-muted-foreground mb-3 px-2">{t('preferences')}</h2>
          <div className="glass-card rounded-3xl divide-y divide-border/10">
            <SettingsItem
              icon={Bell}
              label={t('notifications')}
              action={<Switch />}
            />
            <SettingsItem
              icon={Volume2}
              label={t('voiceFeedback')}
              action={<Switch defaultChecked />}
            />
            <button
              onClick={toggleTheme}
              className="w-full flex items-center gap-4 md:gap-5 p-4 md:p-5 hover:bg-accent/50 transition-colors"
            >
              <div className="p-2 md:p-3 rounded-xl bg-accent">
                {theme === "dark" ? (
                  <Moon className="h-5 w-5 md:h-6 md:w-6 text-accent-foreground" />
                ) : (
                  <Sun className="h-5 w-5 md:h-6 md:w-6 text-accent-foreground" />
                )}
              </div>
              <span className="flex-1 text-left font-medium text-responsive-base">{t('theme')}</span>
              <span className="text-responsive-sm text-muted-foreground">
                {theme === "dark" ? t('dark') : t('light')}
              </span>
              <ChevronRight className={`h-5 w-5 md:h-6 md:w-6 text-muted-foreground ${isRTL ? 'rotate-180' : ''}`} />
            </button>
            <button
              onClick={toggleLanguage}
              className="w-full flex items-center gap-4 md:gap-5 p-4 md:p-5 hover:bg-accent/50 transition-colors rounded-b-3xl"
            >
              <div className="p-2 md:p-3 rounded-xl bg-accent">
                <Languages className="h-5 w-5 md:h-6 md:w-6 text-accent-foreground" />
              </div>
              <span className="flex-1 text-left font-medium text-responsive-base">{t('language')}</span>
              <span className="text-responsive-sm text-muted-foreground">
                {i18n.language === 'ar' ? t('arabic') : t('english')}
              </span>
              <ChevronRight className={`h-5 w-5 md:h-6 md:w-6 text-muted-foreground ${isRTL ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </section>

        {/* Support */}
        <section>
          <h2 className="text-responsive-sm font-medium text-muted-foreground mb-3 px-2">{t('support')}</h2>
          <div className="glass-card rounded-3xl divide-y divide-border/10">
            <SettingsItem
              icon={Shield}
              label={t('privacyPolicy')}
              action={<ChevronRight className={`h-5 w-5 md:h-6 md:w-6 text-muted-foreground ${isRTL ? 'rotate-180' : ''}`} />}
            />
            <SettingsItem
              icon={HelpCircle}
              label={t('helpSupport')}
              action={<ChevronRight className={`h-5 w-5 md:h-6 md:w-6 text-muted-foreground ${isRTL ? 'rotate-180' : ''}`} />}
            />
          </div>
        </section>

        {/* Account */}
        <section>
          <div className="glass-card rounded-3xl">
            <SettingsItem
              icon={LogOut}
              label={t('signOut')}
              action={<ChevronRight className={`h-5 w-5 md:h-6 md:w-6 text-muted-foreground ${isRTL ? 'rotate-180' : ''}`} />}
              isDestructive
            />
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

interface SettingsItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  action: React.ReactNode;
  isDestructive?: boolean;
}

const SettingsItem = ({ icon: Icon, label, action, isDestructive }: SettingsItemProps) => {
  return (
    <button className="w-full flex items-center gap-4 md:gap-5 p-4 md:p-5 hover:bg-accent/50 transition-colors first:rounded-t-3xl last:rounded-b-3xl">
      <div className={`p-2 md:p-3 rounded-xl ${isDestructive ? 'bg-destructive/10' : 'bg-accent'}`}>
        <Icon className={`h-5 w-5 md:h-6 md:w-6 ${isDestructive ? 'text-destructive' : 'text-accent-foreground'}`} />
      </div>
      <span className={`flex-1 text-left font-medium text-responsive-base ${isDestructive ? 'text-destructive' : ''}`}>
        {label}
      </span>
      {action}
    </button>
  );
};

export default Settings;
