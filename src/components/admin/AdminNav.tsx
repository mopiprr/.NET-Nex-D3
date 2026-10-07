"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/products", label: "Produk" },
  { href: "/admin/orders", label: "Order" },
];

function NavLinks({ pathname, links, }: { pathname: string | null; links: typeof LINKS; }) {
  return (
    <nav className="flex flex-col gap-1 px-3">
      {links.map(({ href, label }) => {
        const active =
          pathname !== null &&
          (href === "/admin" ? pathname === href : pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`rounded-lg px-3 py-2 font-medium ${
              active ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function AdminNav({
  canManageProducts = false,
}: {
  canManageProducts?: boolean;
}) {
  const links = LINKS.filter(
    (l) => l.href !== "/admin/products" || canManageProducts,
  );
  return <NavLinks pathname={usePathname()} links={links} />;
}

// Shown in the static shell until the URL is known (no link highlighted yet)
export function AdminNavFallback() {
  const links = LINKS.filter((l) => l.href !== "/admin/products");
  return <NavLinks pathname={null} links={links} />;
}
