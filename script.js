// script.js - Familia Market - JavaScript Consolidado

// SISTEMA DE HISTORIAL DE NAVEGACIÓN MEJORADO
let historialNavegacion = [];
let currentPage = 'inicio';
let mobileDropdownAbierto = null;
let animacionBotonesInterval;
let dropdownAbierto = null;

// CONFIGURACIÓN COMPLETA DE CATEGORÍAS
const categorias = {
    'abarrotes': {
        titulo: 'Groceries',
        imagenes: ['abarrotes-1', 'abarrotes-2', 'abarrotes-3', 'abarrotes-4'],
        descripcion: 'At Familia Market we understand that quality begins with ingredients. That\'s why we carefully select each grocery product to guarantee freshness and flavor on your table. From basic grains to the spices that bring your family recipes to life.'
    },
    'electronica': {
        titulo: 'Electronics', 
        imagenes: ['electronica-1', 'electronica-2', 'electronica-3', 'electronica-4'],
        descripcion: 'Stay connected with the best technology. At Familia Market you find from cables and accessories to essential devices that simplify your daily life. Guaranteed quality and prices that respect your budget.'
    },
    'ferreteria': {
        titulo: 'Hardware',
        imagenes: ['ferreteria-1', 'ferreteria-2', 'ferreteria-3', 'ferreteria-4'],
        descripcion: 'Everything you need for your home projects and repairs. Reliable tools, durable materials and the advice you need to make your ideas a reality. At Familia Market, your project is our project.'
    },
    'bebidas': {
        titulo: 'Beverages',
        imagenes: ['bebidas-1', 'bebidas-2', 'bebidas-3', 'bebidas-4'],
        descripcion: 'From refreshing drinks for daily use to special selections for your celebrations. Find the perfect drink for every moment, always with responsibility and variety that surprises.'
    },
    'comestibles': {
        titulo: 'Food Items',
        imagenes: ['comestibles-1', 'comestibles-2', 'comestibles-3', 'comestibles-4'],
        descripcion: 'The freshest and most delicious foods for your family. We carefully select each product to guarantee flavor and nutrition in every bite. From fruits and vegetables to ready-to-enjoy products.'
    },
    'snacks': {
        titulo: 'Snacks',
        imagenes: ['snacks-1', 'snacks-2', 'snacks-3', 'snacks-4'],
        descripcion: 'For those special moments or the daily craving, we have the best selection of national and international snacks. Find from your childhood favorites to new flavor experiences.'
    },
    'higiene': {
        titulo: 'Hygiene and Personal Care',
        imagenes: ['higiene-1', 'higiene-2', 'higiene-3', 'higiene-4'],
        descripcion: 'Your well-being is our priority. We offer a complete range of personal hygiene and care products that take care of you and your family. Quality and trust in every product.'
    },
    'hogar': {
        titulo: 'Home',
        imagenes: ['hogar-1', 'hogar-2', 'hogar-3', 'hogar-4'],
        descripcion: 'Everything you need to make your home a comfortable and cozy space. From cleaning products to decoration, we have the essentials to keep your house impeccable.'
    },
    'promociones': {
        titulo: 'Promotions / Specials',
        imagenes: ['promociones-1', 'promociones-2', 'promociones-3', 'promociones-4'],
        descripcion: 'Take advantage of our exclusive offers! At Familia Market we always have special promotions so you can save while enjoying quality products. Visit us frequently and discover new opportunities every week.'
    },
    'otros': {
        titulo: 'Other Featured Products',
        imagenes: ['otros-1', 'otros-2', 'otros-3', 'otros-4'],
        descripcion: 'Discover our special selection of unique and featured products. We are always incorporating novelties to surprise you and offer you more options for your daily life.'
    }
};

