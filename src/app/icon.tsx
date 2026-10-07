import { ImageResponse } from "next/og";
import { getLogoDataUrl } from "@/lib/brand-assets";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon generated at build time from /public/images/logo.png. */
export default async function Icon() {
  const logo = await getLogoDataUrl();
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#ffffff", borderRadius: 14 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt="" width={60} height={60} style={{ objectFit: "contain" }} />
      </div>
    ),
    size
  );
}
