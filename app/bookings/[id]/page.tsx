import Link from "next/link";
import { notFound } from "next/navigation";
import { getBookingById } from "@/lib/bookings";
import { deleteBooking, updateBooking } from "../actions";

export const dynamic = "force-dynamic";

export default async function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const booking = await getBookingById(id);

  if (!booking) {
    notFound();
  }

  return (
    <div className="space-y-10">
      <header className="rounded-lg border border-[#c8ccd1] bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.4em] text-[#72777d]">Réservation</p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[#202122]">Éditer la réservation</h1>
            <p className="mt-1 text-sm text-[#54595d]">
              ID: <span className="font-mono text-xs">{booking.id}</span>
            </p>
          </div>
          <Link href="/bookings" className="text-sm font-semibold text-[#3366cc] hover:underline">
            Retour à la liste
          </Link>
        </div>
      </header>

      <section className="rounded-lg border border-[#c8ccd1] bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#202122]">Informations</h2>
        <form action={updateBooking} className="mt-6 grid gap-4 lg:grid-cols-2">
          <input type="hidden" name="id" value={booking.id} />

          <label className="text-xs font-semibold uppercase tracking-[0.3em] text-[#72777d]">
            Nom
            <input
              name="name"
              type="text"
              defaultValue={booking.name}
              className="mt-2 w-full rounded border border-[#c8ccd1] bg-[#f8f9fa] px-3 py-2 text-sm text-[#202122] shadow-inner"
              required
            />
          </label>

          <label className="text-xs font-semibold uppercase tracking-[0.3em] text-[#72777d]">
            Téléphone
            <input
              name="phone"
              type="tel"
              defaultValue={booking.phone}
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
              defaultValue={booking.people}
              className="mt-2 w-full rounded border border-[#c8ccd1] bg-[#f8f9fa] px-3 py-2 text-sm text-[#202122] shadow-inner"
              required
            />
          </label>

          <label className="text-xs font-semibold uppercase tracking-[0.3em] text-[#72777d]">
            Heure
            <input
              name="time"
              type="time"
              defaultValue={booking.time}
              className="mt-2 w-full rounded border border-[#c8ccd1] bg-[#f8f9fa] px-3 py-2 text-sm text-[#202122] shadow-inner"
              required
            />
          </label>

          <button
            type="submit"
            className="lg:col-span-2 rounded border border-[#3366cc] bg-[#3366cc] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#254a99]"
          >
            Enregistrer
          </button>
        </form>
      </section>

      <section className="rounded-lg border border-[#c8ccd1] bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[#202122]">Suppression</h2>
        <p className="mt-2 text-sm text-[#54595d]">
          Cette action est définitive. La réservation sera supprimée du fichier <span className="font-mono">data.json</span>.
        </p>
        <form action={deleteBooking} className="mt-4">
          <input type="hidden" name="id" value={booking.id} />
          <button
            type="submit"
            className="rounded border border-[#d33a2c] bg-[#d33a2c] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#96291c]"
          >
            Supprimer la réservation
          </button>
        </form>
      </section>
    </div>
  );
}

