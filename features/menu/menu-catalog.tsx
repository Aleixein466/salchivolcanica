"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Check, ChevronRight, Flame, Search, ShoppingBag, Snowflake, Sparkles, X } from "lucide-react";
import { useCart } from "@/features/cart/cart-context";
import { categoryLabels, formatCOP, type MenuProduct, products, productStartingPrice } from "@/lib/menu-data";

type FilterKey = keyof typeof categoryLabels;

function ProductVisual({ product, large = false }: { product: MenuProduct; large?: boolean }) {
  const isRealPhoto = Boolean(product.imageUrl);
  const position = product.zone === "fire" ? "18% center" : product.zone === "ice" ? "88% center" : "72% center";
  return <div className={`relative overflow-hidden ${large ? "h-64 sm:h-80" : "h-44"}`}>
    <Image src={product.imageUrl ?? "/images/fire-ice-feast.png"} alt={isRealPhoto ? `Foto real de ${product.name}` : "Composición gastronómica ilustrativa de la carta"} fill sizes={large ? "(max-width: 640px) 100vw, 720px" : "(max-width: 640px) 100vw, 33vw"} className="object-cover transition duration-700 group-hover:scale-105" style={{ objectPosition: isRealPhoto ? "center" : position }} />
    <div className={`absolute inset-0 ${product.zone === "fire" ? "bg-gradient-to-t from-[#160705] via-transparent to-[#ff5a1f]/10" : "bg-gradient-to-t from-[#04161d] via-transparent to-[#30d5ff]/10"}`} />
    <span className={`absolute bottom-3 left-3 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] backdrop-blur-md ${isRealPhoto ? "border-[#85e8ff]/40 bg-[#06151a]/75 text-[#b7f2ff]" : "border-white/15 bg-black/55 text-white/85"}`}>{isRealPhoto ? "Foto real" : "Imagen ilustrativa"}</span>
  </div>;
}

function ProductModal({ product, onClose }: { product: MenuProduct; onClose: () => void }) {
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0].name);
  const [added, setAdded] = useState(false);
  const currentVariant = product.variants.find((variant) => variant.name === selectedVariant) ?? product.variants[0];

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  const handleAdd = () => {
    addItem(product, selectedVariant);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  return <div className="fixed inset-0 z-[80] grid place-items-end bg-black/75 backdrop-blur-sm sm:place-items-center sm:p-6" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section role="dialog" aria-modal="true" aria-labelledby="product-title" className="max-h-[94vh] w-full overflow-y-auto rounded-t-[2rem] border border-white/10 bg-[#111115] shadow-2xl sm:max-w-2xl sm:rounded-[2rem]">
      <div className="group relative"><ProductVisual product={product} large /><button onClick={onClose} aria-label="Cerrar detalle" className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/65 text-white backdrop-blur-md transition hover:bg-white hover:text-black"><X size={20} /></button></div>
      <div className="p-6 sm:p-8">
        <div className="mb-3 flex flex-wrap items-center gap-2"><span className={`pill ${product.zone === "fire" ? "pill-fire" : "pill-ice"}`}>{product.category}</span>{product.featured && <span className="pill border-[#ffc247]/25 bg-[#ffc247]/10 text-[#ffd877]"><Sparkles size={12} /> Destacado</span>}</div>
        <h2 id="product-title" className="font-display text-4xl font-black uppercase leading-none tracking-tight text-white sm:text-5xl">{product.name}</h2>
        <p className="mt-4 text-base leading-7 text-white/65">{product.description}</p>
        {product.ingredients.length > 0 && <div className="mt-6"><h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">Lleva</h3><div className="mt-3 flex flex-wrap gap-2">{product.ingredients.map((ingredient) => <span key={ingredient} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/70">{ingredient}</span>)}</div></div>}
        <fieldset className="mt-7"><legend className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">{product.variants.length > 1 ? "Elige una presentación" : "Presentación"}</legend><div className="mt-3 overflow-hidden rounded-2xl border border-white/10">{product.variants.map((variant, index) => <label key={variant.name} className={`flex cursor-pointer items-center justify-between gap-4 px-4 py-3.5 transition hover:bg-white/5 ${index ? "border-t border-white/10" : ""}`}><span className="flex items-center gap-3"><input type="radio" name={`variant-${product.id}`} value={variant.name} checked={selectedVariant === variant.name} onChange={() => setSelectedVariant(variant.name)} className="h-4 w-4 accent-[#20bfe5]" /><span className="text-sm font-semibold text-white/70">{variant.name}</span></span><span className="text-base font-black text-white">{formatCOP(variant.priceCOP)}</span></label>)}</div></fieldset>
        <button onClick={handleAdd} className={`mt-6 flex min-h-14 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-black uppercase tracking-[0.08em] transition ${added ? "bg-[#25d366] text-[#04160b]" : "bg-white text-black hover:bg-[#85e8ff]"}`}>{added ? <><Check size={18} /> Agregado al carrito</> : <><ShoppingBag size={18} /> Agregar · {formatCOP(currentVariant.priceCOP)}</>}</button>
        <p className="mt-3 text-center text-[11px] leading-5 text-white/35">Puedes seguir agregando productos y enviar todo junto por WhatsApp.</p>
      </div>
    </section>
  </div>;
}

