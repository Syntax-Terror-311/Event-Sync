import { db } from "@/lib/db";

export async function GET() {
    const events = await db.event.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
    return Response.json(events);
}