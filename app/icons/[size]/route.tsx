import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { getCompanyLogoDataUrl } from "@/app/lib/companyBrandAsset";
import { getRequestCompany } from "@/app/lib/companyServer";

const allowedSizes = new Set([192, 512]);

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ size: string }> },
) {
  const { size } = await params;
  const parsedSize = Number(size);

  if (!allowedSizes.has(parsedSize)) {
    return new Response("Icon size not supported", { status: 404 });
  }

  const company = await getRequestCompany();
  const logoSrc = await getCompanyLogoDataUrl(company);
  const logoSize = parsedSize === 512 ? 360 : 136;

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
        }}
      >
        {/* `next/image` is not supported inside ImageResponse markup. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt={company.logoAlt}
          style={{
            width: `${logoSize}px`,
            height: `${logoSize}px`,
            objectFit: "contain",
          }}
        />
      </div>
    ),
    {
      width: parsedSize,
      height: parsedSize,
    },
  );
}
