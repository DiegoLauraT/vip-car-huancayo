import React, { useState } from 'react';
import { 
  Car, Shield, CheckCircle2, BarChart3, 
  DollarSign, Users, AlertCircle, Plus, Send, Phone, 
  MapPin, Calendar, Compass, Key, Lock, LogOut, Check, 
  Clock, Mail, Award, Sparkles, Bot, Copy, RefreshCw, Lightbulb,
  CreditCard, Wallet, Building2, AlertTriangle
} from 'lucide-react';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'login' | 'dashboard'
  const [dashboardTab, setDashboardTab] = useState('fleet'); // 'fleet' | 'marketing'
  
  // Auth Gerencial
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [authError, setAuthError] = useState('');

  // Cotizador Interactivo de Rent a Car
  const [vehicleCategory, setVehicleCategory] = useState('4x4');
  const [rentalDays, setRentalDays] = useState(3);
  const [withDriver, setWithDriver] = useState(false);
  const [miningKit, setMiningKit] = useState(true);

  // Reserva Rápida
  const [booking, setBooking] = useState({
    name: '',
    phone: '',
    dniRuc: '',
    paymentMethod: 'Transferencia Bancaria (Factura)',
    serviceType: 'Alquiler de Camioneta 4x4 (Equipamiento Minero)',
    pickupDate: '',
    returnDate: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Dashboard Gerencial: Control de Flota
  const [rentals, setRentals] = useState([
    { id: 'VIP-701', client: 'Consorcio Minero Junín', vehicle: 'Toyota Hilux 4x4 (W4B-231)', days: 30, total: 9600, status: 'En Ruta', driver: 'Sin Chofer' },
    { id: 'VIP-702', client: 'Dra. Patricia Lozano', vehicle: 'Hyundai Tucson SUV (AGF-882)', days: 4, total: 1040, status: 'Disponible', driver: 'Sin Chofer' },
    { id: 'VIP-703', client: 'Minera Chinalco Contratistas', vehicle: 'Ford Ranger 4x4 (B2C-109)', days: 15, total: 5400, status: 'En Ruta', driver: 'Con Chofer' },
    { id: 'VIP-704', client: 'Delegación Turismo Lima', vehicle: 'Hyundai H1 Minivan (D4E-776)', days: 2, total: 800, status: 'Retorno Hoy', driver: 'Con Chofer' },
  ]);
  const [newRental, setNewRental] = useState({ client: '', vehicle: '', days: '', total: '', driver: 'Sin Chofer' });

  // MÓDULO MARKETING IA (GEMINI GEM DE MARKETING VIP CAR)
  const [marketingPrompt, setMarketingPrompt] = useState('');
  const [marketingPlatform, setMarketingPlatform] = useState('tiktok');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState(null);
  const [copied, setCopied] = useState(false);

  // Tarifas diarias promedio en Soles (S/.)
  const rates = {
    '4x4': 290,
    'suv': 240,
    'sedan': 160,
    'van': 360,
  };

  const calculateTotal = () => {
    let base = rates[vehicleCategory] || 250;
    if (miningKit && vehicleCategory === '4x4') base += 30;
    if (withDriver) base += 130;
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
        title = `🎬 Guion Viral para TikTok / Reels: ${marketingPrompt || 'Promoción de Flota VIP CAR'}`;
        hook = `💥 [Segundo 0-3]: "¿Planeas viajar a Selva Central o subir a obra este fin de semana y tu auto no aguanta la altura? ¡Mira esto!"`;
        body = `🚗 [Segundo 4-15]: Muestra tomas cinemáticas de una Toyota Hilux 4x4 o SUV cruzando Ticlio o la Carretera Central. "En VIP CAR Huancayo te entregamos camionetas listas con tanque lleno, monitoreo GPS 24/7 y seguro total. Recuerda reservar con 24h a 48h de anticipación para asegurar tu unidad impecable."\n\n📍 [Segundo 16-25]: "Aceptamos transferencias BCP, BBVA, Yape, Plin y tarjetas de crédito con factura electrónica."`;
        cta = `👉 [Segundo 26-30]: "Escríbenos al WhatsApp 999 461 414 o visita Av. Manuel Traverso 597 en Huancayo."`;
        tags = `#Huancayo #AlquilerDeAutosHuancayo #Hilux4x4 #JaujaAeropuerto #SelvaCentral #VipCarHuancayo`;
      } else if (marketingPlatform === 'facebook') {
        title = `📢 Copy Publicitario para Facebook & Instagram Ads: Campaña de Conversión`;
        hook = `🚙 ¿NECESITAS UNA CAMIONETA 4X4 O TRASLADO EJECUTIVO EN HUANCAYO SIN RIESGOS?`;
        body = `Para proyectos de ingeniería, minería o viajes familiares en la sierra central:\n\n✅ Toyota Hilux 4x4 homologadas para minería con pértiga y jaula.\n✅ SUVs familiares y Minivans H1.\n✅ Métodos de pago flexibles: Factura con transferencias BCP/BBVA, Yape/Plin y tarjetas de crédito.\n\n⚠️ IMPORTANTE: Reserva con mínimo 24 a 48 horas de anticipación para garantizar disponibilidad y preparación técnica.`;
        cta = `📲 ¡Haz clic en 'Enviar Mensaje' o comunícate al 999 461 414 para coordinar tu contrato!`;
        tags = `Objetivo sugerido: Clientes potenciales / WhatsApp | Radio: Huancayo + Valle del Mantaro`;
      } else if (marketingPlatform === 'whatsapp') {
        title = `💬 Plantilla de Difusión por WhatsApp: Recordatorio de Anticipación y Pagos`;
        hook = `¡Hola [Nombre del Cliente]! 👋 Desde *VIP CAR Huancayo* te saludamos.`;
        body = `Si estás programando salidas a mina, inspecciones o traslados hacia el Aeropuerto de Jauja para este fin de semana, te recomendamos coordinar tu reserva con *mínimo 24 a 48 horas de anticipación* 🕒.\n\nNuestras unidades se entregan con inspección mecánica y desinfección total.\n\n💳 Facilidades de pago: Transferencias BCP/BBVA, Yape, Plin y tarjetas de crédito/débito con factura electrónica formal.`;
        cta = `👉 ¿Te separamos una unidad? Responde a este chat o llámanos al *999 461 414*.`;
        tags = `Horario recomendado de difusión: 9:00 AM - 11:30 AM`;
      } else {
        title = `🏢 Propuesta Formal B2B para Minería y Contratistas (Email / Carta)`;
        hook = `Asunto: Alquiler de Camionetas 4x4 Homologadas en Junín - Condiciones Comerciales VIP CAR EIRL`;
        body = `Estimado(a) Responsable de Logística:\n\nPonemos a su disposición nuestras unidades Toyota Hilux 4x4 con equipamiento minero bajo norma DS 024-2016-EM.\n\nCondiciones de Servicio:\n• Margen de reserva: Solicitar asignación de unidades con un margen mínimo de 48 horas para habilitación técnica e inducción de conductores.\n• Métodos de pago corporativos: Transferencia interbancaria (CCI), cheques de gerencia y crédito a 15/30 días previa evaluación crediticia.\n• Emisión formal de Facturación Electrónica SUNAT (RUC 20601590345).`;
        cta = `Contacto comercial directo: 999 461 414 / reservas@vipcarhuancayo.com`;
        tags = `Adjuntar: Cotización formal PDF y póliza de seguro de la unidad.`;
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
                Alquiler de Vehículos & Taxi Huancayo - Jauja
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
                <Award className="w-4 h-4 text-white" /> Más de 10 Años de Trayectoria en Transporte Corporativo y Minero
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
                Alquiler de Camionetas 4x4, SUVs y Autos en <span className="text-red-500">Huancayo</span>
              </h1>
              
              <p className="mt-5 text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto">
                Flota moderna con o sin conductor para empresas, operaciones mineras y turismo familiar. Cobertura directa hacia Lima, Jauja Aeropuerto, Selva Central y toda la sierra central.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a
                  href="#cotizador"
                  className="bg-red-600 hover:bg-red-500 text-white font-black px-7 py-3.5 rounded-xl shadow-lg shadow-red-700/30 transition flex items-center gap-2"
                >
                  <Key className="w-4 h-4" /> Cotizar Alquiler Inmediato
                </a>
                <a
                  href="#pagos"
                  className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-100 font-semibold px-7 py-3.5 rounded-xl transition"
                >
                  Métodos de Pago
                </a>
              </div>

              {/* BANNER DE AVISO DE TIEMPO / MARGEN DE ANTICIPACIÓN */}
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

          {/* SERVICIOS */}
          <section id="servicios" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Lo que ofrecemos</span>
              <h2 className="text-3xl font-extrabold text-white mt-1">Servicios de Transporte & Alquiler</h2>
              <p className="text-neutral-400 text-sm mt-1">Soluciones integrales de movilidad en Huancayo y Junín.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-neutral-900/70 border border-neutral-800 p-6 rounded-3xl hover:border-red-600/60 transition">
                <div className="w-12 h-12 rounded-2xl bg-red-600/15 text-red-500 flex items-center justify-center mb-5">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Camionetas 4x4 (Estándar Minero)</h3>
                <p className="text-neutral-300 text-sm leading-relaxed mb-4">
                  Toyota Hilux doble cabina con pértiga, circulina, jaula interna antivuelco y toda la homologación exigida para ingresar a unidades mineras.
                </p>
                <div className="text-xs text-red-400 font-semibold">Alquiler con o sin conductor</div>
              </div>

              <div className="bg-neutral-900/70 border border-neutral-800 p-6 rounded-3xl hover:border-red-600/60 transition">
                <div className="w-12 h-12 rounded-2xl bg-red-600/15 text-red-500 flex items-center justify-center mb-5">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Taxi Privado Huancayo - Jauja Aeropuerto</h3>
                <p className="text-neutral-300 text-sm leading-relaxed mb-4">
                  Traslados directos y seguros hacia el Aeropuerto Francisco Carlé de Jauja. Conductores con amplia experiencia en ruta y servicio puntual.
                </p>
                <div className="text-xs text-red-400 font-semibold">Servicio puerta a puerta</div>
              </div>

              <div className="bg-neutral-900/70 border border-neutral-800 p-6 rounded-3xl hover:border-red-600/60 transition">
                <div className="w-12 h-12 rounded-2xl bg-red-600/15 text-red-500 flex items-center justify-center mb-5">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Transporte de Personal & Viajes Privados</h3>
                <p className="text-neutral-300 text-sm leading-relaxed mb-4">
                  Minivans Hyundai H1 y buses para personal y delegaciones hacia Lima, La Merced, Tarma, Oxapampa, Huancavelica y Ayacucho.
                </p>
                <div className="text-xs text-red-400 font-semibold">Capacidad de 6, 11, 16 y 20 asientos</div>
              </div>
            </div>
          </section>

          {/* NUEVA SECCIÓN: MÉTODOS DE PAGO Y POLÍTICA DE GARANTÍAS */}
          <section id="pagos" className="py-16 bg-neutral-900/30 border-t border-neutral-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Transparencia y Seguridad</span>
                <h2 className="text-3xl font-extrabold text-white mt-1">Métodos de Pago Aceptados</h2>
                <p className="text-neutral-400 text-sm mt-1">Facilidades formales de pago para personas naturales y empresas.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Método 1: Bancos y Transferencias */}
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

                {/* Método 2: Billeteras Digitales */}
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

                {/* Método 3: Tarjetas Débito y Crédito */}
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

              {/* Nota sobre la Garantía del Alquiler */}
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
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-3">1. Tipo de Vehículo</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {[
                    { id: '4x4', name: 'Pick-Up 4x4', desc: 'Toyota Hilux' },
                    { id: 'suv', name: 'SUV Cerrada', desc: 'Hyundai Tucson' },
                    { id: 'sedan', name: 'Auto Sedán', desc: 'Yaris / Corolla' },
                    { id: 'van', name: 'Minivan H1', desc: 'Grupos y Buses' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setVehicleCategory(cat.id)}
                      className={`p-3.5 rounded-2xl text-left border transition ${
                        vehicleCategory === cat.id
                          ? 'bg-red-600/15 border-red-600 text-white'
                          : 'bg-neutral-950/40 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <div className="font-bold text-sm text-white">{cat.name}</div>
                      <div className="text-xs text-neutral-400">{cat.desc}</div>
                      <div className="text-xs font-black text-red-400 mt-2">S/ {rates[cat.id]}/día</div>
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
                      <div className="text-sm font-semibold text-white">Conductor Profesional Capacitado</div>
                      <div className="text-xs text-neutral-400">+S/ 130 por día</div>
                    </div>
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${withDriver ? 'bg-red-600 border-red-600 text-white' : 'border-neutral-700'}`}>
                      {withDriver && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  {vehicleCategory === '4x4' && (
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
                    href={`https://wa.me/51999461414?text=Hola%20VIP%20CAR%20Huancayo,%20deseo%20cotizar%20un%20alquiler%20de%20veh%C3%ADculo%20${vehicleCategory}%20por%20${rentalDays}%20d%C3%ADas.%20Total%20estimado:%20S/${calculateTotal()}`}
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

          {/* FORMULARIO DE RESERVA CON POLÍTICA DE TIEMPO Y MÉTODOS DE PAGO */}
          <section className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl shadow-xl">
              <div className="text-center mb-6">
                <Calendar className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <h2 className="text-2xl font-bold text-white">Reserva tu Vehículo o Traslado</h2>
                <p className="text-neutral-400 text-sm">Oficina central en Urb. La Merced o entrega en el Aeropuerto de Jauja</p>
              </div>

              {/* Recordatorio de anticipación en el formulario */}
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
                      <label className="text-xs text-neutral-300 font-semibold block mb-1">Servicio Solicitado</label>
                      <select
                        value={booking.serviceType}
                        onChange={(e) => setBooking({ ...booking, serviceType: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-500 text-white"
                      >
                        <option>Alquiler de Camioneta 4x4 (Equipamiento Minero)</option>
                        <option>Alquiler de SUV Familiar</option>
                        <option>Alquiler de Auto Sedán</option>
                        <option>Taxi Privado Huancayo - Aeropuerto Jauja</option>
                        <option>Transporte de Personal en Minivan</option>
                      </select>
                    </div>
                  </div>

                  {/* Selector de Método de Pago Previsto */}
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

      {/* VISTA 3: DASHBOARD PRIVILEGIADO GERENCIAL CON MARKETING IA */}
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
                  <div className="text-2xl font-black text-white">S/ 48,900</div>
                  <span className="text-xs text-emerald-400 font-semibold">↑ +18.5% contratos mineros</span>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-neutral-400 font-medium">Flota en Ruta</span>
                    <div className="p-2 bg-red-600/15 text-red-500 rounded-lg"><Car className="w-5 h-5" /></div>
                  </div>
                  <div className="text-2xl font-black text-white">14 / 18</div>
                  <span className="text-xs text-red-400 font-semibold">77.7% tasa de ocupación</span>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-neutral-400 font-medium">Promedio de Renta</span>
                    <div className="p-2 bg-neutral-800 text-white rounded-lg"><BarChart3 className="w-5 h-5" /></div>
                  </div>
                  <div className="text-2xl font-black text-white">8.4 Días</div>
                  <span className="text-xs text-neutral-300 font-semibold">Duración media de contrato</span>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-neutral-400 font-medium">Garantías en Custodia</span>
                    <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg"><Shield className="w-5 h-5" /></div>
                  </div>
                  <div className="text-2xl font-black text-emerald-400">S/ 14,000</div>
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
                        placeholder="Ej. Consorcio Minero Junín"
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
                        placeholder="Ej. Toyota Hilux 4x4 (W1B-871)"
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
                          placeholder="7"
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
                          placeholder="2100"
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
                        Potenciado para Huancayo & Minería
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
                      setMarketingPrompt('Promocionar camionetas 4x4 para ingenieros y contratistas mineros con reserva de 48h');
                      setMarketingPlatform('facebook');
                    }}
                    className="text-xs bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Campaña Minera B2B
                  </button>
                  <button
                    onClick={() => {
                      setMarketingPrompt('Viajes de fin de semana al Valle del Mantaro y Selva Central con Yape y Tarjetas');
                      setMarketingPlatform('tiktok');
                    }}
                    className="text-xs bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-red-400" /> TikTok Turismo Selva
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
                        placeholder="Ej. Recordar a los clientes que reserven sus Hilux con 48h de anticipación y que aceptamos todas las tarjetas de crédito y facturación electrónica..."
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
