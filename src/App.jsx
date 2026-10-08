import React, { useState } from 'react';
import { 
  Car, Shield, CheckCircle2, BarChart3, 
  DollarSign, Users, AlertCircle, Plus, Send, Phone, 
  MapPin, Calendar, Compass, Key, Lock, LogOut, Check, 
  Clock, Mail, Award, Sparkles, Bot, Copy, RefreshCw, Lightbulb,
  CreditCard, Wallet, Building2, AlertTriangle, Truck, Bus, 
  Fuel, Gauge, Settings, Wind
} from 'lucide-react';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'login' | 'dashboard'
  const [dashboardTab, setDashboardTab] = useState('fleet'); // 'fleet' | 'marketing'
  const [fleetFilter, setFleetFilter] = useState('all'); // 'all' | 'camionetas' | 'buses' | 'camiones'
  
  // Auth Gerencial
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [authError, setAuthError] = useState('');

  // Cotizador Interactivo de Rent a Car
  const [selectedVehicleId, setSelectedVehicleId] = useState('hilux');
  const [rentalDays, setRentalDays] = useState(3);
  const [withDriver, setWithDriver] = useState(false);
  const [miningKit, setMiningKit] = useState(true);

  // Reserva Rápida
  const [booking, setBooking] = useState({
    name: '',
    phone: '',
    dniRuc: '',
    paymentMethod: 'Transferencia Bancaria (Factura BCP/BBVA)',
    vehicleName: 'Camioneta Toyota Hilux 4x4',
    pickupDate: '',
    returnDate: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // FLOTA OFICIAL COMPLETA DE VIP CAR HUANCAYO
  const vehiclesCatalog = [
    // CAMIONETAS Y SUVS
    {
      id: 'hilux',
      name: 'Camioneta Toyota Hilux 4x4',
      category: 'camionetas',
      seats: '5 asientos',
      transmission: 'Mecánico',
      traction: '4x4',
      ac: 'A/C',
      baseRate: 290,
      image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=800&q=80',
      description: 'Doble cabina homologada con estándar minero (jaula interna, pértiga y circulina).',
      tag: 'Más Solicitada'
    },
    {
      id: 'fortuner',
      name: 'Camioneta Toyota Fortuner 4x4',
      category: 'camionetas',
      seats: '7 asientos',
      transmission: 'Automático',
      traction: '4x4',
      ac: 'A/C',
      baseRate: 350,
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
      description: 'SUV de lujo para directores, supervisores y viajes familiares al Valle del Mantaro.',
      tag: 'Alta Gama'
    },
    {
      id: 'prado',
      name: 'Camioneta Land Cruiser Prado',
      category: 'camionetas',
      seats: '7 asientos',
      transmission: 'Mecánico',
      traction: '4x4',
      ac: 'A/C',
      baseRate: 380,
      image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80',
      description: 'Máximo confort y potencia todoterreno para viajes de larga distancia y trochas exigentes.',
      tag: 'Ejecutiva'
    },

    // BUSES Y VANS
    {
      id: 'hiace',
      name: 'Minivan Toyota Hiace',
      category: 'buses',
      seats: '17 pasajeros',
      transmission: 'Mecánico',
      traction: '4x2',
      ac: 'A/C',
      baseRate: 360,
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
      description: 'Traslado express al Aeropuerto de Jauja, Selva Central y comitivas institucionales.',
      tag: 'Traslados Aeropuerto'
    },
    {
      id: 'coaster',
      name: 'Minibús Toyota Coaster',
      category: 'buses',
      seats: '33 pasajeros',
      transmission: 'Mecánico',
      traction: '4x2',
      ac: 'A/C',
      baseRate: 550,
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80',
      description: 'Movilidad de cuadrillas de personal, delegaciones y turismo regional en Junín.',
      tag: 'Personal'
    },
    {
      id: 'omnibus',
      name: 'Ómnibus Interurbano',
      category: 'buses',
      seats: '42 y 46 Pasajeros',
      transmission: 'Mecánico',
      traction: '4x2',
      ac: 'A/C Climatizado',
      baseRate: 850,
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
      description: 'Transporte interprovincial Huancayo - Lima, eventos corporativos y viajes de gran escala.',
      tag: 'Gran Capacidad'
    },

    // CAMIONES DE OPERACIÓN Y CARGA
    {
      id: 'camion-personal',
      name: 'Camión para Traslado de Personal',
      category: 'camiones',
      seats: 'Personal Operativo',
      transmission: 'Mecánico',
      traction: '4x2',
      ac: 'A/C',
      baseRate: 480,
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
      description: 'Baranda alta acondicionada para cuadrillas de campo en sectores viales y agrícolas.',
      tag: 'Operativo'
    },
    {
      id: 'camion-materiales',
      name: 'Camión Transporte de Materiales (Furgón)',
      category: 'camiones',
      seats: '5 Toneladas',
      transmission: 'Mecánico',
      traction: '4x2',
      ac: 'A/C',
      baseRate: 520,
      image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80',
      description: 'Furgón cerrado de aluminio para encomiendas, logística segura y carga pesada protegida.',
      tag: 'Carga 5TN'
    },
    {
      id: 'camion-cisterna',
      name: 'Camión Cisterna (Agua / Combustible)',
      category: 'camiones',
      seats: 'Tanque Industrial',
      transmission: 'Mecánico',
      traction: '4x2 / 6x4',
      ac: 'A/C',
      baseRate: 750,
      image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80',
      description: 'Abastecimiento para proyectos de construcción, carreteras y campamentos en la sierra.',
      tag: 'Especializado'
    },
  ];

  // Dashboard Gerencial: Control de Flota
  const [rentals, setRentals] = useState([
    { id: 'VIP-701', client: 'Consorcio Vial Junín', vehicle: 'Toyota Hilux 4x4 (W4B-231)', days: 30, total: 9600, status: 'En Ruta', driver: 'Sin Chofer' },
    { id: 'VIP-702', client: 'Minera Chinalco Contratistas', vehicle: 'Camión Cisterna (W3C-911)', days: 20, total: 15000, status: 'En Ruta', driver: 'Con Chofer' },
    { id: 'VIP-703', client: 'Dra. Patricia Lozano', vehicle: 'Land Cruiser Prado (AGF-882)', days: 4, total: 1520, status: 'Disponible', driver: 'Sin Chofer' },
    { id: 'VIP-704', client: 'Colegio Andino (Excursión)', vehicle: 'Ómnibus Interurbano (B2C-109)', days: 3, total: 2550, status: 'En Ruta', driver: 'Con Chofer' },
    { id: 'VIP-705', client: 'Delegación Turismo Lima', vehicle: 'Toyota Hiace 17p (D4E-776)', days: 2, total: 720, status: 'Retorno Hoy', driver: 'Con Chofer' },
  ]);
  const [newRental, setNewRental] = useState({ client: '', vehicle: '', days: '', total: '', driver: 'Sin Chofer' });

  // MÓDULO MARKETING IA (GEMINI GEM)
  const [marketingPrompt, setMarketingPrompt] = useState('');
  const [marketingPlatform, setMarketingPlatform] = useState('tiktok');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const selectedVehicle = vehiclesCatalog.find(v => v.id === selectedVehicleId) || vehiclesCatalog[0];

  const calculateTotal = () => {
    let base = selectedVehicle.baseRate;
    if (miningKit && (selectedVehicle.category === 'camionetas' || selectedVehicle.category === 'camiones')) {
      base += 30; // Kit minero, pértiga, circulina
    }
    if (withDriver) {
      base += 130; // Chofer calificado
    }
    return base * rentalDays;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.email === 'gerencia@vipcarhuancayo.com' && credentials.password === 'vipcar2026') {
      setView('dashboard');
      setAuthError('');
    } else {
      setAuthError('Credenciales incorrectas. Verifique el correo corporativo y la contraseña.');
    }
  };

  const handleAddRental = (e) => {
    e.preventDefault();
    if (!newRental.client || !newRental.vehicle || !newRental.total) return;
    const item = {
      id: `VIP-${Math.floor(700 + Math.random() * 200)}`,
      client: newRental.client,
      vehicle: newRental.vehicle,
      days: parseInt(newRental.days) || 1,
      total: parseFloat(newRental.total),
      status: 'En Ruta',
      driver: newRental.driver
    };
    setRentals([item, ...rentals]);
    setNewRental({ client: '', vehicle: '', days: '', total: '', driver: 'Sin Chofer' });
  };

  const generateMarketingIdeas = (e) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      let title = '';
      let hook = '';
      let body = '';
      let cta = '';
      let tags = '';

      if (marketingPlatform === 'tiktok') {
        title = `🎬 Guion Viral para TikTok / Reels: ${marketingPrompt || 'Flota Completa VIP CAR Huancayo'}`;
        hook = `💥 [Segundo 0-3]: "¿Buscabas camioneta 4x4, Van de 17 pasajeros o camión cisterna en Huancayo para tu obra? ¡Mira lo que tenemos listo!"`;
        body = `🚗 [Segundo 4-15]: Muestra tomas rápidas de la Toyota Hilux, Fortuner, Prado, Minivan Hiace y Camión Cisterna. "En VIP CAR Huancayo no solo alquilamos camionetas; tenemos desde Coasters de 33 pasajeros hasta camiones de carga de 5 toneladas con equipamiento minero homologado."\n\n📍 [Segundo 16-25]: "Recuerda que todas las reservas se hacen con 24 a 48 horas de anticipación. Entregamos en Urb. La Merced o en el Aeropuerto de Jauja. Aceptamos facturas BCP/BBVA y tarjetas."`;
        cta = `👉 [Segundo 26-30]: "Toca el enlace de nuestro perfil o escribe al WhatsApp 999 461 414 para cotizar tu unidad."`;
        tags = `#Huancayo #AlquilerDeAutosHuancayo #ToyotaHilux #Fortuner #ToyotaHiace #CamionCisterna #VipCarHuancayo`;
      } else if (marketingPlatform === 'facebook') {
        title = `📢 Copy Publicitario para Facebook & Instagram Ads: Campaña B2B y Minería`;
        hook = `🚜 FLOTA PESADA, BUSES Y CAMIONETAS 4X4 PARA EMPRESAS Y CONTRATISTAS EN JUNÍN`;
        body = `¿Tu proyecto minero o vial en la sierra central necesita vehículos confiables?\n\nEn VIP CAR RENTAL HUANCAYO ponemos a tu disposición:\n• Toyota Hilux 4x4, Fortuner y Land Cruiser Prado con estándar minero (pértiga y jaula).\n• Vans Toyota Hiace (17p), Minibuses Coaster (33p) y Ómnibus (46p).\n• Camiones furgón cerrado de 5TN y Camiones Cisterna.\n\n✅ Monitoreo Satelital GPS 24/7 y Seguro Total.\n✅ Conductores con examen psicosensométrico y manejo defensivo.\n⚠️ Reserva tu unidad con mínimo 24 a 48 horas de anticipación para habilitación técnica.`;
        cta = `📲 ¡Cotiza hoy mismo al WhatsApp 999 461 414 o visita nuestras oficinas en Av. Manuel Traverso 597, Urb. La Merced!`;
        tags = `Segmentación recomendada: Huancayo, Concepción, Tarma, Chanchamayo, La Oroya, Pasco.`;
      } else if (marketingPlatform === 'whatsapp') {
        title = `💬 Mensaje Corporativo para WhatsApp Masivo: Catálogo Integral`;
        hook = `¡Estimados ingenieros y contratistas! 👋 Desde *VIP CAR Huancayo* les compartimos nuestra disponibilidad de flota 2026.`;
        body = `Contamos con unidades listas para entrega inmediata previa coordinación (margen 24-48h):\n\n🔹 *Camionetas 4x4:* Toyota Hilux, Fortuner y Prado.\n🔹 *Buses y Vans:* Toyota Hiace (17 asientos), Coaster (33 asientos) y Ómnibus Interurbano (46 asientos).\n🔹 *Transporte Pesado:* Camión furgón de 5 toneladas y Camión Cisterna para agua/combustible.\n\n💳 Facturación electrónica con RUC 20601590345 y transferencias BCP, BBVA, Yape y tarjetas de crédito.`;
        cta = `👉 Responda a este mensaje con la unidad que requiere para enviarle su cotización en PDF al instante. Central: *999 461 414*.`;
        tags = `Tip de envío: Dirigido a Jefes de Logística y Transportes.`;
      } else {
        title = `🏢 Licitación / Propuesta Formal B2B para Minería y Transporte Industrial`;
        hook = `Asunto: Propuesta Técnica y Económica de Renta de Flota Pesada y Liviana - VIP CAR EIRL`;
        body = `A la atención de la Gerencia de Operaciones y Logística:\n\nPresentamos formalmente nuestro portafolio de vehículos para faenas en Junín, Pasco y Huancavelica:\n\n1. LÍNEA CAMIONETAS: Toyota Hilux 4x4, Fortuner y Land Cruiser Prado certificadas para altura.\n2. LÍNEA TRANSPORTE DE PERSONAL: Vans Hiace (17p), Coaster (33p) y Buses Interurbanos de 46 pasajeros con cinturones de 3 puntos y botiquín reglamentario.\n3. LÍNEA LOGÍSTICA PESADA: Camiones de traslado de cuadrillas, furgones de 5TN y Camiones Cisterna homologados.\n\n*Condiciones Operativas:*\n- Plazo de reserva técnica: Mínimo 48 horas.\n- Formas de pago: Transferencias CCI corporativas con crédito a 15 y 30 días según calificación.`;
        cta = `Contacto institucional directo: 999 461 414 / reservas@vipcarhuancayo.com`;
        tags = `Adjuntar: Dossier fotográfico con Fichas Técnicas MTC.`;
      }

      setGeneratedResult({ title, hook, body, cta, tags });
      setIsGenerating(false);
      setCopied(false);
    }, 900);
  };

  const copyToClipboard = () => {
    if (!generatedResult) return;
    const fullText = `${generatedResult.title}\n\n${generatedResult.hook}\n\n${generatedResult.body}\n\n${generatedResult.cta}\n\n${generatedResult.tags}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredVehicles = fleetFilter === 'all' 
    ? vehiclesCatalog 
    : vehiclesCatalog.filter(v => v.category === fleetFilter);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      
      {/* BARRA SUPERIOR DE CONTACTO */}
      <div className="bg-red-700 text-white text-xs py-2 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-5 flex-wrap">
            <span className="flex items-center gap-1.5 font-medium"><Phone className="w-3.5 h-3.5" /> Central de Reservas: 999 461 414 / 982 083 835</span>
            <span className="hidden sm:flex items-center gap-1.5 font-medium"><MapPin className="w-3.5 h-3.5" /> Av. Manuel Traverso 597, Urb. La Merced - Huancayo</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-semibold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Lun - Dom: 9:00 AM - 9:00 PM
            </span>
          </div>
        </div>
      </div>

      {/* NAVBAR PRINCIPAL EN ROJO Y BLANCO */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-neutral-950/90 border-b border-red-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('landing')}>
            <div className="bg-red-600 p-2.5 rounded-xl border border-red-500 shadow-lg shadow-red-900/40 text-white">
              <Car className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-white">VIP CAR</span>
                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-white text-red-700">RENTAL</span>
              </div>
              <span className="text-[11px] block text-neutral-300 font-medium tracking-wide">
                Camionetas 4x4, Buses, Vans & Camiones Huancayo
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {view === 'dashboard' ? (
              <button
                onClick={() => setView('landing')}
                className="flex items-center gap-2 text-xs sm:text-sm bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 px-4 py-2 rounded-xl transition"
              >
                <LogOut className="w-4 h-4 text-red-500" /> Salir de Gerencia
              </button>
            ) : (
              <button
                onClick={() => setView('login')}
                className="flex items-center gap-2 text-xs sm:text-sm bg-neutral-900/90 border border-red-600/50 hover:border-red-500 hover:bg-red-600/10 text-white font-semibold px-4 py-2 rounded-xl transition shadow-sm"
              >
                <Lock className="w-3.5 h-3.5 text-red-500" /> Portal Gerencial
              </button>
            )}
          </div>
        </div>
      </header>

      {/* VISTA 1: LANDING PAGE */}
      {view === 'landing' && (
        <main className="flex-1">
          {/* HERO */}
          <section className="relative overflow-hidden py-16 lg:py-24 border-b border-red-950/60">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.22),transparent_65%)]" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-red-600/15 text-red-400 border border-red-600/30 mb-6">
                <Award className="w-4 h-4 text-white" /> Más de 10 Años de Trayectoria en Transporte Corporativo, Minero y Turístico
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
                Flota Completa de Camionetas 4x4, Buses y Camiones en <span className="text-red-500">Huancayo</span>
              </h1>
              
              <p className="mt-5 text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto">
                Alquiler de Toyota Hilux, Fortuner, Prado, Vans Hiace, Minibuses Coaster, Ómnibus de 46p y Camiones de carga con o sin conductor. Cobertura en toda la región Junín y la sierra central.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a
                  href="#flota"
                  className="bg-red-600 hover:bg-red-500 text-white font-black px-7 py-3.5 rounded-xl shadow-lg shadow-red-700/30 transition flex items-center gap-2"
                >
                  <Car className="w-4 h-4" /> Ver Flota y Especificaciones
                </a>
                <a
                  href="#cotizador"
                  className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-100 font-semibold px-7 py-3.5 rounded-xl transition flex items-center gap-2"
                >
                  <Key className="w-4 h-4" /> Cotizador en Línea
                </a>
              </div>

              {/* AVISO DE MARGEN DE ANTICIPACIÓN */}
              <div className="mt-10 max-w-3xl mx-auto bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-start sm:items-center gap-3.5 text-left">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="text-xs text-neutral-300">
                  <span className="font-bold text-amber-400 uppercase tracking-wide block mb-0.5">
                    Aviso Importante: Margen de Reserva Anticipada
                  </span>
                  Para garantizar la disponibilidad de la unidad, revisión técnica y desinfección completa, todo alquiler debe solicitarse con un <strong>margen mínimo de 24 a 48 horas de anticipación</strong>. Si requiere un vehículo de urgencia para el mismo día, comuníquese directamente a la central telefónica.
                </div>
              </div>

              {/* Estadísticas */}
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                <div className="bg-neutral-900/80 border border-neutral-800 p-4 rounded-2xl">
                  <div className="text-3xl font-black text-red-500">10+</div>
                  <div className="text-xs text-neutral-300 font-medium mt-1">Años de Experiencia</div>
                </div>
                <div className="bg-neutral-900/80 border border-neutral-800 p-4 rounded-2xl">
                  <div className="text-3xl font-black text-white">50+</div>
                  <div className="text-xs text-neutral-300 font-medium mt-1">Unidades en Flota</div>
                </div>
                <div className="bg-neutral-900/80 border border-neutral-800 p-4 rounded-2xl">
                  <div className="text-3xl font-black text-red-500">100%</div>
                  <div className="text-xs text-neutral-300 font-medium mt-1">Monitoreo GPS Activo</div>
                </div>
                <div className="bg-neutral-900/80 border border-neutral-800 p-4 rounded-2xl">
                  <div className="text-3xl font-black text-white">24/7</div>
                  <div className="text-xs text-neutral-300 font-medium mt-1">Auxilio y Asistencia</div>
                </div>
              </div>
            </div>
          </section>

          {/* CATÁLOGO DE FLOTA CON PESTAÑAS (FOTOS Y ESPECIFICACIONES) */}
          <section id="flota" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Catálogo Oficial VIP CAR Huancayo</span>
              <h2 className="text-3xl font-extrabold text-white mt-1">Nuestra Variedad de Vehículos</h2>
              <p className="text-neutral-400 text-sm mt-1">Elige la unidad según tus necesidades de transporte, obra o turismo.</p>
            </div>

            {/* Filtros de Categoría */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {[
                { id: 'all', label: 'Todos los Vehículos' },
                { id: 'camionetas', label: 'Camionetas 4x4 & SUVs' },
                { id: 'buses', label: 'Buses & Vans (Turismo / Personal)' },
                { id: 'camiones', label: 'Camiones & Cisternas' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setFleetFilter(btn.id)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition border ${
                    fleetFilter === btn.id
                      ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-700/30'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Grid de Vehículos */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVehicles.map((car) => (
                <div 
                  key={car.id} 
                  className="bg-neutral-900/80 border border-neutral-800 rounded-3xl overflow-hidden hover:border-red-600/60 transition group flex flex-col justify-between"
                >
                  <div>
                    {/* Imagen del vehículo */}
                    <div className="relative h-52 overflow-hidden bg-neutral-950">
                      <img 
                        src={car.image} 
                        alt={car.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                      <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-md">
                        {car.tag}
                      </span>
                    </div>

                    {/* Contenido de la tarjeta */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{car.name}</h3>
                      <p className="text-xs text-neutral-400 leading-relaxed mb-5">
                        {car.description}
                      </p>

                      {/* Especificaciones Técnicas (Igual que en la imagen de la web) */}
                      <div className="grid grid-cols-2 gap-3 py-3 border-y border-neutral-800 text-xs">
                        <div className="flex items-center gap-2 text-neutral-300">
                          <Users className="w-4 h-4 text-red-500" />
                          <span>{car.seats}</span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-300">
                          <Settings className="w-4 h-4 text-red-500" />
                          <span>{car.transmission}</span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-300">
                          <Gauge className="w-4 h-4 text-red-500" />
                          <span>{car.traction}</span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-300">
                          <Wind className="w-4 h-4 text-red-500" />
                          <span>{car.ac}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Botón de Cotizar */}
                  <div className="p-6 pt-0 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-neutral-400 block">Tarifa estimada:</span>
                      <span className="text-lg font-black text-white">Desde <strong className="text-red-500">S/ {car.baseRate}</strong>/día</span>
                    </div>
                    <a
                      href="#cotizador"
                      onClick={() => setSelectedVehicleId(car.id)}
                      className="bg-red-600/15 hover:bg-red-600 text-red-400 hover:text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-red-600/30 transition"
                    >
                      Seleccionar
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* MÉTODOS DE PAGO Y POLÍTICA DE GARANTÍAS */}
          <section id="pagos" className="py-16 bg-neutral-900/30 border-t border-neutral-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Transparencia y Seguridad</span>
                <h2 className="text-3xl font-extrabold text-white mt-1">Métodos de Pago Aceptados</h2>
                <p className="text-neutral-400 text-sm mt-1">Facilidades formales de pago para personas naturales y empresas.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-neutral-900/80 border border-neutral-800 p-6 rounded-3xl">
                  <div className="w-12 h-12 rounded-2xl bg-red-600/15 text-red-500 flex items-center justify-center mb-4">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Transferencias Bancarias & CCI</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                    Cuentas corrientes corporativas en <strong>BCP, BBVA e Interbank</strong> a nombre de <strong>Corporación VIP CAR E.I.R.L.</strong> Aceptamos pagos interbancarios y transferencias directas con Factura Electrónica.
                  </p>
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Ideal para Empresas y Minería
                  </span>
                </div>

                <div className="bg-neutral-900/80 border border-neutral-800 p-6 rounded-3xl">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-4">
                    <Wallet className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Yape & Plin</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                    Pagos y anticipos rápidos desde tu celular para traslados hacia el aeropuerto de Jauja o confirmación de reservas express. Disponible las 24 horas del día.
                  </p>
                  <span className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Confirmación Inmediata
                  </span>
                </div>

                <div className="bg-neutral-900/80 border border-neutral-800 p-6 rounded-3xl">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/15 text-blue-400 flex items-center justify-center mb-4">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Tarjetas de Crédito y Débito</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                    Aceptamos todas las tarjetas (<strong>Visa, Mastercard, American Express, Diners</strong>). Contamos con POS inalámbrico en oficina y generación de enlaces de pago seguros.
                  </p>
                  <span className="text-xs font-semibold text-blue-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Válido para Depósitos de Garantía
                  </span>
                </div>
              </div>

              <div className="mt-8 bg-neutral-900 border border-neutral-800 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-xs text-neutral-300">
                  <strong className="text-white block mb-0.5">🔒 Garantía de Alquiler Obligatoria:</strong>
                  Todo servicio sin chofer requiere un depósito de garantía temporal reembolsable (en efectivo, Yape o bloqueo en tarjeta de crédito), que se devuelve inmediatamente al retornar el vehículo en óptimas condiciones.
                </div>
                <div className="text-xs text-neutral-400 font-mono shrink-0 bg-neutral-950 px-3 py-1.5 rounded-lg border border-neutral-800">
                  RUC: 20601590345
                </div>
              </div>
            </div>
          </section>

          {/* COTIZADOR DINÁMICO */}
          <section id="cotizador" className="py-16 bg-neutral-900/50 border-y border-red-950/60">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <span className="text-red-500 text-xs font-bold tracking-widest uppercase">Calculadora de Tarifas</span>
                <h2 className="text-3xl font-extrabold text-white mt-1">Cotiza tu Renta en Minutos</h2>
                <p className="text-neutral-400 text-sm mt-1">Selecciona el tipo de unidad y requerimientos para tu viaje</p>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 p-6 sm:p-8 rounded-3xl shadow-xl">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-3">
                  1. Vehículo Seleccionado: <span className="text-white font-black">{selectedVehicle.name}</span>
                </label>
                
                {/* Selector rápido de vehículos de la flota */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
                  {vehiclesCatalog.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVehicleId(v.id)}
                      className={`p-3 rounded-xl text-left border transition ${
                        selectedVehicleId === v.id
                          ? 'bg-red-600/20 border-red-500 text-white'
                          : 'bg-neutral-950/40 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <div className="font-bold text-xs text-white truncate">{v.name}</div>
                      <div className="text-[10px] text-neutral-400">{v.seats} • {v.traction}</div>
                      <div className="text-xs font-black text-red-400 mt-1">S/ {v.baseRate}/día</div>
                    </button>
                  ))}
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                      2. Tiempo de Alquiler: <span className="text-red-500 font-bold">{rentalDays} días</span>
                    </label>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={rentalDays}
                    onChange={(e) => setRentalDays(parseInt(e.target.value))}
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                  <div className="flex justify-between text-xs text-neutral-500 mt-1">
                    <span>1 día</span>
                    <span>15 días</span>
                    <span>30 días (Mes completo)</span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  <div 
                    onClick={() => setWithDriver(!withDriver)}
                    className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition ${
                      withDriver ? 'bg-red-600/15 border-red-600' : 'bg-neutral-950/40 border-neutral-800'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-semibold text-white">Conductor Profesional Certificado</div>
                      <div className="text-xs text-neutral-400">+S/ 130 por jornada diaria</div>
                    </div>
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${withDriver ? 'bg-red-600 border-red-600 text-white' : 'border-neutral-700'}`}>
                      {withDriver && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  {(selectedVehicle.category === 'camionetas' || selectedVehicle.category === 'camiones') && (
                    <div 
                      onClick={() => setMiningKit(!miningKit)}
                      className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition ${
                        miningKit ? 'bg-red-600/15 border-red-600' : 'bg-neutral-950/40 border-neutral-800'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-semibold text-white">Kit Minero Completo (Pértiga, Jaula, Alarma)</div>
                        <div className="text-xs text-neutral-400">+S/ 30 por día</div>
                      </div>
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${miningKit ? 'bg-red-600 border-red-600 text-white' : 'border-neutral-700'}`}>
                        {miningKit && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-neutral-400 block">Total Estimado ({rentalDays} días):</span>
                    <span className="text-3xl font-black text-red-500">S/ {calculateTotal()}</span>
                  </div>
                  <a
                    href={`https://wa.me/51999461414?text=Hola%20VIP%20CAR%20Huancayo,%20deseo%20cotizar%20un(a)%20${encodeURIComponent(selectedVehicle.name)}%20por%20${rentalDays}%20d%C3%ADas.%20Total%20estimado:%20S/${calculateTotal()}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3.5 rounded-xl transition shadow-lg shadow-red-700/30"
                  >
                    <Send className="w-4 h-4" /> Solicitar por WhatsApp al 999 461 414
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* FORMULARIO DE RESERVA */}
          <section className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl shadow-xl">
              <div className="text-center mb-6">
                <Calendar className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <h2 className="text-2xl font-bold text-white">Reserva tu Vehículo o Flota</h2>
                <p className="text-neutral-400 text-sm">Oficina central en Urb. La Merced o entrega en el Aeropuerto de Jauja</p>
              </div>

              <div className="mb-6 p-3.5 rounded-xl bg-red-950/40 border border-red-800/40 text-xs text-neutral-300 flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-red-400 shrink-0" />
                <span>
                  <strong>Margen obligatorio:</strong> Por favor indique una fecha de salida con mínimo <strong>24 a 48 horas de anticipación</strong> para alistar la documentación y póliza.
                </span>
              </div>

              {bookingSuccess ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-2xl text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-white">¡Solicitud Registrada con Éxito!</h3>
                  <p className="text-neutral-300 text-sm mt-1">El equipo de VIP CAR Huancayo se comunicará contigo de inmediato para coordinar el pago y la entrega.</p>
                  <button
                    onClick={() => setBookingSuccess(false)}
                    className="mt-4 text-xs font-semibold text-red-400 hover:underline"
                  >
                    Hacer otra consulta
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setBookingSuccess(true);
                  }}
                  className="space-y-4"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-neutral-300 font-semibold block mb-1">Nombre Completo o Empresa</label>
                      <input
                        required
                        type="text"
                        placeholder="Ej. Consorcio Vial / Juan Pérez"
                        value={booking.name}
                        onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-500 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-neutral-300 font-semibold block mb-1">DNI o RUC</label>
                      <input
                        required
                        type="text"
                        placeholder="Ej. 20601590345"
                        value={booking.dniRuc}
                        onChange={(e) => setBooking({ ...booking, dniRuc: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-500 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-neutral-300 font-semibold block mb-1">Teléfono Móvil</label>
                      <input
                        required
                        type="tel"
                        placeholder="Ej. 999 461 414"
                        value={booking.phone}
                        onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-500 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-neutral-300 font-semibold block mb-1">Unidad de la Flota Deseada</label>
                      <select
                        value={booking.vehicleName}
                        onChange={(e) => setBooking({ ...booking, vehicleName: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-500 text-white"
                      >
                        {vehiclesCatalog.map((v) => (
                          <option key={v.id} value={v.name}>{v.name} ({v.seats})</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-neutral-300 font-semibold block mb-1">Modalidad de Pago Preferida</label>
                    <select
                      value={booking.paymentMethod}
                      onChange={(e) => setBooking({ ...booking, paymentMethod: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-500 text-white"
                    >
                      <option>Transferencia Bancaria BCP / BBVA (Con Factura)</option>
                      <option>Billetera Digital (Yape / Plin)</option>
                      <option>Tarjeta de Crédito / Débito (POS o Enlace)</option>
                      <option>Efectivo en Oficina Central Huancayo</option>
                    </select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-neutral-300 font-semibold block mb-1">Fecha de Salida / Recojo (Mín. 24h)</label>
                      <input
                        required
                        type="date"
                        value={booking.pickupDate}
                        onChange={(e) => setBooking({ ...booking, pickupDate: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-500 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-neutral-300 font-semibold block mb-1">Fecha de Devolución</label>
                      <input
                        required
                        type="date"
                        value={booking.returnDate}
                        onChange={(e) => setBooking({ ...booking, returnDate: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-500 text-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3.5 rounded-xl transition text-sm shadow-lg shadow-red-700/25 mt-4"
                  >
                    Confirmar Reserva con Anticipación
                  </button>
                </form>
              )}
            </div>
          </section>
        </main>
      )}

      {/* VISTA 2: ACCESO GERENCIAL */}
      {view === 'login' && (
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-neutral-900 border border-red-950 p-8 rounded-3xl shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-red-600/15 border border-red-600/30 rounded-2xl flex items-center justify-center text-red-500 mx-auto mb-3">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">Gerencia VIP CAR</h2>
              <p className="text-xs text-neutral-400 mt-1">Control de flota, liquidaciones y Marketing IA</p>
            </div>

            {authError && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded-xl mb-4 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">Usuario Corporativo</label>
                <input
                  type="email"
                  required
                  placeholder="gerencia@vipcarhuancayo.com"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-500 text-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">Clave de Seguridad</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-500 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl transition text-sm shadow-lg shadow-red-700/25"
              >
                Ingresar al Dashboard
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-neutral-800 text-center">
              <p className="text-xs text-neutral-400">Acceso de prueba: <span className="text-red-400">gerencia@vipcarhuancayo.com</span> / <span className="text-red-400">vipcar2026</span></p>
              <button
                onClick={() => setView('landing')}
                className="mt-3 text-xs text-neutral-400 hover:text-white transition underline block mx-auto"
              >
                ← Volver a la web principal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VISTA 3: DASHBOARD PRIVILEGIADO GERENCIAL */}
      {view === 'dashboard' && (
        <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-red-950 pb-6">
            <div>
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest">VIP CAR Huancayo • Base Operativa</span>
              <h1 className="text-3xl font-black text-white">Panel de Control Gerencial</h1>
            </div>
            
            <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 p-1.5 rounded-2xl">
              <button
                onClick={() => setDashboardTab('fleet')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                  dashboardTab === 'fleet' ? 'bg-red-600 text-white shadow-md' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Car className="w-4 h-4" /> Control de Flota
              </button>
              <button
                onClick={() => setDashboardTab('marketing')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                  dashboardTab === 'marketing' ? 'bg-red-600 text-white shadow-md' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-4 h-4" /> Marketing IA (Gemini Gem)
              </button>
            </div>
          </div>

          {/* SUB-VISTA A: CONTROL DE FLOTA */}
          {dashboardTab === 'fleet' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-neutral-400 font-medium">Facturación del Mes</span>
                    <div className="p-2 bg-red-600/15 text-red-500 rounded-lg"><DollarSign className="w-5 h-5" /></div>
                  </div>
                  <div className="text-2xl font-black text-white">S/ 68,400</div>
                  <span className="text-xs text-emerald-400 font-semibold">↑ +24.1% contratos mineros y pesados</span>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-neutral-400 font-medium">Flota en Ruta</span>
                    <div className="p-2 bg-red-600/15 text-red-500 rounded-lg"><Car className="w-5 h-5" /></div>
                  </div>
                  <div className="text-2xl font-black text-white">19 / 24</div>
                  <span className="text-xs text-red-400 font-semibold">79.1% tasa de ocupación</span>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-neutral-400 font-medium">Buses y Camiones Activos</span>
                    <div className="p-2 bg-neutral-800 text-white rounded-lg"><Truck className="w-5 h-5" /></div>
                  </div>
                  <div className="text-2xl font-black text-white">7 Unidades</div>
                  <span className="text-xs text-neutral-300 font-semibold">Cisternas y Coasters en ruta</span>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-neutral-400 font-medium">Garantías en Custodia</span>
                    <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg"><Shield className="w-5 h-5" /></div>
                  </div>
                  <div className="text-2xl font-black text-emerald-400">S/ 22,500</div>
                  <span className="text-xs text-neutral-400 font-semibold">Depósitos seguros retenidos</span>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-neutral-900/70 border border-neutral-800 rounded-3xl p-6">
                  <h2 className="text-lg font-bold text-white mb-4">Contratos y Alquileres en Marcha</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="text-xs text-neutral-400 uppercase border-b border-neutral-800">
                        <tr>
                          <th className="pb-3">Código</th>
                          <th className="pb-3">Cliente / Empresa</th>
                          <th className="pb-3">Vehículo Asignado</th>
                          <th className="pb-3">Chofer</th>
                          <th className="pb-3">Monto</th>
                          <th className="pb-3">Estado</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-800">
                        {rentals.map((r) => (
                          <tr key={r.id} className="hover:bg-neutral-800/40">
                            <td className="py-3.5 font-mono text-xs text-red-500 font-bold">{r.id}</td>
                            <td className="py-3.5">
                              <div className="font-semibold text-white">{r.client}</div>
                              <div className="text-xs text-neutral-400">{r.days} días de contrato</div>
                            </td>
                            <td className="py-3.5 text-xs text-neutral-300">{r.vehicle}</td>
                            <td className="py-3.5 text-xs text-neutral-400">{r.driver}</td>
                            <td className="py-3.5 font-bold text-white">S/ {r.total}</td>
                            <td className="py-3.5">
                              <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                                r.status === 'En Ruta' ? 'bg-red-600/15 text-red-400 border border-red-600/30' :
                                r.status === 'Disponible' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                'bg-neutral-800 text-neutral-300'
                              }`}>
                                {r.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-neutral-900/70 border border-neutral-800 rounded-3xl p-6 h-fit">
                  <div className="flex items-center gap-2 mb-4">
                    <Plus className="w-5 h-5 text-red-500" />
                    <h2 className="text-lg font-bold text-white">Nuevo Contrato de Renta</h2>
                  </div>

                  <form onSubmit={handleAddRental} className="space-y-3">
                    <div>
                      <label className="text-xs text-neutral-300 block mb-1">Cliente / Empresa</label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Minera Chinalco / Consorcio"
                        value={newRental.client}
                        onChange={(e) => setNewRental({ ...newRental, client: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-red-500 text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-neutral-300 block mb-1">Vehículo y Placa</label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Camión Cisterna (W3C-911)"
                        value={newRental.vehicle}
                        onChange={(e) => setNewRental({ ...newRental, vehicle: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-red-500 text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-neutral-300 block mb-1">Días</label>
                        <input
                          type="number"
                          required
                          placeholder="15"
                          value={newRental.days}
                          onChange={(e) => setNewRental({ ...newRental, days: e.target.value })}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-red-500 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-neutral-300 block mb-1">Total (S/.)</label>
                        <input
                          type="number"
                          required
                          placeholder="4500"
                          value={newRental.total}
                          onChange={(e) => setNewRental({ ...newRental, total: e.target.value })}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-red-500 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-neutral-300 block mb-1">Modalidad de Manejo</label>
                      <select
                        value={newRental.driver}
                        onChange={(e) => setNewRental({ ...newRental, driver: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-red-500 text-white"
                      >
                        <option>Sin Chofer</option>
                        <option>Con Chofer Certificado</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2.5 rounded-xl transition text-xs shadow-md mt-2"
                    >
                      Registrar Salida de Unidad
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* SUB-VISTA B: MARKETING IA */}
          {dashboardTab === 'marketing' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-red-950/70 via-neutral-900 to-neutral-900 border border-red-900/50 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-700/40">
                    <Bot className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-black text-white">VIP CAR Marketing Gem IA</h2>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-600/30 text-red-300 border border-red-500/40">
                        Camionetas, Buses y Camiones
                      </span>
                    </div>
                    <p className="text-xs text-neutral-300 mt-1">
                      Generador inteligente de contenidos, anuncios pagados y guiones virales para captar clientes en Junín.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setMarketingPrompt('Promocionar camionetas 4x4, buses Coaster y camiones para obras mineras');
                      setMarketingPlatform('facebook');
                    }}
                    className="text-xs bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Campaña Minera B2B
                  </button>
                  <button
                    onClick={() => {
                      setMarketingPrompt('Viajes de promoción y turismo en Minivans Hiace y Coaster');
                      setMarketingPlatform('tiktok');
                    }}
                    className="text-xs bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-red-400" /> TikTok Turismo Grupos
                  </button>
                </div>
              </div>

              <div className="grid lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 bg-neutral-900/80 border border-neutral-800 p-6 rounded-3xl">
                  <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-red-500" /> Configurar Idea de Marketing
                  </h3>

                  <form onSubmit={generateMarketingIdeas} className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-neutral-300 block mb-1.5">1. Plataforma de Destino</label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'tiktok', label: 'TikTok / Reels' },
                          { id: 'facebook', label: 'Facebook / IG Ads' },
                          { id: 'whatsapp', label: 'WhatsApp Clientes' },
                          { id: 'b2b', label: 'Propuesta Minería B2B' },
                        ].map((p) => (
                          <button
                            type="button"
                            key={p.id}
                            onClick={() => setMarketingPlatform(p.id)}
                            className={`py-2 px-3 rounded-xl text-xs font-semibold border transition text-left ${
                              marketingPlatform === p.id
                                ? 'bg-red-600/20 border-red-500 text-white font-bold'
                                : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                            }`}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                        2. ¿Qué idea o promoción tienes en mente?
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Ej. Promocionar la nueva flota de Coaster y camiones cisterna con reserva de 48h y facilidades de facturación..."
                        value={marketingPrompt}
                        onChange={(e) => setMarketingPrompt(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs focus:outline-none focus:border-red-500 text-white resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isGenerating}
                      className="w-full bg-red-600 hover:bg-red-500 disabled:bg-neutral-800 text-white font-bold py-3 rounded-xl transition text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-700/30"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" /> Procesando con IA...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" /> Generar Estrategia & Copys
                        </>
                      )}
                    </button>
                  </form>
                </div>

                <div className="lg:col-span-7 bg-neutral-900/80 border border-neutral-800 p-6 rounded-3xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Bot className="w-5 h-5 text-red-500" />
                        <span className="text-sm font-bold text-white">Resultado Generado por el Gem</span>
                      </div>
                      {generatedResult && (
                        <button
                          onClick={copyToClipboard}
                          className="flex items-center gap-1.5 text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-3 py-1.5 rounded-lg border border-neutral-700 transition"
                        >
                          {copied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" /> ¡Copiado al portapapeles!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-neutral-400" /> Copiar Todo
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    {generatedResult ? (
                      <div className="space-y-4 text-xs leading-relaxed text-neutral-200">
                        <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 font-bold text-white text-sm">
                          {generatedResult.title}
                        </div>

                        <div className="bg-red-950/20 border border-red-900/40 p-3.5 rounded-xl">
                          <span className="text-[10px] font-black uppercase tracking-wider text-red-400 block mb-1">
                            🎯 Gancho Inicial / Título de Impacto:
                          </span>
                          <p className="font-semibold text-white">{generatedResult.hook}</p>
                        </div>

                        <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 whitespace-pre-line">
                          <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block mb-1">
                            📝 Contenido Central / Guion:
                          </span>
                          {generatedResult.body}
                        </div>

                        <div className="bg-emerald-950/20 border border-emerald-900/40 p-3.5 rounded-xl">
                          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 block mb-1">
                            📲 Llamado a la Acción (CTA):
                          </span>
                          <p className="font-semibold text-emerald-200">{generatedResult.cta}</p>
                        </div>

                        <div className="text-[11px] text-neutral-400 italic">
                          💡 <span className="font-semibold text-neutral-300">Recomendación técnica:</span> {generatedResult.tags}
                        </div>
                      </div>
                    ) : (
                      <div className="h-64 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-neutral-800 rounded-2xl">
                        <Bot className="w-12 h-12 text-neutral-700 mb-3" />
                        <p className="text-sm font-bold text-neutral-400">El asistente está listo</p>
                        <p className="text-xs text-neutral-500 mt-1 max-w-sm">
                          Escribe una idea a la izquierda o selecciona uno de los botones rápidos para que la IA elabore un guion o campaña optimizada para VIP CAR.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-neutral-900 bg-neutral-950 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-wider">VIP CAR RENTAL HUANCAYO</span>
            <span className="text-xs text-neutral-500">| © 2026 Todos los derechos reservados</span>
          </div>
          <div className="flex flex-wrap items-center gap-5 text-xs text-neutral-400">
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-red-500" /> Av. Manuel Traverso 597, Urb. La Merced - Huancayo</span>
            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-red-500" /> reservas@vipcarhuancayo.com</span>
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-red-500" /> 999 461 414 / 982 083 835</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
