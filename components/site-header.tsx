"use client";
import { useState } from "react";
import { Flame, Menu, MessageCircle, X } from "lucide-react";

const links = [["Inicio", "#inicio"], ["Menú", "#menu"], ["Fuego + hielo", "#experiencia"], ["Contacto", "#contacto"]];
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-[#0c0c10]/80 backdrop-blur-xl">
    <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6">
      <a href="#inicio" className="flex items-center gap-2.5" aria-label="Salchivolcánica, inicio"><span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[#ff6b28] to-[#e53935] text-white shadow-[0_0_30px_rgba(255,74,30,.25)]"><Flame size={18} fill="currentColor" /></span><span className="font-display text-lg font-black uppercase tracking-tight text-white">Salchi<span className="text-[#ff6b28]">volcánica</span></span></a>
      <nav className="hidden items-center gap-7 md:flex" aria-label="Navegación principal">{links.map(([label, href]) => <a key={href} href={href} className="text-xs font-bold uppercase tracking-[0.12em] text-white/50 transition hover:text-white">{label}</a>)}</nav>
      <a href="https://wa.me/573142855753" target="_blank" rel="noreferrer" className="hidden min-h-11 items-center gap-2 rounded-full bg-white px-4 text-xs font-black uppercase tracking-[0.08em] text-black transition hover:bg-[#85e8ff] md:flex"><MessageCircle size={16} /> WhatsApp</a>
      <button onClick={() => setOpen(!open)} className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-white md:hidden" aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open}>{open ? <X size={20} /> : <Menu size={20} />}</button>
    </div>
    {open && <nav className="border-t border-white/10 bg-[#0c0c10] px-4 py-4 md:hidden" aria-label="Navegación móvil">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 text-sm font-bold text-white/75 hover:bg-white/5 hover:text-white">{label}</a>)}<a href="https://wa.me/573142855753" target="_blank" rel="noreferrer" className="mt-2 flex min-h-12 items-center justify-center gap-2 rounded-full bg-white text-sm font-black text-black"><MessageCircle size={17} /> Contactar</a></nav>}
  </header>;
}
