import { Link } from "react-router";

const HEADER_BRAND_LINK_PROPS = {
  to: "/list",
  "aria-label": "Перейти на главнаю страницу",
  className: "font-bold text-large transition-colors hover:text-foreground-500",
} as const;

type Props = {
  onClick?: () => void;
  brandText: string;
};

export const HeaderBrandLink = ({ onClick, brandText }: Props) => {
  return (
    <Link {...HEADER_BRAND_LINK_PROPS} onClick={onClick}>
      {brandText}
    </Link>
  );
};
