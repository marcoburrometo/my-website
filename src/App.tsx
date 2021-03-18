/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import DarkModeToggle from 'react-dark-mode-toggle';
import './App.css';
import Typist from 'react-typist';
import { Animated } from 'react-animated-css';

const themes = ['red', 'yellow', 'green', 'blue', 'purple', 'indigo', 'pink'];
const qualities = [
    'Dynamic',
    'Perfectionist',
    'Curious',
    'Enthusiastic',
    'Consistent',
    'Fancy',
    'Human',
    'Different',
    'Genial',
    'Open-minded',
    'Beautiful? 😎',
];

const qualitiesEl = qualities.map((q) => (
    <span key={q}>
        <span>{q}</span>
        <Typist.Backspace count={q.length} delay={100 * q.length} />
    </span>
));

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
        // setTimeout(() => {
        //     setArrowAnimationLoop(false);
        // }, 2000);
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

    return (
        <div className={`app bg-gray-100 dark:bg-gray-900 ${ready ? ' ready' : ''}`}>
            <DarkModeToggle className="theme-toggle" onChange={setIsDarkMode} checked={isDarkMode} size={60} />
            <div className="flex flex-col justify-center items-center bg-gray-300 dark:bg-gray-800 h-screen">
                <img alt="marco" className="h-40 w-40 rounded-full" src="/marco.jpg" />
                <span className={`text-4xl font-black mt-8 ${textColor}`}>Marco Burrometo</span>
                <div className="flex flex-row">
                    <span className="text-lg mt-8 dark:text-gray-200 text-gray-600">
                        {count ? (
                            <Typist
                                cursor={{
                                    element: (<span className={textColor}> | </span>) as any,
                                }}
                                onTypingDone={() => setCount(0)}
                                avgTypingDelay={40}
                            >
                                {qualitiesEl}
                            </Typist>
                        ) : (
                            ' '
                        )}
                    </span>
                    <span className="text-lg mt-8 ml-1 dark:text-gray-200 text-gray-600">software expert.</span>
                </div>
                <span className="text-lg mt-8 dark:text-gray-200 text-gray-600">
                    A passionate person based in Italy.
                </span>
                <span className="mt-28 cursor-pointer">
                    <Animated animationIn="tada" animationOut="rubberBand" isVisible={arrowAnimationLoop}>
                        <svg
                            className={`fill-current transform origin-center scale-150 ml-12 justify-center items-center ${textColor}`}
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
            <div className="mx-auto">aasdadasdas</div>
        </div>
    );
}

export default App;
