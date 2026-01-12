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
    <nav className="mb-8 text-xs sm:text-sm">
      <ol
        className="
          inline-flex items-center gap-1 sm:gap-2
          rounded-full px-3 sm:px-4 py-1.5
          border
          shadow-sm
          backdrop-blur
        "
        style={{
          background: "var(--card-bg)",
          borderColor: "var(--card-border)",
          color: "var(--foreground)",
        }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1 sm:gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="
                    px-2 py-1 rounded-full
                    transition
                    hover:text-ketoGold hover:bg-ketoGold/10
                    max-w-[140px] sm:max-w-none truncate
                  "
                  style={{ color: "var(--foreground)" }}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className="
                    px-2 py-1 rounded-full font-semibold 
                    bg-ketoGold/10 text-ketoGold
                    max-w-[140px] sm:max-w-none truncate
                  "
                >
                  {item.label}
                </span>
              )}

              {!isLast && (
                <span className="text-[10px] sm:text-xs opacity-60">›</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
