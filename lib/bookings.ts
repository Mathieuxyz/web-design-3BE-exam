import { promises as fs } from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data.json");

export type Booking = {
  id: string;
  name: string;
  phone: string;
  people: number;
  time: string;
};

type DataFile = {
  bookings?: Booking[];
  [key: string]: unknown;
};

async function readDataFile(): Promise<DataFile> {
  try {
    const payload = await fs.readFile(dataPath, "utf-8");
    if (!payload.trim()) return {};
    return JSON.parse(payload) as DataFile;
  } catch {
    return {};
  }
}

async function writeDataFile(nextData: DataFile) {
  await fs.writeFile(dataPath, `${JSON.stringify(nextData, null, 2)}\n`, "utf-8");
}

function normalizeBookings(input: unknown): Booking[] {
  if (!Array.isArray(input)) return [];

  return input
    .filter((entry): entry is Record<string, unknown> => Boolean(entry) && typeof entry === "object")
    .map((entry) => ({
      id: typeof entry.id === "string" ? entry.id : "",
      name: typeof entry.name === "string" ? entry.name : "",
      phone: typeof entry.phone === "string" ? entry.phone : "",
      people:
        typeof entry.people === "number"
          ? entry.people
          : Number.parseInt(String(entry.people ?? ""), 10) || 0,
      time: typeof entry.time === "string" ? entry.time : "",
    }))
    .filter((booking) => booking.id && booking.name && booking.phone && booking.people > 0 && booking.time);
}

export async function getBookings(): Promise<Booking[]> {
  const json = await readDataFile();
  return normalizeBookings(json.bookings);
}

export async function getBookingById(id: string): Promise<Booking | null> {
  const bookings = await getBookings();
  return bookings.find((booking) => booking.id === id) ?? null;
}

export async function saveBookings(bookings: Booking[]) {
  const json = await readDataFile();
  await writeDataFile({ ...json, bookings });
}

