/*
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
}*/

import fetch from 'node-fetch'; // Node.js에서 fetch를 사용하려면 설치 필요

export interface Coordinates {
    latitude: number;
    longitude: number;
}

export async function getUserLocation(): Promise<Coordinates> {
    try {
        // IP 기반 위치 정보 API 요청
        const response = await fetch("http://ip-api.com/json/");
        if (!response.ok) {
            throw new Error(`Failed to fetch location: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.status === "fail") {
            throw new Error(`Failed to retrieve location: ${data.message}`);
        }

        // latitude와 longitude 추출
        const { lat: latitude, lon: longitude } = data;
        return { latitude, longitude };
    } catch (error) {
        throw new Error(`Error getting location: ${error}`);
    }
}