import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import { useCallback, useState } from "react";

import { HeaderBrandLink } from "./HeaderBrandLink";
import { HeaderNavLinksList } from "./HeaderNavLinksList";
import { HeaderThemeSwitcher } from "./HeaderThemeSwitcher";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClose = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <Navbar disableAnimation isBordered isBlurred={false} isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle className="cursor-pointer" aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"} />
        <NavbarBrand>
          <HeaderBrandLink brandText="СМО" onClick={handleMenuClose} />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex" justify="start">
        <NavbarBrand>
          <HeaderBrandLink brandText="СМО" />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:block">
          <HeaderNavLinksList />
        </NavbarItem>
        <NavbarItem>
          <HeaderThemeSwitcher />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="flex">
        <NavbarMenuItem>
          <HeaderNavLinksList onClick={handleMenuClose} />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};
