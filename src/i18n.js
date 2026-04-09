import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      "nav.home": "Home",
      "nav.projects": "Projects",
      "nav.liveUrl": "Live URL",
      "nav.blog": "Blog",
      "nav.developers": "Developers",
      "nav.contact": "Contact",
      "nav.downloads": "Downloads",
      "nav.login": "Login",
      "nav.logout": "Logout",
      "nav.dashboard": "Dashboard",
      
      // Hero Section
      "hero.title": "Find Your Perfect Dev Match",
      "hero.subtitle": "Connect with talented developers, showcase your projects, and build amazing things together",
      "hero.button": "Get Started",
      
      // Typing Animation
      "typing.dev1": "Full Stack Developer 💻",
      "typing.dev2": "AI/ML Enthusiast 🤖",
      "typing.dev3": "Photographer 📸",
      "typing.dev4": "Problem Solver 🎯",
      "typing.dev5": "Open Source Contributor 🌟",
      
      // Features
      "features.title": "Why Choose DevFinder?",
      "features.skills": "Showcase Your Skills",
      "features.skills.desc": "Create your developer profile and highlight your best projects",
      "features.connect": "Connect & Collaborate",
      "features.connect.desc": "Network with developers worldwide and find collaboration opportunities",
      "features.grow": "Grow Together",
      "features.grow.desc": "Learn from others, get feedback, and accelerate your career",
      
      // Stats
      "stats.developers": "Active Developers",
      "stats.projects": "Projects Shared",
      "stats.companies": "Companies Trust Us",
      
      // CTA
      "cta.title": "Ready to Showcase Your Work?",
      "cta.subtitle": "Join thousands of developers who are already sharing their projects",
      "cta.button": "Join Now - It's Free!",
      
      // Footer
      "footer.connect": "Let's Connect",
      "footer.allOpenSource": "All projects are open source! Feel free to ⭐ star them on GitHub and contribute!",
      "footer.visitGitHub": "Visit My GitHub Profile",
      
      // Projects Page
      "projects.title": "My GitHub Projects",
      "projects.subtitle": "innovative projects showcasing my expertise",
      "projects.search": "Search by title, description, or technology...",
      "projects.total": "Total Projects",
      "projects.techUsed": "Technologies Used",
      "projects.openSource": "Open Source",
      "projects.featured3d": "🌟 Featured 3D Projects",
      "projects.viewCode": "View Code",
      "projects.techStack": "🛠️ Tech Stack",
      "projects.keyMetrics": "📊 Key Metrics",
      "projects.noResults": "No projects found. Try adjusting your search or filter!",
      
      // Live URLs Page
      "liveurl.title": "🚀 Live URLs",
      "liveurl.subtitle": "Explore my deployed projects and see what's coming next!",
      "liveurl.live": "Live Projects",
      "liveurl.comingSoon": "Coming Soon",
      "liveurl.total": "Total Projects",
      "liveurl.allProjects": "All Projects",
      "liveurl.liveDemo": "Live Demo Available",
      "liveurl.visitDemo": "Visit Live Demo",
      "liveurl.underDev": "This project is under development",
      "liveurl.checkBack": "Check back soon for the live demo!",
      "liveurl.featured": "🎯 Featured Live Demo",
      "liveurl.featuredDesc": "Check out my Sales Dashboard - A comprehensive analytics platform with real-time metrics!",
      "liveurl.launch": "Launch Sales Dashboard",
      
      // Blog Page
      "blog.title": "📝 Tech Blog",
      "blog.subtitle": "Sharing my learning journey in development and AI/ML",
      "blog.search": "Search articles...",
      "blog.found": "Found",
      "blog.articles": "articles",
      "blog.readArticle": "Read Article",
      "blog.back": "← Back to all posts",
      "blog.noResults": "No articles found",
      "blog.tryAdjust": "Try adjusting your search or filter",
      
      // Developers Page
      "developers.about": "👨‍💻 About Me",
      "developers.location": "Nadiad, Gujarat, India",
      "developers.education": "B.Tech IT, 3rd Year",
      "developers.focus": "Full Stack · AI/ML",
      "developers.hobbies": "Photography · Open Source",
      "developers.techStack": "🛠️ Tech Stack",
      "developers.languages": "💻 Languages",
      "developers.frontend": "🌐 Frontend",
      "developers.backend": "⚙️ Backend & Frameworks",
      "developers.databases": "🗄️ Databases",
      "developers.tools": "🧰 Tools & IDEs",
      "developers.learning": "📚 Currently Leveling Up",
      "developers.projects": "🚀 Current Projects",
      "developers.connect": "🤝 Let's Connect",
      "developers.funFact": "I debug best with a cup of chai ☕ - it's my secret superpower!",
      "developers.star": "⭐ If you like what you see, consider starring a repo or two!",
      
      // Contact Page
      "contact.title": "📧 Get in Touch",
      "contact.subtitle": "Have a project in mind? Let's collaborate!",
      "contact.name": "Name",
      "contact.email": "Email",
      "contact.message": "Message",
      "contact.send": "Send Message",
      "contact.sending": "Sending...",
      "contact.success": "Message sent successfully! I'll get back to you soon.",
      
      // Chat Widget
      "chat.title": "Live Chat",
      "chat.online": "Online",
      "chat.offline": "Offline",
      "chat.clear": "Clear",
      "chat.start": "Start a Conversation",
      "chat.yourName": "Your Name",
      "chat.yourEmail": "Your Email (optional)",
      "chat.startBtn": "Start Chat",
      "chat.placeholder": "Type your message...",
      
      // Hire Me
      "hire.title": "💼 Hire Me",
      "hire.plan.select": "Select a Plan",
      "hire.plan.basic": "Basic Consultation",
      "hire.plan.standard": "Standard Package",
      "hire.plan.premium": "Premium Package",
      "hire.payment": "Payment Details",
      "hire.success": "Booking Confirmed!",
      "hire.thankyou": "Thank you for your booking!",
      "hire.confirmation": "You will receive a confirmation email shortly with meeting details."
    }
  },
  hi: {
    translation: {
      // Navigation
      "nav.home": "होम",
      "nav.projects": "प्रोजेक्ट्स",
      "nav.liveUrl": "लाइव यूआरएल",
      "nav.blog": "ब्लॉग",
      "nav.developers": "डेवलपर्स",
      "nav.contact": "संपर्क करें",
      "nav.downloads": "डाउनलोड",
      "nav.login": "लॉगिन",
      "nav.logout": "लॉगआउट",
      "nav.dashboard": "डैशबोर्ड",
      
      // Hero Section
      "hero.title": "अपना सही डेव मैच खोजें",
      "hero.subtitle": "प्रतिभाशाली डेवलपर्स से जुड़ें, अपने प्रोजेक्ट दिखाएं, और मिलकर अद्भुत चीजें बनाएं",
      "hero.button": "शुरू करें",
      
      // Typing Animation
      "typing.dev1": "फुल स्टैक डेवलपर 💻",
      "typing.dev2": "एआई/एमएल उत्साही 🤖",
      "typing.dev3": "फोटोग्राफर 📸",
      "typing.dev4": "समस्या समाधानकर्ता 🎯",
      "typing.dev5": "ओपन सोर्स योगदानकर्ता 🌟",
      
      // Features
      "features.title": "DevFinder क्यों चुनें?",
      "features.skills": "अपने कौशल दिखाएं",
      "features.skills.desc": "अपना डेवलपर प्रोफाइल बनाएं और अपने सर्वश्रेष्ठ प्रोजेक्ट हाइलाइट करें",
      "features.connect": "जुड़ें और सहयोग करें",
      "features.connect.desc": "दुनिया भर के डेवलपर्स से नेटवर्क बनाएं और सहयोग के अवसर खोजें",
      "features.grow": "एक साथ बढ़ें",
      "features.grow.desc": "दूसरों से सीखें, फीडबैक प्राप्त करें, और अपने करियर को तेज करें",
      
      // Stats
      "stats.developers": "सक्रिय डेवलपर्स",
      "stats.projects": "प्रोजेक्ट साझा किए गए",
      "stats.companies": "कंपनियां हम पर भरोसा करती हैं",
      
      // CTA
      "cta.title": "अपना काम दिखाने के लिए तैयार हैं?",
      "cta.subtitle": "हजारों डेवलपर्स से जुड़ें जो पहले से ही अपने प्रोजेक्ट साझा कर रहे हैं",
      "cta.button": "अभी ज्वाइन करें - मुफ्त है!",
      
      // Footer
      "footer.connect": "आइए जुड़ें",
      "footer.allOpenSource": "सभी प्रोजेक्ट ओपन सोर्स हैं! GitHub पर उन्हें ⭐ स्टार करने और योगदान करने के लिए स्वतंत्र महसूस करें!",
      "footer.visitGitHub": "मेरा GitHub प्रोफाइल देखें",
      
      // Projects Page
      "projects.title": "मेरे GitHub प्रोजेक्ट्स",
      "projects.subtitle": "अभिनव प्रोजेक्ट्स मेरी विशेषज्ञता दिखाते हैं",
      "projects.search": "शीर्षक, विवरण या तकनीक से खोजें...",
      "projects.total": "कुल प्रोजेक्ट्स",
      "projects.techUsed": "उपयोग की गई तकनीकें",
      "projects.openSource": "ओपन सोर्स",
      "projects.featured3d": "🌟 फीचर्ड 3D प्रोजेक्ट्स",
      "projects.viewCode": "कोड देखें",
      "projects.techStack": "🛠️ तकनीक स्टैक",
      "projects.keyMetrics": "📊 प्रमुख मेट्रिक्स",
      "projects.noResults": "कोई प्रोजेक्ट नहीं मिला। कृपया अपना खोज या फ़िल्टर समायोजित करें!",
      
      // Live URLs Page
      "liveurl.title": "🚀 लाइव यूआरएल",
      "liveurl.subtitle": "मेरे तैनात प्रोजेक्ट्स देखें और देखें आगे क्या आ रहा है!",
      "liveurl.live": "लाइव प्रोजेक्ट्स",
      "liveurl.comingSoon": "जल्द आ रहा है",
      "liveurl.total": "कुल प्रोजेक्ट्स",
      "liveurl.allProjects": "सभी प्रोजेक्ट्स",
      "liveurl.liveDemo": "लाइव डेमो उपलब्ध",
      "liveurl.visitDemo": "लाइव डेमो देखें",
      "liveurl.underDev": "यह प्रोजेक्ट विकासाधीन है",
      "liveurl.checkBack": "लाइव डेमो के लिए जल्द ही वापस आएं!",
      "liveurl.featured": "🎯 फीचर्ड लाइव डेमो",
      "liveurl.featuredDesc": "मेरा सेल्स डैशबोर्ड देखें - रीयल-टाइम मेट्रिक्स के साथ एक व्यापक एनालिटिक्स प्लेटफॉर्म!",
      "liveurl.launch": "सेल्स डैशबोर्ड लॉन्च करें",
      
      // Blog Page
      "blog.title": "📝 टेक ब्लॉग",
      "blog.subtitle": "विकास और एआई/एमएल में मेरी सीखने की यात्रा साझा करना",
      "blog.search": "लेख खोजें...",
      "blog.found": "मिले",
      "blog.articles": "लेख",
      "blog.readArticle": "लेख पढ़ें",
      "blog.back": "← सभी पोस्ट पर वापस जाएं",
      "blog.noResults": "कोई लेख नहीं मिला",
      "blog.tryAdjust": "कृपया अपना खोज या फ़िल्टर समायोजित करें",
      
      // Developers Page
      "developers.about": "👨‍💻 मेरे बारे में",
      "developers.location": "नडियाद, गुजरात, भारत",
      "developers.education": "बी.टेक आईटी, तृतीय वर्ष",
      "developers.focus": "फुल स्टैक · एआई/एमएल",
      "developers.hobbies": "फोटोग्राफी · ओपन सोर्स",
      "developers.techStack": "🛠️ तकनीक स्टैक",
      "developers.languages": "💻 भाषाएं",
      "developers.frontend": "🌐 फ्रंटएंड",
      "developers.backend": "⚙️ बैकएंड और फ्रेमवर्क",
      "developers.databases": "🗄️ डेटाबेस",
      "developers.tools": "🧰 उपकरण और आईडीई",
      "developers.learning": "📚 वर्तमान में सीख रहा हूं",
      "developers.projects": "🚀 वर्तमान प्रोजेक्ट्स",
      "developers.connect": "🤝 आइए जुड़ें",
      "developers.funFact": "मैं एक कप चाय ☕ के साथ सबसे अच्छा डीबग करता हूं - यह मेरी गुप्त शक्ति है!",
      "developers.star": "⭐ यदि आप जो देख रहे हैं वह पसंद है, तो कृपया एक या दो रेपो को स्टार करने पर विचार करें!",
      
      // Contact Page
      "contact.title": "📧 संपर्क करें",
      "contact.subtitle": "कोई प्रोजेक्ट दिमाग में है? आइए सहयोग करें!",
      "contact.name": "नाम",
      "contact.email": "ईमेल",
      "contact.message": "संदेश",
      "contact.send": "संदेश भेजें",
      "contact.sending": "भेजा जा रहा है...",
      "contact.success": "संदेश सफलतापूर्वक भेजा गया! मैं जल्द ही आपसे संपर्क करूंगा।",
      
      // Chat Widget
      "chat.title": "लाइव चैट",
      "chat.online": "ऑनलाइन",
      "chat.offline": "ऑफलाइन",
      "chat.clear": "साफ करें",
      "chat.start": "बातचीत शुरू करें",
      "chat.yourName": "आपका नाम",
      "chat.yourEmail": "आपका ईमेल (वैकल्पिक)",
      "chat.startBtn": "चैट शुरू करें",
      "chat.placeholder": "अपना संदेश लिखें...",
      
      // Hire Me
      "hire.title": "💼 मुझे किराए पर लें",
      "hire.plan.select": "योजना चुनें",
      "hire.plan.basic": "मूल परामर्श",
      "hire.plan.standard": "मानक पैकेज",
      "hire.plan.premium": "प्रीमियम पैकेज",
      "hire.payment": "भुगतान विवरण",
      "hire.success": "बुकिंग पुष्टि हुई!",
      "hire.thankyou": "आपकी बुकिंग के लिए धन्यवाद!",
      "hire.confirmation": "आपको जल्द ही मीटिंग विवरण के साथ एक पुष्टिकरण ईमेल प्राप्त होगा।"
    }
  },
  gu: {
    translation: {
      // Navigation
      "nav.home": "હોમ",
      "nav.projects": "પ્રોજેક્ટ્સ",
      "nav.liveUrl": "લાઇવ URL",
      "nav.blog": "બ્લોગ",
      "nav.developers": "ડેવલપર્સ",
      "nav.contact": "સંપર્ક કરો",
      "nav.downloads": "ડાઉનલોડ્સ",
      "nav.login": "લોગિન",
      "nav.logout": "લોગઆઉટ",
      "nav.dashboard": "ડેશબોર્ડ",
      
      // Hero Section
      "hero.title": "તમારો સંપૂર્ણ ડેવ મેચ શોધો",
      "hero.subtitle": "પ્રતિભાશાળી ડેવલપર્સ સાથે જોડાઓ, તમારા પ્રોજેક્ટ્સ બતાવો, અને સાથે મળીને અદ્ભુત વસ્તુઓ બનાવો",
      "hero.button": "શરૂ કરો",
      
      // Typing Animation
      "typing.dev1": "ફુલ સ્ટેક ડેવલપર 💻",
      "typing.dev2": "AI/ML ઉત્સાહી 🤖",
      "typing.dev3": "ફોટોગ્રાફર 📸",
      "typing.dev4": "સમસ્યા ઉકેલનાર 🎯",
      "typing.dev5": "ઓપન સોર્સ યોગદાનકર્તા 🌟",
      
      // Features
      "features.title": "DevFinder શા માટે પસંદ કરો?",
      "features.skills": "તમારા કૌશલ્ય બતાવો",
      "features.skills.desc": "તમારો ડેવલપર પ્રોફાઇલ બનાવો અને તમારા શ્રેષ્ઠ પ્રોજેક્ટ્સ હાઇલાઇટ કરો",
      "features.connect": "જોડાઓ અને સહયોગ કરો",
      "features.connect.desc": "વિશ્વભરના ડેવલપર્સ સાથે નેટવર્ક બનાવો અને સહયોગની તકો શોધો",
      "features.grow": "સાથે વધો",
      "features.grow.desc": "અન્ય પાસેથી શીખો, પ્રતિસાદ મેળવો, અને તમારી કારકિર્દીને વેગ આપો",
      
      // Stats
      "stats.developers": "સક્રિય ડેવલપર્સ",
      "stats.projects": "પ્રોજેક્ટ્સ શેર કર્યા",
      "stats.companies": "કંપનીઓ અમારા પર વિશ્વાસ કરે છે",
      
      // CTA
      "cta.title": "તમારું કાર્ય બતાવવા તૈયાર છો?",
      "cta.subtitle": "હજારો ડેવલપર્સ સાથે જોડાઓ જેઓ પહેલેથી જ તેમના પ્રોજેક્ટ્સ શેર કરી રહ્યા છે",
      "cta.button": "હવે જોડાઓ - તે મફત છે!",
      
      // Footer
      "footer.connect": "ચાલો જોડાઈએ",
      "footer.allOpenSource": "બધા પ્રોજેક્ટ્સ ઓપન સોર્સ છે! GitHub પર તેમને ⭐ સ્ટાર કરવા અને યોગદાન આપવા માટે મફત લાગે!",
      "footer.visitGitHub": "મારું GitHub પ્રોફાઇલ જુઓ",
      
      // Projects Page
      "projects.title": "મારા GitHub પ્રોજેક્ટ્સ",
      "projects.subtitle": "નવીન પ્રોજેક્ટ્સ મારી કુશળતા દર્શાવે છે",
      "projects.search": "શીર્ષક, વર્ણન અથવા ટેકનોલોજી દ્વારા શોધો...",
      "projects.total": "કુલ પ્રોજેક્ટ્સ",
      "projects.techUsed": "ઉપયોગમાં લેવાયેલી ટેકનોલોજીઓ",
      "projects.openSource": "ઓપન સોર્સ",
      "projects.featured3d": "🌟 ફીચર્ડ 3D પ્રોજેક્ટ્સ",
      "projects.viewCode": "કોડ જુઓ",
      "projects.techStack": "🛠️ ટેક સ્ટેક",
      "projects.keyMetrics": "📊 મુખ્ય મેટ્રિક્સ",
      "projects.noResults": "કોઈ પ્રોજેક્ટ મળ્યા નથી. કૃપા કરીને તમારી શોધ અથવા ફિલ્ટર સમાયોજિત કરો!",
      
      // Live URLs Page
      "liveurl.title": "🚀 લાઇવ URL",
      "liveurl.subtitle": "મારા તૈનાત પ્રોજેક્ટ્સ જુઓ અને જુઓ આગળ શું આવી રહ્યું છે!",
      "liveurl.live": "લાઇવ પ્રોજેક્ટ્સ",
      "liveurl.comingSoon": "ટૂંક સમયમાં",
      "liveurl.total": "કુલ પ્રોજેક્ટ્સ",
      "liveurl.allProjects": "બધા પ્રોજેક્ટ્સ",
      "liveurl.liveDemo": "લાઇવ ડેમો ઉપલબ્ધ",
      "liveurl.visitDemo": "લાઇવ ડેમો જુઓ",
      "liveurl.underDev": "આ પ્રોજેક્ટ વિકાસ હેઠળ છે",
      "liveurl.checkBack": "લાઇવ ડેમો માટે ટૂંક સમયમાં પાછા આવો!",
      "liveurl.featured": "🎯 ફીચર્ડ લાઇવ ડેમો",
      "liveurl.featuredDesc": "મારું સેલ્સ ડેશબોર્ડ જુઓ - રીઅલ-ટાઇમ મેટ્રિક્સ સાથે એક વ્યાપક એનાલિટિક્સ પ્લેટફોર્મ!",
      "liveurl.launch": "સેલ્સ ડેશબોર્ડ લોન્ચ કરો",
      
      // Blog Page
      "blog.title": "📝 ટેક બ્લોગ",
      "blog.subtitle": "વિકાસ અને AI/ML માં મારી શીખવાની યાત્રા શેર કરવી",
      "blog.search": "લેખો શોધો...",
      "blog.found": "મળ્યા",
      "blog.articles": "લેખો",
      "blog.readArticle": "લેખ વાંચો",
      "blog.back": "← બધા પોસ્ટ પર પાછા જાઓ",
      "blog.noResults": "કોઈ લેખ મળ્યા નથી",
      "blog.tryAdjust": "કૃપા કરીને તમારી શોધ અથવા ફિલ્ટર સમાયોજિત કરો",
      
      // Developers Page
      "developers.about": "👨‍💻 મારા વિશે",
      "developers.location": "નડિયાદ, ગુજરાત, ભારત",
      "developers.education": "બી.ટેક આઈટી, તૃતીય વર્ષ",
      "developers.focus": "ફુલ સ્ટેક · AI/ML",
      "developers.hobbies": "ફોટોગ્રાફી · ઓપન સોર્સ",
      "developers.techStack": "🛠️ ટેક સ્ટેક",
      "developers.languages": "💻 ભાષાઓ",
      "developers.frontend": "🌐 ફ્રન્ટએન્ડ",
      "developers.backend": "⚙️ બેકએન્ડ અને ફ્રેમવર્ક",
      "developers.databases": "🗄️ ડેટાબેઝ",
      "developers.tools": "🧰 સાધનો અને IDE",
      "developers.learning": "📚 હાલમાં શીખી રહ્યો છું",
      "developers.projects": "🚀 વર્તમાન પ્રોજેક્ટ્સ",
      "developers.connect": "🤝 ચાલો જોડાઈએ",
      "developers.funFact": "હું એક કપ ચા ☕ સાથે શ્રેષ્ઠ ડીબગ કરું છું - તે મારી ગુપ્ત શક્તિ છે!",
      "developers.star": "⭐ જો તમે જે જુઓ છો તે ગમે છે, તો કૃપા કરીને એક કે બે રેપોને સ્ટાર કરવાનું વિચારો!",
      
      // Contact Page
      "contact.title": "📧 સંપર્ક કરો",
      "contact.subtitle": "કોઈ પ્રોજેક્ટ ધ્યાનમાં છે? ચાલો સહયોગ કરીએ!",
      "contact.name": "નામ",
      "contact.email": "ઈમેલ",
      "contact.message": "સંદેશ",
      "contact.send": "સંદેશ મોકલો",
      "contact.sending": "મોકલી રહ્યા છીએ...",
      "contact.success": "સંદેશ સફળતાપૂર્વક મોકલાયો! હું ટૂંક સમયમાં તમારો સંપર્ક કરીશ.",
      
      // Chat Widget
      "chat.title": "લાઇવ ચેટ",
      "chat.online": "ઑનલાઇન",
      "chat.offline": "ઑફલાઇન",
      "chat.clear": "સાફ કરો",
      "chat.start": "વાર્તાલાપ શરૂ કરો",
      "chat.yourName": "તમારું નામ",
      "chat.yourEmail": "તમારો ઈમેલ (વૈકલ્પિક)",
      "chat.startBtn": "ચેટ શરૂ કરો",
      "chat.placeholder": "તમારો સંદેશ લખો...",
      
      // Hire Me
      "hire.title": "💼 મને ભાડે લો",
      "hire.plan.select": "યોજના પસંદ કરો",
      "hire.plan.basic": "મૂળભૂત પરામર્શ",
      "hire.plan.standard": "પ્રમાણભૂત પેકેજ",
      "hire.plan.premium": "પ્રીમિયમ પેકેજ",
      "hire.payment": "ચુકવણી વિગતો",
      "hire.success": "બુકિંગ પુષ્ટિ થઈ!",
      "hire.thankyou": "તમારા બુકિંગ બદલ આભાર!",
      "hire.confirmation": "તમને ટૂંક સમયમાં મીટિંગ વિગતો સાથે પુષ્ટિકરણ ઈમેલ પ્રાપ્ત થશે."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;