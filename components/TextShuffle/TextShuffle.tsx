'use client';

import React, { useEffect, useState, useRef, FC } from 'react';
import { gsap } from 'gsap';
import localFont from '@next/font/local';

const defaultBackgroundColor = '#008080';
const defaultTitle = 'sung';
const defaultDescription = 'Text shuffle using GSAP';

const MonotonFont = localFont({
  src: '../../assets/fonts/Monoton/Monoton-Regular.ttf',
});
const BlackOpsOneFont = localFont({
  src: '../../assets/fonts/BlackOpsOne/BlackOpsOne-Regular.ttf',
});

const TextShuffle: FC = () => {
  const itemsRef = useRef([]);
  const placeholderRef = useRef();
  const descriptionRef = useRef();

  const subHeaders = [
    'One is a wanderer.',
    'Two is a company.',
    'Three is a crowd',
    'Four is a party and five is a mob',
  ];

  useEffect(() => {
    itemsRef.current = document.querySelectorAll(
      '#item-1, #item-2, #item-3, #item-4'
    );
  }, []);

  useEffect(() => {
    if (!itemsRef.current || !itemsRef.current.length > 0) return;

    const items = itemsRef.current;

    function updatePlaceholderText(event, index) {
      const newText = event.target.textContent.toUpperCase();
      const itemIndex = index;
      const newDescriptionText = subHeaders[itemIndex].toUpperCase();

      descriptionRef.current.textContent = newDescriptionText;
      animateScale(placeholderRef.current, 1.125);
      shuffleLetters(newText);
    }

    items?.forEach((item) => {
      item.addEventListener('mouseover', changeColors);
      item.addEventListener('mouseout', revertColors);
    });

    items?.forEach((item, index) => {
      item.addEventListener('mouseover', (e) =>
        updatePlaceholderText(e, index)
      );
      item.addEventListener('mouseout', resetPlaceholderText);
    });

    function changeColors() {
      gsap.to('#container', { backgroundColor: '#000', duration: 0.5 });
      gsap.to('#placeholder, header, footer, p', {
        color: '#fff',
        duration: 0.5,
      });
    }

    function revertColors() {
      gsap.to('#container', {
        backgroundColor: defaultBackgroundColor,
        duration: 0.5,
      });
      gsap.to('#placeholder, header, footer, p', {
        color: '#000',
        duration: 0.5,
      });
    }

    function animateScale(element, scaleValue) {
      gsap.fromTo(
        element,
        { scale: 1 },
        { scale: scaleValue, duration: 2, ease: 'power1.out' }
      );
    }

    function wrapLetters(text) {
      placeholderRef.current.innerHTML = '';
      [...text].forEach((letter) => {
        const span = document.createElement('span');
        span.style.filter = 'blur(8px)';
        span.style.fontFamily = 'serif';
        span.textContent = letter;
        placeholderRef.current.appendChild(span);
      });
    }

    function animateBlurEffect() {
      const letters = placeholderRef.current.children;
      let index = 0;

      function clearNextLetter() {
        if (index < letters.length) {
          gsap.to(letters[index], { filter: 'blur(0px)', duration: 0.5 });
          index++;
          if (index < letters.length) {
            setTimeout(clearNextLetter, 100);
          }
        }
      }

      setTimeout(clearNextLetter, 0);
    }

    function shuffleLetters(finalText) {
      wrapLetters('');
      wrapLetters(finalText.replace(/./g, ' '));

      const textArray = finalText.split('');
      let shufflingCounter = 0;
      const intervalHandles = [];

      function shuffle(index) {
        if (!placeholderRef.current.children[index]) return; // 필요한가?

        if (shufflingCounter < 30) {
          textArray[index] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[
            Math.floor(Math.random() * 26)
          ];
          placeholderRef.current.children[index].textContent = textArray[index];
        } else {
          placeholderRef.current.children[index].textContent =
            finalText.charAt(index);
          clearInterval(intervalHandles[index]);
        }
      }

      for (let i = 0; i < finalText.length; i++) {
        intervalHandles[i] = setInterval(shuffle, 80, i);
      }

      setTimeout(() => {
        shufflingCounter = 30;
        for (let i = 0; i < finalText.length; i++) {
          if (!placeholderRef.current.children[i]) return; // 필요한가?

          placeholderRef.current.children[i].textContent = finalText.charAt(i);
          clearInterval(intervalHandles[i]);
        }
        animateBlurEffect();
      }, 1000);
    }

    function resetPlaceholderText() {
      descriptionRef.current.textContent = defaultDescription;
      animateScale(placeholderRef.current, 1.25);
      shuffleLetters(defaultTitle);
    }

    // clean-ups
    return () => {
      items?.forEach((item) => {
        item.removeEventListener('mouseover', changeColors);
        item.removeEventListener('mouseout', revertColors);
      });

      items?.forEach((item, index) => {
        item.removeEventListener('mouseover', (e) =>
          updatePlaceholderText(e, index)
        );
        item.removeEventListener('mouseout', resetPlaceholderText);
      });
    };
  });

  return (
    <main
      id="container"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'uppercase',
        background: defaultBackgroundColor,
      }}>
      <header
        style={{
          position: 'absolute',
          top: '5rem',
          width: '84%',
          display: 'flex',
          justifyContent: 'space-between',
          color: '#000',
        }}>
        <div
          id="item-1"
          className={MonotonFont.className}
          style={{ fontSize: '2.5rem' }}>
          one
        </div>
        <div
          id="item-2"
          className={MonotonFont.className}
          style={{ fontSize: '2.5rem' }}>
          two
        </div>
      </header>
      <footer
        style={{
          position: 'absolute',
          bottom: '5rem',
          width: '84%',
          display: 'flex',
          justifyContent: 'space-between',
          color: '#000',
        }}>
        <div
          id="item-3"
          className={MonotonFont.className}
          style={{ fontSize: '2.5rem' }}>
          three
        </div>
        <div
          id="item-4"
          className={MonotonFont.className}
          style={{ fontSize: '2.5rem' }}>
          four
        </div>
      </footer>

      <div
        className="header"
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <div
          id="placeholder"
          ref={placeholderRef}
          style={{
            fontFamily: 'serif',
            textAlign: 'center',
            letterSpacing: '.25rem',
            fontSize: '18rem',
            lineHeight: 1.25,
          }}>
          {defaultTitle}
        </div>
        <div>
          <p
            id="description"
            ref={descriptionRef}
            className={BlackOpsOneFont.className}
            style={{
              fontSize: '1.725rem',
              textTransform: 'none',
            }}>
            {defaultDescription}
          </p>
        </div>
      </div>
    </main>
  );
};

export default TextShuffle;
