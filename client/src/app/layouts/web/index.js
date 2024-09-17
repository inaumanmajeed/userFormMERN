import React from "react";
import { Container, NavBar, SideBar, ChildrenWrapper } from "./styles/styles";
import { Link } from "react-router-dom";

const LayoutMainWeb = ({ children }) => {
  return (
    <Container className="main__layout__wrapper">
      <NavBar className="main__layout__nav">
        <Link to="/">HOME</Link>
        <Link to="/update">Search & Update</Link>
      </NavBar>
      <SideBar className="main__layout__sidebar">Sidebar</SideBar>
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </Container>
  );
};

export default LayoutMainWeb;
