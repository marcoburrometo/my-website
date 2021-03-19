/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import DarkModeToggle from 'react-dark-mode-toggle';
import './App.css';
import './Glitch.css';
import Typist from 'react-typist';
import { Animated } from 'react-animated-css';
import Experience from './Experience';
import { qualities, experiences } from './data';

const themes = ['red', 'yellow', 'green', 'blue', 'purple', 'indigo', 'pink'];

function App(): JSX.Element {
    const [ready, setReady] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.theme === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches),
    );
    const [color, setColor] = useState(themes[Math.floor(Math.random() * themes.length)]);
    const [count, setCount] = useState(1);
    const [arrowAnimationLoop, setArrowAnimationLoop] = useState(true);

    const textColor = `text-${color}-500`;

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.theme = '';
        }
    }, [isDarkMode]);

    useEffect(() => {
        setTimeout(() => {
            setReady(true);
            setInterval(() => {
                setColor(themes[Math.floor(Math.random() * themes.length)]);
            }, 10 * 1000);
        }, 200);
    }, []);

    useEffect(() => {
        setCount(1);
    }, [count]);

    useEffect(() => {
        setTimeout(
            () => {
                setArrowAnimationLoop(!arrowAnimationLoop);
            },
            arrowAnimationLoop ? 2000 : 2000,
        );
    }, [arrowAnimationLoop]);

    const qualitiesEl = qualities.map((q) => (
        <span key={q}>
            <span>{q}</span>
            <Typist.Backspace count={q.length} delay={100 * q.length} />
        </span>
    ));

    const header = (
        <div className="flex flex-col justify-center items-center bg-gray-300 dark:bg-gray-800 h-screen">
            <img alt="marco" className="h-40 w-40 rounded-full" src="/marco.jpg" />
            <span
                className={`text-4xl font-black mt-8 glitch ${
                    qualitiesEl.length === 2 ? textColor : 'dark:text-gray-50 text-gray-800'
                }`}
                data-text="Marco Burrometo"
            >
                Marco Burrometo
            </span>
            <div className="flex flex-row">
                <span className="text-lg mt-8 dark:text-gray-200 text-gray-600 font-semibold">
                    {count ? (
                        <Typist
                            cursor={{
                                element: (<span className={textColor}> | </span>) as any,
                            }}
                            onTypingDone={() => setCount(0)}
                            avgTypingDelay={50}
                        >
                            {qualitiesEl}
                        </Typist>
                    ) : (
                        ' '
                    )}
                </span>
                <span className="text-lg mt-8 ml-1 dark:text-gray-200 text-gray-600 font-semibold">
                    software expert.
                </span>
            </div>
            <span className="text-lg mt-8 dark:text-gray-200 text-gray-600 font-semibold">
                A passionate person based in Italy.
            </span>
            <span className="mt-28 cursor-pointer">
                <Animated animationIn="tada" animationOut="rubberBand" isVisible={arrowAnimationLoop}>
                    <svg
                        className={`hardware-acceleration fill-current transform origin-center scale-150 ml-12 justify-center items-center ${textColor}`}
                        width="60"
                        height="60"
                        xmlns="http://www.w3.org/2000/svg"
                        fillRule="evenodd"
                        clipRule="evenodd"
                    >
                        <path d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z" />
                    </svg>
                </Animated>
            </span>
        </div>
    );
    const presentation = (
        <div>
            <p className="text-gray-700 dark:text-gray-400">
                I&apos;m <b>Marco Burrometo</b>, nice to meet you!
                {/* 👋 */}
            </p>
            <p className="text-gray-700 dark:text-gray-400 mt-5">
                Born in 1992. Based in northern Italy 🇮🇹. Citizen of the world 🌍.
            </p>
            <p className="text-gray-700 dark:text-gray-400 mt-5">My greatest passions are Technology and Music.</p>
            <p className="text-gray-700 dark:text-gray-400 mt-5">
                I like to put user experience in first place and focus on customer&apos;s needs to archieve the best
                results. I have fun creating unique things and keeping myself updated on newest technologies..
            </p>
            <p className="text-gray-700 dark:text-gray-400 mt-5">Bass guitar player since I was 15.</p>
            <p className="text-gray-700 dark:text-gray-400">Vynil addicted. 🎧</p>
            <p className="text-gray-700 dark:text-gray-400">Proud dachshund owner and lover. 🌭</p>
            <p className="text-gray-700 dark:text-gray-400">Rubber duck debugger. 🐤.</p>
            <p
                className="text-2xl font-bold mt-20 text-gray-700 dark:text-gray-400"
                style={{
                    marginLeft: -40,
                }}
            >
                Work and experiences.
            </p>
            {experiences.map((e) => (
                <Experience {...e} />
            ))}
        </div>
    );

    return (
        <>
            <div className={`app bg-gray-100 dark:bg-gray-900 ${ready ? ' ready' : ''}`}>
                <DarkModeToggle className="theme-toggle" onChange={setIsDarkMode} checked={isDarkMode} size={60} />
                {header}
                <p
                    className="text-6xl font-bold p-10 pb-0 md:px-40 text-gray-700 dark:text-gray-400"
                    style={{
                        marginLeft: -40,
                    }}
                >
                    Hello.
                </p>
                <div className="grid grid-cols-2 gap-12 p-10 md:px-40 px-8">
                    {presentation}
                    <div>
                        <div className="bg-gray-300 dark:bg-black p-8 rounded-lg">
                            <p className="text-gray-700 dark:text-gray-400 font-bold text-right">My skills</p>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="bg-pink-600 p-20">footer</footer>
        </>
    );
}

export default App;
