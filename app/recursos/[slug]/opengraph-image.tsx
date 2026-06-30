import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getResource } from "@/lib/resources";

export const alt = "Recurso de SIGUE";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Serif de marca (Newsreader 500) leída del repo: sin red, igual en dev y build.
// ImageResponse exige al menos una fuente con glifos reales.
const fontPath = join(process.cwd(), "assets", "Newsreader-Medium.ttf");

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getResource(slug);

  const accent = resource?.accent ?? "#c2462f";
  const eyebrow = (resource?.typeLabel ?? "Recurso").toUpperCase();
  const title = resource?.title ?? "SIGUE";
  const subtitle = resource?.subtitle ?? "";

  const serif = await readFile(fontPath);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#f6f1e8",
          fontFamily: "Newsreader",
        }}
      >
        {/* Barra de acento del recurso */}
        <div style={{ width: 16, height: "100%", backgroundColor: accent }} />

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px 80px",
          }}
        >
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              fontWeight: 700,
              color: accent,
            }}
          >
            {eyebrow}
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: title.length > 22 ? 78 : 96,
                lineHeight: 1.05,
                color: "#211a14",
                fontWeight: 500,
              }}
            >
              {title}
            </div>
            {subtitle ? (
              <div
                style={{
                  marginTop: 24,
                  fontSize: 34,
                  fontStyle: "italic",
                  color: "#6e6358",
                }}
              >
                {subtitle}
              </div>
            ) : null}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "2px solid #e5dbcb",
              paddingTop: 28,
            }}
          >
            <div
              style={{ fontSize: 30, letterSpacing: 8, fontWeight: 700, color: "#211a14" }}
            >
              SIGUE
            </div>
            <div style={{ fontSize: 24, color: "#9a8c7c" }}>
              Recursos gratuitos para la iglesia
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Newsreader", data: serif, style: "normal", weight: 500 }],
    },
  );
}
