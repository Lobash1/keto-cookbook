import Link from "next/link";

type Crumb = {
  label: string;
  href?: string;
};

type Props = {
  items: Crumb[];
};

export default function Breadcrumbs({ items }: Props) {
  return (
    <nav className="text-sm text-white/60 mb-8">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => (
          <li key={index} className="flax items-center gap-1">
            {item.href ? (
              <Link href={item.href} className="hover:text-ketoGold transition">
                {item.label}
              </Link>
            ) : (
              <span className="text-white">{item.label}</span>
            )}

            {index < items.length - 1 && <span>→</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
