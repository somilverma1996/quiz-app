import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { shuffleArray } from '../utils/api'
// import { RootState } from './reducers';

// Define the Question type
interface Question {
    question: string;
    choices: string[];
    visited?: boolean;
    attempted?: boolean;
    email: string
}

// Action Types
export interface MarkQuestionVisitedAction extends Action<'MARK_QUESTION_VISITED'> {
    payload: { questionIndex: number };
}

export interface SaveUserEmailAction extends Action<'SAVE_USER_EMAIL'> {
    payload: { email: string };
}

export interface MarkQuestionAttemptedAction extends Action<'MARK_QUESTION_ATTEMPTED'> {
    payload: { questionIndex: number, selectedChoice: string };
}

export interface SetQuestionsAction extends Action<'SET_QUESTIONS'> {
    payload: { questions: Question[] };
}

export interface FetchQuestionsAction extends Action<'FETCH_QUESTIONS'> {
}

export interface SetQuestionsLoadingAction extends Action<'SET_QUESTIONS_LOADING'> {
    payload: { isLoading: boolean };
}
// Action Creators
export const markQuestionVisited = (questionIndex: number): MarkQuestionVisitedAction => ({
    type: 'MARK_QUESTION_VISITED',
    payload: { questionIndex },
});

export const saveUserEmailId = (email: string): SaveUserEmailAction => ({
    type: 'SAVE_USER_EMAIL',
    payload: { email },
});

export const markQuestionAttempted = (questionIndex: number, selectedChoice: string): MarkQuestionAttemptedAction => ({
    type: 'MARK_QUESTION_ATTEMPTED',
    payload: { questionIndex, selectedChoice },
});

export const setQuestions = (questions: Question[]): SetQuestionsAction => ({
    type: 'SET_QUESTIONS',
    payload: { questions },
});

export const setLoadingQuestions = (isLoading: boolean): SetQuestionsLoadingAction => ({
    type: 'SET_QUESTIONS_LOADING',
    payload: { isLoading },
});
// Async Action Creator using redux-thunk
export const fetchQuestions = () => {
    return async (dispatch: any) => {
        try {
            const response = await fetch('https://opentdb.com/api.php?amount=15');
            const data = await response.json();
            const questions = data.results.map((question: any) => {
                const allChoices = [...question.incorrect_answers, question.correct_answer];
                // Shuffle the choices so that they appear in a random order
                const shuffledChoices = shuffleArray(allChoices);
                return {
                    ...question,
                    choices: shuffledChoices,
                    visited: false,
                    attempted: false,
                }
            })
            dispatch(setQuestions(questions));
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };
};
