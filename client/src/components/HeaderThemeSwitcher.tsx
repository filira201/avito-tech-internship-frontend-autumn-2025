import { Switch } from "@heroui/react";
import { Moon, Sun } from "lucide-react";

import { toggleTheme, useAppDispatch, useAppSelector } from "@/store";

export const HeaderThemeSwitcher = () => {
  const darkMode = useAppSelector((state) => state.theme.darkMode);
  const dispatch = useAppDispatch();

  const handleToggleMode = () => {
    dispatch(toggleTheme());
  };

  return (
    <Switch
      isSelected={!darkMode}
      onValueChange={handleToggleMode}
      endContent={<Sun />}
      startContent={<Moon />}
      size="lg"
    />
  );
};
