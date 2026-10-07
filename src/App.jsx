import React, { useState } from 'react';
import { 
  Car, Shield, Sparkles, Wrench, Calendar, Phone, 
  MapPin, Clock, Lock, LogOut, CheckCircle2, ChevronRight, 
  BarChart3, DollarSign, Users, AlertCircle, Plus, Send
} from 'lucide-react';

export default function App() {
  // Estado para alternar entre Landing Page y Dashboard Gerencial
  const [view, setView] = useState('landing'); // 'landing' | 'login' | 'dashboard'
  
  // Estados de Autenticación de Gerencia
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [authError, setAuthError] = useState('');

  // Estados del Cotizador
  const [carType, setCarType] = useState('sedan');
  const [selectedServices, setSelectedServices] = useState(['detailing']);

  // Estados del Formulario de Reserva
  const [booking, setBooking] = useState({ name: '', phone: '', plate: '', date: '', service: 'Detailing Integral' });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Datos en vivo del Dashboard de Taller / Gerencia
  const [orders, setOrders] = useState([
    { id: 'ORD-101', client: 'Carlos Ramos', car: 'Toyota Hilux (W4B-231)', service: 'Tratamiento Cerámico 9H', total: 1200, status: 'En Proceso' },
    { id: 'ORD-102', client: 'Mariana Flores', car: 'Hyundai Tucson (AGF-882)', service: 'Detailing Interior Pro', total: 350, status: 'Listo' },
    { id: 'ORD-103', client: 'Jorge Huamán', car: 'Kia Sportage (B2C-109)', service: 'Corrección de Pintura', total: 600, status: 'En Espera' },
    { id: 'ORD-104', client: 'David Rojas', car: 'Mazda CX-5 (D4E-776)', service: 'Lavado VIP + Motor', total: 180, status: 'En Proceso' },
  ]);

  const [newOrder, setNewOrder] = useState({ client: '', car: '', service: '', total: '' });

  // Manejador del Login
  const handleLogin = (e) => {
    e.preventDefault();
    // Credenciales para la demo gerencial
    if (credentials.email === 'gerencia@vipcar.pe' && credentials.password === 'gerencia2026') {
      setView('dashboard');
      setAuthError('');
    } else {
      setAuthError('Credenciales incorrectas. Verifique correo o clave.');
    }
  };

  // Cálculo del Cotizador en Vivo
  const prices = {
    sedan: { detailing: 350, ceramic: 950, paint: 500, undercoat: 250 },
    suv: { detailing: 450, ceramic: 1200, paint: 650, undercoat: 320 },
    pickup: { detailing: 520, ceramic: 1400, paint: 750, undercoat: 380 },
  };

  const calculateTotal = () => {
    return selectedServices.reduce((acc, curr) => acc + (prices[carType][curr] || 0), 0);
  };

  const toggleService = (srv) => {
    if (selectedServices.includes(srv)) {
      setSelectedServices(selectedServices.filter((s) => s !== srv));
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  // Enviar orden rápida en el Dashboard
  const handleAddOrder = (e) => {
    e.preventDefault();
    if (!newOrder.client || !newOrder.car || !newOrder.total) return;
    const item = {
      id: `ORD-${Math.floor(100 + Math.random() * 900)}`,
      client: newOrder.client,
      car: newOrder.car,
      service: newOrder.service || 'Servicio Integral',
      total: parseFloat(newOrder.total),
      status: 'En Proceso'
    };
    setOrders([item, ...orders]);
    setNewOrder({ client: '', car: '', service: '', total: '' });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      
      {/* NAVBAR GLOBAL */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('landing')}>
            <div className="bg-gradient-to-tr from-amber-600 to-amber-400 p-2.5 rounded-xl shadow-lg shadow-amber-500/20 text-zinc-950">
              <Car className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-amber-400 via-amber-200 to-white bg-clip-text text-transparent">
                VIP CAR
              </span>
              <span className="text-xs block text-zinc-400 font-semibold tracking-widest uppercase">Huancayo</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {view === 'dashboard' ? (
              <button
                onClick={() => setView('landing')}
                className="flex items-center gap-2 text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" /> Salir de Gerencia
              </button>
            ) : (
              <button
                onClick={() => setView('login')}
                className="flex items-center gap-2 text-xs sm:text-sm bg-zinc-900 border border-amber-500/30 hover:border-amber-400 text-amber-300 px-3.5 py-2 rounded-lg transition shadow-sm"
              >
                <Lock className="w-3.5 h-3.5" /> Acceso Gerencial
              </button>
            )}
          </div>
        </div>
      </header>

      {/* VISTA 1: LANDING PAGE */}
      {view === 'landing' && (
        <main className="flex-1">
          {/* HERO SECTION */}
          <section className="relative overflow-hidden py-20 lg:py-28 border-b border-zinc-900">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,119,6,0.15),rgba(255,255,255,0))]" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-6">
                <Sparkles className="w-3.5 h-3.5" /> Taller de Detailing & Estética Automotriz en Huancayo
              </span>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
                El máximo nivel de brillo, protección y cuidado para tu vehículo
              </h1>
              <p className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto">
                Especialistas certificados en recubrimiento cerámico, corrección de laca y restauración de interiores. Dale a tu auto el tratamiento VIP que se merece.
              </p>
              
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a
                  href="#cotizador"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-amber-500/25 transition"
                >
                  Cotizar mi Servicio
                </a>
                <a
                  href="#agendar"
                  className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-semibold px-7 py-3.5 rounded-xl transition"
                >
                  Agendar Cita
                </a>
              </div>
            </div>
          </section>

          {/* SERVICIOS DESTACADOS */}
          <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white">Nuestros Servicios Premium</h2>
              <p className="text-zinc-400 mt-2">Tecnología de punta y productos de estándar internacional en Junín.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-zinc-900/60 border border-zinc-800/80 p-6 rounded-2xl relative overflow-hidden group hover:border-amber-500/40 transition">
                <div className="bg-amber-500/10 w-12 h-12 rounded-xl flex items-center justify-center text-amber-400 mb-5">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Tratamiento Cerámico 9H</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  Escudo cerámico hidrofóbico de alta resistencia contra la radiación UV de altura de Huancayo, lluvia ácida y micro-rayones.
                </p>
                <span className="text-amber-400 text-sm font-semibold">Garantía de 1 a 3 años</span>
              </div>

              <div className="bg-zinc-900/60 border border-zinc-800/80 p-6 rounded-2xl relative overflow-hidden group hover:border-amber-500/40 transition">
                <div className="bg-amber-500/10 w-12 h-12 rounded-xl flex items-center justify-center text-amber-400 mb-5">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Detailing Interior Profundo</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  Desmontaje controlado de asientos, vaporizado desinfectante a 140°C, hidratación de cuero e inyección-extracción de alfombras.
                </p>
                <span className="text-amber-400 text-sm font-semibold">Eliminación de 99.9% de ácaros</span>
              </div>

              <div className="bg-zinc-900/60 border border-zinc-800/80 p-6 rounded-2xl relative overflow-hidden group hover:border-amber-500/40 transition">
                <div className="bg-amber-500/10 w-12 h-12 rounded-xl flex items-center justify-center text-amber-400 mb-5">
                  <Wrench className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Corrección de Pintura</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  Pulido técnico multi-paso para eliminar marcas circulares (swirls), opacidad y devolver el acabado espejo original.
                </p>
                <span className="text-amber-400 text-sm font-semibold">Recuperación de hasta 95% de brillo</span>
              </div>
            </div>
          </section>

          {/* COTIZADOR DINÁMICO */}
          <section id="cotizador" className="py-16 bg-zinc-900/40 border-y border-zinc-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <span className="text-amber-400 text-xs font-bold tracking-wider uppercase">Transparencia Total</span>
                <h2 className="text-3xl font-extrabold text-white mt-1">Calcula tu Presupuesto Estimado</h2>
                <p className="text-zinc-400 text-sm mt-1">Personaliza el servicio según el tamaño de tu vehículo</p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 p-6 sm:p-8 rounded-3xl shadow-xl">
                {/* Selector de Vehículo */}
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-3">1. Tipo de Vehículo</label>
                <div className="grid grid-cols-3 gap-3 mb-8">
                  {[
                    { id: 'sedan', label: 'Sedán / Hatchback' },
                    { id: 'suv', label: 'Camioneta SUV' },
                    { id: 'pickup', label: 'Pickup 4x4 / Van' },
                  ].map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setCarType(v.id)}
                      className={`py-3 px-2 rounded-xl text-xs sm:text-sm font-bold border transition ${
                        carType === v.id
                          ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                          : 'bg-zinc-800/40 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>

                {/* Selector de Servicios */}
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-3">2. Selecciona Servicios</label>
                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {[
                    { id: 'detailing', name: 'Detailing de Interiores', desc: 'Limpieza con vapor y nutrición' },
                    { id: 'ceramic', name: 'Tratamiento Cerámico 9H', desc: 'Máxima protección de pintura' },
                    { id: 'paint', name: 'Corrección de Pintura (Pulido)', desc: 'Eliminación de micro-rayones' },
                    { id: 'undercoat', name: 'Undercoating & Lavado de Chasis', desc: 'Protección anticorrosiva' },
                  ].map((srv) => (
                    <div
                      key={srv.id}
                      onClick={() => toggleService(srv.id)}
                      className={`p-4 rounded-xl border cursor-pointer flex justify-between items-center transition ${
                        selectedServices.includes(srv.id)
                          ? 'bg-amber-500/10 border-amber-500 text-zinc-100'
                          : 'bg-zinc-800/30 border-zinc-800/80 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-semibold">{srv.name}</div>
                        <div className="text-xs text-zinc-500">{srv.desc}</div>
                      </div>
                      <div className="text-right">
                        <span className="text-amber-400 font-bold text-sm">S/ {prices[carType][srv.id]}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total y WhatsApp */}
                <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-zinc-400 block">Presupuesto Estimado:</span>
                    <span className="text-3xl font-black text-amber-400">S/ {calculateTotal()}</span>
                  </div>
                  <a
                    href={`https://wa.me/51964000000?text=Hola%20VIP%20CAR%20Huancayo,%20deseo%20cotizar%20para%20un%20${carType}%20con%20total%20estimado%20de%20S/${calculateTotal()}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-xl transition shadow-lg shadow-emerald-900/30"
                  >
                    <Send className="w-4 h-4" /> Enviar Cotización por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* AGENDAR CITA */}
          <section id="agendar" className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 p-8 rounded-3xl">
              <div className="text-center mb-8">
                <Calendar className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <h2 className="text-2xl font-bold text-white">Reserva tu Turno en Taller</h2>
                <p className="text-zinc-400 text-sm">Cupos limitados por día para asegurar acabados minuciosos</p>
              </div>

              {bookingSuccess ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-2xl text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-white">¡Cita Registrada con Éxito!</h3>
                  <p className="text-zinc-400 text-sm mt-1">Nos comunicaremos al número brindado para confirmar la hora.</p>
                  <button
                    onClick={() => setBookingSuccess(false)}
                    className="mt-4 text-xs font-semibold text-amber-400 hover:underline"
                  >
                    Hacer otra reserva
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
                      <label className="text-xs text-zinc-400 font-semibold block mb-1">Nombre Completo</label>
                      <input
                        required
                        type="text"
                        placeholder="Ej. Roberto Sánchez"
                        value={booking.name}
                        onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-zinc-400 font-semibold block mb-1">Teléfono Móvil</label>
                      <input
                        required
                        type="tel"
                        placeholder="Ej. 964 123 456"
                        value={booking.phone}
                        onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-zinc-400 font-semibold block mb-1">Placa o Modelo</label>
                      <input
                        required
                        type="text"
                        placeholder="Ej. W1A-456 o Toyota Hilux"
                        value={booking.plate}
                        onChange={(e) => setBooking({ ...booking, plate: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-zinc-400 font-semibold block mb-1">Fecha Deseada</label>
                      <input
                        required
                        type="date"
                        value={booking.date}
                        onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 text-zinc-300"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold py-3.5 rounded-xl transition shadow-lg shadow-amber-500/20 text-sm mt-4"
                  >
                    Confirmar Solicitud de Cita
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
          <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center text-amber-400 mx-auto mb-3">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">Portal de Gerencia</h2>
              <p className="text-xs text-zinc-400 mt-1">Acceso restringido para administración y métricas</p>
            </div>

            {authError && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded-xl mb-4 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-zinc-400 block mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  placeholder="gerencia@vipcar.pe"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-400 block mb-1">Contraseña Privilegiada</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold py-3 rounded-xl transition text-sm shadow-lg shadow-amber-500/20"
              >
                Ingresar al Dashboard
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-zinc-800/80 text-center">
              <p className="text-xs text-zinc-500">Credenciales demo: <span className="text-zinc-400">gerencia@vipcar.pe</span> / <span className="text-zinc-400">gerencia2026</span></p>
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

      {/* VISTA 3: DASHBOARD GERENCIAL PRIVADO */}
      {view === 'dashboard' && (
        <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          
          {/* Header del Dashboard */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
            <div>
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Sede Huancayo - San Carlos / El Tambo</span>
              <h1 className="text-3xl font-black text-white">Panel de Control Gerencial</h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                ● Taller Operativo
              </span>
            </div>
          </div>

          {/* TARJETAS DE KPIS FINANCIEROS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-zinc-400 font-medium">Facturación del Mes</span>
                <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg"><DollarSign className="w-5 h-5" /></div>
              </div>
              <div className="text-2xl font-black text-white">S/ 24,850</div>
              <span className="text-xs text-emerald-400 font-semibold">↑ +14.2% vs mes anterior</span>
            </div>

            <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-zinc-400 font-medium">Autos Atendidos</span>
                <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg"><Car className="w-5 h-5" /></div>
              </div>
              <div className="text-2xl font-black text-white">42 Vehículos</div>
              <span className="text-xs text-zinc-400 font-semibold">Meta mensual: 50</span>
            </div>

            <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-zinc-400 font-medium">Ticket Promedio</span>
                <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg"><BarChart3 className="w-5 h-5" /></div>
              </div>
              <div className="text-2xl font-black text-white">S/ 591.60</div>
              <span className="text-xs text-emerald-400 font-semibold">Impulsado por cerámicos</span>
            </div>

            <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-zinc-400 font-medium">Margen Operativo</span>
                <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg"><Shield className="w-5 h-5" /></div>
              </div>
              <div className="text-2xl font-black text-emerald-400">62.8%</div>
              <span className="text-xs text-zinc-400 font-semibold">Rentabilidad neta</span>
            </div>
          </div>

          {/* GESTIÓN DE ÓRDENES EN TALLER */}
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Tabla de Órdenes */}
            <div className="lg:col-span-2 bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6">
              <h2 className="text-lg font-bold text-white mb-4">Órdenes de Trabajo en Curso</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-xs text-zinc-400 uppercase border-b border-zinc-800">
                    <tr>
                      <th className="pb-3">Código</th>
                      <th className="pb-3">Cliente / Auto</th>
                      <th className="pb-3">Servicio</th>
                      <th className="pb-3">Monto</th>
                      <th className="pb-3">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-zinc-800/30">
                        <td className="py-3.5 font-mono text-xs text-amber-400">{ord.id}</td>
                        <td className="py-3.5">
                          <div className="font-semibold text-white">{ord.client}</div>
                          <div className="text-xs text-zinc-400">{ord.car}</div>
                        </td>
                        <td className="py-3.5 text-xs text-zinc-300">{ord.service}</td>
                        <td className="py-3.5 font-bold text-zinc-100">S/ {ord.total}</td>
                        <td className="py-3.5">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                            ord.status === 'Listo' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            ord.status === 'En Proceso' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                            'bg-zinc-800 text-zinc-400'
                          }`}>
                            {ord.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Crear Nueva Orden */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 h-fit">
              <div className="flex items-center gap-2 mb-4">
                <Plus className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg font-bold text-white">Registrar Ingreso a Taller</h2>
              </div>

              <form onSubmit={handleAddOrder} className="space-y-3">
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Nombre del Propietario</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Juan Pérez"
                    value={newOrder.client}
                    onChange={(e) => setNewOrder({ ...newOrder, client: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Vehículo y Placa</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Toyota Fortuner (B3G-122)"
                    value={newOrder.car}
                    onChange={(e) => setNewOrder({ ...newOrder, car: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Servicio Contratado</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Cerámico 9H + Interior"
                    value={newOrder.service}
                    onChange={(e) => setNewOrder({ ...newOrder, service: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Total a Cobrar (S/.)</label>
                  <input
                    type="number"
                    required
                    placeholder="1200"
                    value={newOrder.total}
                    onChange={(e) => setNewOrder({ ...newOrder, total: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold py-2.5 rounded-xl transition text-xs shadow-md mt-2"
                >
                  Guardar Orden
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-wider">VIP CAR HUANCAYO</span>
            <span className="text-xs text-zinc-500">| Pasión por los Detalles</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-amber-500" /> Huancayo, Junín</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-amber-500" /> Lun - Sáb: 8:00 AM - 7:00 PM</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
