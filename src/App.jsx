import React, { useState, useEffect, useRef } from 'react';
import {
  Activity,
  MapPin,
  Phone,
  Clock,
  Calendar,
  ArrowRight,
  CheckCircle2,
  User,
  Stethoscope,
  HeartPulse,
  X,
  Menu
} from 'lucide-react';
import profileImg from './assets/dr-chhavi-chaudhary.avif';

// --- Configuration & Data ---

const SITE_DATA = {
  doctorName: "Dr. Chhavi Chaudhary",
  specialty: "Advanced Physiotherapy",
  hero: {
    badge: "Accepting New Patients in Meerut",
    title: "Restoring <span class='text-teal-600 font-semibold'>Movement.</span> Rebuilding <span class='text-slate-800 font-semibold'>Lives.</span>",
    description: "Expert physiotherapy care delivered with precision and deep compassion. Dr. Chhavi Chaudhary brings advanced rehabilitation protocols to two modern clinics in Meerut, guiding your journey back to a pain-free, active life."
  },
  stats: [
    { label: 'Years of Expertise', value: '10+' },
    { label: 'Convenient Locations', value: '2' },
    { label: 'Successful Recoveries', value: '5k+' },
    { label: 'Advanced Modalities', value: '15+' },
  ],
  expertise: {
    title: "Clinical Expertise",
    heading: "Comprehensive care for every stage of your recovery.",
    description: "Utilizing evidence-based protocols to diagnose, treat, and prevent a wide array of musculoskeletal and neurological conditions.",
    services: [
      { icon: <Activity size={28} />, title: "Orthopedic Rehab", desc: "Targeted therapy for joint pain, arthritis, and structural imbalances to restore optimal mechanics." },
      { icon: <User size={28} />, title: "Sports Injuries", desc: "Aggressive, safe rehabilitation protocols to get athletes back to peak performance rapidly." },
      { icon: <Stethoscope size={28} />, title: "Post-Surgical Care", desc: "Crucial early-stage mobilization and strengthening following orthopedic or neurological surgeries." },
      { icon: <HeartPulse size={28} />, title: "Neuro Rehabilitation", desc: "Specialized care for stroke, neuropathy, and movement disorders focusing on neuroplasticity." },
      { icon: <CheckCircle2 size={28} />, title: "Postural Correction", desc: "Ergonomic assessments and structural realignment to resolve chronic neck and back pain." },
      { icon: <Activity size={28} />, title: "Geriatric Care", desc: "Gentle conditioning focused on balance, fall prevention, and maintaining independence in older adults." },
    ]
  },
  clinics: [
    {
      id: "ganga-nagar",
      name: "Ganga Nagar Clinic",
      status: "Primary Facility",
      address: "Ganga Nagar, Meerut, Uttar Pradesh 250001",
      hours: "Mon - Sat: 9:00 AM - 2:00 PM",
      theme: "light"
    },
    {
      id: "subhash-nagar",
      name: "Subhash Nagar Clinic",
      status: "Shivaji Road",
      address: "Shivaji Road, Subhash Nagar, Meerut, Uttar Pradesh 250002",
      hours: "Mon - Sat: 4:00 PM - 8:00 PM",
      theme: "dark"
    }
  ]
};

