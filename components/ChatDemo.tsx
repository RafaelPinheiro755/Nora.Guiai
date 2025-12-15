import React, { useRef, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { Message } from '../types';

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'user',
    text: 'Quais eventos estarão acontecendo em Dubai durante a minha viagem que combinam com o meu perfil?'
  },
  {
    id: '2',
    role: 'model',
    text: 'Para janeiro de 2026, Dubai se transforma no centro de grandes eventos de negócios. Aqui estão os dois principais:'
  },
  {
    id: '3',
    role: 'model',
    text: '🎉 Intersec 2026: A maior feira de segurança e proteção do mundo.'
  },
  {
    id: '4',
    role: 'model',
    text: '📅 12 a 14 de janeiro de 2026 | 📍 Dubai World Trade Centre'
  },
  {
    id: '5',
    role: 'model',
    text: 'O que rola: É o ponto de encontro global para inovações em segurança, proteção contra incêndio e cibersegurança, com mais de 1.400 expositores.'
  },
  {
    id: '6',
    role: 'model',
    text: 'Dica local: É um evento muito focado em profissionais da área. Se não for seu interesse, não impacta uma viagem de turismo.'
  },
  {
    id: '7',
    role: 'model',
    text: 'Google Maps: https://www.google.com/maps/search/?api=1&query=Dubai+World+Trade+Centre'
  },
  {
    id: '8',
    role: 'user',
    text: 'Gostei. Coloque no meu roteiro, por favor.'
  },
  {
    id: '9',
    role: 'model',
    text: 'Claro! Adicionado ao dia 3, logo antes do jantar no 3 Fils.'
  }
];

const ChatDemo: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Sets the scroll position of the container to the bottom immediately on mount
    // Does NOT use scrollIntoView() to avoid hijacking the window scroll
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className="bg-white rounded-[20px] shadow-[0_20px_50px_rgba(26,41,66,0.1)] relative border border-gray-100 h-[500px] flex flex-col overflow-hidden">
      
      {/* Header */}
      <div className="bg-navy px-6 py-4 flex items-center justify-between shadow-md z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center border border-gold/40">
            <Sparkles size={20} className="text-gold" />
          </div>
          <div>
            <h3 className="text-cream font-serif font-bold tracking-wide">Nora AI</h3>
          </div>
        </div>
      </div>

      {/* Messages Area - Static */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scrollbar-thin scrollbar-thumb-sand scrollbar-track-transparent bg-gray-50/50"
      >
        {INITIAL_MESSAGES.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col max-w-[90%] md:max-w-[80%] ${msg.role === 'model' ? 'mr-auto items-start' : 'ml-auto items-end'}`}
          >
            <div 
              className={`p-4 rounded-2xl text-sm md:text-base break-words shadow-sm relative ${
                msg.role === 'model' 
                  ? 'bg-white text-navy border border-gray-200 rounded-tl-sm' 
                  : 'bg-navy text-cream rounded-tr-sm'
              }`}
            >
              {msg.text.includes('http') ? (
                 <>
                   {msg.text.split('http')[0]}
                   <a 
                     href={`http${msg.text.split('http')[1]}`} 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className={`underline break-all ${msg.role === 'model' ? 'text-gold-light hover:text-gold-dark' : 'text-gold hover:text-white'}`}
                   >
                     http{msg.text.split('http')[1]}
                   </a>
                 </>
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatDemo;