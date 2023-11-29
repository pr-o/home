import React, { useEffect, useRef } from 'react';

import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { HomeIcon } from '@radix-ui/react-icons';
import { gsap } from 'gsap';
import { motion, usePresence } from 'framer-motion';

const HomeButton = ({ size }: { size: string }) => {
  const ref = useRef(null);
  const [isPresent, safeToRemove] = usePresence();
  const router = useRouter();

  useEffect(() => {
    if (!isPresent) {
      gsap.to(ref.current, {
        opacity: 0,
        onComplete: () => safeToRemove?.(),
      });
    }
  }, [isPresent, safeToRemove]);

  return (
    <HomeButtonWrapper ref={ref}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}>
        <button onClick={() => router.push('/')}>
          <HomeIcon width={size} height={size} />
        </button>
      </motion.div>
    </HomeButtonWrapper>
  );
};

export default HomeButton;

const HomeButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  padding: 2rem;

  button {
    color: #ccc;
    position: relative;
    background: transparent;
    border: none;
    &:hover {
      cursor: pointer;
      transform: skewX(-10deg);
    }
  }
`;
