import React from 'react';
import { useDispatch } from 'react-redux';
import { markQuestionVisited } from '../redux/actions';
import styles from '@/styles/Home.module.css'
import { Button } from 'antd';

interface QuestionNavigationProps {
    questionCount: number;
    scrollToQuestion: (index: number) => void;
}

const QuestionNavigation: React.FC<QuestionNavigationProps> = ({ questionCount, scrollToQuestion }) => {
    const dispatch = useDispatch();

    const handleQuestionClick = (questionIndex: number) => {
        dispatch(markQuestionVisited(questionIndex));
        scrollToQuestion(questionIndex)

    };

    return (
        <div>
            <h2>Navigate to question</h2>
            <ul className={styles.overviewHeader1}>
                {Array.from({ length: questionCount }).map((_, index) => (
                    <li key={index} className={styles.list}>
                        <Button onClick={() => handleQuestionClick(index)}>
                            Question {index + 1}
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuestionNavigation;
