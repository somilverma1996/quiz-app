import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { markQuestionVisited, markQuestionAttempted } from '../redux/actions';
import styles from '@/styles/Home.module.css'
import { Card, Radio, RadioChangeEvent, Button } from 'antd';

interface QuestionProps {
    question: string;
    choices: string[];
    questionIndex: number;
}

const QuizQuestion: React.FC<QuestionProps> = ({ question, choices, questionIndex }) => {

    const dispatch = useDispatch();
    const questions = useSelector((state: any) => state.questions);

    const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

    const handleChoiceSelect = (choice: string) => {
        setSelectedChoice(choice);
        dispatch(markQuestionVisited(questionIndex));
    };

    const handleAnswerSubmit = () => {
        if (selectedChoice !== null) {
            dispatch(markQuestionAttempted(questionIndex, selectedChoice));
        }
    };

    const questionInfo = questions[questionIndex];
    const isVisited = questionInfo?.visited || false;
    const isAttempted = questionInfo?.attempted || false;

    return (
        <div>
            <Card className={styles.cardQues}>
                <h2>{`Q. ${questionIndex + 1}`}</h2>
                <br />
                <h3>{question}</h3>
                <ul>
                    <Radio.Group onChange={(e: RadioChangeEvent) => handleChoiceSelect(e.target.value)} value={selectedChoice}>
                        {choices.map((choice, index) => (
                            <li key={index} >
                                <Radio
                                    className={`choiceButton ${selectedChoice === choice ? 'selected' : ''}`}
                                    value={choice}
                                >
                                    <h4>{choice}</h4>
                                </Radio>
                            </li>
                        ))}
                    </Radio.Group>
                </ul>
                <div>
                    {isVisited && <span className={styles.visitedIndicator}>Visited</span>}
                    {isAttempted && <span className={styles.attemptedIndicator}>Attempted</span>}
                </div>
                <Button onClick={handleAnswerSubmit} disabled={selectedChoice === null}>
                    Submit Answer
                </Button>
            </Card>
        </div>
    );
};

export default QuizQuestion;
