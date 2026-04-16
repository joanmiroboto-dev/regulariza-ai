export interface FaqItem {
  id: string;
  category: 'eligibility' | 'documents' | 'process' | 'deadlines' | 'general';
  questionKey: string;
  answerKey: string;
}

export const faqItems: FaqItem[] = [
  { id: 'f1', category: 'eligibility', questionKey: 'tutor.faq.f1.q', answerKey: 'tutor.faq.f1.a' },
  { id: 'f2', category: 'eligibility', questionKey: 'tutor.faq.f2.q', answerKey: 'tutor.faq.f2.a' },
  { id: 'f3', category: 'eligibility', questionKey: 'tutor.faq.f3.q', answerKey: 'tutor.faq.f3.a' },
  { id: 'f4', category: 'documents', questionKey: 'tutor.faq.f4.q', answerKey: 'tutor.faq.f4.a' },
  { id: 'f5', category: 'documents', questionKey: 'tutor.faq.f5.q', answerKey: 'tutor.faq.f5.a' },
  { id: 'f6', category: 'documents', questionKey: 'tutor.faq.f6.q', answerKey: 'tutor.faq.f6.a' },
  { id: 'f7', category: 'process', questionKey: 'tutor.faq.f7.q', answerKey: 'tutor.faq.f7.a' },
  { id: 'f8', category: 'process', questionKey: 'tutor.faq.f8.q', answerKey: 'tutor.faq.f8.a' },
  { id: 'f9', category: 'deadlines', questionKey: 'tutor.faq.f9.q', answerKey: 'tutor.faq.f9.a' },
  { id: 'f10', category: 'deadlines', questionKey: 'tutor.faq.f10.q', answerKey: 'tutor.faq.f10.a' },
  { id: 'f11', category: 'general', questionKey: 'tutor.faq.f11.q', answerKey: 'tutor.faq.f11.a' },
  { id: 'f12', category: 'general', questionKey: 'tutor.faq.f12.q', answerKey: 'tutor.faq.f12.a' },
];

export const faqCategories = ['eligibility', 'documents', 'process', 'deadlines', 'general'] as const;
