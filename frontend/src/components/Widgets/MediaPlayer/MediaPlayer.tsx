import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { fetchVideoUrl }  from "../../ServiceFunction/ServiceToTypeScript";

function MediaPlayer() {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    
    const fetchVideoPath = async () => {
        try {
            const url = await fetchVideoUrl(); // 비동기 함수 호출
            setVideoUrl(url);
        } catch (err) {
            setError("Failed to load video URL.");
        }
    };
       

    useEffect(() => {
        fetchVideoPath(); // 컴포넌트 마운트 시 파일 경로 가져오기
    }, []);

    return (
        <div className="noglobal">
            <div className="video-player">
                {error ? (
                    <p>Error: {error}</p> // 오류 메시지 표시
                ) : videoUrl ? (
                    <ReactPlayer
                        url={videoUrl}
                        playing
                        loop={false}
                        muted
                        className="react-player"
                        controls
                        width="100%"
                        height="100%"
                        style={{
                            maxWidth: "400px", // 최대 너비 제한
                            aspectRatio: "16 / 9", // 16:9 비율 유지
                            margin: "auto", // 중앙 정렬
                        }}
                        onEnded={fetchVideoPath}
                    />
                ) : (
                    <p>Loading video...</p> // 로딩 중 메시지
                )}
            </div>
        </div>
    );
}

export default MediaPlayer;
