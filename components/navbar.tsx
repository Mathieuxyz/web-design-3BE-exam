
import Link from "next/link";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/bookings", label: "Réservations" },
];

export default function Navbar() {
  return (
    <nav className="border-b border-[#a2a9b1] bg-white/95">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-end sm:justify-between">
        <Link href="/" className="flex flex-col text-[#202122] no-underline">
          <span className="flex items-baseline gap-1">
            <span className="text-4xl font-serif tracking-tight">Pizza il Pepino</span>
          </span>
          <span className="text-xs uppercase tracking-[0.3em] text-[#54595d]">
            Réservations en ligne
          </span>
        </Link>

        <div className="flex flex-wrap gap-4 text-sm text-[#54595d]">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1 transition hover:bg-[#eaecf0] hover:text-[#202122]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
