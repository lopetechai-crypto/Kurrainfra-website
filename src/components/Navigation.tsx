import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { KurraLogo } from './KurraLogo';

interface NavigationProps {
  onOpenEnquire: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenEnquire }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Amaris', href: '#welcome' },
    { label: 'Highlights', href: '#why-amaris' },
    { label: 'Experience', href: '#experience' },
    { label: 'Layouts', href: '#floor-plans' },
    { label: 'Location', href: '#location' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, label: string, href: string) => {
    e.preventDefault();
    setActiveTab(label);
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#08090a]/90 backdrop-blur-xl border-b border-white/10 py-4'
            : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent py-6'
        }`}
      >
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo - Avenir Next Thin Geometric Style */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, 'Home', '#hero')}
            className="flex items-center gap-4 group cursor-pointer"
          >
            <KurraLogo size="md" showText={false} />
            
            <div className="flex flex-col border-l border-white/20 pl-4">
              <span className="font-display text-xl md:text-2xl font-light tracking-[0.15em] text-[#f4f2ec] group-hover:text-[#c8a97e] transition-colors duration-300">
                AMARIS
              </span>
              <span className="font-sans text-[8px] tracking-[0.25em] text-[#a3a8b2] font-medium uppercase mt-0.5">
                BY KURRA INFRA
              </span>
            </div>
          </a>

          {/* Navigation Links - Manrope Medium 500 with 0.08em tracking */}
          <nav className="hidden lg:flex items-center gap-9">
            {navLinks.map((link) => {
              const isActive = activeTab === link.label;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.label, link.href)}
                  className={`font-sans text-xs tracking-[0.08em] uppercase font-medium transition-all relative py-1 ${
                    isActive ? 'text-[#f4f2ec]' : 'text-[#a3a8b2] hover:text-[#f4f2ec]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#c8a97e] rounded-full transition-all" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Rounded Pill Button */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={onOpenEnquire}
              className="btn-pill text-xs px-6 py-2.5 flex items-center gap-2 group font-sans font-medium"
            >
              <span>Enquire Now</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#c8a97e]" />
            </button>
          </div>

          {/* Mobile Drawer Trigger */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={onOpenEnquire}
              className="btn-pill text-[10px] px-4 py-2 font-sans uppercase tracking-widest"
            >
              Enquire
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#f4f2ec] hover:text-[#c8a97e] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-[#08090a]/98 backdrop-blur-2xl z-40 lg:hidden flex flex-col justify-center items-center transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="mb-8 flex flex-col items-center">
          <KurraLogo size="lg" showText={true} />
        </div>

        <nav className="flex flex-col items-center gap-7 text-center">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.label, link.href)}
              className="font-display text-3xl font-light tracking-wider text-[#f4f2ec] hover:text-[#c8a97e] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenEnquire();
            }}
            className="mt-4 btn-pill btn-pill-bronze text-xs px-8 py-3.5 font-sans"
          >
            Start Your Inquiry →
          </button>
        </nav>
      </div>
    </>
  );
};
