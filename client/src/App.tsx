import { Button, HeroUIProvider } from "@heroui/react";

export const App = () => {
  return (
    <HeroUIProvider>
      <div>
        <Button>Click me</Button>
      </div>
    </HeroUIProvider>
  );
};
