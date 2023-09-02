import React, { useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css'

interface CountdownTimerProps {
    duration: number; // Duration in seconds
    onTimeout: () => void; // Callback function when timer reaches 0
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ duration, onTimeout }) => {
    const [timeRemaining, setTimeRemaining] = useState(duration);

    useEffect(() => {
        if (timeRemaining <= 0) {
            onTimeout();
            return;
        }

        const timer = setInterval(() => {
            setTimeRemaining((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeRemaining, onTimeout]);

    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    return (
        <div>
            <b>Time Remaining:</b> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
    );
};

export default CountdownTimer;
