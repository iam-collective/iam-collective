import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { Author, BackgroundImage, ImageCard, OverlayText, Quote } from '../home/HomePage.styled';
import * as backgrounds from '../../assets/background';

interface BannerItem {
  src: string;
  title: string;
  author: string;
}

const bannerItems: BannerItem[] = [
  {
    src: backgrounds.first,
    title: 'First learn how to stand up for yourself, then learn how to stand up for someone else.',
    author: 'Maya Angelou',
  },
  {
    src: backgrounds.second,
    title: 'Silence protects the problem. Speaking up protects the people.',
    author: 'Audre Lorde',
  },
  {
    src: backgrounds.third,
    title: 'Technology should never be a weapon — it should be a shield.',
    author: 'Sheryl Sandberg',
  },
  {
    src: backgrounds.fourth,
    title: 'Your story might be the key that unlocks someone else’s freedom.',
    author: 'Chimamanda Ngozi Adichie',
  },
  {
    src: backgrounds.fifth,
    title: 'When we learn better, we do better — and we hurt each other less.',
    author: 'Nelson Mandela',
  },
];

const Banner: React.FC<{ children: ReactElement }> = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animateText, setAnimateText] = useState(true);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const changeSlide = (nextIndex: number) => {
    setAnimateText(false);
    setTimeout(() => {
      setActiveIndex(nextIndex);
      setAnimateText(true);
    }, 50);
  };

  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      changeSlide((activeIndex + 1) % bannerItems.length);
    }, 5000);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const delta = touchStartX.current - touchEndX.current;
      const swipeThreshold = 50;
      if (delta > swipeThreshold) {
        changeSlide((activeIndex + 1) % bannerItems.length);
      } else if (delta < -swipeThreshold) {
        changeSlide((activeIndex - 1 + bannerItems.length) % bannerItems.length);
      }
    }
    startAutoSlide();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [activeIndex]);

  return (
    <ImageCard
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {bannerItems.map((item, index) => (
        <BackgroundImage
          key={index}
          src={item.src}
          alt={`Slide ${index + 1}`}
          style={{
            opacity: index === activeIndex ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      ))}

      <OverlayText>
        <Quote $animate={animateText}>{bannerItems[activeIndex].title}</Quote>
        <Author $animate={animateText}>– {bannerItems[activeIndex].author}</Author>
      </OverlayText>

      {children}
    </ImageCard>
  );
};

export default Banner;
