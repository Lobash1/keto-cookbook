import Link from "next/link";

type Props = {
  id: string;
  label: string;
  image: string;
};

export default function CategotyCard({ id, label, image }: Props) {
  return (
    <Link href={`/category/${id}`}>
      <div className="rounded-xl hover:-translate-y-1 transition">
        {/* <p className="text-ketoWhite font-semibold text-lg">{label}</p> */}

        <div
          className="relative aspect-square
 h-48 rounded-xl overflow-hidden border border-ketoRed cursor-pointer group"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url(${image})` }}
          />

          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition"></div>

          <p className="absolute inset-0 flex items-center justify-center text-ketoWhite text-lg font-bold">
            {label}
          </p>
        </div>
      </div>
    </Link>
  );
}
