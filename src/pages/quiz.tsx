import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import QuizQuestion from '../components/quizQuestion';
import QuizOverview from '../components/quizOverview';
import QuestionNavigation from '../components/questionNavigation';
import { useEffect } from 'react';
import CountdownTimer from '../components/CountDownTImer';
import styles from '@/styles/Home.module.css'
import { Button } from 'antd';

const Quiz = () => {
    const { questions, isLoading } = useSelector((state: any) => state);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const router = useRouter()
    const handleTimeout = () => {
        router.push('/report');
    };
    useEffect(() => {
        // Start the quiz timer when the component mounts
        const timerDuration = 30 * 60; // 30 minutes in seconds
        const timer = setTimeout(() => {
            handleTimeout();
        }, timerDuration * 1000);

        return () => clearTimeout(timer);
    }, []);

    const scrollToQuestion = (index: number) => {
        setCurrentQuestionIndex(index);
    };

    return (
        <div className={styles.container}>
            {
                isLoading ? <h2>Loading.....</h2> :
                    <>
                        <div className={styles.quizHeader}>
                            <h1>Quiz Page</h1>
                            <CountdownTimer duration={30 * 60} onTimeout={handleTimeout} />
                        </div>
                        <QuizOverview />
                        <QuestionNavigation questionCount={questions.length} scrollToQuestion={scrollToQuestion} />
                        {questions.map((question: any, index: any) => (
                            <div className={currentQuestionIndex === index ? styles.displayBlock : styles.displayNone}>
                                <QuizQuestion
                                    key={index}
                                    question={question.question}
                                    choices={question.choices}
                                    questionIndex={index}
                                />
                            </div>
                        ))}
                        <Button className={styles.quizSubmit} onClick={() => handleTimeout()}> Submit Quiz</Button>
                    </>
            }
        </div >
    );
};

export default Quiz