import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, AlertTriangle } from 'lucide-react';

interface CalendarPageProps {
  onBack: () => void;
}

const MINISTRY_URL = 'https://www.inclusion.gob.es/';

const CalendarPage = ({ onBack }: CalendarPageProps) => {
  const { t } = useTranslation();

  const dates = [
    { key: 'date1', isWarning: false, isPast: new Date() >= new Date('2026-04-16') },
    { key: 'date2', isWarning: false, isPast: new Date() >= new Date('2026-04-20') },
    { key: 'date3', isWarning: true, isPast: false },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-lg space-y-6">
        <Button variant="ghost" onClick={onBack} className="gap-2 text-muted-foreground">
          <ArrowLeft className="w-4 h-4" />
          {t('wizard.back')}
        </Button>

        <div className="space-y-1">
          <h1 className="text-xl font-bold font-heading text-foreground">{t('calendar.title')}</h1>
          <p className="text-sm text-muted-foreground">{t('calendar.subtitle')}</p>
        </div>

        {/* Timeline */}
        <div className="space-y-0">
          {dates.map(({ key, isWarning, isPast }, index) => (
            <div key={key} className="flex gap-4">
              {/* Timeline column */}
              <div className="flex flex-col items-center">
                <div className={isWarning ? 'timeline-dot-warning' : 'timeline-dot'} />
                {index < dates.length - 1 && <div className="timeline-line flex-1 min-h-[60px]" />}
              </div>

              {/* Content */}
              <div className={`pb-6 flex-1 ${isPast ? 'opacity-60' : ''}`}>
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                  {t(`calendar.${key}.date`)}
                </span>
                <h3 className="text-base font-bold font-heading text-foreground mt-1">
                  {t(`calendar.${key}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {t(`calendar.${key}.desc`)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Warning */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-warning/10 border border-warning/20">
          <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
          <p className="text-sm text-foreground">{t('calendar.warning')}</p>
        </div>

        {/* Ministry link */}
        <div className="wizard-card space-y-3">
          <p className="text-sm text-muted-foreground">{t('calendar.appointmentInfo')}</p>
          <Button
            asChild
            className="w-full rounded-xl py-5 gap-2"
          >
            <a href={MINISTRY_URL} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
              {t('calendar.appointmentLink')}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
