import Link from "next/link";
import Image from "next/image";
import type { Resource } from "@/lib/resources";

export default function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Link
      href={`/recursos/${resource.slug}`}
      className="group flex flex-col text-left transition-transform duration-300 hover:-translate-y-1.5"
    >
      <div className="relative aspect-[1/1.414] overflow-hidden rounded-md bg-[#eee7db] shadow-[0_8px_24px_-10px_rgba(33,26,20,0.35)]">
        <Image
          src={resource.cover}
          alt={resource.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 250px"
          className="object-cover"
        />
      </div>
      <div
        className="mt-4 text-[11px] font-bold uppercase tracking-[0.14em]"
        style={{ color: resource.accent }}
      >
        {resource.typeLabel}
      </div>
      <h3 className="mt-1.5 font-serif text-[22px] font-medium leading-tight text-ink">
        {resource.title}
      </h3>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">{resource.desc}</p>
    </Link>
  );
}
