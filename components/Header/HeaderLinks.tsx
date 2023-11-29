'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import HamburgerMenu from '@/assets/icons/HamburgerMenu';
import useCheckMobile from '@/hooks/useCheckMobile';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

type Props = {
  isMobile: boolean;
  mobileMenuOpen: boolean;
};

const NavComponent = () => {
  const isMobile = useCheckMobile();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Wrapper>
      {!isMobile ? (
        <HeaderLinks />
      ) : (
        <>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <HamburgerMenu onClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
          </button>
          <NavMenu>
            <HeaderLinks />
          </NavMenu>
        </>
      )}
    </Wrapper>
  );
};

const HeaderLinks = () => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <nav>
      <ul>
        <li>
          <Button
            onClick={() =>
              setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
            }>
            {resolvedTheme === 'light' ? (
              <MoonIcon width="28px" height="28px" />
            ) : (
              <SunIcon width="28px" height="28px" />
            )}
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default NavComponent;

const Button = styled.button`
  display: flex;
  align-items: center;
  height: 2rem;
  margin: 0 0.5rem 0 0.75rem;
  font-size: 0.875rem;
  cursor: pointer;

  & svg {
    margin-left: 0.375rem;
    width: 28px;
    height: 28px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  button {
    width: 24px;
    height: 24px;
    border: none;
    color: inherit;
    background-color: transparent;
    cursor: pointer;
  }
`;

const NavMenu = styled.div`
  nav {
    display: flex;
    align-items: center;
    position: absolute;
    top: 100%;
    right: 3%;

    ul {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    li {
      width: 100%;
      background-color: #eee;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.25rem 0.5rem;
    }
  }
`;
