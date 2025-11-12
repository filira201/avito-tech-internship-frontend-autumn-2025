import { Outlet } from "react-router";

export const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen h-full  w-full">
      <header>Header</header>
      <main className="flex-1 mx-auto max-w-[1252px] w-full p-[10px_round(up,1.22223%,.2rem)] sm:p-[15px_round(up,3.22223%,.2rem)] lg:p-[20px_round(up,7.22223%,.2rem)]">
        <Outlet />
      </main>
      <footer>Footer</footer>
    </div>
  );
};
