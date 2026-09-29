'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Compass, Menu, X, Sparkles, Map, Clock, ShieldCheck, Database } from 'lucide-react';
import GlobalSearchModal from './GlobalSearchModal';

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [exploreMenuOpen, setExploreMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'EXPLORE', href: '/#explore' },
    { label: 'MAP', href: '/map' },
    { label: 'TIMELINE', href: '/timeline' },
    { label: 'PEOPLES', href: '/peoples/edo' },
    { label: 'ARTEFACTS', href: '/#artefacts' },
    { label: 'GRAPH', href: '/graph' },
    { label: 'ADMIN', href: '/admin' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#0A0B0D]/80 backdrop-blur-md border-b border-[#2A2D36]/60 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

          {/* Logo & Brand */}
          <Link href="/" className="group flex flex-col">
            <span className="font-serif text-xl sm:text-2xl tracking-widest text-[#E8E3D9] group-hover:text-[#C85A17] transition-colors">
              NIGERIA
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-[#9CA3AF] uppercase -mt-1 group-hover:text-[#E8E3D9] transition-colors">
              THE LIVING ARCHIVE
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-xs font-medium tracking-[0.2em] transition-colors hover:text-[#C85A17] ${
                    isActive ? 'text-[#C85A17] border-b border-[#C85A17] pb-1' : 'text-[#9CA3AF]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-4 sm:space-x-6">

            {/* Explore Modes Dropdown */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setExploreMenuOpen(!exploreMenuOpen)}
                className="flex items-center space-x-2 text-xs tracking-wider text-[#9CA3AF] hover:text-[#E8E3D9] bg-[#121418] px-3 py-1.5 rounded border border-[#2A2D36] transition-all"
              >
                <Compass className="w-3.5 h-3.5 text-[#C85A17]" />
                <span>MODES</span>
              </button>

              {exploreMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#121418] border border-[#2A2D36] shadow-2xl rounded p-2 z-50 text-xs">
                  <div className="px-2 py-1 text-[10px] tracking-widest text-[#9CA3AF] border-b border-[#2A2D36] mb-1">
                    EXPLORE ARCHIVE BY
                  </div>
                  <Link
                    href="/map"
                    onClick={() => setExploreMenuOpen(false)}
                    className="flex items-center space-x-2 px-2 py-2 text-[#E8E3D9] hover:bg-[#181A20] rounded hover:text-[#C85A17]"
                  >
                    <Map className="w-3.5 h-3.5 text-[#C85A17]" />
                    <span>Geographic Atlas (Map)</span>
                  </Link>
                  <Link
                    href="/timeline"
                    onClick={() => setExploreMenuOpen(false)}
                    className="flex items-center space-x-2 px-2 py-2 text-[#E8E3D9] hover:bg-[#181A20] rounded hover:text-[#C85A17]"
                  >
                    <Clock className="w-3.5 h-3.5 text-[#C85A17]" />
                    <span>Chronological Timeline</span>
                  </Link>
                  <Link
                    href="/graph"
                    onClick={() => setExploreMenuOpen(false)}
                    className="flex items-center space-x-2 px-2 py-2 text-[#E8E3D9] hover:bg-[#181A20] rounded hover:text-[#C85A17]"
                  >
                    <Database className="w-3.5 h-3.5 text-[#C85A17]" />
                    <span>Knowledge Network Graph</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Ask AI CTA */}
            <Link
              href="/ask"
              className="hidden sm:flex items-center space-x-1.5 text-xs tracking-widest px-3 py-1.5 rounded bg-[#C85A17]/10 text-[#C85A17] border border-[#C85A17]/30 hover:bg-[#C85A17] hover:text-[#0A0B0D] transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>ASK ARCHIVE</span>
            </Link>

            {/* Search Trigger Button */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search Archive"
              className="p-2 text-[#9CA3AF] hover:text-[#E8E3D9] hover:bg-[#121418] rounded border border-transparent hover:border-[#2A2D36] transition-all"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#9CA3AF] hover:text-[#E8E3D9]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#0A0B0D]/95 pt-24 px-6 flex flex-col justify-between pb-12 lg:hidden animate-fadeIn">
          <div className="space-y-6">
            <p className="text-[10px] tracking-[0.3em] text-[#C85A17] uppercase">ARCHIVE NAVIGATION</p>
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-2xl tracking-wider text-[#E8E3D9] hover:text-[#C85A17]"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/ask"
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-2xl tracking-wider text-[#C85A17] flex items-center space-x-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>ASK THE ARCHIVE (AI)</span>
              </Link>
            </div>
          </div>

          <div className="border-t border-[#2A2D36] pt-6 flex flex-col space-y-3 text-xs text-[#9CA3AF]">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#C85A17]" />
              <span>Sourced & Verified African Cultural Heritage</span>
            </div>
            <p className="text-[10px] text-[#9CA3AF]/70">
              Nigeria — The Living Archive © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
