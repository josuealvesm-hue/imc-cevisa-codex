import { motion } from 'framer-motion';
import { MessageCircle, Phone, MapPin, Clock } from 'lucide-react';

export default function FinalCTA() {
  const whatsappLink = 'https://wa.me/5511999999999?text=' + encodeURIComponent(
    'Olá! Gostaria de saber mais sobre os programas de saúde do Spa Médico Adventista Cevisa.'
  );

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Cuide da sua saúde com quem entende
          </h2>
          <p className="text-lg text-emerald-100 max-w-2xl mx-auto mb-8">
            O Spa Médico Adventista Cevisa oferece programas completos de saúde e bem-estar,
            com acompanhamento multidisciplinar personalizado.
          </p>

          {/* Features */}
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <Phone className="w-6 h-6 text-emerald-200 mx-auto mb-2" />
              <p className="text-sm text-white font-medium">Atendimento Humanizado</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <Clock className="w-6 h-6 text-emerald-200 mx-auto mb-2" />
              <p className="text-sm text-white font-medium">Programas Personalizados</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <MapPin className="w-6 h-6 text-emerald-200 mx-auto mb-2" />
              <p className="text-sm text-white font-medium">Ambiente Acolhedor</p>
            </div>
          </div>

          {/* CTA Button */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="h-16 px-10 text-lg font-semibold bg-white text-emerald-700 hover:bg-emerald-50 shadow-xl shadow-black/20 rounded-md inline-flex items-center justify-center"
          >
            <MessageCircle className="w-6 h-6 mr-3" />
            Falar com um consultor
          </a>

          <p className="text-sm text-emerald-200 mt-4">
            Resposta rápida pelo WhatsApp
          </p>
        </motion.div>
      </div>
    </section>
  );
}
