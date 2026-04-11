
import { incrementView, getViews } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const slug = "portfolio-home";
        const views = await getViews(slug);
        return NextResponse.json({ views });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch views" },
            { status: 500 }
        );
    }
}

export async function POST() {
    try {
        const slug = "portfolio-home";
        const views = await incrementView(slug);
        return NextResponse.json({ views });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to increment views" },
            { status: 500 }
        );
    }
}
