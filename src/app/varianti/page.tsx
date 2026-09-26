import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV design variants",
  description: "Alternative visual previews of Marco Burrometo's CV.",
  alternates: { canonical: "/" },
  robots: { index: false, follow: true },
};

const variants = [
  {
    slug: "hypercard",
    name: "Hypercard Neon",
    description:
      "Cards luminose e layering glass con accenti fluo, molto tech e dinamica.",
  },
  {
    slug: "editorial-pop",
    name: "Editorial Pop",
    description:
      "Look magazine: tipografia grande, blocchi netti, colori pop e ritmo verticale.",
  },
  {
    slug: "mono-terminal",
    name: "Mono Terminal",
    description:
      "Estetica terminale moderna: mono font, griglia tecnica e dettagli cyber.",
  },
  {
    slug: "antigravity",
    name: "Antigravity Particles",
    description:
      "Canvas interattivo al passaggio del mouse, con effetto particelle dinamiche.",
  },
  {
    slug: "signal-bloom",
    name: "Signal Bloom",
    description:
      "Art direction editoriale con ritratto in primo piano e accenti lime, cobalto e corallo.",
  },
] as const;

export default function VariantiIndexPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-5 py-10 md:px-8">
      <h1 className="font-display text-4xl md:text-6xl">Varianti Design CV</h1>
      <p className="mt-3 max-w-2xl text-[var(--text-soft)]">
        Ho preparato 5 versioni alternative in sotto-cartelle. Aprile e dimmi
        quale direzione vuoi portare in produzione.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {variants.map((variant) => (
          <Link
            className="glass-panel rounded-3xl p-5 transition-transform duration-300 hover:-translate-y-1"
            href={`/varianti/${variant.slug}`}
            key={variant.slug}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-neon)]">
              {variant.slug}
            </p>
            <h2 className="mt-2 font-display text-2xl">{variant.name}</h2>
            <p className="mt-3 text-sm text-[var(--text-soft)]">{variant.description}</p>
          </Link>
        ))}
      </div>

      <Link
        className="mt-8 inline-flex w-fit rounded-full border border-[var(--line)] px-5 py-2 text-sm font-semibold"
        href="/"
      >
        Torna alla homepage corrente
      </Link>
    </main>
  );
}
