import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'user',
    text: 'Quais eventos vão ter em Dubai quando eu estiver lá que combinam com meu perfil?'
  },
  {
    id: '2',
    role: 'model',
    text: 'Para janeiro de 2026, Dubai se transforma no centro de grandes eventos de negócios. Aqui estão os dois principais:'
  },
  {
    id: '3',
    role: 'model',
    text: '🎉 Intersec 2026 - A maior feira de segurança e proteção do mundo.'
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
    text: 'Gostei, coloque no meu roteiro por favor'
  },
  {
    id: '9',
    role: 'model',
    text: 'Claro, que tal adicionarmos no dia 3 do seu roteiro, ainda da tempo para o jantar no 3 Fils que haviamos comentado'
  }
];

const ChatDemo: React.FC = () => {
  const [messages] = useState<Message[]>(INITIAL_MESSAGES);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="bg-white p-6 md:p-8 rounded-[20px] shadow-[0_20px_50px_rgba(26,41,66,0.1)] relative border border-gray-100 h-[600px] flex flex-col">
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-sand scrollbar-track-transparent">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col max-w-[90%] ${msg.role === 'model' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
          >
            <div 
              className={`p-4 rounded-2xl text-sm md:text-base break-words ${
                msg.role === 'model' 
                  ? 'bg-navy text-cream rounded-br-sm' 
                  : 'bg-sand/30 text-navy rounded-bl-sm'
              }`}
            >
              {msg.text.includes('http') ? (
                 <a href={msg.text.split('Google Maps: ')[1]} target="_blank" rel="noopener noreferrer" className="underline text-gold hover:text-white transition-colors">
                   {msg.text}
                 </a>
              ) : (
                msg.text
              )}
            </div>
            <span className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">
              {msg.role === 'model' ? 'Nora AI' : 'Você'}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatDemo;