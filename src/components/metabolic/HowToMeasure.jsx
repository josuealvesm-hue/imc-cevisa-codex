import { motion } from 'framer-motion';
import { Ruler, CheckCircle } from 'lucide-react';

export default function HowToMeasure() {
  const steps = [
    'Fique em pé, com os pés juntos e o abdômen relaxado',
    'Localize o ponto médio entre a última costela e a crista ilíaca (osso do quadril)',
    'Passe a fita métrica ao redor da cintura nesse ponto, mantendo-a horizontal',
    'Meça ao final de uma expiração normal, sem prender a respiração'
  ];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full mb-4">
              <Ruler className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">Guia de medição</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Como medir a circunferência da cintura
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Uma medida correta é essencial para um resultado preciso. Siga as instruções abaixo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* SVG Illustration */}
            <div className="flex justify-center">
              <svg
                viewBox="0 0 300 400"
                className="w-full max-w-[280px] h-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Body silhouette */}
                <ellipse cx="150" cy="80" rx="40" ry="45" fill="#E5E7EB" />
                <path
                  d="M110 120 Q90 200 100 280 Q105 320 120 360 L130 360 Q125 320 125 280 Q125 220 130 160 L150 160 L170 160 Q175 220 175 280 Q175 320 170 360 L180 360 Q195 320 200 280 Q210 200 190 120 Z"
                  fill="#E5E7EB"
                />
                {/* Arms */}
                <path
                  d="M110 125 Q80 140 60 180 Q55 200 65 210 L75 205 Q70 190 75 175 Q90 145 115 135"
                  fill="#E5E7EB"
                />
                <path
                  d="M190 125 Q220 140 240 180 Q245 200 235 210 L225 205 Q230 190 225 175 Q210 145 185 135"
                  fill="#E5E7EB"
                />

                {/* Measurement line (waist) */}
                <ellipse
                  cx="150"
                  cy="200"
                  rx="55"
                  ry="15"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="4"
                  strokeDasharray="8 4"
                />

                {/* Reference points */}
                <circle cx="95" cy="200" r="6" fill="#10B981" />
                <circle cx="205" cy="200" r="6" fill="#10B981" />

                {/* Labels */}
                <text x="150" y="235" textAnchor="middle" fill="#059669" fontSize="14" fontWeight="600">
                  Ponto de medição
                </text>

                {/* Arrows */}
                <path d="M70 165 L85 200 L70 235" fill="none" stroke="#9CA3AF" strokeWidth="2" />
                <text x="55" y="155" fill="#6B7280" fontSize="11" textAnchor="middle">Última</text>
                <text x="55" y="168" fill="#6B7280" fontSize="11" textAnchor="middle">costela</text>
                <text x="55" y="245" fill="#6B7280" fontSize="11" textAnchor="middle">Crista</text>
                <text x="55" y="258" fill="#6B7280" fontSize="11" textAnchor="middle">ilíaca</text>

                {/* Tape measure icon */}
                <rect x="220" y="185" width="40" height="30" rx="3" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
                <line x1="225" y1="195" x2="255" y2="195" stroke="#F59E0B" strokeWidth="1" />
                <line x1="225" y1="200" x2="255" y2="200" stroke="#F59E0B" strokeWidth="1" />
                <line x1="225" y1="205" x2="255" y2="205" stroke="#F59E0B" strokeWidth="1" />
              </svg>
            </div>

            {/* Steps */}
            <div className="space-y-4">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-700 font-semibold text-sm">{index + 1}</span>
                  </div>
                  <p className="text-gray-700 pt-1">{step}</p>
                </motion.div>
              ))}

              <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-emerald-800">
                    <strong>Dica:</strong> Faça a medição diretamente sobre a pele ou com roupas leves.
                    A fita deve ficar firme, mas sem apertar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
