/*import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

function MediaPlayer() {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchVideoPath = () => {
       
    setVideoUrl("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4");

        

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
}
export default MediaPlayer;
*/

import React, { useState } from "react";
import { startPlayback, stopPlayback, getStatus } from "./MediaService";

const MediaPlayer: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState<boolean | null>(null);
    const [error, setError] = useState<string | null>(null);

    // 고정된 동영상 URL
    const videoUrl =
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

    const handleStart = async () => {
        try {
            const message = await startPlayback(videoUrl);
            console.log(message);
            setIsPlaying(true);
        } catch (err) {
            setError(String(err));
        }
    };

    const handleStop = async () => {
        try {
            const message = await stopPlayback();
            console.log(message);
            setIsPlaying(false);
        } catch (err) {
            setError(String(err));
        }
    };

    const handleStatus = async () => {
        try {
            const status = await getStatus();
            setIsPlaying(status);
        } catch (err) {
            setError(String(err));
        }
    };

    return (
        <div
            style={{
                backgroundColor: "#900",
                color: "white",
                fontFamily: "Arial, sans-serif",
                textAlign: "center",
                padding: "20px",
                height: "100vh",
            }}
        >
            <h1>WebOS Media Controller</h1>
            <div style={{ margin: "20px" }}>
                <button
                    onClick={handleStart}
                    style={{
                        padding: "10px 20px",
                        marginRight: "10px",
                        backgroundColor: "#28a745",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Start Playback
                </button>
                <button
                    onClick={handleStop}
                    style={{
                        padding: "10px 20px",
                        marginRight: "10px",
                        backgroundColor: "#dc3545",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Stop Playback
                </button>
                <button
                    onClick={handleStatus}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Check Status
                </button>
            </div>
            {isPlaying !== null && (
                <p>Playback Status: {isPlaying ? "Playing" : "Stopped"}</p>
            )}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {/* 동영상 재생 화면 */}
            {isPlaying && (
                <div style={{ marginTop: "20px" }}>
                    <video
                        src={videoUrl}
                        controls
                        autoPlay
                        style={{
                            width: "80%",
                            height: "40%",
                            maxWidth: "80%",
                            border: "2px solid white",
                            borderRadius: "10px",
                        }}
                    ></video>
                </div>
            )}
        </div>
    );
};

export default MediaPlayer;


