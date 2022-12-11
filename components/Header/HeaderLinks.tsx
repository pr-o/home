'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

type Props = {
  isMobile: boolean;
  mobileMenuOpen: boolean;
};

const NavComponent = () => {
  // const isMobile = useCheckMobile();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Wrapper mobileMenuOpen={mobileMenuOpen}>
      <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{/* <MenuIcon /> */}</button>
      <NavMenu mobileMenuOpen={mobileMenuOpen}>
        <HeaderLinks />
      </NavMenu>
    </Wrapper>
  );
};

const HeaderLinks = () => {
  // const dispatch = useDispatch();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // const { theme } = useSelector((state: RootState) => ({ theme: state.theme }), shallowEqual);

  return (
    <nav>
      <ul>
        <li>
          {/* <Link href="/demo" passHref> */}
          <Menu>
            {/* <ThreeDRotationIcon /> */}
            <a>Three</a>
          </Menu>
          {/* </Link> */}
        </li>
        <li>
          {/* <Link href="/about" passHref> */}
          <Menu>
            {/* <ViewCarouselIcon /> */}
            <a>About</a>
          </Menu>
          {/* </Link> */}
        </li>
        <li>
          {/* <Link href="/github/whoisbusy" passHref> */}
          <Menu>{/* <GitHubIcon /> */}</Menu>
          {/* </Link> */}
        </li>
        <li>fff</li>
        <li>
          <Menu>{/* <AccountCircleIcon /> */}</Menu>
        </li>
      </ul>
    </nav>
  );
};

export default NavComponent;

const Menu = styled.div`
  display: flex;
  align-items: center;
  height: 2rem;
  margin: 0 0.5rem 0 0.75rem;
  font-size: 0.875rem;
  color: #fff;
  cursor: pointer;

  a {
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  svg + a {
    margin-left: 0.375rem;
  }
`;

const Wrapper = styled.div`
  button {
    display: none;
    border: none;
    color: inherit;
    background-color: transparent;
    cursor: pointer;
  }

  @media (max-width: 807px) {
    button {
      display: inline-block;
    }

    nav {
      position: absolute;
      top: 100%;
      right: 0;

      ul {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      li {
        width: 100%;
        background-color: #008080cc;
        display: flex;
        justify-content: center;
        padding: 0.25rem 0.5rem;
      }
      li:nth-of-type(1) {
        padding-top: 0.75rem;
      }
    }
  }
`;

const NavMenu = styled.div`
  align-items: center;
  line-height: 2rem;

  button {
    display: none;
    border: none;
    color: inherit;
    background-color: transparent;
  }

  @media (max-width: 807px) {
    button {
      display: inline-block;
    }
    nav {
      display: ${({ mobileMenuOpen }) => (mobileMenuOpen ? 'flex' : 'none')};
      position: absolute;
      top: 100%;
      right: 0;

      ul {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      li {
        width: 100%;
        background-color: #008080cc;
        display: flex;
        justify-content: center;
        padding: 0.25rem 0.5rem;
      }
    }
  }
`;