// CONFIGURACIÓN SOBRE TIENDA CON INFO INTEGRADA
const sobreTiendas = {
    'sobre-tienda1': {
        titulo: 'Familia Market - Miami Gardens',
        imagenes: ['sobre-tienda1-portada-1', 'sobre-tienda1-portada-2'],
        descripcion: 'Our store in Miami Gardens is much more than a commercial establishment: it is the heart of the community. With years of experience serving families in the area, we have become the trusted place where you find from basic products to international services that connect your family with the world. We are your trusted grocery store, but we also function as convenience store, liquor store, tobacco shop, sandwich shop and foodstand all in one. Remember that we do not accept delivery - we await you in our physical store to serve you personally. Phone: 786 661 8524. Our bilingual team is always ready to help you with a smile and the knowledge you need.'
    },
    'sobre-tienda2': {
        titulo: 'Familia Market - Allapattah',
        imagenes: ['sobre-tienda2-portada-1', 'sobre-tienda2-portada-2'],
        descripcion: 'Located in the vibrant heart of Allapattah, our store specializes in offering a wide variety of products and services for the whole family. But that\'s not all: we also offer all the international services you need to stay connected with your loved ones. At Familia Market Allapattah we are more than a grocery store - we are your trusted convenience store, liquor store, tobacco shop, sandwich shop and foodstand. Important: we do not accept delivery, all purchases must be made in our physical store. Phone: 786 661 8524. Come and discover why we are the preferred choice of those looking for quality and exceptional service.'
    },
    'sobre-tienda3': {
        titulo: 'Familia Market - South Miami Heights',
        imagenes: ['sobre-tienda3-portada-1', 'sobre-tienda3-portada-2'],
        descripcion: 'In South Miami Heights, our store stands out for its ample parking, easy access and the best selection of personal hygiene and home care products. We are the ideal destination for families who value comfort, variety and that personalized treatment that characterizes us. As your trusted grocery store, we offer everything you need: from basic groceries to convenience store, liquor store, tobacco shop, sandwich shop and foodstand services. 🚫 We do not accept delivery - visit us at our physical location. Phone: 786 661 8524. With years of experience serving the community, we know exactly what your family needs and we are proud to offer it to you.'
    }
};

// DETECCIÓN DE MÓVIL
function esMovil() {
    return window.innerWidth <= 768;
}

// INICIALIZACIÓN DE ELEMENTOS MÓVIL
function inicializarElementosMovil() {
    if (esMovil()) {
        document.querySelector('.mobile-menu').style.display = 'block';
        document.querySelector('.menu-navegacion').style.display = 'none';
        document.querySelectorAll('.btn-atras').forEach(btn => {
            btn.style.top = '110px';
        });
        optimizarPortadasMovil();
    } else {
        document.querySelector('.mobile-menu').style.display = 'none';
        document.querySelector('.menu-navegacion').style.display = 'block';
        document.querySelectorAll('.btn-atras').forEach(btn => {
            btn.style.top = '150px';
        });
        cerrarMobileDropdowns();
    }
}

// OPTIMIZAR PORTADAS MÓVIL
function optimizarPortadasMovil() {
    if (!esMovil()) return;
    const portadasMovil = document.querySelectorAll('.img-movil');
    portadasMovil.forEach(img => {
        img.style.objectFit = 'contain';
        img.style.backgroundColor = '#f8f9fa';
    });
}

// TOGGLE DROPDOWNS MÓVIL
function toggleMobileDropdown(tipo) {
    const dropdown = document.getElementById(`dropdown-${tipo}`);
    if (mobileDropdownAbierto === tipo) {
        dropdown.classList.remove('abierto');
        mobileDropdownAbierto = null;
        actualizarMenuActivoMovil(null);
    } else {
        if (mobileDropdownAbierto) {
            document.getElementById(`dropdown-${mobileDropdownAbierto}`).classList.remove('abierto');
        }
        dropdown.classList.add('abierto');
        mobileDropdownAbierto = tipo;
        actualizarMenuActivoMovil(tipo);
    }
}

// ACTUALIZAR MENÚ ACTIVO MÓVIL
function actualizarMenuActivoMovil(tipo) {
    document.querySelectorAll('.mobile-menu-item').forEach(item => {
        item.classList.remove('activo');
    });
    if (tipo) {
        const menuItem = document.querySelector(`.mobile-menu-item[onclick="toggleMobileDropdown('${tipo}')"]`);
        if (menuItem) {
            menuItem.classList.add('activo');
        }
    }
}

// CERRAR DROPDOWNS MÓVIL
function cerrarMobileDropdowns() {
    document.querySelectorAll('.mobile-dropdown').forEach(dropdown => {
        dropdown.classList.remove('abierto');
    });
    mobileDropdownAbierto = null;
    actualizarMenuActivoMovil(null);
}

