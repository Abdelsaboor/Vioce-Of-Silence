import { Home, MessageSquare, GraduationCap, Settings } from "lucide-react";
import { NavLink } from "./NavLink";
import { useTranslation } from "react-i18next";

export const BottomNav = () => {
  const { t } = useTranslation();

  const navItems = [
    { icon: Home, label: t('home'), path: "/" },
    { icon: MessageSquare, label: t('chat'), path: "/chat" },
    { icon: GraduationCap, label: t('train'), path: "/training" },
    { icon: Settings, label: t('profile'), path: "/settings" },
  ];

  return (
    <nav className="absolute bottom-0 left-0 right-0 w-full glass-card border-t border-border/20 backdrop-blur-xl z-50">
      <div className="flex justify-around items-center h-16 px-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all duration-300"
            activeClassName="text-primary"
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={`h-5 w-5 transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'
                    }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className="text-[10px] font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
