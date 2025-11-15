import classNames from "classnames";
import { memo } from "react";
import { NavLink } from "react-router";

const HEADER_NAV_LINKS = [
  {
    to: "/stats",
    label: "Аналитика",
    testId: "nav-link-analytics",
  },
];

type Props = {
  onClick?: () => void;
};

// eslint-disable-next-line prefer-arrow-callback
export const HeaderNavLinksList = memo(function HeaderNavLinksList({ onClick }: Props) {
  return (
    <>
      {HEADER_NAV_LINKS.map(({ to, label, testId }) => (
        <NavLink
          key={to}
          to={to}
          onClick={onClick}
          data-testid={testId}
          className={({ isActive }) =>
            classNames("font-medium text-lg transition-colors hover:text-blue-600", {
              "text-blue-500": isActive,
            })
          }
        >
          {label}
        </NavLink>
      ))}
    </>
  );
});