// TOGGLE DROPDOWN PC
function toggleDropdown(tipo) {
    if (esMovil()) return;
    
    const dropdown = document.getElementById(`dropdown-${tipo}-pc`);
    if (dropdownAbierto === tipo) {
        dropdown.classList.remove('abierto');
        dropdownAbierto = null;
    } else {
        // Cerrar cualquier dropdown abierto
        if (dropdownAbierto) {
            document.getElementById(`dropdown-${dropdownAbierto}-pc`).classList.remove('abierto');
        }
        dropdown.classList.add('abierto');
        dropdownAbierto = tipo;
    }
}

// CERRAR DROPDOWN PC
function cerrarDropdown(tipo) {
    if (esMovil()) return;
    
    const dropdown = document.getElementById(`dropdown-${tipo}-pc`);
    dropdown.classList.remove('abierto');
    dropdownAbierto = null;
}

// CERRAR TODOS LOS DROPDOWNS (PC Y MÓVIL)
function cerrarTodosLosDropdowns() {
    // Cerrar dropdowns PC
    if (!esMovil()) {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('abierto');
        });
        dropdownAbierto = null;
    }
    
    // Cerrar dropdowns móvil
    cerrarMobileDropdowns();
}

// IR AL INICIO (logo click)
function irAlInicio() {
    historialNavegacion = [];
    currentPage = 'inicio';
    document.querySelectorAll('.pagina').forEach(pagina => {
        pagina.classList.remove('activa');
    });
    document.getElementById('categorias-container').innerHTML = '';
    document.getElementById('sobre-tienda-container').innerHTML = '';
    cerrarTodosLosDropdowns();
    document.getElementById('inicio').classList.add('activa');
    actualizarMenuActivo('inicio');
    window.scrollTo(0, 0);
    gestionarBotonesFlotantes();
    setTimeout(() => {
        inicializarSlidersEnPagina('inicio');
    }, 100);
}

