import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, ChevronDown } from 'lucide-react';
import { faqItems, faqCategories } from '@/data/faqData';

interface ChatMessage {
  id: string;
  role: 'bot' | 'user';
  content: string;
}

const TutorChatbot = () => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showFaq, setShowFaq] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const prevLang = useRef(i18n.language);

  // Reset chat when language changes
  useEffect(() => {
    if (prevLang.current !== i18n.language) {
      prevLang.current = i18n.language;
      setMessages([{
        id: 'greeting',
        role: 'bot',
        content: t('tutor.greeting'),
      }]);
      setShowFaq(true);
    }
  }, [i18n.language, t]);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        id: 'greeting',
        role: 'bot',
        content: t('tutor.greeting'),
      }]);
    }
  }, [open, t]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const addBotReply = (answer: string) => {
    setMessages(prev => [...prev, {
      id: `bot-${Date.now()}`,
      role: 'bot',
      content: answer,
    }]);
  };

  const handleFaqClick = (faqId: string) => {
    const question = t(`tutor.faq.${faqId}.q`);
    const answer = t(`tutor.faq.${faqId}.a`);
    setMessages(prev => [...prev, {
      id: `user-${Date.now()}`,
      role: 'user',
      content: question,
    }]);
    setShowFaq(false);
    setTimeout(() => addBotReply(answer), 400);
  };

  const searchFaq = (query: string): string | null => {
    const lower = query.toLowerCase();
    let bestMatch: { id: string; score: number } | null = null;

    for (const faq of faqItems) {
      const q = t(faq.questionKey).toLowerCase();
      const a = t(faq.answerKey).toLowerCase();
      const words = lower.split(/\s+/).filter(w => w.length > 2);
      let score = 0;
      for (const word of words) {
        if (q.includes(word)) score += 3;
        if (a.includes(word)) score += 1;
      }
      if (score > 0 && (!bestMatch || score > bestMatch.score)) {
        bestMatch = { id: faq.id, score };
      }
    }

    return bestMatch ? t(`tutor.faq.${bestMatch.id}.a`) : null;
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput('');
    setShowFaq(false);
    setMessages(prev => [...prev, {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userMsg,
    }]);

    setTimeout(() => {
      const answer = searchFaq(userMsg);
      addBotReply(answer || t('tutor.noResults'));
    }, 500);
  };

  const filteredFaqs = activeCategory
    ? faqItems.filter(f => f.category === activeCategory)
    : faqItems;

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-5 end-5 z-50 w-14 h-14 rounded-full bg-primary shadow-lg shadow-primary/30 flex items-center justify-center"
          >
            <MessageCircle className="w-6 h-6 text-primary-foreground" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 end-0 z-50 w-full sm:w-[380px] sm:bottom-5 sm:end-5 h-[85vh] sm:h-[560px] sm:rounded-2xl bg-card border border-border shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-primary/5">
              <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground truncate">{t('tutor.title')}</h3>
              </div>
              <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'bot' && (
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-md'
                      : 'bg-secondary text-secondary-foreground rounded-bl-md'
                  }`}>
                    {msg.content}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* FAQ section */}
              {showFaq && (
                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => setShowFaq(false)}
                    className="flex items-center gap-1 text-xs text-muted-foreground"
                  >
                    <span className="font-medium">{t('tutor.suggestedQuestions')}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>

                  {/* Category pills */}
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => setActiveCategory(null)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                        !activeCategory ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      All
                    </button>
                    {faqCategories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                          activeCategory === cat ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                        }`}
                      >
                        {t(`tutor.categories.${cat}`)}
                      </button>
                    ))}
                  </div>

                  {/* FAQ buttons */}
                  <div className="space-y-1.5">
                    {filteredFaqs.map(faq => (
                      <button
                        key={faq.id}
                        onClick={() => handleFaqClick(faq.id)}
                        className="w-full text-start px-3 py-2.5 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all text-xs text-foreground leading-snug"
                      >
                        {t(faq.questionKey)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Show FAQ button if hidden */}
            {!showFaq && (
              <button
                onClick={() => setShowFaq(true)}
                className="mx-4 mb-2 text-xs text-primary hover:underline text-center"
              >
                {t('tutor.suggestedQuestions')} ↑
              </button>
            )}

            {/* Input */}
            <div className="border-t border-border p-3">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t('tutor.placeholder')}
                  className="flex-1 bg-secondary rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center disabled:opacity-40 transition-opacity"
                >
                  <Send className="w-4 h-4 text-primary-foreground" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TutorChatbot;
