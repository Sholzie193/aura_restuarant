import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ChefHat, Flame, Menu, MapPin, Phone, Instagram, ArrowRight } from 'lucide-react';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div className="bg-ink min-h-screen text-off-white selection:bg-gold selection:text-ink">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 mix-blend-difference text-white">
        <div className="flex items-center gap-12">
          <span className="font-serif text-3xl font-light tracking-widest uppercase">Aura</span>
          <div className="hidden md:flex gap-8 small-caps">
            <a href="#philosophy" className="hover:text-gold transition-colors">Philosophy</a>
            <a href="#menu" className="hover:text-gold transition-colors">The Cuts</a>
            <a href="#experience" className="hover:text-gold transition-colors">Experience</a>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <a href="#reservations" className="hidden sm:inline-block border border-white/30 rounded-full px-6 py-2 small-caps hover:bg-white hover:text-black transition-all duration-300">
            Reserve a Table
          </a>
          <button className="md:hidden">
            <Menu size={24} className="opacity-80" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-ink z-10" />
          {/* Steaming Steak / Fire background video */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            poster="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80"
            className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.1]"
          >
            <source src="https://videos.pexels.com/video-files/3206894/3206894-uhd_2560_1440_25fps.mp4" type="video/mp4" />
            <source src="https://player.vimeo.com/external/462193583.sd.mp4?s=d42a98f1fbd9cbf995388cbe073cda83ca0b2f51&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
          </video>
        </motion.div>

        <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="mb-6 flex items-center gap-4"
          >
            <span className="h-[1px] w-12 bg-gold"></span>
            <span className="small-caps text-gold">Three Michelin Stars</span>
            <span className="h-[1px] w-12 bg-gold"></span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: "easeOut", delay: 0.4 }}
            className="font-serif text-6xl sm:text-8xl md:text-9xl font-light leading-[0.85] tracking-tight mb-8"
          >
            The Art of <br /> <span className="italic luxury-text-gradient font-normal">Elevating</span> Meat.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="max-w-lg text-lg sm:text-xl font-light text-white/70"
          >
            A sensory journey through the world's most exclusive cuts, dry-aged to perfection and kissed by open fire.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
          className="absolute bottom-12 z-20 flex flex-col items-center gap-4 animate-bounce"
        >
          <span className="small-caps">Scroll to explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent"></div>
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="relative py-32 px-6 sm:px-12 md:px-24 max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-center">
        <div className="md:w-1/2 flex justify-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold/10 rounded-full blur-[80px]"></div>
          <img 
            src="https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80" 
            alt="Chef preparing premium steak" 
            className="w-full max-w-md aspect-[3/4] object-cover rounded-[32px] border border-white/5 shadow-2xl relative z-10 brightness-90"
          />
        </div>
        
        <div className="md:w-1/2 flex flex-col items-start">
          <div className="flex items-center gap-3 mb-6">
            <Flame className="text-gold" size={20} />
            <span className="small-caps text-gold">Our Philosophy</span>
          </div>
          
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] mb-8">
            Respect the <span className="italic text-gold">Source.</span><br />
            Master the <span className="italic text-gold">Fire.</span>
          </h2>
          
          <p className="text-white/60 text-lg leading-relaxed mb-6 font-light">
            We believe that true luxury lies in simplicity and uncompromising quality. Our beef is exclusively sourced from boutique ranches in Hokkaido, Kagoshima, and heritage farms across the globe.
          </p>
          <p className="text-white/60 text-lg leading-relaxed mb-10 font-light">
            Each cut undergoes a proprietary dry-aging process in our Himalayan salt chamber before being seared over binchotan charcoal and white oak, delivering an unparalleled depth of flavor.
          </p>

          <button className="flex items-center gap-4 text-sm font-medium uppercase tracking-[0.2em] group">
            <span className="group-hover:text-gold transition-colors">Discover Our Origins</span>
            <div className="w-10 h-[1px] bg-white group-hover:bg-gold group-hover:w-16 transition-all duration-300"></div>
          </button>
        </div>
      </section>

      {/* The Cuts / Menu Highlights */}
      <section id="menu" className="py-24 bg-ink-light relative border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <span className="small-caps text-gold block mb-4">Signature Selection</span>
              <h2 className="font-serif text-5xl sm:text-7xl font-light">
                The <span className="italic">Cuts</span>
              </h2>
            </div>
            <p className="max-w-sm text-white/50 text-sm md:text-base leading-relaxed">
              Curated daily by our Executive Chef. Availability is highly limited due to our strict aging and sourcing standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                title: "A5 Wagyu Ribeye",
                region: "Kagoshima, Japan",
                desc: "BMS 12+. Exceptionally rich, buttery texture that dissolves on the palate.",
                price: "$280",
                img: "https://images.unsplash.com/photo-1603360946369-dc902bf507f0?auto=format&fit=crop&q=80"
              },
              {
                title: "Dry-Aged Bone-In",
                region: "Tasmania, Australia",
                desc: "Aged 65 days in our salt cavern. Nutty, intense, and deeply savory.",
                price: "$195",
                img: "https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?auto=format&fit=crop&q=80"
              },
              {
                title: "Olive Wagyu Striploin",
                region: "Kagawa, Japan",
                desc: "The rarest steak in the world. Ethereal lightness with subtle olive notes.",
                price: "$420",
                img: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80"
              }
            ].map((cut, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="group cursor-pointer"
              >
                <div className="overflow-hidden mb-6 aspect-[4/5] oval-mask">
                  <img 
                    src={cut.img} 
                    alt={cut.title} 
                    className="w-full h-full object-cover filter brightness-[0.85] group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif text-2xl font-medium">{cut.title}</h3>
                  <span className="font-serif text-xl text-gold">{cut.price}</span>
                </div>
                <span className="small-caps block mb-3 text-white/40">{cut.region}</span>
                <p className="text-white/60 text-sm leading-relaxed">{cut.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 flex justify-center">
             <button className="border border-white/20 rounded-full px-8 py-4 small-caps hover:bg-white hover:text-black hover:border-white transition-all duration-300">
               View Full Menu
             </button>
          </div>
        </div>
      </section>

      {/* Ambiance/Immersive Detail */}
      <section className="py-32 relative overflow-hidden flex items-center justify-center min-h-[80vh]">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80" 
            alt="Restaurant Interior" 
            className="w-full h-full object-cover filter brightness-[0.3]"
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-ink via-transparent to-ink"></div>
        
        <div className="relative z-10 text-center max-w-4xl px-6">
          <ChefHat className="mx-auto text-gold mb-8 stroke-[1.5]" size={40} />
          <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl font-light leading-[1.1] mb-10">
            An Intimate Sanctuary for the <span className="italic luxury-text-gradient">Epicurean.</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 font-light max-w-2xl mx-auto">
            Dimly lit by amber accents, wrapped in dark oak, and soundscaped for absolute privacy. AURA presents an atmosphere as refined as the cuisine itself.
          </p>
        </div>
      </section>

      {/* Footer / Reservations */}
      <footer id="reservations" className="bg-ink pt-24 pb-12 px-6 sm:px-12 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24 border-b border-white/10 pb-24">
            
            {/* CTA */}
            <div className="lg:col-span-2">
              <h2 className="font-serif text-5xl md:text-6xl font-light mb-6">Reserve Your <br/><span className="italic text-gold">Table</span></h2>
              <p className="text-white/50 mb-8 max-w-md">Reservations open 30 days in advance. For private dining and parties of 6+, please contact us directly.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gold text-ink px-8 py-4 small-caps font-bold hover:bg-white hover:text-black transition-colors rounded-sm">
                  Find a Table
                </button>
                <button className="border border-white/20 px-8 py-4 small-caps hover:bg-white/5 transition-colors rounded-sm flex items-center justify-center gap-2 group">
                  Private Dining <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Contact */}
            <div>
              <span className="small-caps text-gold block mb-6">Contact</span>
              <ul className="space-y-4 text-white/70 font-light">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="mt-1 text-white/40" />
                  <span>100 Michelin Ave, Penthouse<br/>New York, NY 10012</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-white/40" />
                  <span>+1 (212) 555-0199</span>
                </li>
                <li className="flex items-center gap-3">
                  <Instagram size={18} className="text-white/40" />
                  <span>@aura.steak</span>
                </li>
              </ul>
            </div>

            {/* Hours */}
            <div>
              <span className="small-caps text-gold block mb-6">Hours</span>
              <ul className="space-y-4 text-white/70 font-light">
                <li>
                  <span className="block text-white/40 text-sm mb-1">Tuesday - Thursday</span>
                  Dinner: 5:30 PM - 10:30 PM
                </li>
                <li>
                  <span className="block text-white/40 text-sm mb-1">Friday - Saturday</span>
                  Dinner: 5:00 PM - 11:30 PM
                </li>
                <li>
                  <span className="block text-white/40 text-sm mb-1">Sunday - Monday</span>
                  Closed
                </li>
              </ul>
            </div>
            
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40 small-caps">
            <p>&copy; {new Date().getFullYear()} AURA STEAKHOUSE. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Press</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
