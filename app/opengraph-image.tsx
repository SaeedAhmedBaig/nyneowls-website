import { ImageResponse } from "next/og";

export const alt = "Nyne Owls: Design it. Build it. Tell it.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#171717",
          color: "#ffffff",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 44, fontWeight: 800 }}>
          <div style={{ width: 56, height: 56, background: "#fc1906" }} />
          nyneowls
        </div>
        <div style={{ display: "flex", fontSize: 92, fontWeight: 800, lineHeight: 1.02 }}>
          Design it. Build it. Tell it.
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#b3ada5" }}>
          Brand design, software and original stories
        </div>
      </div>
    ),
    size
  );
}