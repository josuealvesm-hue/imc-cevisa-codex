import { motion } from 'framer-motion';
import { Activity, Heart, AlertTriangle, CheckCircle, Info, MessageCircle, RotateCcw } from 'lucide-react';

export default function FullResult({ data, userName, onReset }) {
  // IMC classification
  const getIMCClassification = (imc) => {
    if (imc < 18.5) return { label: 'Baixo peso', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
    if (imc < 25) return { label: 'Peso adequado', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' };
    if (imc < 30) return { label: 'Sobrepeso', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' };
    if (imc < 35) return { label: 'Obesidade grau I', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' };
    if (imc < 40) return { label: 'Obesidade grau II', color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200' };
    return { label: 'Obesidade grau III', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
  };

  // WHtR interpretation
  const getWHtRInterpretation = (whtr) => {
    if (whtr < 0.5) {
      return {
        label: 'Sem aumento de risco',
        description: 'Sua razão cintura/altura está em uma faixa não associada a aumento de risco cardiometabólico.',
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        icon: CheckCircle
      };
    }
    return {
      label: 'Aumento de risco cardiometabólico',
      description: 'Sua razão cintura/altura está em uma faixa associada a maior risco de condições cardiometabólicas.',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      icon: AlertTriangle
    };
  };

  const imcClass = getIMCClassification(data.imc);
  const whtrClass = getWHtRInterpretation(data.whtr);
  const WhtrIcon = whtrClass.icon;

  // Generate WhatsApp message
  const generateWhatsAppLink = () => {
    const message = encodeURIComponent(
      `Olá! Fiz a avaliação de risco metabólico no site do Spa Médico Cevisa.\n\n` +
      `📊 Meus resultados:\n` +
      `• IMC: ${data.imc} (${imcClass.label})\n` +
      `• Razão Cintura/Altura: ${data.whtr}\n\n` +
      `Gostaria de agendar uma avaliação profissional.`
    );
    return `https://wa.me/5511999999999?text=${message}`; // Replace with actual number
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto px-4 py-8"
    >
      {/* Greeting */}
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl sm:text-3xl font-bold text-gray-900"
        >
          {userName ? `${userName}, aqui está seu resultado` : 'Seu resultado completo'}
        </motion.h2>
        <p className="text-gray-600 mt-2">Avaliação de Risco Metabólico</p>
      </div>

      {/* Results cards */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {/* IMC Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className={`${imcClass.bg} ${imcClass.border} border rounded-2xl p-6`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <Activity className={`w-5 h-5 ${imcClass.color}`} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Índice de Massa Corporal</p>
              <p className="text-xs text-gray-500">IMC</p>
            </div>
          </div>
          <div className="mb-3">
            <span className={`text-4xl font-bold ${imcClass.color}`}>{data.imc}</span>
            <span className="text-gray-500 ml-1">kg/m²</span>
          </div>
          <div className={`inline-flex items-center px-3 py-1.5 rounded-full ${imcClass.bg} border ${imcClass.border}`}>
            <span className={`text-sm font-medium ${imcClass.color}`}>{imcClass.label}</span>
          </div>
        </motion.div>

        {/* WHtR Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className={`${whtrClass.bg} ${whtrClass.border} border rounded-2xl p-6`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <Heart className={`w-5 h-5 ${whtrClass.color}`} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Razão Cintura/Altura</p>
              <p className="text-xs text-gray-500">WHtR</p>
            </div>
          </div>
          <div className="mb-3">
            <span className={`text-4xl font-bold ${whtrClass.color}`}>{data.whtr}</span>
          </div>
          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${whtrClass.bg} border ${whtrClass.border}`}>
            <WhtrIcon className={`w-4 h-4 ${whtrClass.color}`} />
            <span className={`text-sm font-medium ${whtrClass.color}`}>{whtrClass.label}</span>
          </div>
        </motion.div>
      </div>

      {/* Interpretation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white border border-gray-200 rounded-2xl p-6 mb-6"
      >
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Info className="w-5 h-5 text-emerald-600" />
          O que esses números significam?
        </h3>

        <div className="space-y-4 text-gray-700">
          <div>
            <p className="font-medium mb-1">IMC (Índice de Massa Corporal)</p>
            <p className="text-sm text-gray-600">
              O IMC é uma medida que relaciona peso e altura, utilizada como triagem inicial para avaliar o estado nutricional.
              Seu resultado de <strong>{data.imc} kg/m²</strong> está classificado como <strong>{imcClass.label}</strong>.
            </p>
          </div>

          <div>
            <p className="font-medium mb-1">Razão Cintura/Altura (WHtR)</p>
            <p className="text-sm text-gray-600">
              {whtrClass.description}
              {data.whtr >= 0.5 && (
                <> Valores iguais ou acima de 0,50 estão associados a maior risco de doenças cardiovasculares e metabólicas.</>
              )}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6"
      >
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-amber-800 mb-1">Aviso Importante</p>
            <p className="text-sm text-amber-700">
              Esta é uma <strong>ferramenta educativa de triagem</strong> e não constitui diagnóstico médico.
              Os resultados são baseados em indicadores populacionais e não substituem uma avaliação profissional completa.
              Em caso de sintomas, dúvidas ou para orientação personalizada, procure um profissional de saúde.
            </p>
          </div>
        </div>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="space-y-3"
      >
        <a
          href={generateWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-200 flex items-center justify-center rounded-md"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Falar com um consultor do Spa Médico Cevisa
        </a>

        <button
          type="button"
          onClick={onReset}
          className="w-full h-12 text-gray-600 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Fazer nova avaliação
        </button>
      </motion.div>
    </motion.div>
  );
}
