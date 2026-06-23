import type { Metadata } from "next";
import DonarClient from "@/components/DonarClient";

export const metadata: Metadata = {
  title: "Donar",
  description:
    "Tu ofrenda hace posible producir, editar y traducir más material gratuito para la iglesia hispanohablante.",
};

export default function DonarPage() {
  return <DonarClient />;
}
