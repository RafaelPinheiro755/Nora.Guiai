import React, { useState, useEffect } from 'react';
import { 
  Check, MapPin, BadgeCheck, ShieldCheck, Zap, 
  Map, Camera, Sparkles, RefreshCw, Wallet, ShieldAlert, 
  Coins, UserCheck, Plane, Image as ImageIcon, CalendarClock, Palmtree,
  Umbrella, Utensils, Ticket, ShoppingBag, Music
} from 'lucide-react';
import ChatDemo from './components/ChatDemo';
import Button from './components/Button';
import { PricingTier, PricingPlan } from './types';

// Helper component for the Phone Image to avoid duplication across mobile/desktop layouts
const HeroPhone = ({ tip1, tip2, className = "" }: { tip1: any, tip2: any, className?: string }) => (
  <div className={`relative mx-auto max-w-[340px] w-full transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500 ease-out ${className}`}>
    
    {/* SINGLE IMAGE CONTAINER */}
    <img 
      src="https://lh3.googleusercontent.com/d/1AO42-QRRgsFVNEsjqo6f7UL31xzEE2_E" 
      alt="Nora no Celular" 
      className="w-full h-auto drop-shadow-2xl relative z-10"
    />

    {/* DYNAMIC FLOATING BADGE 1 (LEFT / TOP) */}
    <div 
      key={`tip-left-${tip1.title}`}
      className="absolute top-12 -left-4 md:-left-12 bg-navy/80 backdrop-blur-md border border-gold/40 p-4 rounded-xl text-cream w-[200px] shadow-2xl animate-float z-20 pointer-events-none transition-all duration-500"
    >
      <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-2">
        <tip1.icon className="text-gold shrink-0" size={16} />
        <strong className="text-sm font-serif tracking-wide">{tip1.title}</strong>
      </div>
      <div className="text-xs text-sand/90 mb-1 leading-tight">{tip1.desc}</div>
      <div className="text-[10px] text-teal font-medium uppercase tracking-wider flex items-center gap-1">
        <span className="w-1.5 h-1.5 bg-teal rounded-full animate-pulse"></span>
        {tip1.extra}
      </div>
    </div>

    {/* DYNAMIC FLOATING BADGE 2 (RIGHT / BOTTOM) */}
    <div 
      key={`tip-right-${tip2.title}`}
      className="absolute bottom-24 -right-4 md:-right-8 bg-white/10 backdrop-blur-lg border border-white/30 p-4 rounded-xl text-white w-[190px] shadow-2xl animate-float z-30 pointer-events-none transition-all duration-500"
      style={{ animationDelay: '2s' }}
    >
        <div className="flex items-center gap-2 mb-2 border-b border-white/20 pb-2">
        <tip2.icon className="text-gold-light shrink-0" size={16} />
        <strong className="text-sm font-serif tracking-wide">{tip2.title}</strong>
      </div>
      <div className="text-xs text-white/90 mb-1 leading-tight">{tip2.desc}</div>
      <div className="text-[10px] text-gold-light font-medium uppercase tracking-wider flex items-center gap-1">
        <span className="w-1.5 h-1.5 bg-gold rounded-full"></span>
        {tip2.extra}
      </div>
    </div>

  </div>
);

