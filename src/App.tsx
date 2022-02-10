/* eslint-disable no-nested-ternary */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import DarkModeToggle from 'react-dark-mode-toggle';
import './App.css';
import './effects.css';
import Typist from 'react-typist';
import { Canvas } from '@react-three/fiber';
import Experience from './Components/Experience/Experience';
import { qualities, experiences, skills } from './data';
import Skill from './Components/Skill/Skill';
import Image from './Components/HoverImage/Image';
import HelloText from './Components/HelloText/HelloText';
import Fluid from './Components/Fluid/Fluid';

const themes = ['red', 'yellow', 'green', 'blue', 'purple', 'indigo', 'pink'];

function App(): JSX.Element {
    const [ready, setReady] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.theme === 'dark' || localStorage.theme === '' || !('theme' in localStorage),
    );
    const [color, setColor] = useState(themes[Math.floor(Math.random() * themes.length)]);
    const [count, setCount] = useState(1);
    const [clicked, setClicked] = useState(false);
    const textColor = `text-${color}-500`;
    const bgColor = `bg-${color}-600`;

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        }
    }, [isDarkMode]);

    useEffect(() => {
        setTimeout(() => {
            setReady(true);
            setInterval(() => {
                setColor(themes[Math.floor(Math.random() * themes.length)]);
            }, 30 * 1000);
        }, 200);
    }, []);

    useEffect(() => {
        setCount(1);
    }, [count]);

    const qualitiesEl = qualities.map((q) => (
        <span key={q}>
            <span>{q}</span>
            <Typist.Backspace count={q.length} delay={100 * q.length} />
        </span>
    ));

    const header = (
        <div className="flex flex-col justify-center items-center bg-gray-300 dark:bg-gray-800 h-screen">
            <Canvas
                dpr={window.devicePixelRatio || 1}
                linear
                camera={{ fov: 75, position: [0, 0, 7] }}
                resize={{
                    scroll: false,
                    debounce: 400,
                }}
            >
                <Image url="./marco_full.jpg" width={4} />
            </Canvas>
            <div className="mt-8 dark:text-gray-50 text-gray-800 text-4xl font-black">
                {'Marco Burrometo'.split('').map((l, i) => (
                    <span
                        key={i.toString()}
                        className={`${l === 'M' ? 'glitch' : l === 'B' ? 'glitch-2' : ''}`}
                        data-text={l}
                    >
                        {l}
                    </span>
                ))}
            </div>
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
            <span className="text-md font-normal mt-8 dark:text-gray-400 text-gray-500">
                Just a passionate person based in Italy.
            </span>
            <span className="text-xs mt-28 mr-16 transform -rotate-90 dark:text-gray-400 text-gray-500">
                Scroll down
            </span>
            <span className="cursor-pointer mt-2">
                <svg
                    className={`hardware-acceleration animate-bounce fill-current transform origin-center ml-6 justify-center items-center ${textColor}`}
                    width="60"
                    height="60"
                    xmlns="http://www.w3.org/2000/svg"
                    fillRule="evenodd"
                    clipRule="evenodd"
                >
                    <path d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z" />
                </svg>
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
            <p className="text-gray-700 dark:text-gray-400">Vynil and Music addicted. 🎧</p>
            <p className="text-gray-700 dark:text-gray-400">Proud dachshund owner and lover. 🌭</p>
            <p className="text-gray-700 dark:text-gray-400">Captain and head fisher of a boat. 🚤🎣</p>
            <p className="text-gray-700 dark:text-gray-400">Rubber duck debugger. 🐤</p>
        </div>
    );

    return (
        <>
            <div className={`app bg-gray-100 dark:bg-gray-900 ${ready ? ' ready' : ''}`}>
                {window.innerWidth > 512 && (
                    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                    <div
                        onClick={() => setClicked(!clicked)}
                        // eslint-disable-next-line no-constant-condition
                        className={`fluid-canvas-container${clicked ? ' clicked' : ''}`}
                    >
                        <Fluid />
                    </div>
                )}
                <DarkModeToggle className="theme-toggle" onChange={setIsDarkMode} checked={isDarkMode} size={60} />
                {header}
                <p className="text-6xl sm:-ml-12 font-bold p-4 md:p-10 pb-0 md:px-40 mt-10 text-gray-800 dark:text-gray-200">
                    <HelloText isDarkMode={isDarkMode} />
                </p>
                <div className="grid grid-cols-1 p-5 md:p-10 md:px-40">{presentation}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 p-5 md:p-10 md:px-40 mt-20">
                    <div>
                        <p className="text-2xl sm:-ml-12 font-bold text-gray-700 dark:text-gray-400">
                            Work and experiences.
                        </p>
                        {experiences.map((e) => (
                            <Experience key={e.description} {...e} />
                        ))}
                    </div>
                    <div>
                        <div className="bg-gray-300 dark:bg-black p-8 rounded-lg">
                            <p className="text-gray-800 dark:text-gray-300 text-xl font-bold">My skills</p>
                            {skills.map((e, i) => (
                                <Skill key={e.description} {...e} delay={i * 50} />
                            ))}
                            <p className="text-gray-700 dark:text-gray-400 text-xs mt-3">...and still learning</p>
                        </div>
                    </div>
                </div>
            </div>
            <footer className={`${bgColor} p-20 md:px-40 px-8 flex flex-col justify-center items-center`}>
                {/* <img alt="marco" className="h-40 w-40 rounded-full" src="/marco.jpg" /> */}
                <Canvas linear dpr={window.devicePixelRatio || 1} camera={{ fov: 75, position: [0, 0, 7] }}>
                    <Image url="./marco_full.jpg" width={5} />
                </Canvas>
                <p className="text-xl font-bold p-10 pb-0 md:px-40 text-white text-center">Curious?</p>
                <a
                    href="mailto:marco.burrometo@gmail.com"
                    className="text-lg md:text-2xl font-bold text-gray-100 text-center effect-underline"
                >
                    marco.burrometo@gmail.com
                </a>
                <a href="/CV ENG.pdf" target="_blank" className="cv-button px-8 py-2 text-white mt-4">
                    Get my CV
                </a>
                <div className="w-full mt-20 flex flex-col center-justify items-center justify-between text-white">
                    <div className="flex flex-row mb-3">
                        <a
                            href="https://www.linkedin.com/in/marco-burrometo/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mr-2"
                        >
                            <svg
                                fill="#FFFFFF"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </a>
                        <a
                            href="https://www.instagram.com/marcoburrometo/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mr-2"
                        >
                            <svg
                                fill="#FFFFFF"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>
                        <a
                            href="https://github.com/marcoburrometo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mr-2"
                        >
                            <svg
                                fill="#FFFFFF"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-4.466 19.59c-.405.078-.534-.171-.534-.384v-2.195c0-.747-.262-1.233-.55-1.481 1.782-.198 3.654-.875 3.654-3.947 0-.874-.312-1.588-.823-2.147.082-.202.356-1.016-.079-2.117 0 0-.671-.215-2.198.82-.64-.18-1.324-.267-2.004-.271-.68.003-1.364.091-2.003.269-1.528-1.035-2.2-.82-2.2-.82-.434 1.102-.16 1.915-.077 2.118-.512.56-.824 1.273-.824 2.147 0 3.064 1.867 3.751 3.645 3.954-.229.2-.436.552-.508 1.07-.457.204-1.614.557-2.328-.666 0 0-.423-.768-1.227-.825 0 0-.78-.01-.055.487 0 0 .525.246.889 1.17 0 0 .463 1.428 2.688.944v1.489c0 .211-.129.459-.528.385-3.18-1.057-5.472-4.056-5.472-7.59 0-4.419 3.582-8 8-8s8 3.581 8 8c0 3.533-2.289 6.531-5.466 7.59z" />
                            </svg>
                        </a>
                        <a
                            href="https://stackoverflow.com/users/2343313/marco-burrometo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mr-2"
                        >
                            <svg
                                fill="#FFFFFF"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path d="M15 21h-10v-2h10v2zm6-11.665l-1.621-9.335-1.993.346 1.62 9.335 1.994-.346zm-5.964 6.937l-9.746-.975-.186 2.016 9.755.879.177-1.92zm.538-2.587l-9.276-2.608-.526 1.954 9.306 2.5.496-1.846zm1.204-2.413l-8.297-4.864-1.029 1.743 8.298 4.865 1.028-1.744zm1.866-1.467l-5.339-7.829-1.672 1.14 5.339 7.829 1.672-1.14zm-2.644 4.195v8h-12v-8h-2v10h16v-10h-2z" />
                            </svg>
                        </a>
                    </div>
                    <span className="text-xs md:text-sm">
                        🚀 {new Date().getFullYear()} © Marco Burrometo - VAT. 01214220319
                    </span>
                </div>
            </footer>
        </>
    );
}

export default App;
