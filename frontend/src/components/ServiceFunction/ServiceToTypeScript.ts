import { fetchWeatherData } from "./ServiceFunction";

export async function getWeatherData(location: string,token: string): Promise<any> {
  try {
    const data = await fetchWeatherData(location,token);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message); // 에러 메시지를 반환
    } else {
      throw new Error(String(error)); // 기타 에러를 문자열로 변환
    }
  }
}

// JavaScript 함수 가져오기
import { callWebOSService } from "./ServiceFunction";

export async function fetchVideoUrl(): Promise<string> {
  const serviceUrl = "luna://com.idleview.app/getVideoURL";
  const params = {}; // 추가 매개변수가 필요하면 여기에 추가

  try {
    const response = await callWebOSService(serviceUrl, params);
    return response.videoUrl; // 비디오 URL 반환
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`fetchVideoUrl Error: ${error.message}`);
    }
    throw new Error("Unknown error occurred");
  }
}

import { setToken } from "./ServiceFunction";

export async function settoken(token:string): Promise<string> {

  try {
    const response = await setToken(token);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`fetchVideoUrl Error: ${error.message}`);
    }
    throw new Error("Unknown error occurred");
  }
}
