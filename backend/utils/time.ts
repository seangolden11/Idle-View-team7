import moment from "moment-timezone";

export function calculateBaseTime(requestTime: Date): { baseDate: string; baseTime: string } {
    const timeRanges = [
        { startTime: "00:01", endTime: "03:00", baseTime: 23 },
        { startTime: "03:01", endTime: "06:00", baseTime: 2 },
        { startTime: "06:01", endTime: "09:00", baseTime: 5 },
        { startTime: "09:01", endTime: "12:00", baseTime: 8 },
        { startTime: "12:01", endTime: "15:00", baseTime: 11 },
        { startTime: "15:01", endTime: "18:00", baseTime: 14 },
        { startTime: "18:01", endTime: "21:00", baseTime: 17 },
        { startTime: "21:01", endTime: "00:00", baseTime: 20 },
    ];

    const requestMoment = moment(requestTime).tz("Asia/Seoul");

    // Default fallback to 23시
    let baseDate = requestMoment.format("YYYYMMDD");
    let baseTime = "23";

    for (const range of timeRanges) {
        const startTime = moment(range.startTime, "HH:mm");
        const endTime = range.endTime === "00:00"
            ? moment(range.endTime, "HH:mm").add(1, "day")
            : moment(range.endTime, "HH:mm");

        if (requestMoment.isBetween(startTime, endTime, null, "[]")) {
            if (range.baseTime === 23 && requestMoment.hour() < 3) {
                baseDate = requestMoment.subtract(1, "day").format("YYYYMMDD");
            }
            baseTime = range.baseTime.toString().padStart(2, "0");
            break;
        }
    }

    return { baseDate, baseTime };
}
