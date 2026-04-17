import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft, CalendarCheck, Download, FileText, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AppointmentPageProps {
  onBack: () => void;
}

const STEPS = [
  { key: 'step1', icon: Download },
  { key: 'step2', icon: FileText },
  { key: 'step3', icon: Send },
  { key: 'step4', icon: CheckCircle2 },
] as const;

const AppointmentPage = ({ onBack }: AppointmentPageProps) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="w-full max-w-2xl mx-auto space-y-6">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('common.back', 'Volver')}
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <div className="flex items-center gap-2">
            <CalendarCheck className="w-6 h-6 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold font-heading text-foreground">
              {t('appointment.title')}
            </h1>
          </div>
          <p className="text-muted-foreground">{t('appointment.description')}</p>
        </motion.div>

        <div className="space-y-3">
          {STEPS.map(({ key, icon: Icon }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="wizard-card flex items-start gap-4"
            >
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="absolute -top-1 -end-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                  {i + 1}
                </div>
              </div>
              <div className="flex-1 space-y-1 pt-0.5">
                <h3 className="text-sm font-semibold text-foreground">
                  {t(`appointment.${key}.title`)}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t(`appointment.${key}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-xl border border-warning/30 bg-warning/5 p-4 text-sm text-foreground leading-relaxed"
        >
          ⚠️ {t('appointment.warning')}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button onClick={onBack} variant="outline" className="w-full">
            {t('common.back', 'Volver')}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default AppointmentPage;
