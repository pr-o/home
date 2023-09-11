'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import Nav from 'components/Header/HeaderLinks';

interface Props {
  fixed?: boolean;
  color: string;
  changeColorOnScroll: {
    height: number;
    color: string;
  };
}

interface HeaderProps {
  color?: string;
  padding?: string;
}

const BRAND = 'Sung';

const Header = ({ fixed, color, changeColorOnScroll }: Props) => {
  const [headerColor, setHeaderColor] = useState(color);
  const [padding, setPadding] = useState('1.25rem');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!changeColorOnScroll) return;
    window.addEventListener('scroll', changeHeaderColor);
    return () => window.removeEventListener('scroll', changeHeaderColor);
  });

  const changeHeaderColor = () => {
    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      setHeaderColor(changeColorOnScroll.color);
      setPadding('.75rem');
    }
    if (windowsScrollTop <= changeColorOnScroll.height) {
      setHeaderColor(color);
      setPadding('1.25rem');
    }
  };

  return (
    <StyledHeader color={headerColor} padding={padding}>
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
  padding-top: ${({ padding }) => (padding ? padding : '.75rem')};
  padding-bottom: ${({ padding }) => (padding ? padding : '.75rem')};
  margin-bottom: 1rem;
  box-shadow: 0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 5px 5px -5px rgba(0, 0, 0, 0.15);
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
