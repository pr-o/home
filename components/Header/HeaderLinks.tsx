'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import HamburgerMenu from '@/assets/icons/HamburgerMenu';
import useCheckMobile from '@/hooks/useCheckMobile';

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
  return (
    <nav>
      <ul>
        <li>
          <Menu href="/" passHref>
            home
          </Menu>
        </li>
        <li>
          <Menu href="/check" passHref>
            check
          </Menu>
        </li>
        <li>
          <Menu href="/about" passHref>
            about
          </Menu>
        </li>
        <li>
          <Menu href="/" passHref>
            1
          </Menu>
        </li>
        <li>
          <Menu href="/" passHref>
            {/* <ViewCarouselIcon /> */}2
          </Menu>
        </li>
        <li>
          <Menu href="/" passHref>
            3
          </Menu>
        </li>
      </ul>
    </nav>
  );
};

export default NavComponent;

const Menu = styled(Link)`
  display: flex;
  align-items: center;
  height: 2rem;
  margin: 0 0.5rem 0 0.75rem;
  font-size: 0.875rem;
  cursor: pointer;

  & > svg {
    margin-left: 0.375rem;
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
      padding: 0.25rem 0.5rem;
    }
  }
`;
