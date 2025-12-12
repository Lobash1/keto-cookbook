import Link from "next/link";

type Props = {
  id: string;
  label: string;
};

export default function CategotyCard({ id, label }: Props) {
  return (
    <Link href={`/category/${id}`}>
      <div className="bg-ketoBlack border border-ketoRed rounded-xl p-6 hover:bg-ketoRed/20 transition text-center cursor-pointer shadow-lg hover:shadow-ketoRed/40">
        <p className="text-ketoWhite font-semibold text-lg">{label}</p>
      </div>
    </Link>
  );
}
