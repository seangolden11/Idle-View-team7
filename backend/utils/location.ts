export type Coordinates = {
    latitude: number;
    longitude: number;
};

export function getUserLocation(): Promise<Coordinates> {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    resolve({ latitude, longitude });
                },
                (error) => {
                    reject(`Error getting location: ${error.message}`);
                },
                {
                    enableHighAccuracy: true, // 높은 정확도 요청
                    timeout: 10000,          // 10초 내 응답 없으면 에러
                    maximumAge: 0,           // 캐시된 위치 정보 사용 안 함
                }
            );
        } else {
            reject("Geolocation API is not supported in this browser.");
        }
    });
}
