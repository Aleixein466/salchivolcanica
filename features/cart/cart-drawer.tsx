"use client";

import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { formatCOP } from "@/lib/menu-data";
import { useCart } from "./cart-context";

export function CartButton({ compact = false }: { compact?: boolean }) {
  const { itemCount, setIsOpen } = useCart();
  return <button onClick={() => setIsOpen(true)} className={`relative flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/15 text-white transition hover:border-white/30 hover:bg-white/10 ${compact ? "h-11 w-11" : "px-4"}`} aria-label={`Abrir carrito, ${itemCount} artículos`}><ShoppingBag size={18} />{!compact && <span className="text-xs font-black uppercase tracking-[.08em]">Carrito</span>}{itemCount > 0 && <span className="absolute -right-1 -top-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-[#ff6b28] px-1 text-[10px] font-black text-white">{itemCount}</span>}</button>;
}

export function CartDrawer() {
  const { lines, itemCount, total, isOpen, setIsOpen, increment, decrement, remove, clear } = useCart();
  const message = [
    "Hola, quiero pedir:",
    "",
    ...lines.map((line, index) => `${index + 1}. ${line.quantity} × ${line.name}${line.variantName !== "Única" ? ` (${line.variantName})` : ""} — ${formatCOP(line.unitPrice * line.quantity)}`),
    "",
    `Total estimado: ${formatCOP(total)}`,
    "",
    "Nombre:",
    "Dirección o barrio:",
    "Método de pago:",
    "",
    "Entiendo que el pedido queda sujeto a confirmación del restaurante.",
  ].join("\n");

  return <>
    {itemCount > 0 && <button onClick={() => setIsOpen(true)} className="fixed bottom-4 left-4 right-4 z-40 flex min-h-14 items-center justify-between rounded-full bg-white px-5 text-black shadow-[0_20px_70px_rgba(0,0,0,.5)] sm:left-auto sm:right-6 sm:w-auto sm:min-w-72" aria-label={`Ver carrito con ${itemCount} artículos`}><span className="flex items-center gap-2 text-sm font-black"><ShoppingBag size={18} /> Ver carrito <span className="rounded-full bg-black/10 px-2 py-1 text-xs">{itemCount}</span></span><strong>{formatCOP(total)}</strong></button>}
    {isOpen && <div className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setIsOpen(false)}>
      <aside role="dialog" aria-modal="true" aria-labelledby="cart-title" className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-white/10 bg-[#111115] shadow-2xl">
        <header className="flex items-center justify-between border-b border-white/10 px-5 py-5"><div><p className="eyebrow">Tu selección</p><h2 id="cart-title" className="mt-1 text-xl font-black text-white">Carrito · {itemCount}</h2></div><button onClick={() => setIsOpen(false)} className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-white" aria-label="Cerrar carrito"><X size={20} /></button></header>
        {lines.length ? <><div className="flex-1 space-y-3 overflow-y-auto p-4">{lines.map((line) => <article key={line.key} className="grid grid-cols-[72px_1fr] gap-3 rounded-2xl border border-white/10 bg-white/[.035] p-3">
          <div className="relative h-20 overflow-hidden rounded-xl bg-white/5">{line.imageUrl ? <Image src={line.imageUrl} alt={line.name} fill sizes="72px" className="object-cover" /> : <div className="grid h-full place-items-center"><ShoppingBag className="text-white/20" /></div>}</div>
          <div className="min-w-0"><div className="flex items-start justify-between gap-2"><div><h3 className="truncate text-sm font-extrabold text-white">{line.name}</h3><p className="mt-1 text-xs text-white/40">{line.variantName}</p></div><button onClick={() => remove(line.key)} className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-white/35 hover:bg-white/10 hover:text-white" aria-label={`Eliminar ${line.name}`}><Trash2 size={15} /></button></div><div className="mt-3 flex items-center justify-between"><div className="flex items-center rounded-full border border-white/10"><button onClick={() => decrement(line.key)} className="grid h-8 w-8 place-items-center text-white" aria-label={`Quitar una unidad de ${line.name}`}><Minus size={14} /></button><span className="w-7 text-center text-xs font-black">{line.quantity}</span><button onClick={() => increment(line.key)} className="grid h-8 w-8 place-items-center text-white" aria-label={`Agregar una unidad de ${line.name}`}><Plus size={14} /></button></div><strong className="text-sm text-white">{formatCOP(line.unitPrice * line.quantity)}</strong></div></div>
        </article>)}</div><div className="border-t border-white/10 bg-[#111115] p-5"><div className="mb-4 flex items-center justify-between"><span className="text-sm text-white/50">Total estimado</span><strong className="text-2xl text-white">{formatCOP(total)}</strong></div><a href={`https://wa.me/573142855753?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer" className="flex min-h-14 items-center justify-center rounded-full bg-[#25d366] px-5 text-sm font-black uppercase tracking-[.08em] text-[#04160b] transition hover:bg-[#7df1a5]">Pedir por WhatsApp</a><div className="mt-3 flex items-center justify-between"><p className="text-[10px] leading-4 text-white/35">El restaurante confirma disponibilidad, domicilio y total final.</p><button onClick={clear} className="shrink-0 px-2 text-xs font-bold text-white/40 hover:text-white">Vaciar</button></div></div></> : <div className="grid flex-1 place-items-center p-8 text-center"><div><span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-white/10 bg-white/5 text-white/30"><ShoppingBag /></span><h3 className="mt-5 text-lg font-black">Tu carrito está vacío</h3><p className="mt-2 text-sm leading-6 text-white/40">Agrega tus favoritos del menú y arma un solo pedido.</p><button onClick={() => setIsOpen(false)} className="mt-6 min-h-11 rounded-full bg-white px-5 text-sm font-black text-black">Explorar menú</button></div></div>}
      </aside>
    </div>}
  </>;
}
