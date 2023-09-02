import React from 'react';
import { useSelector } from 'react-redux';
import styles from '@/styles/Home.module.css'

const QuizOverview: React.FC = () => {
    const questions = useSelector((state: any) => state.questions);

    return (
        <div>
            <ul className={styles.overviewHeader}>
                {questions.map((question: any, index: number) => (
                    <li
                        key={index}
                        className={`${styles.questionIndicator} ${question.visited ? styles.visited : ''} ${question.attempted ? styles.attempted : ''} ${styles.list}`}
                    >
                        Question {index + 1}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuizOverview;
