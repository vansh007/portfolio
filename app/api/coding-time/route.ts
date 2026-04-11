import { NextResponse } from "next/server";

export async function GET() {
    try {
        const wakatimeApiKey = process.env.WAKATIME_API_KEY;

        if (!wakatimeApiKey) {
            return NextResponse.json({
                yesterday: "32m 8s",
                today: "2h 15m",
                isOnline: false,
            });
        }

        const response = await fetch(
            "https://wakatime.com/api/v1/users/current/summaries?range=last_7_days",
            {
                headers: {
                    Authorization: `Basic ${Buffer.from(wakatimeApiKey).toString("base64")}`,
                },
                next: { revalidate: 300 }, // Cache for 5 minutes
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch WakaTime data");
        }

        const data = await response.json();
        const summaries = data.data;

        // Get yesterday's data
        const yesterday = summaries[summaries.length - 2];
        const today = summaries[summaries.length - 1];

        const formatTime = (seconds: number) => {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const secs = seconds % 60;

            if (hours > 0) {
                return `${hours}h ${minutes}m`;
            } else if (minutes > 0) {
                return `${minutes}m ${secs}s`;
            } else {
                return `${secs}s`;
            }
        };

        return NextResponse.json({
            yesterday: formatTime(yesterday?.grand_total?.total_seconds || 0),
            today: formatTime(today?.grand_total?.total_seconds || 0),
            isOnline: today?.grand_total?.total_seconds > 0,
        });
    } catch (error) {
        console.error("Error fetching coding time:", error);

        return NextResponse.json({
            yesterday: "32m 8s",
            today: "2h 15m",
            isOnline: false,
        });
    }
}
