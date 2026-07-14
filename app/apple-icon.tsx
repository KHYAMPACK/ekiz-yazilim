import { ImageResponse } from "next/og";
import { LOGO_PATHS } from "@/components/logoPaths";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
        }}
      >
        <svg
          width="128"
          height="128"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={LOGO_PATHS.bracketTl} fill="#ffffff" />
          <path d={LOGO_PATHS.bracketBr} fill="#ffffff" />
          <path d={LOGO_PATHS.core} fill="#ffffff" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
