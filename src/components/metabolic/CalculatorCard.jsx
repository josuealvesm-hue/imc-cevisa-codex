import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, User, Ruler, Scale, Activity } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function CalculatorCard({ onCalculate }) {
  const [formData, setFormData] = useState({
    peso: '',
    altura: '',
    cintura: '',
    sexo: '',
    idade: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case 'peso':
        if (!value) return 'Peso é obrigatório';
        if (parseFloat(value) < 20 || parseFloat(value) > 300) return 'Peso deve estar entre 20 e 300 kg';
        return '';
      case 'altura':
        if (!value) return 'Altura é obrigatória';
        if (parseFloat(value) < 100 || parseFloat(value) > 250) return 'Altura deve estar entre 100 e 250 cm';
        return '';
      case 'cintura':
        if (!value) return 'Medida da cintura é obrigatória';
        if (parseFloat(value) < 40 || parseFloat(value) > 200) return 'Cintura deve estar entre 40 e 200 cm';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (name, value) => {
    // Only allow numbers and decimal point
    if (['peso', 'altura', 'cintura', 'idade'].includes(name)) {
      value = value.replace(/[^0-9.]/g, '');
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (name) => {
    setErrors((prev) => ({ ...prev, [name]: validateField(name, formData[name]) }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate all required fields
    const newErrors = {
      peso: validateField('peso', formData.peso),
      altura: validateField('altura', formData.altura),
      cintura: validateField('cintura', formData.cintura)
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    setIsLoading(true);

    // Simulate brief loading for better UX
    setTimeout(() => {
      const peso = parseFloat(formData.peso);
      const alturaCm = parseFloat(formData.altura);
      const alturaM = alturaCm / 100;
      const cintura = parseFloat(formData.cintura);

      const imc = peso / (alturaM * alturaM);
      const whtr = cintura / alturaCm;

      onCalculate({
        peso,
        altura: alturaCm,
        cintura,
        sexo: formData.sexo || null,
        idade: formData.idade ? parseInt(formData.idade, 10) : null,
        imc: parseFloat(imc.toFixed(1)),
        whtr: parseFloat(whtr.toFixed(2))
      });

      setIsLoading(false);
    }, 600);
  };

  return (
    <section id="calculadora" className="py-8 md:py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-lg mx-auto"
      >
        <div className="bg-white rounded-3xl shadow-xl shadow-emerald-100/50 border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Avaliação de Risco Metabólico</h2>
                <p className="text-emerald-100 text-sm">Preencha seus dados abaixo</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Peso */}
            <div className="space-y-2">
              <Label htmlFor="peso" className="flex items-center gap-2 text-gray-700 font-medium">
                <Scale className="w-4 h-4 text-emerald-600" />
                Peso (kg) *
              </Label>
              <Input
                id="peso"
                type="text"
                inputMode="decimal"
                placeholder="Ex: 70.5"
                value={formData.peso}
                onChange={(event) => handleChange('peso', event.target.value)}
                onBlur={() => handleBlur('peso')}
                className={`h-12 text-lg ${errors.peso ? 'border-red-300 focus:ring-red-200' : 'focus:ring-emerald-200'}`}
              />
              <AnimatePresence>
                {errors.peso && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-500 text-sm"
                  >
                    {errors.peso}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Altura */}
            <div className="space-y-2">
              <Label htmlFor="altura" className="flex items-center gap-2 text-gray-700 font-medium">
                <Ruler className="w-4 h-4 text-emerald-600" />
                Altura (cm) *
              </Label>
              <Input
                id="altura"
                type="text"
                inputMode="decimal"
                placeholder="Ex: 170"
                value={formData.altura}
                onChange={(event) => handleChange('altura', event.target.value)}
                onBlur={() => handleBlur('altura')}
                className={`h-12 text-lg ${errors.altura ? 'border-red-300 focus:ring-red-200' : 'focus:ring-emerald-200'}`}
              />
              <AnimatePresence>
                {errors.altura && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-500 text-sm"
                  >
                    {errors.altura}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Cintura */}
            <div className="space-y-2">
              <Label htmlFor="cintura" className="flex items-center gap-2 text-gray-700 font-medium">
                <Activity className="w-4 h-4 text-emerald-600" />
                Circunferência da cintura (cm) *
              </Label>
              <Input
                id="cintura"
                type="text"
                inputMode="decimal"
                placeholder="Ex: 80"
                value={formData.cintura}
                onChange={(event) => handleChange('cintura', event.target.value)}
                onBlur={() => handleBlur('cintura')}
                className={`h-12 text-lg ${errors.cintura ? 'border-red-300 focus:ring-red-200' : 'focus:ring-emerald-200'}`}
              />
              <AnimatePresence>
                {errors.cintura && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-500 text-sm"
                  >
                    {errors.cintura}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Optional fields row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Sexo */}
              <div className="space-y-2">
                <Label htmlFor="sexo" className="flex items-center gap-2 text-gray-700 font-medium">
                  <User className="w-4 h-4 text-gray-400" />
                  Sexo
                </Label>
                <Select value={formData.sexo} onValueChange={(value) => handleChange('sexo', value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Opcional" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="masculino">Masculino</SelectItem>
                    <SelectItem value="feminino">Feminino</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Idade */}
              <div className="space-y-2">
                <Label htmlFor="idade" className="text-gray-700 font-medium">
                  Idade
                </Label>
                <Input
                  id="idade"
                  type="text"
                  inputMode="numeric"
                  placeholder="Opcional"
                  value={formData.idade}
                  onChange={(event) => handleChange('idade', event.target.value)}
                  className="h-12"
                />
              </div>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-200 transition-all duration-300"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                'Ver meu resultado'
              )}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              * Campos obrigatórios
            </p>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
