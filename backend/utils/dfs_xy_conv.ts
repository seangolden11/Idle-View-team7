export const dfs_xy_conv = (code: string, v1: number, v2: number) => {
  const RE = 6371.00877; // 지구 반경(km)
  const GRID = 5.0; // 격자 간격(km)
  const SLAT1 = 30.0; // 투영 위도1(degree)
  const SLAT2 = 60.0; // 투영 위도2(degree)
  const OLON = 126.0; // 기준점 경도(degree)
  const OLAT = 38.0; // 기준점 위도(degree)
  const XO = 43; // 기준점 X좌표(GRID)
  const YO = 136; // 기준점 Y좌표(GRID)

  const DEGRAD = Math.PI / 180.0;
  const RADDEG = 180.0 / Math.PI;

  const re = RE / GRID;
  const slat1 = SLAT1 * DEGRAD;
  const slat2 = SLAT2 * DEGRAD;
  const olon = OLON * DEGRAD;
  const olat = OLAT * DEGRAD;

  const sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  const sf = Math.pow(Math.tan(Math.PI * 0.25 + slat1 * 0.5), sn) * Math.cos(slat1) / sn;
  const ro = re * sf / Math.pow(Math.tan(Math.PI * 0.25 + olat * 0.5), sn);

  const rs: { [key: string]: number } = {};
  if (code === "toXY") {
      const ra = re * sf / Math.pow(Math.tan(Math.PI * 0.25 + (v1) * DEGRAD * 0.5), sn);
      let theta = v2 * DEGRAD - olon;
      if (theta > Math.PI) theta -= 2.0 * Math.PI;
      if (theta < -Math.PI) theta += 2.0 * Math.PI;
      theta *= sn;

      rs['x'] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
      rs['y'] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
  }
  return rs;
};