function App() {
  const [activeTipIndex, setActiveTipIndex] = useState(0);

  const heroTips = [
    {
      title: "Gold Souk",
      desc: "Negocie sempre. Comece oferecendo metade do valor.",
      extra: "Manhã (menos lotado)",
      icon: ShoppingBag,
      position: "left"
    },
    {
      title: "Aquaventure",
      desc: "Aniversariante entra grátis. Não esqueça o RG.",
      extra: "09:45 às 18:30",
      icon: Ticket,
      position: "right"
    },
    {
      title: "Kite Beach",
      desc: "Leve cadeira própria, pois o aluguel é limitado.",
      extra: "10h às 22h",
      icon: Umbrella,
      position: "left"
    },
    {
      title: "JBR Beach",
      desc: "Shows de drone acontecem à noite no inverno.",
      extra: "Após 20h",
      icon: Sparkles,
      position: "right"
    },
    {
      title: "Dubai Islands",
      desc: "Melhor lugar pra ver o A380 pousando.",
      extra: "22h às 01h",
      icon: Plane,
      position: "left"
    },
    {
      title: "Mina Brasserie",
      desc: "Brunch La Vie en Rose. O top da cidade.",
      extra: "Sex e Sáb, 12h-16h",
      icon: Utensils,
      position: "right"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTipIndex((prev) => (prev + 1) % heroTips.length);
    }, 4000); // Rotate every 4 seconds
    return () => clearInterval(interval);
  }, [heroTips.length]);

  // Calculate distinct indices for left and right positions to show two different tips at once
  const tip1 = heroTips[activeTipIndex];
  const tip2 = heroTips[(activeTipIndex + 1) % heroTips.length];

  const plans: PricingPlan[] = [
    {
      name: PricingTier.ONE_MONTH,
      price: "R$ 147",
      period: "/acesso",
      description: "Acesso total por 30 dias. O essencial para aproveitar suas férias sem estresse.",
      ctaText: "Começar Agora",
      isPopular: true,
      link: "https://buy.stripe.com/cNi6oB7IZ02l8EIg6Z0oM00",
      features: [
        "Sem instalar nada, acesso direto e leve",
        "Atualizações automáticas inclusas",
        "Suporte humanizado via WhatsApp",
        "Risco zero com garantia total de 7 dias"
      ]
    },
    {
      name: PricingTier.RESIDENT,
      price: "R$ 347",
      period: "/semestre",
      description: "Para quem vive a cidade e quer descobrir as novidades antes de todo mundo.",
      ctaText: "Assinar Semestral",
      bgColor: "bg-sand-dark",
      link: "https://buy.stripe.com/cNi7sFd3jcP708c3kd0oM01",
      features: [
        "Sem instalar nada, acesso direto e leve",
        "Atualizações automáticas inclusas",
        "Suporte humanizado via WhatsApp",
        "Risco zero com garantia total de 30 dias"
      ]
    },
    {
      name: PricingTier.ENTERPRISE,
      price: "Sob Consulta",
      period: "/corporativo",
      description: "Soluções personalizadas para executivos, tripulações e delegações.",
      ctaText: "Falar com Consultor",
      bgColor: "bg-navy",
      link: "https://wa.me/5531991764289?text=Ola+eu+gostaria+de+saber+mais+sobre+o+plano+empresarial+da+Nora",
      features: [
        "Sem instalar nada, acesso direto e leve",
        "Atualizações automáticas inclusas",
        "Suporte humanizado via WhatsApp",
        "Onboarding e treinamento de equipes",
        "Soluções customizadas para seu negócio"
      ]
    }
  ];

  const features = [
    { 
      title: "Roteiro PDF & Maps", 
      desc: "Nada de planilha chata. Receba um PDF elegante e links diretos para o GPS do seu celular.", 
      icon: Map 
    },
    { 
      title: "Olhar Local em Tempo Real", 
      desc: "Manda foto de qualquer local e ela cria um audioguia na hora explicando a história.", 
      icon: Camera 
    },
    { 
      title: "Eventos Secretos", 
      desc: "Aquele brunch exclusivo ou show de drones que não está em nenhum blog? A Nora sabe.", 
      icon: Sparkles 
    },
    { 
      title: "Ajuste Dinâmico", 
      desc: "Mudou de ideia? Quer trocar o jantar italiano por japonês agora? É só pedir no WhatsApp.", 
      icon: RefreshCw 
    },
    { 
      title: "Economia Inteligente", 
      desc: "Ela te diz se o preço do Souk está justo e ensina frases em árabe para negociar.", 
      icon: Wallet 
    },
    { 
      title: "Sem Armadilhas", 
      desc: "Saiba se vale a pena subir no Burj Khalifa ou se a vista do Sky Views é melhor.", 
      icon: ShieldAlert 
    },
    { 
      title: "Câmbio & Clima na Hora", 
      desc: "Cotação atualizada do Dirham e previsão do tempo pro seu período de viagem.", 
      icon: Coins 
    },
    { 
      title: "Perfil sob Medida", 
      desc: "Primeira vez? Roteiro clássico. Já conhece Dubai? Ela foge do óbvio e te leva pros hidden gems.", 
      icon: UserCheck 
    },
    { 
      title: "Passagens Aéreas", 
      desc: "Pede voos saindo da sua cidade e ela já manda o link direto pro Google Flights.", 
      icon: Plane 
    },
    { 
      title: "Fotos Antes de Ir", 
      desc: "Quer ver como é o restaurante antes de reservar? Ela manda foto do lugar.", 
      icon: ImageIcon 
    },
    { 
      title: "Reservas Obrigatórias", 
      desc: "Sabe quais lugares precisam de reserva e te avisa antes de você chegar e dar com a cara na porta.", 
      icon: CalendarClock 
    },
    { 
      title: "Atrações Sazonais", 
      desc: "Miracle Garden, Global Village, Ramadã. Ela sabe o que abre em cada época.", 
      icon: Palmtree 
    }
  ];

  return (
    <div className="font-sans text-navy bg-cream min-h-screen selection:bg-gold selection:text-white relative">
      
      {/* HERO SECTION */}
      <section 
        className="relative overflow-hidden text-cream pt-32 pb-20 px-6 min-h-[850px] flex items-center bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          /* BACKGROUND DEFINIDO PELO USUÁRIO */
          backgroundImage: `url('https://lh3.googleusercontent.com/d/1yNnrBC48_jM5WZAQTYvrKVPAlCaCXmB8')`
        }}
      >
        {/* Dark Overlay - Essential for text readability over the complex city background */}
        <div className="absolute inset-0 bg-navy/80 mix-blend-multiply z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/60 to-navy/30 z-0"></div>

        {/* Background Texture Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L35 25H55L39 37L45 57L30 45L15 57L21 37L5 25H25L30 5Z' fill='none' stroke='%23D4AF37' stroke-width='0.5'/%3E%3C/svg%3E")` }}></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Hero Text */}
            <div className="text-left space-y-8 animate-fade-in-up">
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
                Conheça a Nora.<br />
                <span className="text-gold italic">Sua guia pessoal de Dubai.</span>
              </h1>
              
              {/* Mobile Hero Image - Visible only on mobile, right after H1 */}
              <HeroPhone tip1={tip1} tip2={tip2} className="lg:hidden my-8" />

              <p className="text-lg md:text-xl text-sand border-l-4 border-gold pl-6 py-1 max-w-lg">
                Esqueça roteiros genéricos. A Nora monta seu itinerário personalizado em minutos e continua com você durante a viagem. Dicas em tempo real, audioguias por foto e eventos secretos que agência nenhuma te conta.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <a href="#intro">
                  <Button>Começar Experiência</Button>
                </a>
              </div>
              <div className="text-sm text-sand/80 flex items-center gap-2">
                <ShieldCheck size={16} className="text-gold" />
                Inteligência Artificial criada por especialistas locais.
              </div>
            </div>

            {/* Desktop Hero Image - Visible only on desktop (lg) */}
            <HeroPhone tip1={tip1} tip2={tip2} className="hidden lg:block lg:mr-0" />

          </div>
        </div>
      </section>

      {/* INTRO SECTION - REDESIGNED WITHOUT CHAT */}
      <section id="intro" className="py-24 px-6 bg-cream">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-navy mb-4">
              Dubai do jeito que <span className="border-b-4 border-gold">deveria ser</span>.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Text Content */}
            <div className="space-y-8 text-lg text-sepia">
              <p className="leading-relaxed">
                Esqueça roteiros genéricos de blog e horas perdidas pesquisando. A Nora entende seu perfil em 2 minutos. Quem vai com você, seu estilo de viagem, onde vai ficar. E monta um roteiro completo em PDF, com rotas no Google Maps, restaurantes que valem cada dirham e os eventos que vão estar rolando exatamente quando você chegar.
              </p>
              
              <div className="bg-sand/20 p-8 rounded-xl border-l-4 border-gold grid grid-cols-1 gap-6">
                <div>
                  <h3 className="font-bold text-navy text-xl mb-2 flex items-center gap-2">
                    <span className="text-gold">✦</span> Primeira vez em Dubai?
                  </h3>
                  <p>Ela te guia pelos clássicos sem cair em armadilha de turista.</p>
                </div>
                <div>
                   <h3 className="font-bold text-navy text-xl mb-2 flex items-center gap-2">
                    <span className="text-gold">✦</span> Já conhece a cidade?
                  </h3>
                  <p>Ela foge do óbvio e te leva pros lugares que só quem mora lá sabe.</p>
                </div>
              </div>

              <div className="space-y-4">
                <p>
                  <strong>Flexibilidade Total:</strong> Quer trocar o jantar do dia 3 por um japonês? É só pedir.
                </p>
                <p>
                  <strong>Sem Dúvidas:</strong> Quer saber se vale subir no Burj Khalifa ou se a vista do Sky Views é melhor? Ela te conta a real.
                </p>
                <p>
                  <strong>Concierge de Bolso:</strong> E quando você chegar em Dubai, a Nora continua com você. Te indica lugares baseado em onde você está, manda foto de qualquer local e ela cria um audioguia na hora, e te avisa em tempo real sobre eventos exclusivos que não estão em nenhum blog.
                </p>
              </div>
              
              <div className="pt-4 border-t border-sand/40">
                 <p className="font-serif italic text-navy text-2xl">
                  "Dubai do jeito que deveria ser: sem pesquisa, sem dúvida, só experiência."
                </p>
              </div>
            </div>

            {/* Static Chat Demo (No Interaction) */}
            <div className="w-full">
              <ChatDemo />
            </div>

          </div>

          {/* CTA Button */}
          <div className="mt-16 text-center">
            <a href="#planos" className="inline-block hover:scale-105 transition-transform duration-300">
              <Button variant="primary" className="shadow-2xl px-12 py-5 text-lg">
                Escolha seu plano
              </Button>
            </a>
          </div>

        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-24 px-6 bg-sand/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-serif text-3xl md:text-4xl text-center text-navy mb-16">
            O que a NORA faz por você:
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gold/20 hover:-translate-y-1 flex flex-col items-start"
              >
                <div className="w-12 h-12 bg-sand/20 rounded-xl flex items-center justify-center mb-4 text-navy group-hover:bg-navy group-hover:text-gold transition-colors duration-300">
                  <feature.icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-serif font-bold text-navy mb-2 group-hover:text-gold-dark transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sepia text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDERS SECTION */}
      <section className="py-24 px-6 bg-navy text-cream relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="order-2 lg:order-1 relative transform -rotate-1 hover:rotate-0 transition-transform duration-700 ease-out group">
              {/* IMAGEM DAS FUNDADORAS */}
              <img 
                src="https://lh3.googleusercontent.com/d/1Y27DpGtU9vC-6p7ueEjtCNXtyNoQad2k" 
                alt="Áurea e Valéria - Criadoras" 
                className="w-full h-auto rounded-3xl shadow-2xl border border-gold/30 object-cover"
              />

              {/* BALÃO ÁUREA (ESQUERDA) */}
              <div className="absolute top-[32%] left-[6%] md:left-[10%] bg-white/95 backdrop-blur-sm border-2 border-gold text-navy px-6 py-3 md:px-8 md:py-4 rounded-2xl rounded-br-none shadow-[0_10px_20px_rgba(0,0,0,0.3)] animate-float z-20">
                <span className="font-serif font-bold text-xl md:text-2xl tracking-wide">Áurea</span>
              </div>

              {/* BALÃO VALÉRIA (DIREITA) */}
              <div 
                className="absolute top-[32%] right-[6%] md:right-[10%] bg-white/95 backdrop-blur-sm border-2 border-gold text-navy px-6 py-3 md:px-8 md:py-4 rounded-2xl rounded-bl-none shadow-[0_10px_20px_rgba(0,0,0,0.3)] animate-float z-20"
                style={{ animationDelay: '2s' }}
              >
                <span className="font-serif font-bold text-xl md:text-2xl tracking-wide">Valéria</span>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="text-gold font-sans uppercase tracking-[0.2em] text-sm font-bold mb-4">Quem Somos</div>
              <h2 className="font-serif text-4xl md:text-5xl mb-8">Confiança de quem vive nos ares</h2>
              <div className="space-y-6 text-sand text-lg">
                <p>
                  Nós confiamos na Nora porque ela foi desenvolvida por quem vive o "lifestyle" da aviação e de Dubai: <strong>Áurea e Valéria</strong>.
                </p>
                <p>
                  Não é uma IA genérica feita por gente de escritório. É uma ferramenta criada com base na realidade de quem precisa otimizar o tempo nas escalas, encontrar os melhores lugares para jantar e fugir do óbvio.
                </p>
                <p>
                  Enquanto outros turistas seguem roteiros de 2019, você descobre Dubai como quem tem uma amiga comissária local no bolso.
                </p>
              </div>
              <div className="mt-8">
                <a href="#planos">
                  <Button variant="primary">Quero viajar com elas</Button>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="planos" className="py-24 px-6 bg-cream">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-navy mb-4">Escolha sua Experiência</h2>
            <p className="text-sepia">Acesso imediato via WhatsApp</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {plans.map((plan) => (
              <div 
                key={plan.name}
                className={`w-full rounded-[2rem] p-8 relative transition-transform duration-300 hover:-translate-y-2
                  ${plan.isPopular 
                    ? 'bg-white border-2 border-gold shadow-2xl z-10 scale-105' 
                    : 'bg-white border border-sand/50 shadow-xl'
                  }
                `}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-white px-6 py-1 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg">
                    Mais Escolhido
                  </div>
                )}

                <h3 className="font-serif text-2xl text-navy mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold text-navy">{plan.price}</span>
                  <span className="text-sepia text-sm">{plan.period}</span>
                </div>
                <p className="text-sepia text-sm mb-6 border-b border-dashed border-sand pb-4">
                  {plan.description}
                </p>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-navy/80">
                      <Check size={18} className="text-gold shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {plan.link ? (
                  <a href={plan.link} target="_blank" rel="noopener noreferrer" className="block w-full">
                    <Button 
                      fullWidth 
                      variant={plan.isPopular ? 'primary' : (plan.bgColor === 'bg-navy' ? 'dark' : 'secondary')}
                    >
                      {plan.ctaText}
                    </Button>
                  </a>
                ) : (
                  <Button 
                    fullWidth 
                    variant={plan.isPopular ? 'primary' : (plan.bgColor === 'bg-navy' ? 'dark' : 'secondary')}
                  >
                    {plan.ctaText}
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 max-w-2xl mx-auto text-center bg-white p-8 rounded-2xl border border-sand/30 shadow-sm">
            <div className="flex justify-center mb-4">
              <BadgeCheck size={48} className="text-teal" />
            </div>
            <h3 className="font-serif text-2xl text-navy mb-2">Garantia de Satisfação</h3>
            <p className="text-sepia">
              Se a Nora não te mostrar um Dubai que você nunca viu em 7 dias, nós devolvemos 100% do seu investimento. Sem perguntas.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-navy text-sand py-12 border-t-4 border-gold">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-2xl text-gold mb-4 tracking-widest">DESERT & SKYLINE</h2>
          <p className="mb-8 opacity-80">NORA.GUIAi © 2025 • Todos os direitos reservados</p>
          <div className="flex justify-center gap-2 text-xs opacity-50 uppercase tracking-widest">
            <span>Feito com</span>
            <Zap size={12} className="text-gold" />
            <span>nos Emirados</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;