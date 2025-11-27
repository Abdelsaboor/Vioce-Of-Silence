import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Home
      appName: "Voice of Silence",
      appTagline: "Transform gestures into speech",
      smartGlove: "Smart Glove",
      connected: "Connected",
      disconnected: "Disconnected",
      lastActivity: "Last Activity",
      sessionDuration: "Session Duration",
      gesturesRecognized: "Gestures Recognized",
      accuracy: "Accuracy",
      practice: "Practice",
      viewStats: "View Stats",
      
      // Translate
      confident: "confident",
      listeningToGestures: "Listening to gestures...",
      
      // Chat
      messages: "Messages",
      typeMessage: "Type a message...",
      
      // Training
      trainingMode: "Training Mode",
      learnGestures: "Learn gestures step by step",
      practiceGesture: "Practice Gesture",
      hello: "Hello",
      thankYou: "Thank You",
      please: "Please",
      help: "Help",
      helloDesc: "Wave your hand with palm facing forward",
      thankYouDesc: "Touch your chin and move hand forward",
      pleaseDesc: "Circular motion on chest with palm",
      helpDesc: "Raise one hand and tap with other hand",
      gestureIllustration: "Gesture illustration",
      
      // Settings
      settings: "Settings",
      customizeExperience: "Customize your experience",
      preferences: "PREFERENCES",
      notifications: "Notifications",
      voiceFeedback: "Voice Feedback",
      theme: "Theme",
      language: "Language",
      support: "SUPPORT",
      privacyPolicy: "Privacy Policy",
      helpSupport: "Help & Support",
      signOut: "Sign Out",
      light: "Light",
      dark: "Dark",
      english: "English",
      arabic: "العربية",
      
      // Bottom Nav
      home: "Home",
      chat: "Chat",
      train: "Train",
      profile: "Profile",
    },
  },
  ar: {
    translation: {
      // Home
      appName: "صوت الصمت",
      appTagline: "حول الإيماءات إلى كلام",
      smartGlove: "القفاز الذكي",
      connected: "متصل",
      disconnected: "غير متصل",
      lastActivity: "آخر نشاط",
      sessionDuration: "مدة الجلسة",
      gesturesRecognized: "الإيماءات المعترف بها",
      accuracy: "الدقة",
      practice: "تمرين",
      viewStats: "عرض الإحصائيات",
      
      // Translate
      confident: "واثق",
      listeningToGestures: "الاستماع إلى الإيماءات...",
      
      // Chat
      messages: "الرسائل",
      typeMessage: "اكتب رسالة...",
      
      // Training
      trainingMode: "وضع التدريب",
      learnGestures: "تعلم الإيماءات خطوة بخطوة",
      practiceGesture: "تمرين الإيماءة",
      hello: "مرحبا",
      thankYou: "شكرا لك",
      please: "من فضلك",
      help: "مساعدة",
      helloDesc: "لوح بيدك وراحة اليد للأمام",
      thankYouDesc: "المس ذقنك وحرك يدك للأمام",
      pleaseDesc: "حركة دائرية على الصدر براحة اليد",
      helpDesc: "ارفع يداً واحدة واضغط باليد الأخرى",
      gestureIllustration: "توضيح الإيماءة",
      
      // Settings
      settings: "الإعدادات",
      customizeExperience: "تخصيص تجربتك",
      preferences: "التفضيلات",
      notifications: "الإشعارات",
      voiceFeedback: "التعليقات الصوتية",
      theme: "المظهر",
      language: "اللغة",
      support: "الدعم",
      privacyPolicy: "سياسة الخصوصية",
      helpSupport: "المساعدة والدعم",
      signOut: "تسجيل الخروج",
      light: "فاتح",
      dark: "داكن",
      english: "English",
      arabic: "العربية",
      
      // Bottom Nav
      home: "الرئيسية",
      chat: "الدردشة",
      train: "تدريب",
      profile: "الملف الشخصي",
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('i18nextLng') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

// Set initial document direction
document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';

export default i18n;
