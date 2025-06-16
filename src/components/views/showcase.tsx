'use client';

import { useTransitionRouter } from 'next-view-transitions';
import { useEffect, useRef, useState } from 'react';

import { DraggableContainer, GridBody, GridItem } from '@/components/ui/infinite-drag-scroll';
import { IMAGES } from '@/lib/constants';

export const Showcase = () => {
  const router = useTransitionRouter();
  const hoverTimers = useRef<{ [key: number]: NodeJS.Timeout }>({});
  const [isDragging, setIsDragging] = useState(false);

  const handleNavigate = (id: number) => {
    if (!isDragging) {
      router.push(`/showcase/${id}`);
    }
  };

  const handleMouseLeave = (id: number) => {
    if (hoverTimers.current[id]) {
      clearTimeout(hoverTimers.current[id]);
      delete hoverTimers.current[id];
    }

    setIsDragging(false);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (event.buttons === 1) {
      // Check if left mouse button is pressed
      setIsDragging(true);
    }
  };

  useEffect(() => {
    return () => {
      Object.values(hoverTimers.current).forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return (
    <>
      <DraggableContainer variant="masonry">
        <GridBody>
          {IMAGES.map((image) => (
            <GridItem key={image.id} className="relative h-54 w-36 md:h-96 md:w-64">
              <div
                role="button"
                tabIndex={0}
                aria-label={`View details for image ${image.id}`}
                onMouseLeave={() => handleMouseLeave(image.id)}
                onMouseMove={handleMouseMove}
                onClick={() => handleNavigate(image.id)}
                className="focus:ring-primary absolute inset-0 z-10 focus:ring-2 focus:outline-none"
              />
              <img
                src={image.src}
                alt={image.alt}
                className="pointer-events-none absolute h-full w-full object-cover"
              />
            </GridItem>
          ))}
        </GridBody>
      </DraggableContainer>
    </>
  );
};
