import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router';
import { Card } from 'antd';

const ReportPage: React.FC = () => {
    const { questions, email } = useSelector((state: any) => state);
    const router = useRouter()
    useEffect(() => {
        if (!email?.length) {
            router.push('/');
        }
    }, []);
    return (
        <div>
            <h1 style={{ display: 'flex', justifyContent: 'center' }}>Quiz Report</h1>
            <ul>

                {questions.map((question: any, index: any) => (
                    <Card style={{ margin: '20px' }}>
                        <li key={index} className={styles.list}>
                            <div>
                                <strong>Question {index + 1}: </strong>
                                {question.question}
                            </div>
                            <div>
                                <strong>Your Answer: </strong>
                                {/* Display the user's answer */}
                                {/* Replace 'userAnswer' with the actual property that stores the user's answer */}
                                <span className={`${question.selectedChoice === question.choices.find((choice: any) => choice === question.correct_answer) ? styles.green : styles.red}`}>{question.selectedChoice ?? 'Not Answered'}</span>
                            </div>
                            <div>
                                <strong>Correct Answer: </strong>
                                {question.choices.find((choice: any) => choice === question.correct_answer)}
                            </div>
                        </li>
                    </Card>
                ))}
            </ul>
        </div>
    );
};

export default ReportPage;
