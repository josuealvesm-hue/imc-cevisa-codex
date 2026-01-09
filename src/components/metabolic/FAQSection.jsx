import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'O que é IMC e como ele é calculado?',
    answer: 'O Índice de Massa Corporal (IMC) é calculado dividindo o peso (em kg) pela altura ao quadrado (em metros). Por exemplo, uma pessoa com 70kg e 1,70m tem IMC = 70 ÷ (1,70 × 1,70) = 24,2. É uma ferramenta de triagem populacional, não um diagnóstico individual.'
  },
  {
    question: 'Por que a razão cintura/altura é importante?',
    answer: 'A razão cintura/altura (WHtR) é um indicador de gordura abdominal, que está mais fortemente associada a riscos cardiometabólicos do que o peso total. Valores iguais ou acima de 0,50 indicam que a circunferência da cintura é pelo menos metade da altura, o que está associado a maior risco de doenças cardiovasculares e diabetes.'
  },
  {
    question: 'Esta avaliação substitui uma consulta médica?',
    answer: 'Não. Esta é uma ferramenta educativa de triagem que utiliza indicadores populacionais. Ela não considera fatores individuais importantes como composição corporal, histórico de saúde, genética e estilo de vida. Sempre procure um profissional de saúde para uma avaliação completa e personalizada.'
  },
  {
    question: 'O que devo fazer se meu resultado indicar risco?',
    answer: 'Se seus indicadores sugerirem aumento de risco, é recomendado buscar orientação profissional. No Spa Médico Adventista Cevisa, oferecemos avaliação completa com profissionais especializados, incluindo médicos, nutricionistas e educadores físicos, para criar um plano personalizado para sua saúde.'
  },
  {
    question: 'Os limites de IMC são os mesmos para todas as pessoas?',
    answer: 'Os pontos de corte padrão (como 25 para sobrepeso) são baseados em estudos populacionais, principalmente em populações caucasianas. Para algumas etnias, como asiáticos, os riscos podem aumentar com valores menores de IMC. Além disso, atletas com maior massa muscular podem ter IMC elevado sem excesso de gordura. Por isso, é importante a avaliação profissional.'
  },
  {
    question: 'Meus dados ficam salvos em algum lugar?',
    answer: 'Seus dados clínicos (peso, altura, cintura) são processados apenas no seu navegador e não são armazenados em nossos servidores. Apenas as informações de contato que você fornecer voluntariamente são armazenadas, conforme nossa política de privacidade e em conformidade com a LGPD.'
  }
];

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-start justify-between gap-4 text-left hover:bg-gray-50/50 transition-colors"
      >
        <span className="font-medium text-gray-900">{faq.question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-gray-600 leading-relaxed pr-8">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-4">
              <HelpCircle className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Perguntas frequentes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Tire suas dúvidas
            </h2>
            <p className="text-gray-600">
              Entenda melhor sobre os indicadores e a avaliação
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
