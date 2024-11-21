import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

/*
function MediaPlayer() {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);

    // WebOS 파일 경로를 가져오는 함수
    const fetchVideoPath = () => {
        // WebOS의 luna service API 호출
        //@ts-ignore
        webOS.service.request("luna://com.webos.service.file/", {
            method: "listDir",
            parameters: {
                path: "/media/internal/videos/" // 동영상이 저장된 경로
            },
            onSuccess: (response: any) => {
                if (response.files && response.files.length > 0) {
                    const videoFile = response.files[0].name; // 첫 번째 파일 사용
                    const videoPath = `/media/internal/videos/${videoFile}`;
                    setVideoUrl(videoPath);
                } else {
                    console.error("No video files found in the directory.");
                }
            },
            onFailure: (error: any) => {
                console.error("Failed to fetch video files:", error);
            }
        });
    };

    useEffect(() => {
        fetchVideoPath(); // 컴포넌트 마운트 시 경로 가져오기
    }, []);

    return (
        <div className="noglobal">
            <div className="video-player">
                {videoUrl ? (
                    <ReactPlayer
                        url={videoUrl} // 동적으로 가져온 경로 설정
                        playing
                        loop
                        muted
                        className="react-player"
                        controls // 플레이어 컨트롤 표시
                        width="100%"
                        height="100%"
                    />
                ) : (
                    <p>Loading video...</p> // 동영상 경로를 가져오는 중 표시
                )}
            </div>
        </div>
    );
}

export default MediaPlayer;
*/
