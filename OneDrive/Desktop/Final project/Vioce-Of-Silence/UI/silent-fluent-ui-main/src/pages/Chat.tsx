import { useState } from "react";
import { Send, Mic } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { useTranslation } from "react-i18next";

interface Message {
  id: number;
  text: string;
  sender: "user" | "other";
  timestamp: string;
  audioUrl?: string;
}

const Chat = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [messages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! How are you?",
      sender: "other",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      text: "I'm doing great, thanks for asking!",
      sender: "user",
      timestamp: "10:31 AM",
    },
    {
      id: 3,
      text: "That's wonderful to hear",
      sender: "other",
      timestamp: "10:32 AM",
    },
  ]);

  return (
    <div className="flex min-h-full flex-col bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="glass-card px-6 md:px-8 lg:px-12 py-4 md:py-6 border-b border-border/20 sticky top-0 z-20 backdrop-blur-xl">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Connected</p>
        <h1 className="text-responsive-xl font-semibold">{t('messages')}</h1>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-6 md:px-8 lg:px-12 py-8 md:py-12 space-y-6 md:space-y-8 pb-32 md:pb-28">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
          >
            <div
              className={`max-w-[80%] md:max-w-[70%] lg:max-w-[60%] rounded-3xl px-5 md:px-6 py-3 md:py-4 ${message.sender === "user"
                  ? "bg-primary text-primary-foreground"
                  : "glass-card"
                }`}
              style={{
                boxShadow: message.sender === "user"
                  ? "0 12px 30px hsl(var(--primary) / 0.25)"
                  : "0 10px 30px hsl(var(--muted) / 0.25)",
              }}
            >
              <p className="text-responsive-base leading-relaxed">{message.text}</p>
              <span
                className={`text-[11px] md:text-xs mt-2 block ${message.sender === "user"
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground"
                  }`}
              >
                {message.timestamp}
              </span>
            </div>
          </div>
        ))}
      </main>

      {/* Input Area */}
      <div className="sticky bottom-16 md:bottom-0 z-20 px-6 md:px-8 lg:px-12 pb-4 md:pb-6 pt-2">
        <div className="glass-card rounded-3xl p-3 md:p-4 flex items-center gap-3 md:gap-4 border border-border/30 shadow-strong">
          <input
            type="text"
            placeholder={t('typeMessage')}
            className="flex-1 bg-transparent px-4 py-2 md:py-3 outline-none text-responsive-sm placeholder:text-muted-foreground"
          />
          <button className="p-3 md:p-4 rounded-full bg-primary hover:bg-primary/90 transition-all hover:scale-105 shadow-primary">
            <Send className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
          </button>
          <button className="p-3 md:p-4 rounded-full hover:bg-accent transition-colors">
            <Mic className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Chat;
