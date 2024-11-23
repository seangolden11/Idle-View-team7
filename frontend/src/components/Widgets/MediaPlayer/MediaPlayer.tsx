import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

function MediaPlayer() {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchVideoPath = () => {
        //@ts-ignore
        if (typeof window.webOS === "undefined") {
            console.warn("webOS is not defined. Using sample video URL for local testing.");
            setVideoUrl("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4");

            return;
        }
        //@ts-ignore
        webOS.service.request("luna://com.webos.service.file/", {
            method: "listDir",
            parameters: {
                path: "/media/internal/videos/" // 동영상 경로
            },
            onSuccess: (response: any) => {
                if (response.files && response.files.length > 0) {
                    const videoFile = response.files[0].name; // 첫 번째 파일 사용
                    const videoPath = `/media/internal/videos/${videoFile}`;
                    setVideoUrl(videoPath);
                } else {
                    setError("No video files found in the directory."); // 파일 없음 처리
                }
            },
            onFailure: (error: any) => {
                setError("Failed to fetch video files."); // API 실패 처리
                console.error("Error fetching files:", error);
            }
        });
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
                        loop
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
                    />
                ) : (
                    <p>Loading video...</p> // 로딩 중 메시지
                )}
            </div>
        </div>
    );
}

export default MediaPlayer;
