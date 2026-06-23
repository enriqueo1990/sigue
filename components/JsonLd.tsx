/**
 * Inyecta datos estructurados (schema.org) como <script type="application/ld+json">.
 * Server component: el JSON se renderiza en el HTML inicial, ideal para los
 * rastreadores de Google.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
