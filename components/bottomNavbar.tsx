import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Accueil" },
  { href: "/bookings", label: "Réservations" },
];

export default function BottomNavbar() {
  return (
    <footer className="border-t border-[#a2a9b1] bg-[#f8f9fa]">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-[#54595d] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-4">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[#202122]">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
