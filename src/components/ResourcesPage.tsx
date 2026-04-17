import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResourcesPageProps {
  onBack: () => void;
}

const ResourcesPage = ({ onBack }: ResourcesPageProps) => {
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
          <h1 className="text-2xl md:text-3xl font-bold font-heading text-foreground">
            {t('resources.title')}
          </h1>
          <p className="text-muted-foreground">{t('resources.description')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="wizard-card space-y-4"
        >
          <div className="flex items-center gap-2">
            <PlayCircle className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">
              {t('resources.videoTitle')}
            </h2>
          </div>

          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-muted shadow-lg">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube-nocookie.com/embed/LDsOYJCwGsc"
              title={t('resources.videoTitle')}
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {t('resources.videoDescription')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button onClick={onBack} variant="outline" className="w-full">
            {t('common.back', 'Volver')}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ResourcesPage;