// INICIALIZACIÓN DEL MAPA OPENSTREETMAP
function inicializarMapa() {
    const mapaContainer = document.getElementById('mapa-tiendas');
    if (!mapaContainer) return;

    const tiendas = [
        {
            nombre: 'Familia Market - Miami Gardens',
            lat: 25.948696,
            lng: -80.244805,
            direccion: '19139 NW 27th Ave, Miami, FL 33114',
            enlace: 'https://maps.app.goo.gl/fS89V83GGuPCXW3H6?g_st=awb'
        },
        {
            nombre: 'Familia Market - Allapattah',
            lat: 25.814667,
            lng: -80.240201,
            direccion: '2412 NW 27th Ave, Miami, FL 33142',
            enlace: 'https://www.google.com/maps?q=25.814667,-80.240201'
        },
        {
            nombre: 'Familia Market - South Miami Heights',
            lat: 25.587899,
            lng: -80.374533,
            direccion: '11545 SW 186th St, Miami, FL 33157',
            enlace: 'https://www.google.com/maps?q=25.587899,-80.374533'
        }
    ];

    try {
        const mapa = L.map('mapa-tiendas').setView([25.7617, -80.1918], 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18,
        }).addTo(mapa);

        const iconoGoogleRojo = L.divIcon({
            html: `<div style="background-color: #ea4335; width: 20px; height: 20px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 2px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3); position: relative; cursor: pointer;"><div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(45deg); width: 6px; height: 6px; background: white; border-radius: 50%;"></div></div>`,
            className: 'icono-google-maps',
            iconSize: [20, 20],
            iconAnchor: [10, 20]
        });

        tiendas.forEach((tienda) => {
            const marcador = L.marker([tienda.lat, tienda.lng], { 
                icon: iconoGoogleRojo 
            }).addTo(mapa);

            marcador.bindPopup(`
                <div style="padding: 15px; min-width: 250px; font-family: 'Inter', sans-serif;">
                    <h3 style="margin: 0 0 10px 0; color: #ed1c24; font-size: 16px; font-weight: 700;">${tienda.nombre}</h3>
                    <p style="margin: 0 0 8px 0; font-size: 14px; color: #666; line-height: 1.4;">${tienda.direccion}</p>
                    <a href="${tienda.enlace}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: #ed1c24; color: white; padding: 10px 20px; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 600; margin-top: 8px; transition: all 0.3s;">
                        🗺️ Get Directions on Google Maps
                    </a>
                </div>
            `);

            marcador.on('click', function() {
                window.open(tienda.enlace, '_blank');
            });
        });

    } catch (error) {
        console.error('Error loading map:', error);
        mapaContainer.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #666;">
                <h3>🗺️ Our Stores Map</h3>
                <p>Store locations are loaded correctly</p>
                <p><small>Miami Gardens, Allapattah, South Miami Heights</small></p>
            </div>
        `;
    }
}

// SISTEMA MEJORADO DE SLIDERS
class SliderManager {
    constructor(sliderContainer) {
        this.slider = sliderContainer;
        this.track = sliderContainer.querySelector('.slider-track');
        this.slides = sliderContainer.querySelectorAll('.slide');
        this.prevBtn = sliderContainer.querySelector('.slider-btn.prev');
        this.nextBtn = sliderContainer.querySelector('.slider-btn.next');
        this.currentSlide = 0;
        this.autoPlayInterval = null;
        this.init();
    }
    
    init() {
        this.createIndicators();
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());
        if (this.slides.length > 1) {
            this.startAutoPlay();
            this.slider.addEventListener('mouseenter', () => this.stopAutoPlay());
            this.slider.addEventListener('mouseleave', () => this.startAutoPlay());
        }
    }
    
    createIndicators() {
        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.className = 'slider-indicators';
        for (let i = 0; i < this.slides.length; i++) {
            const dot = document.createElement('div');
            dot.className = `slider-dot ${i === 0 ? 'activo' : ''}`;
            dot.addEventListener('click', () => this.goToSlide(i));
            indicatorsContainer.appendChild(dot);
        }
        this.slider.appendChild(indicatorsContainer);
        this.indicators = indicatorsContainer.querySelectorAll('.slider-dot');
    }
    
    updateIndicators() {
        this.indicators.forEach((dot, index) => {
            dot.classList.toggle('activo', index === this.currentSlide);
        });
    }
    
    goToSlide(index) {
        this.slides[this.currentSlide].classList.add('saliendo');
        setTimeout(() => {
            this.slides.forEach(slide => {
                slide.classList.remove('activo', 'saliendo');
            });
            this.currentSlide = (index + this.slides.length) % this.slides.length;
            this.slides[this.currentSlide].classList.add('activo');
            this.updateIndicators();
        }, 300);
    }
    
    next() {
        this.goToSlide(this.currentSlide + 1);
    }
    
    prev() {
        this.goToSlide(this.currentSlide - 1);
    }
    
    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => this.next(), 5000);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// GESTIÓN DE BOTONES FLOTANTES
function gestionarBotonesFlotantes() {
    const botonesFlotantes = document.getElementById('botones-flotantes');
    if (currentPage === 'inicio') {
        botonesFlotantes.style.display = 'flex';
        iniciarAnimacionBotones();
    } else {
        botonesFlotantes.style.display = 'none';
        detenerAnimacionBotones();
        // Cerrar modales si están abiertos
        cerrarModal('opinar');
        cerrarModal('visitar');
    }
}

function iniciarAnimacionBotones() {
    detenerAnimacionBotones();
    const botones = document.querySelectorAll('.boton-flotante');
    let contador = 0;
    
    animacionBotonesInterval = setInterval(() => {
        botones.forEach(boton => boton.classList.remove('saltando'));
        
        if (contador % 2 === 0) {
            botones[0].classList.add('saltando'); // Botón "Opinar"
        } else {
            botones[1].classList.add('saltando'); // Botón "Visitar"
        }
        
        contador++;
    }, 4000); // 4 segundos entre saltos
}

function detenerAnimacionBotones() {
    if (animacionBotonesInterval) {
        clearInterval(animacionBotonesInterval);
        animacionBotonesInterval = null;
    }
}

// FUNCIONES PARA MODALES
function abrirModal(tipo) {
    const boton = document.getElementById(`boton-${tipo}`);
    const modal = document.getElementById(`modal-${tipo}`);
    const container = document.getElementById(`container-${tipo}`);
    
    // Ocultar botón y mostrar modal
    boton.style.display = 'none';
    modal.style.display = 'block';
    
    // Ajustar posición del modal
    const rect = container.getBoundingClientRect();
    modal.style.position = 'absolute';
    modal.style.bottom = '0';
    modal.style.right = '0';
}

function cerrarModal(tipo) {
    const boton = document.getElementById(`boton-${tipo}`);
    const modal = document.getElementById(`modal-${tipo}`);
    
    // Ocultar modal y mostrar botón
    modal.style.display = 'none';
    boton.style.display = 'block';
}

// FUNCIÓN PARA DEJAR OPINIÓN EN GOOGLE
function dejarOpinionGoogle() {
    window.open('https://maps.app.goo.gl/xhfrJsWzcYTgdFS19', '_blank');
    cerrarModal('opinar');
}

// FUNCIONES PRINCIPALES MEJORADAS
function actualizarMenuActivo(paginaId) {
    if (!esMovil()) {
        document.querySelectorAll('.menu-link').forEach(link => {
            link.classList.remove('activo');
        });
        const menuItem = document.querySelector(`.menu-link[onclick="mostrarPagina('${paginaId}')"]`);
        if (menuItem) {
            menuItem.classList.add('activo');
        }
    } else {
        actualizarMenuActivoMovil(null);
    }
}

function mostrarPagina(paginaId) {
    cerrarTodosLosDropdowns();
    
    if (paginaId !== currentPage) {
        historialNavegacion.push(currentPage);
    }
    currentPage = paginaId;
    document.querySelectorAll('.pagina').forEach(pagina => {
        pagina.classList.remove('activa');
    });
    document.getElementById('categorias-container').innerHTML = '';
    document.getElementById('sobre-tienda-container').innerHTML = '';
    document.getElementById(paginaId).classList.add('activa');
    actualizarMenuActivo(paginaId);
    gestionarBotonesFlotantes();
    setTimeout(() => {
        inicializarSlidersEnPagina(paginaId);
        window.scrollTo(0, 0);
        if (paginaId === 'mis-tiendas') {
            setTimeout(() => {
                inicializarMapa();
            }, 300);
        }
    }, 100);
}

function volverAtras() {
    cerrarTodosLosDropdowns();
    
    if (historialNavegacion.length > 0) {
        const paginaAnterior = historialNavegacion.pop();
        currentPage = paginaAnterior;
        document.querySelectorAll('.pagina').forEach(pagina => {
            pagina.classList.remove('activa');
        });
        document.getElementById('categorias-container').innerHTML = '';
        document.getElementById('sobre-tienda-container').innerHTML = '';
        if (document.getElementById(paginaAnterior)) {
            document.getElementById(paginaAnterior).classList.add('activa');
        } else {
            document.getElementById('inicio').classList.add('activa');
            currentPage = 'inicio';
        }
        actualizarMenuActivo(currentPage);
        gestionarBotonesFlotantes();
        setTimeout(() => {
            inicializarSlidersEnPagina(currentPage);
            window.scrollTo(0, 0);
        }, 100);
    } else {
        irAlInicio();
    }
}

function mostrarCategoria(categoriaId) {
    cerrarTodosLosDropdowns();
    historialNavegacion.push(currentPage);
    const categoria = categorias[categoriaId];
    if (!categoria) return;

    const html = `
        <section id="categoria-${categoriaId}" class="pagina activa">
            <div class="pagina-interna">
                <button class="btn-atras" onclick="volverAtras()">← Back</button>
                <h1 class="titulo-pagina">${categoria.titulo}</h1>
                <div class="grid-imagenes">
                    <div class="fila-completa">
                        <img src="images/categorias/${categoria.imagenes[0]}.webp" alt="${categoria.titulo}" class="imagen-grande" width="1200" height="450" loading="lazy">
                    </div>
                    <div class="fila-mitad">
                        <img src="images/categorias/${categoria.imagenes[1]}.webp" alt="${categoria.titulo}" class="imagen-pequena" width="800" height="350" loading="lazy">
                        <img src="images/categorias/${categoria.imagenes[2]}.webp" alt="${categoria.titulo}" class="imagen-pequena" width="800" height="350" loading="lazy">
                    </div>
                    <div class="fila-completa">
                        <img src="images/categorias/${categoria.imagenes[3]}.webp" alt="${categoria.titulo}" class="imagen-grande" width="1200" height="450" loading="lazy">
                    </div>
                </div>
                <div class="texto-categoria">
                    <h2>Everything in ${categoria.titulo}</h2>
                    <p class="descripcion-categoria">${categoria.descripcion}</p>
                    <p style="margin-top: 20px; font-style: italic; color: var(--color-texto-suave);">
                        "Quality you notice, prices you appreciate"
                    </p>
                    <button class="btn-donde-encontrarnos" onclick="mostrarPagina('mis-tiendas')">Where to Find Us?</button>
                </div>
            </div>
        </section>
    `;

    document.querySelectorAll('.pagina').forEach(pagina => {
        pagina.classList.remove('activa');
    });
    document.getElementById('categorias-container').innerHTML = html;
    currentPage = `categoria-${categoriaId}`;
    gestionarBotonesFlotantes();
    window.scrollTo(0, 0);
}

function mostrarSobreTienda(tiendaId) {
    cerrarTodosLosDropdowns();
    historialNavegacion.push(currentPage);
    const tienda = sobreTiendas[tiendaId];
    if (!tienda) return;

    const html = `
        <section id="${tiendaId}" class="pagina activa">
            <div class="pagina-interna">
                <button class="btn-atras" onclick="volverAtras()">← Back</button>
                <h1 class="titulo-pagina">${tienda.titulo}</h1>
                <div class="slider-portada" id="slider-${tiendaId}">
                    <div class="slider-track">
                        <div class="slide activo">
                            <img src="images/sobre-tienda/${tienda.imagenes[0]}.webp" alt="${tienda.titulo}" class="slide-img img-pc" width="1200" height="600" loading="lazy">
                            <img src="images/portada/Portadas para movil/${tiendaId}-1.webp" alt="${tienda.titulo}" class="slide-img img-movil" width="800" height="400" loading="lazy">
                        </div>
                        <div class="slide">
                            <img src="images/sobre-tienda/${tienda.imagenes[1]}.webp" alt="${tienda.titulo}" class="slide-img img-pc" width="1200" height="600" loading="lazy">
                            <img src="images/portada/Portadas para movil/${tiendaId}-2.webp" alt="${tienda.titulo}" class="slide-img img-movil" width="800" height="400" loading="lazy">
                        </div>
                    </div>
                    <div class="slider-controls">
                        <button class="slider-btn prev">‹</button>
                        <button class="slider-btn next">›</button>
                    </div>
                </div>
                <div class="seccion-texto">
                    <h2>Get to Know Our Store</h2>
                    <p>${tienda.descripcion}</p>
                    <p style="margin-top: 20px; font-weight: 600; color: var(--color-rojo);">
                        We await you to personally experience why we are different!
                    </p>
                </div>
            </div>
        </section>
    `;

    document.querySelectorAll('.pagina').forEach(pagina => {
        pagina.classList.remove('activa');
    });
    document.getElementById('sobre-tienda-container').innerHTML = html;
    currentPage = tiendaId;
    gestionarBotonesFlotantes();
    setTimeout(() => {
        const sliderContainer = document.querySelector(`#slider-${tiendaId}`);
        if (sliderContainer) {
            new SliderManager(sliderContainer);
        }
    }, 100);
    window.scrollTo(0, 0);
}

