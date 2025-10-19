// script.js - Familia Market - JavaScript Consolidado

// SISTEMA DE HISTORIAL DE NAVEGACIÓN MEJORADO
let historialNavegacion = [];
let mapaInicializado = false;
let currentPage = 'inicio';
let mobileDropdownAbierto = null;
let animacionBotonesInterval;
let dropdownAbierto = null;

// AGREGAR ESTA FUNCIÓN AL INICIO DEL ARCHIVO (después de las variables globales)
function obtenerIdiomaActual() {
    return window.location.href.includes('index-es.html') ? 'es' : 'en';
}

// CONFIGURACIÓN BILINGÜE DE CATEGORÍAS
const categorias = {
    'abarrotes': {
        titulo: {
            en: 'Groceries',
            es: 'Abarrotes'
        },
        descripcion: {
            en: 'At Familia Market we understand that quality begins with ingredients. That\'s why we carefully select each grocery product to guarantee freshness and flavor on your table. From basic grains to the spices that bring your family recipes to life.',
            es: 'En Familia Market entendemos que la calidad comienza con los ingredientes. Por eso seleccionamos cuidadosamente cada producto de abarrotes para garantizar frescura y sabor en tu mesa. Desde granos básicos hasta las especias que dan vida a tus recetas familiares.'
        },
        imagenes: ['abarrotes/abarrotes-1', 'abarrotes/abarrotes-2', 'abarrotes/abarrotes-3', 'abarrotes/abarrotes-4']
    },
    'electronica': {
        titulo: {
            en: 'Electronics',
            es: 'Electrónica'
        },
        descripcion: {
            en: 'Stay connected with the best technology. At Familia Market you find from cables and accessories to essential devices that simplify your daily life. Guaranteed quality and prices that respect your budget.',
            es: 'Mantente conectado con la mejor tecnología. En Familia Market encuentras desde cables y accesorios hasta dispositivos esenciales que simplifican tu vida diaria. Calidad garantizada y precios que respetan tu presupuesto.'
        },
        imagenes: ['electronica/electronica-1', 'electronica/electronica-2', 'electronica/electronica-3', 'electronica/electronica-4']
    },
    'ferreteria': {
        titulo: {
            en: 'Hardware',
            es: 'Ferretería'
        },
        descripcion: {
            en: 'Everything you need for your home projects and repairs. Reliable tools, durable materials and the advice you need to make your ideas a reality. At Familia Market, your project is our project.',
            es: 'Todo lo que necesitas para tus proyectos y reparaciones del hogar. Herramientas confiables, materiales duraderos y el asesoramiento que necesitas para hacer realidad tus ideas. En Familia Market, tu proyecto es nuestro proyecto.'
        },
        imagenes: ['ferreteria/ferreteria-1', 'ferreteria/ferreteria-2', 'ferreteria/ferreteria-3', 'ferreteria/ferreteria-4']
    },
    'bebidas': {
        titulo: {
            en: 'Beverages',
            es: 'Bebidas'
        },
        descripcion: {
            en: 'From refreshing drinks for daily use to special selections for your celebrations. Find the perfect drink for every moment, always with responsibility and variety that surprises.',
            es: 'Desde bebidas refrescantes para el diario vivir hasta selecciones especiales para tus celebraciones. Encuentra la bebida perfecta para cada momento, siempre con responsabilidad y variedad que sorprende.'
        },
        imagenes: ['bebidas/bebidas-1', 'bebidas/bebidas-2', 'bebidas/bebidas-3', 'bebidas/bebidas-4']
    },
    'tabaco': {
    titulo: {
        en: 'Tobacco & Accessories',
        es: 'Tabaco y Accesorios'
    },
    descripcion: {
        en: 'Discover a space designed for true tobacco connoisseurs. At La Familia Market, we offer a diverse selection of products and accessories reflecting style, sophistication, and quality. From modern vaporizers and elegant pipes to lighters, rolling papers, and essentials, every detail is crafted for those who value a unique experience.',
        es: 'Descubre un espacio diseñado para verdaderos conocedores del tabaco. En La Familia Market reunimos una selección diversa de productos y accesorios que reflejan estilo, sofisticación y calidad. Desde vaporizadores modernos y pipas elegantes hasta encendedores, papeles para liar y artículos esenciales, cada detalle está pensado para quienes valoran una experiencia única.'
    },
    imagenes: ['tabaco/tabaco-1', 'tabaco/tabaco-2', 'tabaco/tabaco-3', 'tabaco/tabaco-4']
},

    'snacks': {
    titulo: {
        en: 'Snacks & Fast Food',
        es: 'Snacks & Comida Rápida'
    },
    descripcion: {
        en: 'Perfect for quick cravings or on-the-go meals. We offer a wide variety of snacks and fast food options that satisfy your hunger instantly. From classic chips and candies to ready-to-eat sandwiches and hot food, we have everything you need for a quick and delicious bite.',
        es: 'Perfecto para antojos rápidos o comidas sobre la marcha. Ofrecemos una amplia variedad de snacks y opciones de comida rápida que satisfacen tu hambre al instante. Desde clásicas papas y dulces hasta sándwiches listos para comer y comida caliente, tenemos todo lo que necesitas para un bocado rápido y delicioso.'
    },
    imagenes: ['snacks/snacks-1', 'snacks/snacks-2', 'snacks/snacks-3', 'snacks/snacks-4']
},
    'higiene': {
        titulo: {
            en: 'Hygiene and Personal Care',
            es: 'Higiene y Cuidado Personal'
        },
        descripcion: {
            en: 'Your well-being is our priority. We offer a complete range of personal hygiene and care products that take care of you and your family. Quality and trust in every product.',
            es: 'Tu bienestar es nuestra prioridad. Ofrecemos una gama completa de productos de higiene personal y cuidado que cuidan de ti y tu familia. Calidad y confianza en cada producto.'
        },
        imagenes: ['higiene/higiene-1', 'higiene/higiene-2', 'higiene/higiene-3', 'higiene/higiene-4']
    },
    'hogar': {
        titulo: {
            en: 'Home',
            es: 'Hogar'
        },
        descripcion: {
            en: 'Everything you need to make your home a comfortable and cozy space. From cleaning products to decoration, we have the essentials to keep your house impeccable.',
            es: 'Todo lo que necesitas para hacer de tu hogar un espacio cómodo y acogedor. Desde productos de limpieza hasta decoración, tenemos lo esencial para mantener tu casa impecable.'
        },
        imagenes: ['hogar/hogar-1', 'hogar/hogar-2', 'hogar/hogar-3', 'hogar/hogar-4']
    },
    'promociones': {
        titulo: {
            en: 'Promotions / Specials',
            es: 'Promociones / Ofertas'
        },
        descripcion: {
            en: 'Take advantage of our exclusive offers! At Familia Market we always have special promotions so you can save while enjoying quality products. Visit us frequently and discover new opportunities every week.',
            es: '¡Aprovecha nuestras ofertas exclusivas! En Familia Market siempre tenemos promociones especiales para que ahorres mientras disfrutas de productos de calidad. Visítanos frecuentemente y descubre nuevas oportunidades cada semana.'
        },
        imagenes: ['promociones/promociones-1', 'promociones/promociones-2', 'promociones/promociones-3', 'promociones/promociones-4']
    },
    'otros': {
        titulo: {
            en: 'Other Featured Products',
            es: 'Otros Productos Destacados'
        },
        descripcion: {
            en: 'Discover our special selection of unique and featured products. We are always incorporating novelties to surprise you and offer you more options for your daily life.',
            es: 'Descubre nuestra selección especial de productos únicos y destacados. Siempre estamos incorporando novedades para sorprenderte y ofrecerte más opciones para tu vida diaria.'
        },
        imagenes: ['otros/otros-1', 'otros/otros-2', 'otros/otros-3', 'otros/otros-4']
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

// ✅ FUNCIÓN MEJORADA PARA INICIALIZAR EL MAPA
function inicializarMapa() {
    // Si el mapa ya fue inicializado, no hacer nada
    if (mapaInicializado) {
        console.log('Mapa ya inicializado, saltando...');
        return;
    }

    const mapaContainer = document.getElementById('mapa-tiendas');

    if (!mapaContainer) {
        console.log('Contenedor del mapa no encontrado');
        return;
    }

    // ✅ LIMPIAR COMPLETAMENTE EL CONTENEDOR
    mapaContainer.innerHTML = '';
    
    // ✅ FORZAR VISIBILIDAD Y TAMAÑO
    mapaContainer.style.display = 'block';
    mapaContainer.style.visibility = 'visible';
    mapaContainer.style.height = '500px';
    mapaContainer.style.width = '100%';
    mapaContainer.style.position = 'relative';
    mapaContainer.style.overflow = 'hidden';
    mapaContainer.style.borderRadius = '20px';
    mapaContainer.style.backgroundColor = '#f8f9fa';

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
    lat: 25.79925,
    lng: -80.24017,
    direccion: '2412 NW 27th Ave, Miami, FL 33142',  // ✅ CORRECTA
    enlace: 'https://www.google.com/maps?q=25.79925,-80.24017'
        },
        {
    nombre: 'Familia Market - Opa-Locka',
    lat: 25.8670278,   // CORREGIDO: 25°52'01.3"N
    lng: -80.2421667,  // CORREGIDO: 80°14'31.8"W  
    direccion: '10139 NW 27th Ave, North Miami, FL 33147',
    enlace: 'https://www.google.com/maps?q=25.8670278,-80.2421667'
}

    ];

    try {
        // ✅ DELAY MÁS LARGO PARA GARANTIZAR RENDERIZADO
        setTimeout(() => {
            // ✅ VERIFICAR DIMENSIONES
            if (mapaContainer.offsetHeight === 0 || mapaContainer.offsetWidth === 0) {
                console.warn('Contenedor sin dimensiones válidas, forzando...');
                mapaContainer.style.height = '500px';
                mapaContainer.style.width = '100%';
                
                // Forzar reflow
                void mapaContainer.offsetHeight;
            }

            // ✅ INICIALIZAR MAPA CON CONFIGURACIÓN ROBUSTA
            const mapa = L.map('mapa-tiendas', {
                center: [25.7617, -80.1918],
                zoom: 10,
                zoomControl: true,
                scrollWheelZoom: true,
                dragging: true,
                tap: true,
                fadeAnimation: false,
                markerZoomAnimation: false,
                preferCanvas: true // Mejor rendimiento
            });

            // ✅ CAPA DE TILES CON MÚLTIPLES FALLBACKS
            const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 19,
                errorTileUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhjY2NjIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5NYXAgbm90IGF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=',
                crossOrigin: true
            }).addTo(mapa);

            // ✅ ICONO PERSONALIZADO MEJORADO
            const iconoGoogleRojo = L.divIcon({
                html: `<div style="background-color: #ea4335; width: 24px; height: 24px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3); position: relative; cursor: pointer;">
                         <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(45deg); width: 8px; height: 8px; background: white; border-radius: 50%;"></div>
                       </div>`,
                className: 'icono-google-maps',
                iconSize: [24, 24],
                iconAnchor: [12, 24],
                popupAnchor: [0, -24]
            });

            // ✅ AGREGAR MARCADORES
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

                // Abrir enlace al hacer clic
                marcador.on('click', function() {
                    window.open(tienda.enlace, '_blank');
                });
            });

            // ✅ FUNCIÓN MEJORADA DE REDIMENSIONADO
            const forceResizeMap = () => {
                setTimeout(() => {
                    try {
                        if (mapa && typeof mapa.invalidateSize === 'function') {
                            mapa.invalidateSize(true);
                            console.log('✅ Mapa redimensionado correctamente');
                        }
                    } catch (error) {
                        console.warn('⚠️ Error al redimensionar mapa:', error);
                    }
                }, 150);
            };

            // ✅ EJECUTAR MÚLTIPLES REDIMENSIONADOS ESTRATÉGICOS
            const resizeDelays = [100, 300, 500, 800, 1200, 2000];
            resizeDelays.forEach(delay => {
                setTimeout(forceResizeMap, delay);
            });

            // ✅ EVENTO DE REDIMENSIONADO DE VENTANA
            let resizeTimeout;
            window.addEventListener('resize', function() {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(forceResizeMap, 300);
            });

            // ✅ VERIFICAR CARGA COMPLETA
            mapa.whenReady(function() {
                console.log('✅ Mapa completamente cargado y listo');
                mapaInicializado = true;
                console.log('✅ Mapa marcado como inicializado');
                // Redimensionado final de seguridad
                setTimeout(forceResizeMap, 2500);
            });

            // ✅ MANEJAR ERRORES DE CARGA DE TILES
            mapa.on('tileerror', function(error) {
                console.warn('Error loading tile:', error);
            });

        }, 400); // Delay inicial aumentado

    } catch (error) {
        console.error('❌ Error crítico cargando mapa:', error);
        mostrarFallbackMapa(mapaContainer);
    }
}

