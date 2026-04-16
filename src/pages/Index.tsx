import { useState } from 'react';
import HomePage from '@/components/HomePage';
import WizardPage, { type WizardAnswers } from '@/components/WizardPage';
import ResultsPage from '@/components/ResultsPage';
import ChecklistPage from '@/components/ChecklistPage';
import CalendarPage from '@/components/CalendarPage';
import PageTransition from '@/components/PageTransition';
import ThemeToggle from '@/components/ThemeToggle';

type AppView = 'home' | 'wizard' | 'results' | 'checklist' | 'calendar';

const Index = () => {
  const [view, setView] = useState<AppView>('home');
  const [answers, setAnswers] = useState<WizardAnswers | null>(null);

  const handleWizardComplete = (wizardAnswers: WizardAnswers) => {
    setAnswers(wizardAnswers);
    setView('results');
  };

  const renderView = () => {
    switch (view) {
      case 'home':
        return <HomePage onStart={() => setView('wizard')} />;
      case 'wizard':
        return <WizardPage onComplete={handleWizardComplete} onBack={() => setView('home')} />;
      case 'results':
        return (
          <ResultsPage
            answers={answers!}
            onViewChecklist={() => setView('checklist')}
            onViewCalendar={() => setView('calendar')}
            onRestart={() => { setAnswers(null); setView('home'); }}
          />
        );
      case 'checklist':
        return <ChecklistPage onBack={() => setView('results')} />;
      case 'calendar':
        return <CalendarPage onBack={() => setView('results')} />;
    }
  };

  return (
    <>
      <ThemeToggle />
      <PageTransition viewKey={view}>
        {renderView()}
      </PageTransition>
    </>
  );
};

export default Index;
