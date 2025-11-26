// data.js
const SERIES = [
    {
        id: 'primavera',
        title: 'Primavera P6',
        category: 'ingenieria',
        description: 'Curso práctico de Primavera P6 enfocado en proyectos de construcción',
        episodes: [
            {id:'p6-e1', title:'Introducción a Primavera P6', duration:'2:00', src:"Primavera - Video Clase1.mp4", desc:'Qué es Primavera P6, EPS, WBS y la interfaz.'},
            {id:'p6-e2', title:'Crear un proyecto nuevo', duration:'12:05', src:"videos/primavera2.mp4", desc:'Crear proyectos y calendarios.'},
            {id:'p6-e3', title:'Crear WBS', duration:'10:13', src:"videos/primavera3.mp4", desc:'Estructura de Desglose del Trabajo.'}
        ]
    },

    { id:'project', title:'MS PROJECT', category:'ingenieria', description:'Curso práctico de MS PROJECT', 
        episodes:[
            {id:'MSP-e1', title:'Introducción a MS Project', duration:'2:00', src:"", desc:'Qué es MS Project, uso y la interfaz.'},
            {id:'MSP-e2', title:'Crear un proyecto nuevo', duration:'12:05', src:"videos/primavera2.mp4", desc:'Crear proyectos y calendarios.'},
            {id:'MSP-e3', title:'Primeros enlaces', duration:'10:13', src:"videos/primavera3.mp4", desc:'Tipos de Enlaces y recomendaciones de uso'}
        ] 
    },
    { id:'git', title:'GIT', category:'tecnologia', description:'Control de versiones con GIT', episodes:[] },
    { id:'htmlcss', title:'Portafolio HTML & CSS', category:'tecnologia', description:'Crea tu portafolio web profesional', episodes:[] },
    { id:'solar', title:'Sistemas Solares Domésticos', category:'energia', description:'Diseño de sistemas solares', episodes:[] },
    { id:'personal', title:'Manejo de Personal', category:'profesional', description:'Consejos y casos reales', episodes:[] }
];