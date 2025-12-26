import React, { useState } from 'react';
import { User, Mail, MessageSquare, ArrowRight, ArrowLeft, ShieldCheck, Info, AlertCircle } from 'lucide-react';
import Button from './Button';

interface PreCheckoutFormProps {
  onBack: () => void;
  checkoutUrl?: string;
}

const PreCheckoutForm: React.FC<PreCheckoutFormProps> = ({ onBack, checkoutUrl }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: ''
  });
  const [error, setError] = useState<string | null>(null);

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    
    // Brazilian mobile format: (XX) 9XXXX-XXXX
    if (value.length <= 11) {
      if (value.length > 2) {
        value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
      }
      if (value.length > 9) {
        value = `${value.substring(0, 10)}-${value.substring(10)}`;
      }
    } else {
      value = value.substring(0, 11);
      value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7, 11)}`;
    }
    
    setFormData({ ...formData, whatsapp: value });
    if (error) setError(null);
  };

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rawPhone = formData.whatsapp.replace(/\D/g, "");
    
    // Basic validation
    if (!formData.nome.trim()) {
      setError("Por favor, insira seu nome completo.");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Por favor, insira um e-mail válido.");
      return;
    }

    // Brazilian mobile check: must have 11 digits and start with 9
    if (rawPhone.length !== 11) {
      setError("O WhatsApp deve ter 11 dígitos (DDD + Número).");
      return;
    }

    if (rawPhone[2] !== '9') {
      setError("Por favor, insira um número de celular válido (iniciando com 9).");
      return;
    }

    // All valid
    const finalUrl = checkoutUrl || "https://mpago.li/2s13avr";
    window.location.href = finalUrl;
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-6">
      {/* Header */}
      <div className="text-center mb-10 animate-fade-in">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-navy/60 hover:text-navy transition-colors mb-6 mx-auto group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs uppercase tracking-widest font-bold">Voltar para o site</span>
        </button>
        <h2 className="font-serif text-3xl md:text-4xl text-navy mb-2">NORA.GUIAi</h2>
        <p className="text-gold italic font-serif text-lg">Último passo antes de conhecer Dubai como uma local</p>
      </div>

      {/* Form Card */}
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-[0_25px_60px_-15px_rgba(26,41,66,0.15)] border border-sand/30 overflow-hidden animate-float">
        <div className="bg-navy p-8 text-center">
          <h3 className="text-cream font-serif text-2xl mb-2">Ative seu Acesso</h3>
          <p className="text-sand/80 text-sm">Após o pagamento, você receberá a Nora direto no seu WhatsApp</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-6">
          {/* General Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-center gap-3 animate-shake">
              <AlertCircle className="text-red-500 shrink-0" size={18} />
              <p className="text-xs text-red-700 font-medium">{error}</p>
            </div>
          )}

          {/* Nome Input */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest font-bold text-navy/40 ml-1">Nome Completo</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-sand-dark group-focus-within:text-gold transition-colors" size={18} />
              <input
                required
                type="text"
                placeholder="Seu nome"
                className="w-full bg-sand/10 border-b-2 border-sand/30 py-4 pl-12 pr-4 rounded-t-xl focus:outline-none focus:border-gold focus:bg-white transition-all text-navy placeholder:text-navy/20"
                value={formData.nome}
                onChange={(e) => {
                  setFormData({ ...formData, nome: e.target.value });
                  if (error) setError(null);
                }}
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest font-bold text-navy/40 ml-1">Seu melhor E-mail</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-sand-dark group-focus-within:text-gold transition-colors" size={18} />
              <input
                required
                type="email"
                placeholder="seu@email.com"
                className="w-full bg-sand/10 border-b-2 border-sand/30 py-4 pl-12 pr-4 rounded-t-xl focus:outline-none focus:border-gold focus:bg-white transition-all text-navy placeholder:text-navy/20"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (error) setError(null);
                }}
              />
            </div>
            <div className="flex gap-2 items-start mt-2 px-1">
              <Info size={14} className="text-gold shrink-0 mt-0.5" />
              <p className="text-[11px] leading-tight text-sepia/70">
                <strong>⚠️ Importante:</strong> Use o mesmo e-mail no pagamento para liberar o acesso automaticamente.
              </p>
            </div>
          </div>

          {/* WhatsApp Input */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest font-bold text-navy/40 ml-1">WhatsApp com DDD</label>
            <div className="relative group">
              <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-sand-dark group-focus-within:text-gold transition-colors" size={18} />
              <input
                required
                type="text"
                placeholder="(11) 99999-9999"
                className="w-full bg-sand/10 border-b-2 border-sand/30 py-4 pl-12 pr-4 rounded-t-xl focus:outline-none focus:border-gold focus:bg-white transition-all text-navy placeholder:text-navy/20"
                value={formData.whatsapp}
                onChange={handleWhatsAppChange}
              />
            </div>
            <div className="flex gap-2 items-center mt-2 px-1">
              <ShieldCheck size={14} className="text-teal" />
              <p className="text-[11px] text-teal/80 font-medium">📱 É aqui que você vai receber a Nora</p>
            </div>
          </div>

          <Button type="submit" fullWidth className="mt-4 flex items-center justify-center gap-3 py-5 text-base group">
            CONTINUAR PARA PAGAMENTO
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Button>

          <div className="text-center">
            <p className="text-[10px] text-navy/30 uppercase tracking-[0.2em]">Ambiente 100% Seguro</p>
          </div>
        </form>
      </div>

      <p className="mt-8 text-sepia/40 text-xs">NORA.GUIAi © 2025 • Todos os direitos reservados</p>
    </div>
  );
};

export default PreCheckoutForm;