export interface PdfData {
  header: {
    budget: string;
    company: string; // Used for "Viajantes" label
    dateRange: string;
    area: string;
  };
  days: {
    date: string;
    title: string;
    maps_link?: string;
    items: {
      time: string;
      type: 'meal' | 'transport' | 'activity';
      title: string;
      description: string;
      meta?: string;
    }[];
  }[];
}

export const generatePdfHtml = (data: PdfData): string => {
  const { header, days } = data;
  const totalPages = days.length;

  const pagesHtml = days.map((day, index) => {
    const pageNumber = index + 1;
    const count = day.items.length;
    
    // Determine layout density based on item count
    let sizeClass = "";
    if (count >= 7) sizeClass = "size-compact";
    else if (count >= 5) sizeClass = "size-medium";

    const itemsHtml = day.items.map((item) => `
      <div class="activity-item">
        <div class="dot ${item.type === 'meal' ? 'dot-dark' : 'dot-gold'}"></div>
        
        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
          <span class="time-badge">${item.time}</span>
          ${item.type === 'transport' ? '<span class="transport-label">Transporte</span>' : ''}
        </div>
        
        <h4 class="activity-title">${item.title}</h4>
        
        <p class="activity-desc">${item.description}</p>
        
        ${item.meta ? `
        <div class="tip-box">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2" style="margin-top: 1px; flex-shrink: 0;">
            <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
          </svg>
          <span class="activity-tip">${item.meta}</span>
        </div>
        ` : ''}
      </div>
    `).join('');

    return `
    <div class="page ${sizeClass}">
      <!-- SIDEBAR -->
      <div class="sidebar">
        <div class="sidebar-line"></div>
        
        <div style="text-align: center; z-index: 10;">
          <h1 style="font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: bold; letter-spacing: 0.2em; color: #D4AF37; text-transform: uppercase; margin-bottom: 4px;">
            Dubai
          </h1>
          <p style="font-size: 9px; letter-spacing: 0.2em; opacity: 0.8; text-transform: uppercase;">
            Itinerary Planner
          </p>
        </div>
        
        <div class="burj-wrap">
          <svg viewBox="0 0 100 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax slice">
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%">
                <stop offset="0%" stop-color="#D4AF37"/>
                <stop offset="50%" stop-color="#E8D5B7"/>
                <stop offset="100%" stop-color="#B8860B"/>
              </linearGradient>
            </defs>
            <path d="M35 350 L35 400 L65 400 L65 350 Z" fill="url(#goldGradient)" stroke="#B8860B" stroke-width="0.5"/>
            <path d="M38 300 L38 350 L62 350 L62 300 Z" fill="url(#goldGradient)" stroke="#B8860B" stroke-width="0.5"/>
            <path d="M40 240 L40 300 L60 300 L60 240 Z" fill="url(#goldGradient)" stroke="#B8860B" stroke-width="0.5"/>
            <path d="M42 180 L42 240 L58 240 L58 180 Z" fill="url(#goldGradient)" stroke="#B8860B" stroke-width="0.5"/>
            <path d="M44 130 L44 180 L56 180 L56 130 Z" fill="url(#goldGradient)" stroke="#B8860B" stroke-width="0.5"/>
            <path d="M46 90 L46 130 L54 130 L54 90 Z" fill="url(#goldGradient)" stroke="#B8860B" stroke-width="0.5"/>
            <path d="M48 50 L48 90 L52 90 L52 50 Z" fill="url(#goldGradient)" stroke="#B8860B" stroke-width="0.5"/>
            <path d="M49 10 L49 50 L51 50 L51 10 Z" fill="url(#goldGradient)" stroke="#B8860B" stroke-width="0.5"/>
            <line x1="50" y1="0" x2="50" y2="10" stroke="#B8860B" stroke-width="0.5"/>
          </svg>
        </div>
        
        <div style="width: 100%; padding: 0 4mm;">
          <div class="info-box">
            <p style="font-size: 8px; text-transform: uppercase; letter-spacing: 0.2em; color: #D4AF37; margin-bottom: 2px;">Budget</p>
            <p style="font-family: 'Cormorant Garamond', serif; font-size: 14px;">${header.budget}</p>
          </div>
          <div class="info-box">
            <p style="font-size: 8px; text-transform: uppercase; letter-spacing: 0.2em; color: #D4AF37; margin-bottom: 2px;">Viajantes</p>
            <p style="font-family: 'Cormorant Garamond', serif; font-size: 14px;">${header.company}</p>
          </div>
        </div>
      </div>
      
      <!-- MAIN CONTENT -->
      <div class="main">
        <!-- Header -->
        <div class="header-grid">
          <div>
            <div class="header-item-label">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>
              </svg>
              <span>Data da Viagem</span>
            </div>
            <p class="header-item-value">${header.dateRange}</p>
          </div>
          <div>
            <div class="header-item-label">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>Área Principal</span>
            </div>
            <p class="header-item-value">${header.area}</p>
          </div>
        </div>
        
        <!-- Day Title -->
        <div style="margin-bottom: 12px;">
          <div style="display: flex; align-items: baseline; gap: 10px;">
            <h2 class="day-title">
              ${day.date}
            </h2>
            <span style="height: 1px; background: #E8D5B7; flex: 1;"></span>
          </div>
          <h3 class="day-subtitle">
            "${day.title}"
          </h3>
        </div>
        
        <!-- Timeline -->
        <div class="timeline">
          <div class="timeline-line"></div>
          ${itemsHtml}
        </div>
        
        <!-- Maps Link -->
        ${day.maps_link ? `
        <div style="margin-top: auto; padding: 10px 0; border-top: 1px solid #E8D5B7;">   
          <div style="display: flex; align-items: center; gap: 10px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2" style="flex-shrink: 0;">  
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <div style="overflow: hidden;">  
              <p style="font-size: 8px; text-transform: uppercase; letter-spacing: 0.15em; color: #D4AF37; margin-bottom: 3px; font-weight: bold;">Rota do Dia</p>
              <a href="${day.maps_link}" style="font-size: 10px; color: #1A2942; text-decoration: none; word-break: break-all; display: block;">${day.maps_link}</a>  
            </div>
          </div>
        </div>
        ` : ''}
        
        <!-- Footer -->
        <div class="footer">
          <span>Roteiro Personalizado por NORA.GUIAi</span>
          <span>Página ${pageNumber} de ${totalPages}</span>
        </div>
      </div>
    </div>
    `;
  }).join('');

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    @page {
      size: A4 portrait;
      margin: 0;
    }
    
    html, body {
      margin: 0;
      padding: 0;
      font-family: 'Montserrat', sans-serif;
      background: #FFFEF8; /* Cream */
      color: #1A2942; /* Navy */
    }
    
    /* PÁGINA */
    .page {
      width: 210mm;
      height: 297mm;
      display: flex;
      overflow: hidden;
      background: #FFFEF8;
      page-break-after: always;
      page-break-inside: avoid;
    }
    
    .page:last-child {
      page-break-after: auto;
    }
    
    /* TAMANHOS DINÂMICOS */
    .activity-title { font-size: 14px; line-height: 1.3; font-family: 'Cormorant Garamond', serif; font-weight: bold; color: #1A2942; }
    .activity-desc { font-size: 11px; line-height: 1.45; color: #5D4E37; /* Sepia */ font-weight: 400; text-align: justify; }
    .activity-tip { font-size: 9px; color: #6B7280; font-style: italic; }
    .time-badge { font-size: 10px; padding: 3px 8px; }
    .activity-item { margin-bottom: 14px; }
    .day-title { font-size: 28px; font-family: 'Cormorant Garamond', serif; color: #1A2942; }
    .day-subtitle { font-size: 18px; font-family: 'Cormorant Garamond', serif; color: #D4AF37; /* Gold */ margin-top: 4px; font-style: italic; }
    
    .size-medium .activity-title { font-size: 12px; }
    .size-medium .activity-desc { font-size: 10px; line-height: 1.4; }
    .size-medium .activity-tip { font-size: 8px; }
    .size-medium .time-badge { font-size: 9px; padding: 2px 6px; }
    .size-medium .activity-item { margin-bottom: 10px; }
    .size-medium .day-title { font-size: 24px; }
    .size-medium .day-subtitle { font-size: 16px; }
    
    .size-compact .activity-title { font-size: 11px; }
    .size-compact .activity-desc { font-size: 9px; line-height: 1.35; }
    .size-compact .activity-tip { font-size: 7px; }
    .size-compact .time-badge { font-size: 8px; padding: 2px 5px; }
    .size-compact .activity-item { margin-bottom: 7px; }
    .size-compact .day-title { font-size: 22px; }
    .size-compact .day-subtitle { font-size: 14px; }
    .size-compact .tip-box { padding: 3px 5px; }
    
    /* SIDEBAR */
    .sidebar {
      width: 30%;
      height: 100%;
      background: #1A2942; /* Navy */
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10mm 4mm 8mm;
      position: relative;
      color: #E8D5B7; /* Sand */
    }
    
    .sidebar-line {
      position: absolute;
      top: 0; bottom: 0; left: 50%;
      width: 1px;
      background: rgba(212, 175, 55, 0.3); /* Gold alpha */
    }
    
    /* MAIN CONTENT */
    .main {
      width: 70%;
      height: 100%;
      padding: 8mm 10mm;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    
    .timeline {
      flex: 1;
      position: relative;
      margin-left: 6px;
      overflow: hidden;
    }
    
    .timeline-line {
      position: absolute;
      left: 7px; top: 8px; bottom: 16px;
      width: 2px;
      background: #E8D5B7; /* Sand */
    }
    
    .activity-item {
      position: relative;
      padding-left: 28px;
    }
    
    .dot {
      position: absolute;
      left: 0; top: 5px;
      width: 14px; height: 14px;
      border-radius: 50%;
      border: 2px solid #FFFEF8;
      z-index: 10;
    }
    
    .dot-gold { background: #D4AF37; }
    .dot-dark { background: #1A2942; }
    
    .time-badge {
      font-family: monospace;
      font-weight: bold;
      color: #B8860B;
      background: #FFFBEB;
      border-radius: 3px;
      border: 1px solid #E8D5B7;
      display: inline-block;
    }
    
    .tip-box {
      margin-top: 4px;
      display: inline-flex;
      align-items: flex-start;
      gap: 4px;
      background: white;
      padding: 4px 6px;
      border: 1px solid #E5E7EB;
      border-radius: 4px;
    }
    
    .burj-wrap {
      flex: 1;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding: 4mm 0;
      min-height: 0;
      z-index: 10;
    }
    
    .burj-wrap svg {
      height: 100%;
      max-height: 100%;
      width: auto;
      opacity: 0.9;
    }
    
    .info-box {
      border-top: 1px solid rgba(212, 175, 55, 0.3);
      padding-top: 3mm;
      width: 100%;
      text-align: center;
      margin-top: 3mm;
      z-index: 10;
    }
    
    .footer {
      margin-top: auto;
      padding-top: 3mm;
      display: flex;
      justify-content: space-between;
      font-size: 8px;
      color: #9CA3AF;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      border-top: 1px solid #E8D5B7;
    }
    
    .header-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 16px;
      border-bottom: 2px solid #E8D5B7;
      padding-bottom: 12px;
    }
    
    .header-item-label {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 2px;
      color: #B8860B;
    }
    
    .header-item-label span {
      font-size: 9px;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    
    .header-item-value {
      font-family: 'Cormorant Garamond', serif;
      font-size: 16px;
      color: #1A2942;
    }
    
    .transport-label {
      font-size: 8px;
      color: #9CA3AF;
      text-transform: uppercase;
    }
  </style>
</head>
<body>
  ${pagesHtml}
</body>
</html>`;
};