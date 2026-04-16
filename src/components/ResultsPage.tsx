import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, AlertTriangle, FileText, Calendar, RotateCcw } from 'lucide-react';
import type { WizardAnswers } from './WizardPage';

type EligibilityResult = 'eligible' | 'not_eligible' | 'review';

function evaluateEligibility(answers: WizardAnswers): EligibilityResult {
  if (answers.arrivedBefore2025 === false) return 'not_eligible';
  if (answers.fiveMonthsResidence === false) return 'not_eligible';
  if (answers.cleanRecord === false) return 'not_eligible';
  if (answers.asylumSeeker === false) return 'review';
  return 'eligible';
}

interface ResultsPageProps {
  answers: WizardAnswers;
  onViewChecklist: () => void;
  onViewCalendar: () => void;
  onRestart: () => void;
}

const resultConfig = {
  eligible: {
    icon: CheckCircle2,
    badgeClass: 'bg-accent/15',
    iconClass: 'text-accent',
    titleKey: 'results.eligible',
    descKey: 'results.eligibleDesc',
  },
  not_eligible: {
    icon: XCircle,
    badgeClass: 'bg-destructive/15',
    iconClass: 'text-destructive',
    titleKey: 'results.notEligible',
    descKey: 'results.notEligibleDesc',
  },
  review: {
    icon: AlertTriangle,
    badgeClass: 'bg-warning/15',
    iconClass: 'text-warning',
    titleKey: 'results.review',
    descKey: 'results.reviewDesc',
  },
};

const ResultsPage = ({ answers, onViewChecklist, onViewCalendar, onRestart }: ResultsPageProps) => {
  const { t } = useTranslation();
  const result = evaluateEligibility(answers);
  const config = resultConfig[result];
  const Icon = config.icon;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg space-y-6">
        <h1 className="text-xl font-bold font-heading text-center text-foreground">
          {t('results.title')}
        </h1>

        {/* Result card */}
        <div className="wizard-card text-center space-y-5">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${config.badgeClass}`}
          >
            <motion.div
              animate={result === 'eligible' ? { scale: [1, 1.1, 1] } : result === 'review' ? { rotate: [0, 5, -5, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Icon className={`w-12 h-12 ${config.iconClass}`} />
            </motion.div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl font-bold font-heading text-foreground"
          >
            {t(config.titleKey)}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-muted-foreground leading-relaxed whitespace-pre-line"
          >
            {t(config.descKey)}
          </motion.p>
        </div>

        {/* Action buttons */}
        {result !== 'not_eligible' && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-3"
          >
            <Button
              onClick={onViewChecklist}
              variant="outline"
              className="w-full py-5 rounded-xl justify-start gap-3 group"
            >
              <FileText className="w-5 h-5 text-primary transition-transform group-hover:scale-110" />
              {t('results.viewChecklist')}
            </Button>
            <Button
              onClick={onViewCalendar}
              variant="outline"
              className="w-full py-5 rounded-xl justify-start gap-3 group"
            >
              <Calendar className="w-5 h-5 text-primary transition-transform group-hover:scale-110" />
              {t('results.viewCalendar')}
            </Button>
          </motion.div>
        )}

        <Button
          onClick={onRestart}
          variant="ghost"
          className="w-full py-5 rounded-xl gap-2 text-muted-foreground group"
        >
          <RotateCcw className="w-4 h-4 transition-transform group-hover:-rotate-180 duration-500" />
          {t('results.restart')}
        </Button>
      </div>
    </div>
  );
};

export default ResultsPage;
