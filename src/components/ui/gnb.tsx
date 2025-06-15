'use client';

import { HouseIcon, MenuIcon, XIcon } from 'lucide-react';
import { useTransitionRouter } from 'next-view-transitions';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import { GitHubLogo } from '@/components/svg/github-logo';
import { LinkedInLogo } from '@/components/svg/linked-in-logo';
import { links } from '@/lib/constants';

const AnimatedNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const router = useTransitionRouter();
  const pathname = usePathname();

  const defaultTextColor = 'text-gray-200 font-semibold';
  const hoverTextColor = 'text-white font-bold';
  const textSizeClass = 'text-sm';

  return (
    <Link
      href={href}
      onClick={(e) => {
        e.preventDefault();
        if (pathname === href) {
          return;
        }
        router.push(href, {
          onTransitionReady: () => pageAnimation(),
        });
      }}
      className={`group relative flex inline-block h-5 items-center overflow-hidden ${textSizeClass}`}
    >
      <div className="flex transform flex-col transition-transform duration-400 ease-out group-hover:-translate-y-1/2">
        <span className={defaultTextColor}>{children}</span>
        <span className={hoverTextColor}>{children}</span>
      </div>
    </Link>
  );
};

const pageAnimation = () => {
  document.documentElement.animate(
    [
      {
        opacity: 1,
        scale: 1,
        transform: 'translateY(0)',
      },
      {
        opacity: 0.5,
        scale: 0.9,
        transform: 'translateY(-100px)',
      },
    ],
    {
      duration: 1000,
      easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
      fill: 'forwards',
      pseudoElement: '::view-transition-old(root)',
    },
  );

  document.documentElement.animate(
    [
      {
        transform: 'translateY(100%)',
      },
      {
        transform: 'translateY(0)',
      },
    ],
    {
      duration: 1000,
      easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
      fill: 'forwards',
      pseudoElement: '::view-transition-new(root)',
    },
  );
};

export function GNB() {
  const router = useTransitionRouter();
  const pathname = usePathname();
  console.log('pathname', pathname);
  const [isOpen, setIsOpen] = useState(false);
  const [headerShapeClass, setHeaderShapeClass] = useState('rounded-full');
  const shapeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (shapeTimeoutRef.current) {
      clearTimeout(shapeTimeoutRef.current);
    }

    if (isOpen) {
      setHeaderShapeClass('rounded-xl');
    } else {
      shapeTimeoutRef.current = setTimeout(() => {
        setHeaderShapeClass('rounded-full');
      }, 300);
    }

    return () => {
      if (shapeTimeoutRef.current) {
        clearTimeout(shapeTimeoutRef.current);
      }
    };
  }, [isOpen]);

  const navLinksData = [
    { label: 'Showcase', href: '/showcase' },
    { label: 'Link 2', href: '#2' },
    { label: 'Link 3', href: '#3' },
    { label: 'Link 4', href: '#4' },
    { label: 'Link 5', href: '#5' },
  ];

  const linkedInLogo = (
    <a target="_blank" href={links.linkedIn} rel="noopener noreferrer">
      <div className="w-full rounded-full border border-[#ccc] bg-gray-100 px-4 py-2 text-xs text-gray-300 transition-colors duration-200 hover:border-white/50 hover:text-white sm:w-auto sm:px-3 sm:text-sm">
        <LinkedInLogo className="h-6 w-6" />
      </div>
    </a>
  );

  const gitHubLogo = (
    <div className="group relative w-full sm:w-auto">
      <div className="pointer-events-none absolute inset-0 -m-2 hidden rounded-full bg-gray-100 opacity-40 blur-lg filter transition-all duration-300 ease-out group-hover:-m-3 group-hover:opacity-60 group-hover:blur-xl sm:block"></div>
      <a target="_blank" href={links.github} rel="noopener noreferrer">
        <div className="relative z-10 w-full rounded-full bg-gradient-to-br from-gray-100 to-gray-300 px-4 py-2 text-xs font-semibold text-black transition-all duration-200 hover:from-gray-200 hover:to-gray-400 sm:w-auto sm:px-3 sm:text-sm">
          <GitHubLogo className="h-6 w-6" />
        </div>
      </a>
    </div>
  );

  return (
    <header
      className={`fixed top-12 left-1/2 z-20 flex -translate-x-1/2 transform flex-col items-center py-3 pr-6 pl-6 backdrop-blur-sm ${headerShapeClass} w-[calc(100%-2rem)] border border-[#333] bg-[#00606044] transition-[border-radius] duration-0 ease-in-out sm:w-auto dark:bg-[#1f1f1f57]`}
    >
      <div className="flex w-full items-center justify-between gap-x-6 sm:gap-x-8">
        <a
          href={'/'}
          onClick={(e) => {
            e.preventDefault();
            if (pathname === '/') {
              return;
            }
            router.push('/', {
              onTransitionReady: () => pageAnimation(),
            });
          }}
        >
          <HouseIcon className="h-7 w-7" color="#ccc" strokeWidth={1} />
        </a>

        <nav className="hidden items-center space-x-4 text-sm sm:flex sm:space-x-6">
          {navLinksData.map((link) => (
            <AnimatedNavLink key={link.href} href={link.href}>
              {link.label}
            </AnimatedNavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-2 sm:flex sm:gap-3">
          {linkedInLogo}
          {gitHubLogo}
        </div>
        <button
          className="flex h-8 w-8 items-center justify-center text-gray-300 focus:outline-none sm:hidden"
          onClick={toggleMenu}
          aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
        >
          {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>
      <div
        className={`flex w-full flex-col items-center overflow-hidden transition-all duration-300 ease-in-out sm:hidden ${
          isOpen ? 'max-h-[1000px] pt-4 opacity-100' : 'pointer-events-none max-h-0 pt-0 opacity-0'
        }`}
      >
        <nav className="flex w-full flex-col items-center space-y-4 text-base">
          {navLinksData.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="w-full text-center text-gray-300 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="mt-4 flex w-full flex-col items-center space-y-4">
          {linkedInLogo}
          {gitHubLogo}
        </div>
      </div>
    </header>
  );
}