export function MenuCatalog() {
  const [filter, setFilter] = useState<FilterKey>("todos");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<MenuProduct | null>(null);
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("es");
    return products.filter((product) => {
      const matchesFilter = filter === "todos" || product.section === filter;
      const haystack = `${product.name} ${product.category} ${product.description} ${product.ingredients.join(" ")}`.toLocaleLowerCase("es");
      return matchesFilter && (!normalized || haystack.includes(normalized));
    }).sort((a, b) => Number(Boolean(b.imageUrl)) - Number(Boolean(a.imageUrl)));
  }, [filter, query]);

  const visible = showAll || query ? filtered : filtered.slice(0, 12);
  const selectFilter = (key: FilterKey) => { setFilter(key); setShowAll(false); };

  return <section id="menu" className="relative scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28"><div className="mx-auto max-w-7xl">
    <div className="grid gap-7 lg:grid-cols-[1fr_0.75fr] lg:items-end"><div><p className="eyebrow">Carta completa</p><h2 className="section-title mt-4">El antojo que buscas,<br /><span className="text-gradient">sin dar vueltas.</span></h2></div><p className="max-w-xl text-sm leading-7 text-white/55 lg:justify-self-end lg:text-base">Elige la presentación, agrega varios productos al carrito y envía un solo resumen por WhatsApp.</p></div>
    <div className="mt-10 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-3 backdrop-blur-sm sm:p-4"><label className="relative block"><Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={19} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busca salchipapas, mango, chamoy…" className="h-13 w-full rounded-2xl border border-white/10 bg-[#0b0b0e] pl-12 pr-11 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#85e8ff]/60 focus:ring-4 focus:ring-[#20bfe5]/10" />{query && <button onClick={() => setQuery("")} aria-label="Limpiar búsqueda" className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-white/50 hover:bg-white/10 hover:text-white"><X size={16} /></button>}</label><div className="scrollbar-none mt-3 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filtrar menú">{(Object.entries(categoryLabels) as [FilterKey, string][]).map(([key, label]) => <button key={key} onClick={() => selectFilter(key)} className={`min-h-11 shrink-0 rounded-full px-4 text-xs font-bold transition sm:text-sm ${filter === key ? "bg-white text-black" : "border border-white/10 bg-white/[0.03] text-white/55 hover:border-white/20 hover:text-white"}`}>{label}</button>)}</div></div>
    <div className="mt-5 flex items-center justify-between text-xs text-white/35"><span>{filtered.length} resultados</span><span>Precios en COP</span></div>
    {visible.length ? <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{visible.map((product) => <article key={product.id} className="group overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#151519] text-left transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_24px_70px_rgba(0,0,0,.35)]"><ProductVisual product={product} /><div className="p-4"><div className="flex items-start justify-between gap-3"><div><p className={`text-[10px] font-black uppercase tracking-[0.16em] ${product.zone === "fire" ? "text-[#ff8d57]" : "text-[#85e8ff]"}`}>{product.category}</p><h3 className="mt-1.5 text-lg font-extrabold leading-tight text-white">{product.name}</h3></div>{product.zone === "fire" ? <Flame className="shrink-0 text-[#ff6b28]" size={18} /> : <Snowflake className="shrink-0 text-[#20bfe5]" size={18} />}</div><p className="mt-3 line-clamp-2 min-h-10 text-xs leading-5 text-white/45">{product.description}</p><div className="mt-5 flex items-end justify-between"><div><span className="block text-[9px] font-bold uppercase tracking-widest text-white/30">{product.variants.length > 1 ? "Desde" : "Precio"}</span><span className="mt-0.5 block text-base font-black text-white">{formatCOP(productStartingPrice(product))}</span></div><button onClick={() => setSelected(product)} className="flex min-h-10 items-center gap-1 rounded-full border border-white/10 px-3 text-xs font-bold text-white/70 transition hover:border-white hover:bg-white hover:text-black">Ver y agregar <ChevronRight size={15} /></button></div></div></article>)}</div> : <div className="mt-5 rounded-[1.5rem] border border-dashed border-white/15 px-6 py-16 text-center"><p className="text-lg font-bold">No encontramos ese antojo.</p><p className="mt-2 text-sm text-white/40">Prueba con otro término o cambia la categoría.</p></div>}
    {!showAll && !query && filtered.length > 12 && <div className="mt-8 text-center"><button onClick={() => setShowAll(true)} className="min-h-12 rounded-full border border-white/15 px-7 text-sm font-bold text-white transition hover:bg-white hover:text-black">Ver los {filtered.length} productos</button></div>}
  </div>{selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}</section>;
}
