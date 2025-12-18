"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Booking, getBookings, saveBookings } from "@/lib/bookings";

function normalizeText(input: FormDataEntryValue | null): string | null {
  if (!input) return null;
  const value = input.toString().trim();
  return value.length ? value : null;
}

function normalizePeople(input: FormDataEntryValue | null): number | null {
  if (!input) return null;
  const value = Number.parseInt(input.toString(), 10);
  if (!Number.isFinite(value) || value <= 0) return null;
  return value;
}

function normalizeTime(input: FormDataEntryValue | null): string | null {
  if (!input) return null;
  const value = input.toString().trim();
  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(value);
  if (!match) return null;
  return value;
}

function revalidateBookingPaths(id?: string) {
  revalidatePath("/");
  revalidatePath("/bookings");
  if (id) revalidatePath(`/bookings/${id}`);
}

export async function createBooking(formData: FormData) {
  const name = normalizeText(formData.get("name"));
  const phone = normalizeText(formData.get("phone"));
  const people = normalizePeople(formData.get("people"));
  const time = normalizeTime(formData.get("time"));

  if (!name || !phone || !people || !time) {
    throw new Error("Tous les champs sont obligatoires pour créer une réservation.");
  }

  const bookings = await getBookings();
  const id = randomUUID();

  const newBooking: Booking = {
    id,
    name,
    phone,
    people,
    time,
  };

  await saveBookings([newBooking, ...bookings]);
  revalidateBookingPaths(id);
  redirect(`/bookings/${id}`);
}

export async function updateBooking(formData: FormData) {
  const id = normalizeText(formData.get("id"));
  if (!id) {
    throw new Error("Booking id is required.");
  }

  const name = normalizeText(formData.get("name"));
  const phone = normalizeText(formData.get("phone"));
  const people = normalizePeople(formData.get("people"));
  const time = normalizeTime(formData.get("time"));

  if (!name || !phone || !people || !time) {
    throw new Error("Tous les champs sont obligatoires pour modifier une réservation.");
  }

  const bookings = await getBookings();
  const index = bookings.findIndex((booking) => booking.id === id);
  if (index === -1) {
    throw new Error("Réservation introuvable.");
  }

  bookings[index] = {
    ...bookings[index],
    name,
    phone,
    people,
    time,
  };

  await saveBookings(bookings);
  revalidateBookingPaths(id);
}

export async function deleteBooking(formData: FormData) {
  const id = normalizeText(formData.get("id"));
  if (!id) {
    throw new Error("Booking id is required.");
  }

  const bookings = await getBookings();
  const nextBookings = bookings.filter((booking) => booking.id !== id);
  if (nextBookings.length === bookings.length) {
    throw new Error("Réservation introuvable.");
  }

  await saveBookings(nextBookings);
  revalidateBookingPaths();
  redirect("/bookings");
}

