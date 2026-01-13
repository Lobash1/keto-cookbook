import Link from "next/link";

type Props = {
  id: string;
  label: string;
  image: string;
};

export default function CategoryCard({ id, label, image }: Props) {
  return (
    <Link href={`/categories/${id}`} className="block">
      <div className="rounded-xl overflow-hidden border border-ketoRed/40 group transition hover:-translate-y-1">
        <div className="relative aspect-square">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url(${image})` }}
          />

          <div
            className="
              absolute inset-0 
              bg-black/50 
              dark:bg-black/40 
              group-hover:bg-black/30 
              transition
            "
          />

          {/* Текст — с контрастом для light/dark */}
          <p
            className="
              absolute inset-0 flex items-center justify-center 
              text-lg font-bold
              text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]
              dark:text-ketoWhite
            "
          >
            {label}
          </p>
        </div>
      </div>
    </Link>
  );
}