// ✅ FUNCIÓN DE FALLBACK MEJORADA
function mostrarFallbackMapa(container) {
    container.innerHTML = `
        <div style="text-align: center; padding: 40px; color: #666; background: #f8f9fa; border-radius: 20px; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <div style="font-size: 3rem; margin-bottom: 15px;">🗺️</div>
            <h3 style="margin-bottom: 15px; color: #ed1c24;">Map Loading Issue</h3>
            <p>We're having trouble loading the interactive map.</p>
            <p style="margin-top: 10px;"><small>Our locations in Miami Gardens, Allapattah, and Opa-Locka</small></p>
            <button onclick="reiniciarMapaCompletamente()" style="margin-top: 20px; padding: 12px 24px; background: #ed1c24; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.3s;">
                Reload Map
            </button>
        </div>
    `;
}

// ✅ FUNCIÓN DE REINICIO COMPLETO
function reiniciarMapaCompletamente() {
    const mapaContainer = document.getElementById('mapa-tiendas');
    if (mapaContainer) {
        // Limpiar completamente
        mapaContainer.innerHTML = '';
        // Pequeño delay antes de reiniciar
        setTimeout(() => {
            inicializarMapa();
        }, 500);
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
        
        // ✅ INICIALIZAR MAPA CON ESTRATEGIA MEJORADA
        if (paginaId === 'mis-tiendas') {
            // Limpiar contenedor primero
            const mapaContainer = document.getElementById('mapa-tiendas');
            if (mapaContainer) {
                mapaContainer.innerHTML = '';
            }
            
            // Delay más largo para asegurar que la página esté completamente renderizada
            setTimeout(() => {
                inicializarMapa();
            }, 500);
            
            // Backup adicional
            setTimeout(() => {
                if (!document.querySelector('#mapa-tiendas .leaflet-container') || 
                    document.querySelector('#mapa-tiendas .leaflet-container').offsetHeight === 0) {
                    console.log('Backup map initialization triggered');
                    inicializarMapa();
                }
            }, 1500);
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
    
    const idioma = obtenerIdiomaActual();
    const textos = {
        back: idioma === 'es' ? '← Volver' : '← Back',
        everythingIn: idioma === 'es' ? 'Todo en' : 'Everything in',
        qualityQuote: idioma === 'es' ? 
            '"Calidad que notas, precios que agradeces"' : 
            '"Quality you notice, prices you appreciate"',
        whereToFind: idioma === 'es' ? '¿Dónde Encontrarnos?' : 'Where to Find Us?'
    };

    const html = `
        <section id="categoria-${categoriaId}" class="pagina activa">
            <div class="pagina-interna">
                <button class="btn-atras" onclick="volverAtras()">${textos.back}</button>
                <h1 class="titulo-pagina">${categoria.titulo[idioma]}</h1>
                <div class="grid-imagenes">
                    <div class="fila-completa">
                        <img src="images/categorias/${categoria.imagenes[0]}.webp" alt="${categoria.titulo[idioma]}" class="imagen-grande" width="1200" height="450" loading="lazy">
                    </div>
                    <div class="fila-mitad">
                        <img src="images/categorias/${categoria.imagenes[1]}.webp" alt="${categoria.titulo[idioma]}" class="imagen-pequena" width="800" height="350" loading="lazy">
                        <img src="images/categorias/${categoria.imagenes[2]}.webp" alt="${categoria.titulo[idioma]}" class="imagen-pequena" width="800" height="350" loading="lazy">
                    </div>
                    <div class="fila-completa">
                        <img src="images/categorias/${categoria.imagenes[3]}.webp" alt="${categoria.titulo[idioma]}" class="imagen-grande" width="1200" height="450" loading="lazy">
                    </div>
                </div>
                <div class="texto-categoria">
                    <h2>${textos.everythingIn} ${categoria.titulo[idioma]}</h2>
                    <p class="descripcion-categoria">${categoria.descripcion[idioma]}</p>
                    <p style="margin-top: 20px; font-style: italic; color: var(--color-texto-suave);">
                        ${textos.qualityQuote}
                    </p>
                    <button class="btn-donde-encontrarnos" onclick="mostrarPagina('mis-tiendas')">${textos.whereToFind}</button>
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