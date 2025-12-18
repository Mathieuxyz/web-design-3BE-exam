import Link from "next/link";
import { getBookings } from "@/lib/bookings";

export const dynamic = "force-dynamic";

export default async function BookingsPage() {
  const bookings = await getBookings();

  return (
    <div className="space-y-10">
      <header className="rounded-lg border border-[#c8ccd1] bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.4em] text-[#72777d]">Gestion</p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[#202122]">Réservations</h1>
            <p className="mt-1 text-sm text-[#54595d]">Liste de toutes les réservations enregistrées.</p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded border border-[#3366cc] bg-[#3366cc] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#254a99]"
          >
            Nouvelle réservation
          </Link>
        </div>
      </header>

      {bookings.length === 0 ? (
        <section className="rounded-lg border border-dashed border-[#a2a9b1] bg-white p-6 text-sm text-[#54595d] shadow-sm">
          <p>Aucune réservation pour le moment.</p>
          <p className="mt-2">
            Créez-en une depuis{" "}
            <Link href="/" className="font-semibold text-[#3366cc] hover:underline">
              la page d’accueil
            </Link>
            .
          </p>
        </section>
      ) : (
        <section className="overflow-hidden rounded-lg border border-[#c8ccd1] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[#eaecf0] text-xs font-semibold uppercase tracking-[0.3em] text-[#54595d]">
                <tr>
                  <th className="px-4 py-3">Nom</th>
                  <th className="px-4 py-3">Téléphone</th>
                  <th className="px-4 py-3">Personnes</th>
                  <th className="px-4 py-3">Heure</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eaecf0]">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-[#f8f9fa]">
                    <td className="px-4 py-3 font-semibold text-[#202122]">{booking.name}</td>
                    <td className="px-4 py-3 text-[#54595d]">{booking.phone}</td>
                    <td className="px-4 py-3 text-[#54595d]">{booking.people}</td>
                    <td className="px-4 py-3 text-[#54595d]">{booking.time}</td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/bookings/${booking.id}`}
                        className="font-semibold text-[#3366cc] hover:underline"
                      >
                        Éditer
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}

