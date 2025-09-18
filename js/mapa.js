document.addEventListener('DOMContentLoaded', function() {
    const sedeLinks = document.querySelectorAll('.sede-link');
    const mapaIframe = document.getElementById('mapa-iframe');
    const infoCard = document.getElementById('info-card');

    const sedesInfo = {
        sede1: {
            nombre: 'CETPRO Arsenio Mendoza Flor - Sede Yanacancha',
            direccion: 'Av. Minero N° 500, Yanacancha - Huánuco',
            telefono: '+51 954 803 212',
            horario: 'Lun - Vie: 8:00 AM - 8:00 PM',
            link: 'https://goo.gl/maps/ejemplo'
        },
        sede2: {
            nombre: 'CETPRO Arsenio Mendoza Flor - Sede Huánuco Centro',
            direccion: 'Jr. Dos de Mayo N° 123, Huánuco - Huánuco',
            telefono: '+51 962 123 456',
            horario: 'Lun - Vie: 9:00 AM - 7:00 PM',
            link: 'https://goo.gl/maps/ejemplo2'
        },
        sede3: {
            nombre: 'CETPRO Arsenio Mendoza Flor - Sede Amarilis',
            direccion: 'Av. Independencia N° 200, Amarilis - Huánuco',
            telefono: '+51 963 456 789',
            horario: 'Lun - Vie: 8:30 AM - 6:30 PM',
            link: 'https://goo.gl/maps/ejemplo3'
        },
        sede4: {
            nombre: 'CETPRO Arsenio Mendoza Flor - Sede Pillco Marca',
            direccion: 'Calle Los Olivos N° 300, Pillco Marca - Huánuco',
            telefono: '+51 961 789 123',
            horario: 'Lun - Vie: 7:30 AM - 5:30 PM',
            link: 'https://goo.gl/maps/ejemplo4'
        }
    };

    sedeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const iframeSrc = this.getAttribute('data-iframe-src');
            const sede = this.getAttribute('data-sede');

            // Actualizar mapa
            mapaIframe.src = iframeSrc;

            // Actualizar información en ubicacion.html
            if (infoCard) {
                const sedeInfo = sedesInfo[sede];
                infoCard.querySelector('.info-header h3').textContent = sedeInfo.nombre;
                infoCard.querySelector('.info-details .detail-item:nth-child(1) span').textContent = sedeInfo.direccion;
                infoCard.querySelector('.info-details .detail-item:nth-child(2) span').textContent = sedeInfo.telefono;
                infoCard.querySelector('.info-details .detail-item:nth-child(3) span').textContent = sedeInfo.horario;
                infoCard.querySelector('.info-actions .btn-primary').href = sedeInfo.link;
                infoCard.querySelector('.info-actions .btn-secondary').href = `tel:${sedeInfo.telefono.replace(/\s+/g, '')}`;
            }

            // Actualizar estado activo
            sedeLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
});