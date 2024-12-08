export function getUserLocation(): void {
    // 브라우저에서 Geolocation API 지원 여부 확인
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                console.log(`위도: ${latitude}, 경도: ${longitude}`);

                // 서버로 위치 데이터를 전송
                fetch('http://14.46.254.67:3000/location', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ latitude, longitude }),
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then((data) => {
                        console.log('서버 응답:', data);
                    })
                    .catch((error) => {
                        console.error('위치 전송 실패:', error);
                    });
            },
            (error) => {
                console.error('위치 정보를 가져오는 데 실패했습니다:', error);
            }
        );
    } else {
        console.error('Geolocation API가 브라우저에서 지원되지 않습니다.');
    }
}