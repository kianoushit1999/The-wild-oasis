import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

// Adding react Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="users" element={<Users />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="settings" element={<Settings />} />
            <Route path="account" element={<Account />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={8}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
            theme: {
              primary: "green",
            },
          },
          style: {
            fontSize: '1.3rem',
            maxWidth: '50rem',
            padding: '1.6rem 2.4rem',
            backgroundColor: 'var(--color-grey-0)',
            color: "var(--color-grey-700)"
          }
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
