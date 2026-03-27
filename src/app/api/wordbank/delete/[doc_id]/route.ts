import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebaseUtils";

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ doc_id: string }> },
) {
    try {
        const { doc_id } = await params;
        await db.collection("wordbank").doc(doc_id).delete();

        return NextResponse.json({
            status: "success",
            msg: "word deleted",
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
