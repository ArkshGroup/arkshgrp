import Link from "next/link";
import { ReactNode, CSSProperties } from "react";

interface BreadcrumbItem {
  name: string;
  href?: string;
  icon?: ReactNode;
}

interface PageBannerProps {
  title: string;
  breadcrumb?: BreadcrumbItem[];
  bgColor?: string;
  textColor?: string;
  padding?: string; // e.g., "py-8 px-4" or "p-10"
  width?: string; // e.g., "w-full", "max-w-6xl"
  textAlign?: "left" | "center" | "right";
  style?: CSSProperties; // for any additional inline styles
}

const PageBanner: React.FC<PageBannerProps> = ({
  title,
  breadcrumb = [],
  bgColor = "#2257A6",
  textColor = "#ffffff",
  padding = "py-8",
  width = "w-full",
  textAlign = "center",
  style = {},
}) => {
  return (
    <section
      className={`${padding} ${width} text-${textAlign}`}
      style={{ backgroundColor: bgColor, color: textColor, ...style }}
    >
      <h1 className="text-6xl font-bold mb-5 tracking-tight">{title}</h1>

      {breadcrumb.length > 0 && (
        <div className="flex items-center justify-center gap-2 text-sm font-semibold">
          {breadcrumb.map((item, index) => (
            <span key={index} className="flex items-center gap-1">
              {item.icon && <span className="w-4 h-4">{item.icon}</span>}
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:underline transition-all"
                >
                  {item.name}
                </Link>
              ) : (
                <span className={index === 0 ? "" : "opacity-90"}>
                  {item.name}
                </span>
              )}
              {index < breadcrumb.length - 1 && (
                <span className="opacity-60">/</span>
              )}
            </span>
          ))}
        </div>
      )}
    </section>
  );
};

export default PageBanner;
