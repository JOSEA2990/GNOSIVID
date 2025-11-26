 /* ====== Demo data: reemplaza con tu CMS o JSON real ====== */
    const SERIES = [
      {
        id: 'primavera',
        title: 'Primavera P6',
        category: 'ingenieria',
        description: 'Curso práctico de Primavera P6 enfocado en proyectos de construcción',
        episodes: [
            {id:'p6-e1',title:'Introducción a Primavera P6',duration:'10:12',src:"Primavera - Video Clase1.mp4",desc:'Qué es Primavera P6, EPS, WBS y la interfaz.'},
            {id:'p6-e2',title:'Crear un proyecto nuevo',duration:'12:05',src:'/videos/primavera_ep2.mp4',thumb:'xx',desc:'Crear proyectos y calendarios.'},
            {id:'p6-e3',title:'Crear WBS',duration:'10:13',src:'/videos/primavera_ep3.mp4',thumb:'xx',desc:'Estructura de Desglose del Trabajo (WBS).'}
                    ]
      },
      
      {
        id: 'project',
        title: 'MS PROJECT',
        category: 'ingenieria',
        description: 'Curso práctico de MS PROJECT enfocado en proyectos de construcción',episodes:[]
      },

      {
        id: 'web',
        title: 'GIT',
        category: 'tecnologia',
        description: 'Iniciar a gemerar repositorios de control',episodes:[]
      },

      {
        id:'web',title:'Portafolio HTML & CSS',category:'tecnologia',description:'Crea un portafolio profesional con HTML y CSS',episodes:[]
      },

      {
        id:'solar',title:'Sistemas Solares Domésticos',category:'energia',description:'Cálculo y diseño de sistemas solares',episodes:[]
      },

      {
        id:'personal',title:'Manejo de Personal',category:'profesional',description:'Consejos y Casos Reales',episodes:[]
      },
    ];

    /* ====== Utility: render episodes and series ====== */
    const episodesList = document.getElementById('episodesList');
    const seriesGrid = document.getElementById('seriesGrid');
    const player = document.getElementById('player');
    const videoTitle = document.getElementById('videoTitle');
    const videoSub = document.getElementById('videoSub');


    /* ====== <div class="thumb">${ep.title.split(' ').slice(0,2).join(' ')} </div> ====== */
    function renderEpisodes(seriesId){
      const s = SERIES.find(x=>x.id===seriesId);
      episodesList.innerHTML = '';
      if(!s) return;
      s.episodes.forEach(ep=>{
        const el = document.createElement('div');
        el.className = 'ep';
        el.innerHTML = `
          
          <div class="meta-ep">
            <div class="ep-title">${ep.title}</div>
            <div class="ep-sub">${ep.duration} • ${ep.desc}</div>
          </div>`;
        el.onclick = ()=> playEpisode(s,ep);
        episodesList.appendChild(el);
      });
    }

    /* ====== Selección de Curso ====== */
    /* ====== Navegación → index2.html ====== */
