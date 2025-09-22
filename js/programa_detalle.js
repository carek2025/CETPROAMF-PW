// Helper: parse query string
function getQueryParams() {
    const params = {};
    location.search.replace(/^[?]/, '').split('&').forEach(pair => {
        if (!pair) return;
        const [k, v] = pair.split('=');
        params[decodeURIComponent(k)] = decodeURIComponent(v || '');
    });
    return params;
}
// Datos de ejemplo (puedes mover esto a un JSON externo o a tu backend)
const PROGRAM_DATA = {
    1: {
        id:1,
        nombre: 'Soporte Técnico y Operaciones de Centros de Cómputo',
        subtitle: 'Mantenimiento y soporte de sistemas computacionales',
        creditos: 40,
        duracion: '6 meses',
        fechaInicio: '2025-02-01',
        fechaFin: '2025-07-01',
        salonImg: 'img/tres-personas-los-examinadores-de-poligrafo-trabajan-en-la-oficina-con-el-equipo-de-su-detector-de-mentiras.jpg',
        salon: 'Taller informática 1',
        vacantes: 25,
        horario: 'Lun a Vie — 3:00 PM - 7:45 PM',
        descripcion: 'Formate como especialista en mantenimiento, reparación y soporte técnico de sistemas computacionales. Aprende a diagnosticar problemas, instalar software y brindar asistencia técnica profesional.',
        teachers: [
            {name: 'Percy Bustamante Zevallos', cargo: 'Docente Titular', formacion: 'Ingeniero de Sistemas, Técnico en Redes', photo: 'img/teacher-percy.jpg'},
            {name: 'María López', cargo: 'Docente de Hardware', formacion: 'Técnica en Electrónica', photo: 'img/teacher-maria.jpg'}
        ],
        modulos: [
            {id: 'M1', titulo: 'Módulo 1: Fundamentos de Hardware', descripcion: 'Conocerás componentes de PC, diagnóstico y reparación básica.', horas: 60, creditos: 8, img: 'img/mod-hardware.jpg'},
            {id: 'M2', titulo: 'Módulo 2: Sistemas Operativos', descripcion: 'Instalación, configuración y administración de SO Windows y Linux.', horas: 80, creditos: 10, img: 'img/mod-so.jpg'},
            {id: 'M3', titulo: 'Módulo 3: Redes y Conectividad', descripcion: 'Diseño y solución de problemas en redes locales.', horas: 60, creditos: 8, img: 'img/mod-redes.jpg'}
        ],
        downloads: [ {title:'Ficha del programa (PDF)', url:'docs/ficha-programa-1.pdf'} ]
    },
    // Aquí puedes copiar/pegar más programas según tu listado...
};
// Inicializar la vista
(function init() {
    const params = getQueryParams();
    const id = params.id || '1';
    const data = PROGRAM_DATA[id] || PROGRAM_DATA[1];
    // Título y meta
    document.getElementById('pd-title').textContent = data.nombre;
    document.getElementById('pd-subtitle').textContent = data.subtitle || '';
    document.getElementById('pd-breadcrumb-current').textContent = data.nombre;
    // Metadatos rápidos
    document.getElementById('pd-creditos').textContent = data.creditos;
    document.getElementById('pd-duracion').textContent = data.duracion;
    document.getElementById('pd-fecha-inicio').textContent = formatDate(data.fechaInicio);
    document.getElementById('pd-fecha-fin').textContent = formatDate(data.fechaFin);
    document.getElementById('pd-salon').textContent = data.salon;
    document.getElementById('pd-desc-text').textContent = data.descripcion;
    document.getElementById('pd-imagen-salon').src = data.salonImg || 'img/default-salon.jpg';
    document.getElementById('pd-creditos-aside').textContent = data.creditos;
    document.getElementById('pd-duracion-aside').textContent = data.duracion;
    document.getElementById('pd-vacantes').textContent = data.vacantes || '-';
    // Teachers
    const tlist = document.getElementById('pd-teachers-list');
    tlist.innerHTML = '';
    data.teachers.forEach(t => {
        const div = document.createElement('div');
        div.className = 'pd-teacher-card';
        div.innerHTML = `
            <img src="${t.photo || 'img/default-teacher.jpg'}" alt="Foto ${t.name}" loading="lazy">
            <div class="pd-teacher-info">
                <h4>${t.name}</h4>
                <p>${t.cargo}</p>
                <p class="text-muted" style="font-size:0.82rem">${t.formacion}</p>
            </div>
        `;
        tlist.appendChild(div);
    });
    // Modulos grid
    const mg = document.getElementById('pd-modulos-grid');
    mg.innerHTML = '';
    data.modulos.forEach(mod => {
        const card = document.createElement('article');
        card.className = 'pd-modulo-card';
        card.innerHTML = `
            <img class="pd-modulo-thumb" src="${mod.img || 'img/default-thumb.jpg'}" alt="${mod.titulo}" loading="lazy">
            <div>
                <h4 style="margin:0">${mod.titulo}</h4>
                <p class="text-muted" style="margin:6px 0 0;">${truncate(mod.descripcion, 130)}</p>
                <div class="pd-modulo-meta">Horas: <strong>${mod.horas}</strong> • Créditos: <strong>${mod.creditos}</strong></div>
            </div>
        `;
        mg.appendChild(card);
    });
    // Accordion
    const acc = document.getElementById('pd-accordion');
    acc.innerHTML = '';
    data.modulos.forEach((mod, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.innerHTML = `<span>${mod.titulo}</span><i class="fas fa-chevron-down"></i>`;
        const panel = document.createElement('div');
        panel.className = 'pd-panel';
        panel.innerHTML = `
            <p>${mod.descripcion}</p>
            <p class="text-muted">Horas: ${mod.horas} • Créditos: ${mod.creditos}</p>
        `;
        btn.addEventListener('click', () => {
            const isOpen = panel.classList.contains('open');
            document.querySelectorAll('.pd-accordion .pd-panel').forEach(p => p.classList.remove('open'));
            if (!isOpen) panel.classList.add('open');
        });
        acc.appendChild(btn);
        acc.appendChild(panel);
    });
    // Downloads
    const dl = document.getElementById('pd-downloads');
    dl.innerHTML = '';
    (data.downloads||[]).forEach(d => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${d.url}" target="_blank" rel="noopener">${d.title}</a>`;
        dl.appendChild(li);
    });
    // Inscribirme link (puedes construir con id)
    document.getElementById('pd-inscribirme').href = `inscripcion-preliminar.html?program=${data.id}`;
    // JSON-LD schema.org Course
    injectSchema(data);
})();
function formatDate(d) {
    if (!d) return '';
    const dt = new Date(d);
    const opts = { day: '2-digit', month: 'short', year: 'numeric' };
    return dt.toLocaleDateString('es-PE', opts);
}
function truncate(s, n) { return s.length>n? s.slice(0,n-1)+'…': s }
// Favorito simple
document.addEventListener('click', (e) => {
    if (e.target.closest('#pd-fav')) {
        const btn = e.target.closest('#pd-fav');
        const pressed = btn.getAttribute('aria-pressed') === 'true';
        btn.setAttribute('aria-pressed', String(!pressed));
        btn.classList.toggle('active');
        btn.querySelector('i').classList.toggle('fas');
        btn.querySelector('i').classList.toggle('far');
    }
    if (e.target.closest('#pd-share')) {
        const url = location.href;
        if (navigator.share) {
            navigator.share({ title: document.getElementById('pd-title').textContent, url }).catch(()=>{});
        } else {
            prompt('Copiar enlace del programa:', url);
        }
    }
});
// Inyecta JSON-LD
function injectSchema(data) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": data.nombre,
        "description": data.descripcion,
        "provider": {
            "@type": "EducationalOrganization",
            "name": "CETPRO Arsenio Mendoza Flor",
            "sameAs": window.location.origin
        },
        "hasCourseInstance": {
            "@type": "CourseInstance",
            "startDate": data.fechaInicio,
            "endDate": data.fechaFin,
            "instructor": data.teachers.map(t=> ({"@type":"Person","name":t.name}))
        }
    };
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.text = JSON.stringify(schema);
    document.head.appendChild(s);
}