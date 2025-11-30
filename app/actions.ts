"use server";

import { db } from "@/db";
import { players, NewPlayer } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export async function createPlayer(data: NewPlayer) {
    await db.insert(players).values(data);
    revalidatePath("/");
    revalidatePath("/players");
}

export async function getPlayers() {
    return await db.select().from(players).all();
}

export async function deletePlayer(id: number) {
    await db.delete(players).where(eq(players.id, id));
    revalidatePath("/");
    revalidatePath("/players");
}
