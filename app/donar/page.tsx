import type { Metadata } from "next";
import DonarClient from "@/components/DonarClient";
import { socialMeta } from "@/lib/seo";

const DESCRIPTION =
  "Tu ofrenda hace posible producir, editar y traducir más material gratuito para la iglesia hispanohablante.";

export const metadata: Metadata = {
  title: "Donar",
  description: DESCRIPTION,
  ...socialMeta({
    title: "Donar · SIGUE",
    description: DESCRIPTION,
    path: "/donar",
  }),
};

export default function DonarPage() {
  return <DonarClient />;
}
