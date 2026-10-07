import { ImageResponse } from "next/og";
import { getLogoDataUrl } from "@/lib/brand-assets";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon for iPhones, generated from /public/images/logo.png. */
export default async function AppleIcon() {
  const logo = await getLogoDataUrl();
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#ffffff" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt="" width={160} height={160} style={{ objectFit: "contain" }} />
      </div>
    ),
    size
  );
}