// A wrapper component for scroll-reveal animations
const Reveal = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (isVisible) return 'translate-y-0 translate-x-0 scale-100';
    switch (direction) {
      case 'up': return 'translate-y-10';
      case 'right': return 'translate-x-10';
      case 'left': return '-translate-x-10';
      default: return 'translate-y-10';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 cubic-bezier(0.23, 1, 0.32, 1) ${isVisible ? 'opacity-100' : 'opacity-0'
        } ${getTransform()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-teal-200 selection:text-teal-900 overflow-x-hidden">

      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-teal-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-teal-600/20">
              <Activity size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-none">{SITE_DATA.doctorName}</h1>
              <span className="text-[10px] font-bold text-teal-600 tracking-[0.2em] uppercase">{SITE_DATA.specialty}</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {['Expertise', 'Clinics'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-teal-600 transition-colors"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-teal-600 transition-all"
            >
              Book Now
            </button>
          </div>

          <button className="md:hidden text-slate-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-30 bg-white transform transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'} md:hidden pt-32 px-6 flex flex-col gap-8`}>
        {['Expertise', 'Clinics'].map((item) => (
          <button
            key={item}
            onClick={() => scrollToSection(item.toLowerCase())}
            className="text-2xl font-bold uppercase tracking-widest text-slate-900 text-left"
          >
            {item}
          </button>
        ))}
        <button
          onClick={() => { setIsMobileMenuOpen(false); setIsBookingModalOpen(true); }}
          className="w-full py-5 bg-teal-600 text-white text-lg font-bold uppercase tracking-widest rounded-2xl shadow-xl shadow-teal-600/20 active:scale-95 transition-all mt-4"
        >
          Book Now
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-52 md:pb-40 overflow-hidden min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid md:grid-cols-12 gap-16 items-center">
          <div className="md:col-span-7">
            <Reveal delay={100}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-teal-100 text-teal-700 text-xs font-bold uppercase tracking-widest mb-8 shadow-sm">
                {SITE_DATA.hero.badge}
              </div>
            </Reveal>
            <Reveal delay={200}>
              <h1 className="text-5xl md:text-8xl font-light tracking-tight text-slate-900 leading-[1] mb-8" dangerouslySetInnerHTML={{ __html: SITE_DATA.hero.title }} />
            </Reveal>
            <Reveal delay={300}>
              <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl leading-relaxed font-light">{SITE_DATA.hero.description}</p>
            </Reveal>
            <Reveal delay={400} className="flex flex-col sm:flex-row gap-5">
              <button onClick={() => setIsBookingModalOpen(true)} className="w-full sm:w-auto px-10 py-5 bg-teal-600 text-white font-bold uppercase tracking-widest rounded-2xl hover:bg-teal-700 transition-all shadow-xl shadow-teal-600/20 active:scale-95">Start Recovery</button>
              <button onClick={() => scrollToSection('clinics')} className="w-full sm:w-auto px-10 py-5 bg-white text-slate-800 border-2 border-slate-100 font-bold uppercase tracking-widest rounded-2xl hover:border-teal-100 hover:bg-teal-50/30 transition-all active:scale-95">Our Clinics</button>
            </Reveal>
          </div>
          <div className="md:col-span-5 relative hidden md:block">
            <Reveal direction="left" delay={500}>
              <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-3xl shadow-slate-900/10 border-8 border-white bg-slate-200">
                <img src={profileImg} alt="Dr. Chhavi Chaudhary" className="w-full h-full object-cover" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {SITE_DATA.stats.map((stat, i) => (
            <Reveal key={i} delay={i * 100} className="space-y-2">
              <p className="text-5xl md:text-6xl font-light text-teal-400">{stat.value}</p>
              <p className="text-[10px] text-slate-400 font-bold tracking-[0.2em] uppercase">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <Reveal className="max-w-3xl mx-auto mb-20">
            <h2 className="text-xs font-bold tracking-[0.3em] text-teal-600 uppercase mb-4">{SITE_DATA.expertise.title}</h2>
            <h3 className="text-4xl md:text-6xl font-light text-slate-900 mb-8">{SITE_DATA.expertise.heading}</h3>
            <p className="text-slate-500 text-lg md:text-xl font-light">{SITE_DATA.expertise.description}</p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {SITE_DATA.expertise.services.map((service, index) => (
              <Reveal key={index} delay={100 * (index % 3)}>
                <div className="p-10 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all h-full">
                  <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-teal-600 mb-8 mx-auto">{service.icon}</div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h4>
                  <p className="text-slate-500 font-light leading-relaxed">{service.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Clinics Section */}
      <section id="clinics" className="py-32 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {SITE_DATA.clinics.map((clinic, i) => (
              <Reveal key={clinic.id} direction={i === 0 ? "right" : "left"} delay={i * 100}>
                <div className={`p-10 md:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden group h-full border ${clinic.theme === 'dark' ? 'bg-slate-900 text-white border-slate-800' : 'bg-white text-slate-900 border-slate-100'}`}>
                  <h4 className="text-3xl font-bold tracking-tight mb-2">{clinic.name}</h4>
                  <p className={`text-sm font-bold uppercase tracking-widest mb-10 ${clinic.theme === 'dark' ? 'text-teal-400' : 'text-teal-600'}`}>{clinic.status}</p>
                  <p className="text-lg font-light mb-6 opacity-80">{clinic.address}</p>
                  <p className="text-lg font-light mb-12 opacity-80">{clinic.hours}</p>
                  <button onClick={() => setIsBookingModalOpen(true)} className={`w-full py-5 rounded-2xl font-bold uppercase tracking-widest transition-all ${clinic.theme === 'dark' ? 'bg-teal-600 text-white hover:bg-teal-500' : 'bg-slate-900 text-white hover:bg-teal-600'}`}>Book Appointment</button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-500 py-24 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Activity className="text-teal-600" size={32} />
            <h2 className="text-2xl font-bold text-white tracking-tight">{SITE_DATA.doctorName}</h2>
          </div>
          <p className="font-light leading-relaxed mb-12 max-w-sm mx-auto">Redefining recovery in Meerut through evidence-based practice and a patient-first philosophy.</p>
          <p className="text-xs font-bold uppercase tracking-[0.2em]">&copy; {new Date().getFullYear()} {SITE_DATA.doctorName}. Advanced Rehabilitation Science</p>
        </div>
      </footer>

      {/* Booking Modal */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-700 px-4 ${isBookingModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xl" onClick={() => setIsBookingModalOpen(false)}></div>
        <div className={`relative w-full max-w-xl bg-white rounded-[3rem] shadow-3xl overflow-hidden transform transition-all duration-700 ${isBookingModalOpen ? 'scale-100' : 'scale-90 opacity-0'}`}>
          <div className="bg-slate-900 p-10 text-white text-center">
            <h3 className="text-3xl font-light mb-2">Request Appointment</h3>
            <p className="text-slate-400 font-light text-sm">Our team will confirm your slot shortly.</p>
          </div>
          <div className="p-8 md:p-10">
            <form className="space-y-6" onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const name = formData.get('name');
              const phone = formData.get('phone');

              // Format the WhatsApp message
              const message = `Hello Dr. Chhavi Chaudhary Clinic,\n\nI would like to request an appointment.\n\n*Name:* ${name}\n*Phone:* ${phone}\n\nPlease let me know the available slots. Thank you!`;

              // Replace with the actual clinic WhatsApp number (including country code, e.g., 91 for India)
              const clinicWhatsAppNumber = "919457888496"; // REPLACE WITH ACTUAL NUMBER

              // Create the WhatsApp link
              const whatsappUrl = `https://wa.me/${clinicWhatsAppNumber}?text=${encodeURIComponent(message)}`;

              // Open WhatsApp in a new tab
              window.open(whatsappUrl, '_blank');

              // Close the modal and reset the form
              setIsBookingModalOpen(false);
              e.target.reset();
            }}>
              <input name="name" required type="text" placeholder="FULL NAME" className="w-full border-b-2 border-slate-100 focus:border-teal-500 py-4 outline-none font-bold text-xs tracking-widest" />
              <input name="phone" required type="tel" placeholder="PHONE NUMBER" className="w-full border-b-2 border-slate-100 focus:border-teal-500 py-4 outline-none font-bold text-xs tracking-widest" />
              <button type="submit" className="w-full py-5 bg-teal-600 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-teal-700 transition-all shadow-xl shadow-teal-600/20">Confirm Slot</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
