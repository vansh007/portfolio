import { NextRequest, NextResponse } from "next/server";
import { getViews, incrementView } from "@/lib/db";

// GET: Fetch view count for a specific blog
export async function GET(request: NextRequest) {
    const slug = request.nextUrl.searchParams.get("slug");

    if (!slug) {
        return NextResponse.json(
            { error: "Slug parameter is required" },
            { status: 400 }
        );
    }

    try {
        const views = await getViews(slug);
        return NextResponse.json({ slug, views }, { status: 200 });
    } catch (error) {
        console.error("Error fetching views:", error);
        return NextResponse.json(
            { error: "Failed to fetch views" },
            { status: 500 }
        );
    }
}

// POST: Increment view count for a specific blog
export async function POST(request: NextRequest) {
    try {
        const { slug } = await request.json();

        if (!slug) {
            return NextResponse.json(
                { error: "Slug is required" },
                { status: 400 }
            );
        }

        const views = await incrementView(slug);

        return NextResponse.json(
            { slug, views },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating views:", error);
        return NextResponse.json(
            { error: "Failed to update views" },
            { status: 500 }
        );
    }
}
