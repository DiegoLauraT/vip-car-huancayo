import React, { useState } from 'react';
import { 
  Car, Shield, CheckCircle2, ChevronRight, BarChart3, 
  DollarSign, Users, AlertCircle, Plus, Send, Phone, 
  MapPin, Calendar, Compass, Key, Lock, LogOut, Check, Sparkles
} from 'lucide-react';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'login' | 'dashboard'
  
  // Auth Gerencial
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [authError, setAuthError] = useState('');

  // Cotizador de Alquiler
  const [vehicleCategory, setVehicleCategory] = useState('4x4');
  const [rentalDays, setRentalDays] = useState(3);
  const [withDriver, setWithDriver] = useState(false);
  const [miningEquipment, setMiningEquipment] = useState(true);

  // Reserva Rápida
  const [booking, setBooking] = useState({
    name: '',
    phone: '',
    dniRuc: '',
    vehicleType: 'Camioneta 4x4 Hilux',
    pickupDate: '',
    returnDate: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Dashboard de Flota y Contratos
  const [rentals, setRentals] = useState([
    { id: 'REN-201', client: 'Consorcio Vial Junín', vehicle: 'Toyota Hilux 4x4 (W4B-231)', days: 15, total: 4200, status: 'Alquilado', driver: 'Con Chofer' },
    { id: 'REN-202', client: 'Ing. Marco Paredes', vehicle: 'Hyundai Tucson SUV (AGF-882)', days: 4, total: 960, status: 'Disponible', driver: 'Sin Chofer' },
    { id: 'REN-203', client: 'Minera Chinalco Contratistas', vehicle: 'Toyota Fortuner 4x4 (B2C-109)', days: 30, total: 9500, status: 'Alquilado', driver: 'Sin Chofer' },
    { id: 'REN-204', client: 'Familia Quispe (Turismo)', vehicle: 'Hyundai H1 Minivan (D4E-776)', days: 3, total: 1050, status: 'Retorno Hoy', driver: 'Con Chofer' },
  ]);

  const [newRental, setNewRental] = useState({ client: '', vehicle: '', days: '', total: '', driver: 'Sin Chofer' });

  // Precios base por día según categoría
  const baseRates = {
    'sedan': 160,     // Autos económicos / ejecutivos
    'suv': 240,       // Camionetas familiares SUV
    '4x4': 280,       // Camionetas Pick-up 4x4 mineras
    'van': 350,       // Minivans turísticas / personal
  };

  const calculateTotal = () => {
    let rate = baseRates[vehicleCategory] || 200;
    if (miningEquipment && vehicleCategory === '4x4') rate += 30; // Certificación y pértiga
    if (withDriver) rate += 120; // Chofer profesional certificado
    return rate * rentalDays;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.email === 'gerencia@vipcar.pe' && credentials.password === 'gerencia2026') {
      setView('dashboard');
      setAuthError('');
    } else {
      setAuthError('Credenciales inválidas. Ingrese correo y contraseña de gerencia.');
    }
  };

  const handleAddRental = (e) => {
    e.preventDefault();
    if (!newRental.client || !newRental.vehicle || !newRental.total) return;
    const item = {
      id: `REN-${Math.floor(100 + Math.random() * 900)}`,
      client: newRental.client,
      vehicle: newRental.vehicle,
      days: parseInt(newRental.days) || 1,
      total: parseFloat(newRental.total),
      status: 'Alquilado',
      driver: newRental.driver
    };
    setRentals([item, ...rentals]);
    setNewRental({ client: '', vehicle: '', days: '', total: '', driver: 'Sin Chofer' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/85 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('landing')}>
            <div className="bg-gradient-to-tr from-blue-700 via-blue-600 to-amber-500 p-2.5 rounded-xl shadow-lg shadow-blue-900/30 text-white">
              <Car className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-wider text-white">
                  VIP CAR
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-amber-500 text-slate-950">
                  RENT A CAR
                </span>
              </div>
              <span className="text-xs block text-blue-300/80 font-medium tracking-wider">Corporación Huancayo • Junín</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {view === 'dashboard' ? (
              <button
                onClick={() => setView('landing')}
                className="flex items-center gap-2 text-sm bg-slate-900 hover:bg-slate-800 text-blue-300 border border-blue-900/50 px-4 py-2 rounded-xl transition"
              >
                <LogOut className="w-4 h-4" /> Salir de Gerencia
              </button>
            ) : (
              <button
                onClick={() => setView('login')}
                className="flex items-center gap-2 text-xs sm:text-sm bg-slate-900/90 border border-amber-500/40 hover:border-amber-400 text-amber-400 font-semibold px-4 py-2 rounded-xl transition shadow-sm"
              >
                <Lock className="w-3.5 h-3.5" /> Portal Gerencial
              </button>
            )}
          </div>
        </div>
      </header>

      {/* VISTA 1: LANDING PAGE DE ALQUILER */}
      {view === 'landing' && (
        <main className="flex-1">
          {/* HERO */}
          <section className="relative overflow-hidden py-20 lg:py-28 border-b border-blue-950/60">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_-10%,rgba(37,99,235,0.2),rgba(255,255,255,0))]" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-6">
                <Key className="w-3.5 h-3.5 text-amber-400" /> Líderes en Renta de Vehículos en Huancayo y la Región Central
              </span>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
                Alquiler de Camionetas 4x4, SUVs y Autos con Seguridad Total
              </h1>
              <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
                Unidades modernas con o sin conductor. Equipadas con estándar minero y listas para faenas corporativas, viajes familiares o traslados ejecutivos en toda la sierra central.
              </p>
              
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a
                  href="#cotizador"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-amber-500/25 transition"
                >
                  Cotizar Alquiler Online
                </a>
                <a
                  href="#flota"
                  className="bg-slate-900 hover:bg-slate-800 border border-blue-900/60 text-blue-200 font-semibold px-7 py-3.5 rounded-xl transition"
                >
                  Ver Nuestra Flota
                </a>
              </div>

              {/* Badges de Confianza */}
              <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
                <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-xl flex items-center gap-3">
                  <Shield className="w-5 h-5 text-amber-400 shrink-0" />
                  <span className="text-xs text-slate-300 font-medium">Seguro SOAT e Interseguro Total</span>
                </div>
                <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-xl flex items-center gap-3">
                  <Compass className="w-5 h-5 text-blue-400 shrink-0" />
                  <span className="text-xs text-slate-300 font-medium">Monitoreo GPS 24 Horas</span>
                </div>
                <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-xl flex items-center gap-3">
                  <Key className="w-5 h-5 text-amber-400 shrink-0" />
                  <span className="text-xs text-slate-300 font-medium">Equipamiento Minero Homologado</span>
                </div>
                <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-xl flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-400 shrink-0" />
                  <span className="text-xs text-slate-300 font-medium">Conductores con Certificación</span>
                </div>
              </div>
            </div>
          </section>

          {/* FLOTA DE VEHICULOS */}
          <section id="flota" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Vehículos Modernos y Garantizados</span>
              <h2 className="text-3xl font-extrabold text-white mt-1">Nuestra Flota de Alquiler en Huancayo</h2>
              <p className="text-slate-400 text-sm mt-1">Mantenimiento preventivo al día y desinfección en cada entrega.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Tarjeta 1: Camionetas 4x4 */}
              <div className="bg-slate-900/70 border border-blue-900/30 p-6 rounded-3xl relative hover:border-amber-500/50 transition">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                  <Car className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Camionetas Pick-Up 4x4</h3>
                <p className="text-xs text-amber-400 font-medium mt-0.5">Toyota Hilux / Ford Ranger</p>
                <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                  Ideales para operaciones mineras, ingeniería y viajes de altura. Cuentan con doble tracción 4x4, pértiga, circulina, jaula interna y láminas de seguridad.
                </p>
                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Tarifa Diaria:</span>
                  <span className="text-lg font-black text-white">Desde <span className="text-amber-400">S/ 280</span></span>
                </div>
              </div>

              {/* Tarjeta 2: SUVs Familiares */}
              <div className="bg-slate-900/70 border border-blue-900/30 p-6 rounded-3xl relative hover:border-amber-500/50 transition">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Camionetas Cerradas SUV</h3>
                <p className="text-xs text-blue-400 font-medium mt-0.5">Hyundai Tucson / Toyota Fortuner</p>
                <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                  Espacio, confort y elegancia para turismo en el Valle del Mantaro, Selva Central o viajes de negocios entre Huancayo y Lima. 5 a 7 pasajeros.
                </p>
                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Tarifa Diaria:</span>
                  <span className="text-lg font-black text-white">Desde <span className="text-amber-400">S/ 240</span></span>
                </div>
              </div>

              {/* Tarjeta 3: Vans y Traslado */}
              <div className="bg-slate-900/70 border border-blue-900/30 p-6 rounded-3xl relative hover:border-amber-500/50 transition">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Vans de Personal y Turismo</h3>
                <p className="text-xs text-emerald-400 font-medium mt-0.5">Hyundai H1 / Renault Master</p>
                <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                  Traslado corporativo, delegaciones institucionales y servicio privado express al Aeropuerto Francisco Carlé de Jauja. Capacidad de 8 a 15 asientos.
                </p>
                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Tarifa Diaria:</span>
                  <span className="text-lg font-black text-white">Desde <span className="text-amber-400">S/ 350</span></span>
                </div>
              </div>
            </div>
          </section>

          {/* COTIZADOR DINÁMICO DE RENTA */}
          <section id="cotizador" className="py-16 bg-slate-900/40 border-y border-blue-950/60">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">Cotizador Instantáneo</span>
                <h2 className="text-3xl font-extrabold text-white mt-1">Calcula el Costo de tu Alquiler</h2>
                <p className="text-slate-400 text-sm mt-1">Personaliza el vehículo, los días y requerimientos adicionales</p>
              </div>

              <div className="bg-slate-900 border border-blue-900/40 p-6 sm:p-8 rounded-3xl shadow-xl">
                {/* 1. Categoría */}
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">1. Tipo de Vehículo</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {[
                    { id: '4x4', name: 'Pick-Up 4x4', desc: 'Toyota Hilux' },
                    { id: 'suv', name: 'SUV Cerrada', desc: 'Hyundai Tucson' },
                    { id: 'sedan', name: 'Auto Sedán', desc: 'Corolla / Yaris' },
                    { id: 'van', name: 'Minivan H1', desc: 'Grupos y Van' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setVehicleCategory(cat.id)}
                      className={`p-3.5 rounded-2xl text-left border transition ${
                        vehicleCategory === cat.id
                          ? 'bg-blue-600/20 border-amber-500 text-white'
                          : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-sm text-white">{cat.name}</div>
                      <div className="text-xs text-slate-400">{cat.desc}</div>
                      <div className="text-xs font-bold text-amber-400 mt-2">S/ {baseRates[cat.id]}/día</div>
                    </button>
                  ))}
                </div>

                {/* 2. Días de Alquiler */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">2. Duración de la Renta: <span className="text-amber-400 font-bold">{rentalDays} días</span></label>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={rentalDays}
                    onChange={(e) => setRentalDays(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>1 día</span>
                    <span>15 días</span>
                    <span>30 días (Mes completo)</span>
                  </div>
                </div>

                {/* 3. Opciones Adicionales */}
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  <div 
                    onClick={() => setWithDriver(!withDriver)}
                    className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition ${
                      withDriver ? 'bg-amber-500/10 border-amber-500' : 'bg-slate-950/40 border-slate-800'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-semibold text-white">Servicio con Conductor Profesional</div>
                      <div className="text-xs text-slate-400">+S/ 120 por jornada</div>
                    </div>
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${withDriver ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-slate-700'}`}>
                      {withDriver && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  {vehicleCategory === '4x4' && (
                    <div 
                      onClick={() => setMiningEquipment(!miningEquipment)}
                      className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition ${
                        miningEquipment ? 'bg-blue-600/15 border-blue-500' : 'bg-slate-950/40 border-slate-800'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-semibold text-white">Equipamiento Minero / Pértiga / Jaula</div>
                        <div className="text-xs text-slate-400">+S/ 30 por día</div>
                      </div>
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${miningEquipment ? 'bg-blue-500 border-blue-500 text-white' : 'border-slate-700'}`}>
                        {miningEquipment && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  )}
                </div>

                {/* Resumen Total y WhatsApp */}
                <div className="bg-slate-950 p-6 rounded-2xl border border-blue-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-slate-400 block">Presupuesto Estimado ({rentalDays} días):</span>
                    <span className="text-3xl font-black text-amber-400">S/ {calculateTotal()}</span>
                  </div>
                  <a
                    href={`https://wa.me/51999461414?text=Hola%20VIP%20CAR%20Huancayo,%20deseo%20alquilar%20un%20veh%C3%ADculo%20categor%C3%ADa%20${vehicleCategory}%20por%20${rentalDays}%20d%C3%ADas.%20Total%20estimado:%20S/${calculateTotal()}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold px-6 py-3.5 rounded-xl transition shadow-lg shadow-emerald-900/30"
                  >
                    <Send className="w-4 h-4" /> Solicitar por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* FORMULARIO DE RESERVA FORMAL */}
          <section className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-blue-900/40 p-8 rounded-3xl shadow-xl">
              <div className="text-center mb-8">
                <Calendar className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <h2 className="text-2xl font-bold text-white">Reserva tu Vehículo en Huancayo</h2>
                <p className="text-slate-400 text-sm">Entrega en oficina o directo en el Aeropuerto de Jauja</p>
              </div>

              {bookingSuccess ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-2xl text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-white">¡Solicitud de Reserva Registrada!</h3>
                  <p className="text-slate-300 text-sm mt-1">Un asesor de VIP CAR te llamará en breve para coordinar el contrato y la entrega de la llave.</p>
                  <button
                    onClick={() => setBookingSuccess(false)}
                    className="mt-4 text-xs font-semibold text-amber-400 hover:underline"
                  >
                    Registrar otra reserva
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
                      <label className="text-xs text-slate-300 font-semibold block mb-1">Nombre o Razón Social</label>
                      <input
                        required
                        type="text"
                        placeholder="Ej. Minera o Nombre personal"
                        value={booking.name}
                        onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-300 font-semibold block mb-1">DNI o RUC</label>
                      <input
                        required
                        type="text"
                        placeholder="Ej. 20601590345"
                        value={booking.dniRuc}
                        onChange={(e) => setBooking({ ...booking, dniRuc: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-slate-300 font-semibold block mb-1">Teléfono / WhatsApp</label>
                      <input
                        required
                        type="tel"
                        placeholder="Ej. 999 461 414"
                        value={booking.phone}
                        onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-300 font-semibold block mb-1">Tipo de Vehículo</label>
                      <select
                        value={booking.vehicleType}
                        onChange={(e) => setBooking({ ...booking, vehicleType: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400 text-white"
                      >
                        <option>Camioneta 4x4 Toyota Hilux</option>
                        <option>Camioneta SUV Familiar</option>
                        <option>Auto Sedán Ejecutivo</option>
                        <option>Minivan Hyundai H1</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-slate-300 font-semibold block mb-1">Fecha de Recojo</label>
                      <input
                        required
                        type="date"
                        value={booking.pickupDate}
                        onChange={(e) => setBooking({ ...booking, pickupDate: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-300 font-semibold block mb-1">Fecha de Retorno</label>
                      <input
                        required
                        type="date"
                        value={booking.returnDate}
                        onChange={(e) => setBooking({ ...booking, returnDate: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400 text-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3.5 rounded-xl transition text-sm shadow-lg shadow-amber-500/20 mt-4"
                  >
                    Confirmar Solicitud de Reserva
                  </button>
                </form>
              )}
            </div>
          </section>
        </main>
      )}

      {/* VISTA 2: LOGIN DE GERENCIA */}
      {view === 'login' && (
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-blue-900/40 p-8 rounded-3xl shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center text-amber-400 mx-auto mb-3">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">Panel de Gerencia VIP CAR</h2>
              <p className="text-xs text-slate-400 mt-1">Gestión privada de contratos, flota y cobranzas</p>
            </div>

            {authError && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded-xl mb-4 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Correo Corporativo</label>
                <input
                  type="email"
                  required
                  placeholder="gerencia@vipcar.pe"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400 text-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Contraseña de Seguridad</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl transition text-sm shadow-lg shadow-amber-500/20"
              >
                Ingresar al Dashboard
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-800 text-center">
              <p className="text-xs text-slate-500">Credenciales de acceso: <span className="text-slate-300">gerencia@vipcar.pe</span> / <span className="text-slate-300">gerencia2026</span></p>
              <button
                onClick={() => setView('landing')}
                className="mt-3 text-xs text-amber-400 hover:underline block mx-auto"
              >
                ← Volver a la página principal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VISTA 3: DASHBOARD PRIVILEGIADO GERENCIAL */}
      {view === 'dashboard' && (
        <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Header Gerencia */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-blue-900/40 pb-6">
            <div>
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Sede Central: Huancayo (Av. Manuel Traverso)</span>
              <h1 className="text-3xl font-black text-white">Panel de Control & Renta de Flota</h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                ● 18 Unidades Activas
              </span>
            </div>
          </div>

          {/* KPIS FINANCIEROS Y FLOTA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-slate-900/90 border border-blue-950 p-5 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-slate-400 font-medium">Facturación del Mes</span>
                <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg"><DollarSign className="w-5 h-5" /></div>
              </div>
              <div className="text-2xl font-black text-white">S/ 48,900</div>
              <span className="text-xs text-emerald-400 font-semibold">↑ +18.5% contratos corporativos</span>
            </div>

            <div className="bg-slate-900/90 border border-blue-950 p-5 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-slate-400 font-medium">Unidades en Ruta</span>
                <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg"><Car className="w-5 h-5" /></div>
              </div>
              <div className="text-2xl font-black text-white">14 / 18</div>
              <span className="text-xs text-amber-400 font-semibold">77% de ocupación de flota</span>
            </div>

            <div className="bg-slate-900/90 border border-blue-950 p-5 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-slate-400 font-medium">Promedio de Renta</span>
                <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg"><BarChart3 className="w-5 h-5" /></div>
              </div>
              <div className="text-2xl font-black text-white">8.4 Días</div>
              <span className="text-xs text-blue-400 font-semibold">Alquiler promedio por cliente</span>
            </div>

            <div className="bg-slate-900/90 border border-blue-950 p-5 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-slate-400 font-medium">Garantías en Custodia</span>
                <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg"><Shield className="w-5 h-5" /></div>
              </div>
              <div className="text-2xl font-black text-emerald-400">S/ 14,000</div>
              <span className="text-xs text-slate-400 font-semibold">Depósitos retenidos seguros</span>
            </div>
          </div>

          {/* TABLA DE CONTRATOS Y FORMULARIO */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-slate-900/70 border border-blue-900/30 rounded-3xl p-6">
              <h2 className="text-lg font-bold text-white mb-4">Contratos y Alquileres en Marcha</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-xs text-slate-400 uppercase border-b border-slate-800">
                    <tr>
                      <th className="pb-3">Código</th>
                      <th className="pb-3">Cliente / Empresa</th>
                      <th className="pb-3">Vehículo</th>
                      <th className="pb-3">Modalidad</th>
                      <th className="pb-3">Total</th>
                      <th className="pb-3">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {rentals.map((r) => (
                      <tr key={r.id} className="hover:bg-slate-800/30">
                        <td className="py-3.5 font-mono text-xs text-amber-400 font-bold">{r.id}</td>
                        <td className="py-3.5">
                          <div className="font-semibold text-white">{r.client}</div>
                          <div className="text-xs text-slate-400">{r.days} días de contrato</div>
                        </td>
                        <td className="py-3.5 text-xs text-slate-300">{r.vehicle}</td>
                        <td className="py-3.5 text-xs text-slate-400">{r.driver}</td>
                        <td className="py-3.5 font-bold text-white">S/ {r.total}</td>
                        <td className="py-3.5">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                            r.status === 'Alquilado' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                            r.status === 'Disponible' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            'bg-blue-500/10 text-blue-400 border border-blue-500/20'
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

            {/* Crear Contrato Rápido */}
            <div className="bg-slate-900/70 border border-blue-900/30 rounded-3xl p-6 h-fit">
              <div className="flex items-center gap-2 mb-4">
                <Plus className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg font-bold text-white">Nuevo Contrato de Renta</h2>
              </div>

              <form onSubmit={handleAddRental} className="space-y-3">
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Cliente / Empresa</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Consorcio Minero"
                    value={newRental.client}
                    onChange={(e) => setNewRental({ ...newRental, client: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-amber-400 text-white"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">Vehículo Asignado y Placa</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Toyota Hilux 4x4 (W1B-871)"
                    value={newRental.vehicle}
                    onChange={(e) => setNewRental({ ...newRental, vehicle: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-amber-400 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Días</label>
                    <input
                      type="number"
                      required
                      placeholder="7"
                      value={newRental.days}
                      onChange={(e) => setNewRental({ ...newRental, days: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-amber-400 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Total (S/.)</label>
                    <input
                      type="number"
                      required
                      placeholder="2100"
                      value={newRental.total}
                      onChange={(e) => setNewRental({ ...newRental, total: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-amber-400 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">Conductor</label>
                  <select
                    value={newRental.driver}
                    onChange={(e) => setNewRental({ ...newRental, driver: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-amber-400 text-white"
                  >
                    <option>Sin Chofer</option>
                    <option>Con Chofer Certificado</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2.5 rounded-xl transition text-xs shadow-md mt-2"
                >
                  Registrar Salida de Unidad
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-blue-950 bg-slate-950 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-wider">CORPORACIÓN VIP CAR E.I.R.L.</span>
            <span className="text-xs text-slate-500">| RUC 20601590345</span>
          </div>
          <div className="flex flex-wrap items-center gap-5 text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-amber-400" /> Av. Manuel Traverso 597, Urb. La Merced - Huancayo</span>
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-amber-400" /> 999 461 414 / 982 083 835</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
