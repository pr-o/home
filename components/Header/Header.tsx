'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import Nav from 'components/Header/HeaderLinks';

interface Props {
  color: string;
  changeColorOnScroll?: {
    height: number;
    color: string;
  };
}

interface HeaderProps {
  color?: string;
  padding?: string;
}

const BRAND = 'Sung';

const Header = ({ color, changeColorOnScroll }: Props) => {
  return (
    <StyledHeader>
      <Left>
        <Brand>
          <Link href="/">{BRAND}</Link>
        </Brand>
      </Left>
      <Center>Copyright © 2023</Center>
      <Right>
        <Nav />
      </Right>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  position: fixed;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  min-height: 3rem;
  padding: 0.75rem clamp(1rem, 4%, 10rem);
  color: var(--fg);
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 1px 0px var(--fg), 0 1px 1px -1px var(--fg);
  transition: all 300ms ease 0s;
  z-index: 999;
  user-select: none;

  & nav > ul {
    display: flex;
    list-style: none;
  }
`;

const Left = styled.div`
  display: grid;
  grid-column: 1 / 2;
  justify-content: flex-start;
`;

const Center = styled.div`
  display: grid;
  grid-column: 2 / 3;
  justify-content: center;
  font-size: 0.625rem;
`;

const Right = styled.div`
  display: grid;
  grid-column: 3 / 4;
  justify-content: flex-end;
`;

const Brand = styled.div`
  font-size: 1.25rem;
  font-weight: 100;
  line-height: 2rem;
`;

const MobileMenu = styled.div`
  display: none;
  line-height: 2rem;
  @media (max-width: 807px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Menus = styled.div`
  display: flex;
  @media (max-width: 807px) {
    display: none;
  }
`;
