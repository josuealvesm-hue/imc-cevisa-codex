import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HeroSection from '@/components/metabolic/HeroSection';
import CalculatorCard from '@/components/metabolic/CalculatorCard';
import PreviewResult from '@/components/metabolic/PreviewResult';
import LeadModal from '@/components/metabolic/LeadModal';
import FullResult from '@/components/metabolic/FullResult';
import HowToMeasure from '@/components/metabolic/HowToMeasure';
import FAQSection from '@/components/metabolic/FAQSection';
import FinalCTA from '@/components/metabolic/FinalCTA';
import Footer from '@/components/metabolic/Footer';

// Configuration
window.LEAD_ENDPOINT = null; // Set your endpoint URL here, e.g., 'https://api.example.com/leads'
window.SEND_CLINICAL_DATA = false; // Toggle to include weight/height/waist in lead submission

export default function RiscoMetabolico() {
  const [step, setStep] = useState('form'); // 'form', 'preview', 'result'
  const [calculatedData, setCalculatedData] = useState(null);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [userName, setUserName] = useState('');

  const handleCalculate = (data) => {
    setCalculatedData(data);
    setStep('preview');

    // Scroll to preview
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleContinueToLead = () => {
    setShowLeadModal(true);
  };

  const handleLeadSubmit = (leadData) => {
    setUserName(leadData.nome.split(' ')[0]); // Get first name
    setShowLeadModal(false);
    setStep('result');

    // Scroll to top
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setStep('form');
    setCalculatedData(null);
    setUserName('');

    // Scroll to calculator
    setTimeout(() => {
      document.getElementById('calculadora')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence mode="wait">
        {step === 'form' && (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <HeroSection />
            <CalculatorCard onCalculate={handleCalculate} />
            <HowToMeasure />
            <FAQSection />
            <FinalCTA />
          </motion.div>
        )}

        {step === 'preview' && (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-12 bg-gradient-to-br from-gray-50 to-white min-h-screen"
          >
            <PreviewResult
              data={calculatedData}
              onContinue={handleContinueToLead}
            />
          </motion.div>
        )}

        {step === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-gradient-to-br from-gray-50 to-white min-h-screen"
          >
            <FullResult
              data={calculatedData}
              userName={userName}
              onReset={handleReset}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <LeadModal
        isOpen={showLeadModal}
        onClose={() => setShowLeadModal(false)}
        onSubmit={handleLeadSubmit}
        calculatedData={calculatedData}
      />

      {step !== 'result' && <Footer />}
    </div>
  );
}
