import "./globals.css";
import Link from "next/link";
import { createBooking } from "./bookings/actions";

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="rounded-lg border border-[#c8ccd1] bg-white p-6 shadow-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-[#72777d]">Restaurant</p>
        <h1 className="mt-2 text-3xl font-semibold text-[#202122]">Ristorante il Pepino</h1>
        <p className="text-sm italic text-[#54595d]">Réservez votre table en quelques secondes.</p>
        <p className="mt-4 text-base text-[#202122]">
          Remplissez le formulaire ci-dessous. Vous pourrez ensuite consulter, modifier ou supprimer la réservation
          depuis sa page dédiée.
        </p>
      </section>

      <section className="space-y-4 rounded-lg border border-[#c8ccd1] bg-white p-6 shadow-sm">
        <header className="border-b border-[#c8ccd1] pb-4">
          <h2 className="text-2xl font-semibold text-[#202122]">Formulaire de réservation</h2>
          <p className="mt-1 text-sm text-[#54595d]">
            Vous pouvez aussi consulter toutes les réservations sur{" "}
            <Link href="/bookings" className="font-semibold text-[#3366cc] hover:underline">
              /bookings
            </Link>
            .
          </p>
        </header>

        <form action={createBooking} className="grid gap-4 lg:grid-cols-2">
          <label className="text-xs font-semibold uppercase tracking-[0.3em] text-[#72777d]">
            Nom
            <input
              name="name"
              type="text"
              placeholder="Jean Dupont"
              className="mt-2 w-full rounded border border-[#c8ccd1] bg-[#f8f9fa] px-3 py-2 text-sm text-[#202122] shadow-inner"
              required
            />
          </label>

          <label className="text-xs font-semibold uppercase tracking-[0.3em] text-[#72777d]">
            Téléphone
            <input
              name="phone"
              type="tel"
              placeholder="+33 6 12 34 56 78"
              className="mt-2 w-full rounded border border-[#c8ccd1] bg-[#f8f9fa] px-3 py-2 text-sm text-[#202122] shadow-inner"
              required
            />
          </label>

          <label className="text-xs font-semibold uppercase tracking-[0.3em] text-[#72777d]">
            Nombre de personnes
            <input
              name="people"
              type="number"
              min={1}
              placeholder="2"
              className="mt-2 w-full rounded border border-[#c8ccd1] bg-[#f8f9fa] px-3 py-2 text-sm text-[#202122] shadow-inner"
              required
            />
          </label>

          <label className="text-xs font-semibold uppercase tracking-[0.3em] text-[#72777d]">
            Heure
            <input
              name="time"
              type="time"
              className="mt-2 w-full rounded border border-[#c8ccd1] bg-[#f8f9fa] px-3 py-2 text-sm text-[#202122] shadow-inner"
              required
            />
          </label>

          <button
            type="submit"
            className="lg:col-span-2 rounded border border-[#3366cc] bg-[#3366cc] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#254a99]"
          >
            Confirmer la réservation
          </button>
        </form>
      </section>
    </div>
  );
}
