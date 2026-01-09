import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, Shield, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

// Lead endpoint configuration
const LEAD_ENDPOINT = window.LEAD_ENDPOINT || null;
const SEND_CLINICAL_DATA = window.SEND_CLINICAL_DATA ?? false;

export default function LeadModal({ isOpen, onClose, onSubmit, calculatedData }) {
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatWhatsApp = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');

    // Format as +55 (DD) 9XXXX-XXXX
    if (digits.length === 0) return '';
    if (digits.length <= 2) return `+${digits}`;
    if (digits.length <= 4) return `+${digits.slice(0, 2)} (${digits.slice(2)}`;
    if (digits.length <= 9) return `+${digits.slice(0, 2)} (${digits.slice(2, 4)}) ${digits.slice(4)}`;
    return `+${digits.slice(0, 2)} (${digits.slice(2, 4)}) ${digits.slice(4, 9)}-${digits.slice(9, 13)}`;
  };

  const handleWhatsAppChange = (event) => {
    const formatted = formatWhatsApp(event.target.value);
    setFormData((prev) => ({ ...prev, whatsapp: formatted }));
    if (errors.whatsapp) {
      setErrors((prev) => ({ ...prev, whatsapp: '' }));
    }
  };

  const handleNameChange = (event) => {
    setFormData((prev) => ({ ...prev, nome: event.target.value }));
    if (errors.nome) {
      setErrors((prev) => ({ ...prev, nome: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    } else if (formData.nome.trim().length < 2) {
      newErrors.nome = 'Nome deve ter pelo menos 2 caracteres';
    }

    const digits = formData.whatsapp.replace(/\D/g, '');
    if (!digits) {
      newErrors.whatsapp = 'WhatsApp é obrigatório';
    } else if (digits.length < 12 || digits.length > 13) {
      newErrors.whatsapp = 'WhatsApp inválido. Use o formato +55 (DD) 9XXXX-XXXX';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getUTMParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      utm_source: urlParams.get('utm_source') || '',
      utm_medium: urlParams.get('utm_medium') || '',
      utm_campaign: urlParams.get('utm_campaign') || '',
      utm_term: urlParams.get('utm_term') || '',
      utm_content: urlParams.get('utm_content') || ''
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const leadData = {
      nome: formData.nome.trim(),
      whatsapp: formData.whatsapp.replace(/\D/g, ''),
      timestamp: new Date().toISOString(),
      origem: getUTMParams(),
      triagem: {
        imc: calculatedData.imc,
        whtr: calculatedData.whtr
      }
    };

    // Optionally include clinical measurements
    if (SEND_CLINICAL_DATA) {
      leadData.medidas = {
        peso: calculatedData.peso,
        altura: calculatedData.altura,
        cintura: calculatedData.cintura,
        sexo: calculatedData.sexo,
        idade: calculatedData.idade
      };
    }

    try {
      if (LEAD_ENDPOINT) {
        // Send to configured endpoint
        const response = await fetch(LEAD_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(leadData)
        });

        if (!response.ok) {
          throw new Error('Failed to submit lead');
        }

        console.log('Lead submitted successfully to endpoint');
      } else {
        // Fallback to localStorage
        const existingLeads = JSON.parse(localStorage.getItem('metabolic_leads') || '[]');
        existingLeads.push(leadData);
        localStorage.setItem('metabolic_leads', JSON.stringify(existingLeads));
        console.log('Lead saved to localStorage (no endpoint configured):', leadData);
      }

      onSubmit(formData);
    } catch (error) {
      console.error('Error submitting lead:', error);
      // Still save to localStorage as backup
      const existingLeads = JSON.parse(localStorage.getItem('metabolic_leads') || '[]');
      existingLeads.push(leadData);
      localStorage.setItem('metabolic_leads', JSON.stringify(existingLeads));
      console.log('Lead saved to localStorage as fallback:', leadData);

      onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
          onClick={(event) => event.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-5 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
            <h3 className="text-xl font-bold text-white">Quase lá!</h3>
            <p className="text-emerald-100 text-sm mt-1">
              Informe seus dados para ver o resultado completo
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Nome */}
            <div className="space-y-2">
              <Label htmlFor="nome" className="flex items-center gap-2 text-gray-700 font-medium">
                <User className="w-4 h-4 text-emerald-600" />
                Seu nome *
              </Label>
              <Input
                id="nome"
                type="text"
                placeholder="Como podemos te chamar?"
                value={formData.nome}
                onChange={handleNameChange}
                className={`h-12 text-lg ${errors.nome ? 'border-red-300' : ''}`}
                autoFocus
              />
              {errors.nome && (
                <p className="text-red-500 text-sm">{errors.nome}</p>
              )}
            </div>

            {/* WhatsApp */}
            <div className="space-y-2">
              <Label htmlFor="whatsapp" className="flex items-center gap-2 text-gray-700 font-medium">
                <Phone className="w-4 h-4 text-emerald-600" />
                WhatsApp *
              </Label>
              <Input
                id="whatsapp"
                type="tel"
                placeholder="+55 (11) 99999-9999"
                value={formData.whatsapp}
                onChange={handleWhatsAppChange}
                className={`h-12 text-lg ${errors.whatsapp ? 'border-red-300' : ''}`}
              />
              {errors.whatsapp && (
                <p className="text-red-500 text-sm">{errors.whatsapp}</p>
              )}
            </div>

            {/* Privacy notice */}
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
              <Shield className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-600">
                Seus dados são protegidos conforme a LGPD. Utilizamos apenas para enviar seu resultado e,
                se autorizado, informações sobre nossos serviços.
              </p>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-200"
            >
              {isSubmitting ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                'Ver meu resultado completo'
              )}
            </Button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
