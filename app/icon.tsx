import { ImageResponse } from "next/og";
import { getCompanyLogoDataUrl } from "./lib/companyBrandAsset";
import { getRequestCompany } from "./lib/companyServer";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default async function Icon() {
  const company = await getRequestCompany();
  const logoSrc = await getCompanyLogoDataUrl(company);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          borderRadius: "8px",
        }}
      >
        {/* `next/image` is not supported inside ImageResponse markup. */}
        <img
          src={logoSrc}
          alt={company.logoAlt}
          style={{
            width: "24px",
            height: "24px",
            objectFit: "contain",
          }}
        />
      </div>
    ),
    size,
  );
}
