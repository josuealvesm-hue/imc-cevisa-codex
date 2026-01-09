import { Shield } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-500" />
            <span className="text-sm font-medium text-white">Spa Médico Adventista Cevisa</span>
          </div>

          <div className="text-sm text-center sm:text-right">
            <p>© {currentYear} Todos os direitos reservados</p>
            <p className="text-gray-500 mt-1">
              Esta ferramenta é educativa e não substitui avaliação médica
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
