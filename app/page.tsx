import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { SiteHeader } from "@/components/site-header";
import { MenuCatalog } from "@/features/menu/menu-catalog";

export default function Home() {
  return <main className="overflow-hidden bg-[#0c0c10] text-white"><SiteHeader /><Hero /><MenuCatalog /><Experience /><Contact /><footer className="border-t border-white/10 px-4 py-8 sm:px-6"><div className="mx-auto flex max-w-7xl flex-col gap-4 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between"><p>© 2026 Salchivolcánica · Mocoa, Putumayo</p><p>Precios sujetos a confirmación de disponibilidad.</p></div></footer></main>;
}
