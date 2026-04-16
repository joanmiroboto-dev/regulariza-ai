import { useTranslation } from 'react-i18next';
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
    badgeClass: 'result-badge-eligible',
    titleKey: 'results.eligible',
    descKey: 'results.eligibleDesc',
  },
  not_eligible: {
    icon: XCircle,
    badgeClass: 'result-badge-not-eligible',
    titleKey: 'results.notEligible',
    descKey: 'results.notEligibleDesc',
  },
  review: {
    icon: AlertTriangle,
    badgeClass: 'result-badge-review',
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
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${config.badgeClass}`}>
            <Icon className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-bold font-heading text-foreground">
            {t(config.titleKey)}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {t(config.descKey)}
          </p>
        </div>

        {/* Action buttons */}
        {result !== 'not_eligible' && (
          <div className="space-y-3">
            <Button
              onClick={onViewChecklist}
              variant="outline"
              className="w-full py-5 rounded-xl justify-start gap-3"
            >
              <FileText className="w-5 h-5 text-primary" />
              {t('results.viewChecklist')}
            </Button>
            <Button
              onClick={onViewCalendar}
              variant="outline"
              className="w-full py-5 rounded-xl justify-start gap-3"
            >
              <Calendar className="w-5 h-5 text-primary" />
              {t('results.viewCalendar')}
            </Button>
          </div>
        )}

        <Button
          onClick={onRestart}
          variant="ghost"
          className="w-full py-5 rounded-xl gap-2 text-muted-foreground"
        >
          <RotateCcw className="w-4 h-4" />
          {t('results.restart')}
        </Button>
      </div>
    </div>
  );
};

export default ResultsPage;
