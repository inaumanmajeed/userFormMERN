import React from "react";
import RoutesMain from "app/routes/routes";
import "app/assets/styles/reset.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const index = () => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RoutesMain />
      </QueryClientProvider>
    </>
  );
};

export default index;