function renderSeriesGrid(){
if(!seriesGrid) return;
seriesGrid.innerHTML = '';

SERIES.forEach(s=>{
const card = document.createElement('div');
card.className='card';
card.innerHTML = `
<img src="https://placehold.co/600x360?text=${encodeURIComponent(s.title)}" alt="${s.title}" />
<h4>${s.title}</h4>
<p>${s.description}</p>
`;
// Navegar a index2.html con ?serie=
card.onclick = ()=>{
window.location.href = `index2.html?serie=${s.id}`;
};
seriesGrid.appendChild(card);
});
}

    function playEpisode(series, ep){
      // If it's a YouTube link -> replace with iframe
      const src = ep.src || '';
      const videoWrap = document.getElementById('videoWrap');
      videoTitle.textContent = `${series.title} — ${ep.title}`;
      videoSub.textContent = ep.desc || '';

      if(src.includes('youtube.com') || src.includes('youtu.be')){
        // make embed url
        let id = '';
        if(src.includes('youtu.be')) id = src.split('/').pop();
        else try{ id = new URL(src).searchParams.get('v') }catch(e){}
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${id}`;
        iframe.setAttribute('allow','accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        iframe.setAttribute('allowfullscreen','');
        videoWrap.innerHTML='';
        videoWrap.appendChild(iframe);
      } else {
        // use HTML5 video
        videoWrap.innerHTML = '';
        const v = document.createElement('video');
        v.controls = true; v.preload='metadata'; v.src = ep.src;
        videoWrap.appendChild(v);
        // replace player ref
      }
    }

    // initial render: show first series and episodes
    renderSeriesGrid();
    renderEpisodes('primavera');

    // play first ep if exists
    const firstSeries = SERIES.find(s=>s.id==='primavera');
    if(firstSeries && firstSeries.episodes && firstSeries.episodes[0]){
      playEpisode(firstSeries, firstSeries.episodes[0]);
    }

    /* ====== interactivity: search, category filters, download transcript (mock) ====== */
    document.getElementById('search').addEventListener('input', (e)=>{
      const q = e.target.value.toLowerCase();
      // simple filter across episodes
      episodesList.innerHTML='';
      const matched = [];
      SERIES.forEach(s=>{
        s.episodes.forEach(ep=>{
          if(ep.title.toLowerCase().includes(q) || (ep.desc||'').toLowerCase().includes(q)) matched.push({s,ep});
        })
      })
      if(q.trim()==='') return renderEpisodes('primavera');
      if(matched.length===0) episodesList.innerHTML = '<div class="muted">No se encontraron resultados.</div>';
      matched.forEach(item=>{
        const el = document.createElement('div');
        el.className='ep';
        el.innerHTML = `<div class="thumb">${item.ep.title.split(' ').slice(0,2).join(' ')}</div>
                        <div class="meta-ep"><div class="ep-title">${item.ep.title}</div>
                        <div class="ep-sub">${item.ep.duration} • ${item.s.title}</div></div>`;
        el.onclick = ()=> playEpisode(item.s, item.ep);
        episodesList.appendChild(el);
      })
    })

/* ====== Filtro de Categoría ====== */
document.querySelectorAll('.cat-item').forEach(el=>{
el.addEventListener('click', ()=>{
document.querySelectorAll('.cat-item').forEach(c=>c.classList.remove('active'));
el.classList.add('active');
const cat = el.dataset.cat;


seriesGrid.innerHTML = '';
const list = (cat==='all') ? SERIES : SERIES.filter(s=>s.category===cat);


list.forEach(s=>{
const card = document.createElement('div');
card.className='card';
card.innerHTML = `
<img src="https://placehold.co/600x360?text=${encodeURIComponent(s.title)}" />
<h4>${s.title}</h4>
<p>${s.description}</p>`;
card.onclick = ()=> window.location.href = `index2.html?serie=${s.id}`;
seriesGrid.appendChild(card);
});
});
});

    // small actions
    /* ====== document.getElementById('upload-btn').addEventListener('click', ()=>alert('Función subir/Agregar: en el MVP, reemplaza manualmente el arreglo SERIES en el código con tus videos.'))====== */

    /* ====== document.getElementById('newSeries').addEventListener('click', ()=>{
      const name = prompt('Nombre de la nueva serie:');
      if(!name) return;
      SERIES.push({id:name.toLowerCase().replace(/\s+/g,'-'),title:name,category:'ingenieria',description:'Nueva serie',episodes:[]});
      renderSeriesGrid();
      alert('Serie creada en la data local. Para persistencia necesitas backend o almacenamiento.');
    });====== */

    /* ====== document.getElementById('downloadBtn').addEventListener('click', ()=>{
      alert('Descarga de MP3: para habilitar, agrega la ruta del MP3 en la propiedad ep.audio y genera blob/downlaod. En este demo es solo una acción placeholder.');
    })  ====== */
     /* ====== document.getElementById('transcriptBtn').addEventListener('click', ()=>{
      alert('Transcripción: pega la transcripción generada por ElevenLabs o tu editor en la base de datos y muéstrala aquí.');
    })  ====== */

   /* ====== document.getElementById('exportCSV').addEventListener('click', ()=>{
      // quick export of titles
      let csv = 'serie,episodio,duracion,src\n';
      SERIES.forEach(s=> s.episodes.forEach(ep=> csv += `${s.title.replaceAll(',', '')},${ep.title.replaceAll(',', '')},${ep.duration},${ep.src}\n`));
      const blob = new Blob([csv],{type:'text/csv'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href=url; a.download='catalogo_videos.csv'; a.click();
      URL.revokeObjectURL(url);
    }) ====== */

    // dark toggle - demo that toggles theme colors (simple)
    document.getElementById('darkToggle').addEventListener('click', ()=>{
      document.body.style.background = (document.body.style.background.includes('#fff') ? 'linear-gradient(180deg,#071024 0%, var(--bg) 100%)' : '#f8fafc');
      // Note: in a full app you'd swap theme variables and CSS.
      alert('Modo alterno (demo): para tema real, implementa variables CSS en el servidor o con prefers-color-scheme.')
    })