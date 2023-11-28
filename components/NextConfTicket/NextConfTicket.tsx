'use client';
import './NextConfTicket.css';

import React, { useEffect, useState, useRef, FC } from 'react';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import HomeButton from '@/components/HomeButton/HomeButton';

const avatarPath = '/images/nextConfTicket/sung_avatar.jpg';
const eventLogosPath = '/images/nextConfTicket/event-logos.png';
const gitHubHref = 'https://github.com/pr-o';

const NextConfTicket: FC = () => {
  const ticketRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const { x, y, width, height } = ticketRef.current.getBoundingClientRect();
    const centerPoint = { x: x + width / 2, y: y + height / 2 };

    function onMouseMove(e: MouseEvent) {
      if (!ticketRef.current) return;
      const degreeX = (e.clientY - centerPoint.y) * 0.04;
      const degreeY = (e.clientX - centerPoint.x) * -0.04;

      ticketRef.current.style.transform = `perspective(1000px) rotateX(${degreeX}deg) rotateY(${degreeY}deg)`;
    }

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div className="body">
      <HomeButton size={'32px'} />
      <div className="ticket-visual_visual" id="ticket" ref={ticketRef}>
        <div className="left"></div>
        <div className="right"></div>
        <div className="ticket-visual-wrapper">
          <div className="ticket-visual_profile">
            <div className="ticket-profile_profile">
              <img
                src={avatarPath}
                alt="sung-avatar"
                className="ticket-profile_image"
                draggable="false"
              />
              <div className="ticket-profile_text">
                <p className="ticket-profile_name">Sung Hah Hwang</p>
                <p className="ticket-profile_username">
                  <a
                    className="ticket-profile_link"
                    href={gitHubHref}
                    target="_blank"
                    rel="noopener noreferrer">
                    <span className="ticket-profile_githubIcon">
                      <GitHubLogoIcon />
                    </span>
                    pr-o
                  </a>
                </p>
              </div>
            </div>
            <div className="ticket-event">
              <img src={eventLogosPath} />
            </div>
          </div>
          <div className="ticket-visual_ticket-number-wrapper">
            <div className="ticket-visual_ticket-number">№ 008080</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextConfTicket;
