import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Check, FileText, Download } from 'lucide-react';

interface ChecklistPageProps {
  onBack: () => void;
}

const DOCS = ['doc1', 'doc2', 'doc3', 'doc4'] as const;

const OFFICIAL_DOCS = [
  { key: 'officialDoc', file: '/docs/28-bis-arraigo-proteccion-internacional.pdf' },
  { key: 'officialForm', file: '/docs/EX-31-formulario-arraigo-proteccion-internacional.pdf' },
] as const;

const ChecklistPage = ({ onBack }: ChecklistPageProps) => {
  const { t } = useTranslation();
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (doc: string) => {
    setChecked((prev) => ({ ...prev, [doc]: !prev[doc] }));
  };

  const total = DOCS.length;
  const done = DOCS.filter((d) => checked[d]).length;

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-lg space-y-6">
        <Button variant="ghost" onClick={onBack} className="gap-2 text-muted-foreground">
          <ArrowLeft className="w-4 h-4" />
          {t('wizard.back')}
        </Button>

        <div className="space-y-1">
          <h1 className="text-xl font-bold font-heading text-foreground">{t('checklist.title')}</h1>
          <p className="text-sm text-muted-foreground">{t('checklist.subtitle')}</p>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-300 rounded-full"
              style={{ width: `${(done / total) * 100}%` }}
            />
          </div>
          <span className="text-sm font-medium text-foreground">{done}/{total}</span>
        </div>

        {/* Document cards */}
        <div className="space-y-3">
          {DOCS.map((doc) => (
            <button
              key={doc}
              onClick={() => toggle(doc)}
              className={`w-full text-start wizard-card flex items-start gap-4 transition-all ${
                checked[doc] ? 'border-accent/40 bg-accent/5' : ''
              }`}
            >
              <div className="pt-0.5">
                <Checkbox checked={!!checked[doc]} className="w-5 h-5" />
              </div>
              <div className="flex-1 space-y-1">
                <p className={`text-sm font-semibold ${checked[doc] ? 'text-accent line-through' : 'text-foreground'}`}>
                  {t(`checklist.${doc}.name`)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t(`checklist.${doc}.detail`)}
                </p>
              </div>
              {checked[doc] && <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />}
            </button>
          ))}
        </div>

        {/* Official document */}
        <div className="wizard-card space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="text-sm font-semibold text-foreground">
                {t('checklist.officialDoc.title')}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t('checklist.officialDoc.description')}
              </p>
            </div>
          </div>
          <a
            href="/docs/28-bis-arraigo-proteccion-internacional.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Download className="w-4 h-4" />
            {t('checklist.officialDoc.download')}
          </a>
        </div>

        {done === total && (
          <div className="text-center p-4 rounded-xl bg-accent/10 text-accent font-medium text-sm">
            ✅ {t('checklist.saved')}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChecklistPage;
