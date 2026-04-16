import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, HelpCircle } from 'lucide-react';

export type WizardAnswers = {
  arrivedBefore2025: boolean | null;
  fiveMonthsResidence: boolean | null;
  cleanRecord: boolean | null;
  asylumSeeker: boolean | null | 'na';
};

interface WizardPageProps {
  onComplete: (answers: WizardAnswers) => void;
  onBack: () => void;
}

const TOTAL_STEPS = 4;

const WizardPage = ({ onComplete, onBack }: WizardPageProps) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<WizardAnswers>({
    arrivedBefore2025: null,
    fiveMonthsResidence: null,
    cleanRecord: null,
    asylumSeeker: null,
  });
  const [showHelp, setShowHelp] = useState(false);

  const answerKeys: (keyof WizardAnswers)[] = [
    'arrivedBefore2025',
    'fiveMonthsResidence',
    'cleanRecord',
    'asylumSeeker',
  ];

  const currentKey = answerKeys[step - 1];
  const currentAnswer = answers[currentKey];
  const isLastStep = step === TOTAL_STEPS;
  const isAsylumStep = step === 4;

  const setAnswer = (value: boolean | 'na') => {
    setAnswers((prev) => ({ ...prev, [currentKey]: value }));
  };

  const handleNext = () => {
    if (isLastStep) {
      onComplete(answers);
    } else {
      setStep((s) => s + 1);
      setShowHelp(false);
    }
  };

  const handleBack = () => {
    if (step === 1) {
      onBack();
    } else {
      setStep((s) => s - 1);
      setShowHelp(false);
    }
  };

  const progress = (step / TOTAL_STEPS) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{t('wizard.title')}</span>
            <span>{t('wizard.progress', { current: step, total: TOTAL_STEPS })}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question card */}
        <div className="wizard-card space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-bold font-heading text-foreground">
              {t(`wizard.q${step}.title`)}
            </h2>
            <p className="text-base text-foreground leading-relaxed">
              {t(`wizard.q${step}.question`)}
            </p>
          </div>

          {/* Help toggle */}
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <HelpCircle className="w-4 h-4" />
            <span>{showHelp ? '−' : '+'} {t(`wizard.q${step}.help`).slice(0, 30)}...</span>
          </button>

          {showHelp && (
            <div className="rounded-lg bg-info/5 border border-info/20 p-4 text-sm text-foreground">
              {t(`wizard.q${step}.help`)}
            </div>
          )}

          {/* Answer buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setAnswer(true)}
              className={`px-6 py-4 rounded-xl border-2 text-base font-medium transition-all ${
                currentAnswer === true
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-card text-foreground hover:border-primary/40'
              }`}
            >
              {t('wizard.yes')}
            </button>
            <button
              onClick={() => setAnswer(false)}
              className={`px-6 py-4 rounded-xl border-2 text-base font-medium transition-all ${
                currentAnswer === false
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-card text-foreground hover:border-primary/40'
              }`}
            >
              {t('wizard.no')}
            </button>
            {isAsylumStep && (
              <button
                onClick={() => setAnswer('na')}
                className={`px-6 py-4 rounded-xl border-2 text-base font-medium transition-all ${
                  currentAnswer === 'na'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border bg-card text-foreground hover:border-primary/40'
                }`}
              >
                {t('wizard.q4.notApplicable')}
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex-1 py-5 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 ltr:mr-2 rtl:ml-2" />
            {t('wizard.back')}
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentAnswer === null}
            className="flex-1 py-5 rounded-xl"
          >
            {isLastStep ? t('results.title') : t('wizard.next')}
            <ArrowRight className="w-4 h-4 ltr:ml-2 rtl:mr-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WizardPage;
