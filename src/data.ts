import { ExperienceDef } from './Components/Experience/Experience';
import { SkillDef } from './Components/Skill/Skill';

export const qualities = [
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
export const experiences: ExperienceDef[] = [
    {
        period: '01/2021 - Now',
        description: 'Cross-platform social network tool focused on video editing.',
        place: '@Levuro AG, Zurich, CH',
        technologies: 'React, redux-saga, Jest, Typescript, less, storybook.',
    },
    {
        period: '03/2022 - Now',
        description:
            'Lead a team of 5 people, taking care of the infrastructural part of a sport news application (iOS/android) with news articles, photos and video galleries, live matches, dynamic notifications, whitelabel (2 applications with the same code source) and complex adv management. ~ 150k daily users, good reviews.',
        place: '@Sentry',
        technologies: 'React-native, redux-toolkit, Typescript, storybook.',
    },
    {
        period: '01/2020 - Now',
        description: 'Web platform for smart warehouses.',
        place: '@MDS',
        technologies: 'React, redux-toolkit, nodejs, express, Typescript, scss, socket-io.',
    },
    {
        period: '02/2021 - 09/2021',
        description: 'AR Application WWI.',
        place: '@Comune di Asiago',
        technologies: 'React-native, redux-toolkit, Typescript, scss, Viro AR.',
    },
    {
        period: '02/2019 - 12/2020',
        description: 'Data-visualization Framework; Several web and react-native apps.',
        place: '@Visup, Gemona del Friuli, IT',
        technologies: 'React, React-native, Angular, Typescript, nodejs, scss, sass, redux-toolkit.',
    },
    {
        period: '05/2016 - 01/2019',
        description: 'Cross platform ERP; UI Web framework.',
        place: '@Wolters Kluwer, Bassano del Grappa, IT',
        technologies: 'Typescript, C#, less.',
    },
    {
        period: '05/2012 - 05/2016',
        description: 'IT Guy, several web projects.',
        place: '@Biotec SRL, Dueville(VI), IT',
        technologies: 'HTML standards, Boostrap, Javascript, php, C#.',
    },
    {
        period: '2018 - 2019',
        description: 'Quotation system for road transportation; Coffee machine wallet web-app (PWA), Many more...',
        place: '',
        technologies: 'React, HTML standards, Bootstrap, Javascript, php, C#.',
    },
];

export const skills: SkillDef[] = [
    { description: 'HTML', pct: 100 },
    { description: 'Javascript/Typescript 💙', pct: 100 },
    { description: 'React', pct: 100 },
    { description: 'React Native', pct: 95 },
    { description: 'css, sass, less, scss', pct: 95 },
    { description: 'Redux, Redux-saga, Redux-toolkit', pct: 90 },
    { description: 'NodeJs, Expressjs', pct: 90 },
    { description: 'Augmented Reality with Viro, Unity', pct: 80 },
    { description: 'Firebase/firestore', pct: 70 },
    { description: 'SQL', pct: 70 },
    { description: 'C#', pct: 60 },
    { description: 'Php', pct: 50 },
    { description: 'Logic Pro X, Pro Tools', pct: 90 },
    { description: 'Photoshop', pct: 70 },
];
