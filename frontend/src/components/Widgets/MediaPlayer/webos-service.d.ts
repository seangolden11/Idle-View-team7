// webos-service.d.ts
declare class WebOSServiceBridge {
    onservicecallback: (response: string) => void;
    call(serviceUri: string, parameters: string): void;
}
