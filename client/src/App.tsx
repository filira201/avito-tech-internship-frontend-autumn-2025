import { HeroUIProvider } from "@heroui/react";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router";

import { AppLayout } from "@/components";
import { AdvertisementItemPage, AdvertisementListPage, ModerStatsPage } from "@/pages";
import { store } from "@/store";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
};

export const App = () => {
  return (
    <HeroUIProvider>
      <Provider store={store}>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<AdvertisementListPage />} />
              <Route path="item/:id" element={<AdvertisementItemPage />} />
              <Route path="stats" element={<ModerStatsPage />} />
            </Route>
            {/* TODO: добавить сраницу с ошибками */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </HeroUIProvider>
  );
};
