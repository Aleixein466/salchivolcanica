import Image from "next/image";
import { ArrowDown, Flame, MapPin, MessageCircle, Snowflake } from "lucide-react";
export function Hero() {
  return <section id="inicio" className="relative flex min-h-[820px] items-end overflow-hidden border-b border-white/10 pb-16 pt-32 sm:min-h-[880px] sm:items-center sm:pb-0">
    <Image src="/images/fire-ice-feast.png" alt="Composición gastronómica ilustrativa con salchipapa, fruta y bebida" fill priority sizes="100vw" className="object-cover object-[58%_center]" />
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,11,.96)_0%,rgba(8,8,11,.80)_36%,rgba(8,8,11,.25)_70%,rgba(8,8,11,.35)_100%)] max-sm:bg-[linear-gradient(180deg,rgba(8,8,11,.32)_0%,rgba(8,8,11,.6)_42%,rgba(8,8,11,.98)_78%)]" />
    <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#0c0c10] to-transparent" />
    <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6"><div className="max-w-2xl">
      <div className="mb-6 flex flex-wrap items-center gap-2"><span className="pill pill-fire"><Flame size={13} /> Antojos calientes</span><span className="text-white/30">+</span><span className="pill pill-ice"><Snowflake size={13} /> Heladería</span></div>
      <p className="eyebrow">Mocoa · Putumayo</p><h1 className="font-display mt-4 text-[clamp(4rem,10vw,8.2rem)] font-black uppercase leading-[.78] tracking-[-0.055em] text-white">Fuego<br /><span className="text-gradient">y hielo.</span></h1>
      <p className="mt-7 max-w-xl text-base leading-7 text-white/65 sm:text-lg">Salchipapas que rugen. Frutas que refrescan. Un menú hecho para elegir rápido y disfrutar sin complicaciones.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href="#menu" className="flex min-h-13 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-black uppercase tracking-[0.08em] text-black transition hover:bg-[#ffc247]">Explorar menú <ArrowDown size={17} /></a><a href="https://wa.me/573142855753" target="_blank" rel="noreferrer" className="flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/20 bg-black/20 px-6 text-sm font-black uppercase tracking-[0.08em] text-white backdrop-blur-md transition hover:border-white/50 hover:bg-white/10"><MessageCircle size={17} /> WhatsApp</a></div>
      <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-white/45"><MapPin size={15} className="text-[#85e8ff]" /> Mocoa, Putumayo · Disponibilidad sujeta a confirmación</div>
    </div></div><div className="absolute bottom-5 right-5 hidden rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-[10px] uppercase tracking-wider text-white/45 backdrop-blur sm:block">Imagen gastronómica ilustrativa</div>
  </section>;
}
