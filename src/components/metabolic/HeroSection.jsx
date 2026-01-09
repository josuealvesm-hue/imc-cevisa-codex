import { motion } from 'framer-motion';
import { Activity, Heart, Shield } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 pt-8 pb-12 md:pt-16 md:pb-20">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-emerald-100 mb-6"
        >
          <Shield className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-medium text-emerald-700">Spa Médico Adventista Cevisa</span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4"
        >
          Descubra seu{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
            risco metabólico
          </span>
          {' '}em 1 minuto
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8"
        >
          Triagem educativa baseada em IMC e razão cintura/altura.
        </motion.p>

        {/* Feature badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4"
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm">
            <Activity className="w-5 h-5 text-emerald-500" />
            <span className="text-sm font-medium text-gray-700">Cálculo IMC</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm">
            <Heart className="w-5 h-5 text-rose-500" />
            <span className="text-sm font-medium text-gray-700">Razão Cintura/Altura</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
