import React from 'react';

export interface ExperienceDef {
    period: string;
    place: string;
    description: string;
    technologies: string;
}

const Experience = ({ description, period, place, technologies }: ExperienceDef): JSX.Element => (
    <>
        <div className="flex text-sm font-semibold flex-row justify-between text-gray-800 dark:text-gray-300 mt-5">
            <span>{period}</span>
            <span>{place}</span>
        </div>
        <p className="text-gray-700 dark:text-gray-400 mt-1">{description}</p>
        <p className="text-sm text-gray-500 dark:text-gray-500">{technologies}</p>
    </>
);
export default Experience;
