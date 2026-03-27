import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebaseUtils";

export async function GET() {
    try {
        const snapshot = await db.collection("wordbank").get();
        const words = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));

        return NextResponse.json(words);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
