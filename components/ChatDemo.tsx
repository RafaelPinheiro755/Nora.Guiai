import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { Message } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

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
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    setInputValue('');

    // Add user message
    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: userText
    };
    setMessages(prev => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      // Call API
      const responseText = await sendMessageToGemini(userText);
      
      const newModelMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText
      };
      setMessages(prev => [...prev, newModelMsg]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Desculpe, tive um problema ao processar. Tente novamente."
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
      // Keep focus on input for desktop
      if (window.innerWidth > 768) {
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    }
  };

  return (
    <div className="bg-white rounded-[20px] shadow-[0_20px_50px_rgba(26,41,66,0.1)] relative border border-gray-100 h-[600px] flex flex-col overflow-hidden">
      
      {/* Header */}
      <div className="bg-navy px-6 py-4 flex items-center justify-between shadow-md z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center border border-gold/40">
            <Sparkles size={20} className="text-gold" />
          </div>
          <div>
            <h3 className="text-cream font-serif font-bold tracking-wide">Nora AI</h3>
            <p className="text-sand/80 text-xs uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              Online
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scrollbar-thin scrollbar-thumb-sand scrollbar-track-transparent bg-gray-50/50">
        {messages.map((msg) => (
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
            <span className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider px-1">
              {msg.role === 'model' ? 'Nora' : 'Você'}
            </span>
          </div>
        ))}
        {isLoading && (
           <div className="flex flex-col max-w-[90%] mr-auto items-start animate-pulse">
            <div className="bg-white text-navy border border-gray-200 p-4 rounded-2xl rounded-tl-sm shadow-sm flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
            </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100 flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Pergunte sobre Dubai..."
          className="flex-1 bg-gray-100 text-navy placeholder-gray-500 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all text-sm md:text-base"
        />
        <button 
          type="submit" 
          disabled={!inputValue.trim() || isLoading}
          className="bg-navy hover:bg-navy-light disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-full transition-colors flex items-center justify-center shadow-lg"
        >
          <Send size={20} className={inputValue.trim() ? "ml-1" : ""} />
        </button>
      </form>
    </div>
  );
};

export default ChatDemo;