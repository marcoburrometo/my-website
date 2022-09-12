/* eslint-disable react-native/no-inline-styles */
import React, { memo } from 'react';
import { useInView } from 'react-cool-inview';
import './Skill.css';

export interface SkillDef {
    pct: number;
    description: string;
}

interface Props extends SkillDef {
    delay: number;
}

function Skill({ description, pct, delay }: Props): JSX.Element {
    const { observe, inView } = useInView();
    return (
        <div ref={observe} className="skill">
            <div className="description text-gray-800 dark:text-gray-300 text-sm mt-5">{description}</div>
            <div className={`bar h-1 rounded-sm ${inView ? ' show' : ''}`}>
                <div
                    className="bar-bg bg-gray-400 dark:bg-gray-500"
                    style={{
                        left: inView ? `${pct}%` : 0,
                        transitionDelay: `${delay}ms`,
                    }}
                />
            </div>
        </div>
    );
}
export default memo(Skill);
