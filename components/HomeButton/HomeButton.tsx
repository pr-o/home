import React, { FC } from 'react';

import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { HomeIcon } from '@radix-ui/react-icons';

const HomeButton: FC = ({ size }: { size: string }) => {
  const router = useRouter();

  return (
    <HomeButtonWrapper>
      <button onClick={() => router.push('/')}>
        <HomeIcon width={size} height={size} />
      </button>
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
