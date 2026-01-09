import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, ArrowRight, Lock } from 'lucide-react';

export default function PreviewResult({ data, onContinue }) {
  const hasRisk = data.whtr >= 0.5 || data.imc >= 25;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-lg mx-auto px-4"
    >
      <div className="bg-white rounded-3xl shadow-xl shadow-gray-100/50 border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className={`px-6 py-6 ${hasRisk ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-gradient-to-r from-emerald-500 to-teal-500'}`}>
          <div className="flex items-center justify-center gap-3">
            {hasRisk ? (
              <AlertTriangle className="w-8 h-8 text-white" />
            ) : (
              <CheckCircle className="w-8 h-8 text-white" />
            )}
            <h3 className="text-xl font-bold text-white">Seu resultado está pronto!</h3>
          </div>
        </div>

        {/* Preview content */}
        <div className="p-6 space-y-6">
          {/* Qualitative indicator */}
          <div className={`p-4 rounded-2xl ${hasRisk ? 'bg-amber-50 border border-amber-200' : 'bg-emerald-50 border border-emerald-200'}`}>
            <div className="flex items-start gap-3">
              {hasRisk ? (
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
              ) : (
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
              )}
              <div>
                <p className={`font-semibold ${hasRisk ? 'text-amber-800' : 'text-emerald-800'}`}>
                  {hasRisk ? 'Atenção: Indicadores que merecem avaliação' : 'Bom: Indicadores dentro da faixa esperada'}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {hasRisk
                    ? 'Seus indicadores sugerem que uma avaliação profissional pode ser benéfica.'
                    : 'Seus indicadores estão em faixas associadas a menor risco metabólico.'}
                </p>
              </div>
            </div>
          </div>

          {/* Blurred preview */}
          <div className="relative">
            <div className="blur-sm select-none pointer-events-none">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500">Seu IMC</p>
                  <p className="text-2xl font-bold text-gray-800">XX.X</p>
                  <p className="text-sm text-gray-600">Classificação</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500">Razão C/A</p>
                  <p className="text-2xl font-bold text-gray-800">X.XX</p>
                  <p className="text-sm text-gray-600">Interpretação</p>
                </div>
              </div>
            </div>

            {/* Lock overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[2px] rounded-xl">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Lock className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 font-medium">Resultado detalhado</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-3">
            <button
              onClick={onContinue}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-200"
            >
              Ver resultado completo
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <p className="text-xs text-gray-500 text-center">
              Informe seus dados para receber o resultado detalhado
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
