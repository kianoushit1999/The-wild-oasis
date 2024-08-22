import { Outlet } from "react-router-dom";
import Header from "../pages/Header";
import Sidebar from "../pages/Sidebar";
import styled from "styled-components";

const AppLayoutStyle = styled.div`
    display: grid;
    height: 100vh;
    grid-template-columns: 26rem 1fr;
    grid-template-rows: auto 1fr;
`

const Main = styled.main`
  background-color: #eee;
  height: 100%;
  width: 100%;
`;

function AppLayout() {
  return (
    <AppLayoutStyle>
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </AppLayoutStyle>
  );
}

export default AppLayout;