// INICIALIZACIÓN DE SLIDERS
function inicializarSlidersEnPagina(paginaId) {
    const pagina = document.getElementById(paginaId);
    if (!pagina) return;
    const sliders = pagina.querySelectorAll('.slider-portada');
    sliders.forEach(slider => {
        new SliderManager(slider);
    });
}

// INICIALIZACIÓN AL CARGAR LA PÁGINA
document.addEventListener('DOMContentLoaded', function() {
    inicializarElementosMovil();
    inicializarSlidersEnPagina('inicio');
    actualizarMenuActivo('inicio');
    gestionarBotonesFlotantes();
    
    if (currentPage === 'mis-tiendas') {
        setTimeout(() => {
            inicializarMapa();
        }, 500);
    }
    
    window.addEventListener('resize', function() {
        inicializarElementosMovil();
        gestionarBotonesFlotantes();
    });
    
    document.addEventListener('click', function(event) {
        if (esMovil() && mobileDropdownAbierto && 
            !event.target.closest('.mobile-menu-container') &&
            !event.target.closest('.mobile-dropdown')) {
            cerrarMobileDropdowns();
        }
    });

    // Efectos hover para cards
    const cards = document.querySelectorAll('.beneficio, .tarjeta-tienda, .boton-circular');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = this.classList.contains('boton-circular') 
                ? 'scale(1.15) rotate(5deg)' 
                : 'translateY(-8px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = this.classList.contains('boton-circular') 
                ? 'scale(1) rotate(0)' 
                : 'translateY(0)';
        });
    });
});