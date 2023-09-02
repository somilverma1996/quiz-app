// redux/reducers.ts
import { shuffleArray } from '@/utils/api';
import { Reducer } from 'redux';
import { MarkQuestionVisitedAction, MarkQuestionAttemptedAction, SetQuestionsAction, SaveUserEmailAction, SetQuestionsLoadingAction } from './actions';

interface Question {
  question: string;
  choices: string[];
  visited?: boolean;
  attempted?: boolean;
}

export interface QuizState {
  questions: Question[];
}

const initialState: QuizState = {
  questions: [], // Add your questions data here
};

type QuizAction = MarkQuestionVisitedAction | MarkQuestionAttemptedAction | SetQuestionsAction | SaveUserEmailAction | SetQuestionsLoadingAction;

const quizReducer: Reducer<QuizState, QuizAction> = (state = initialState, action) => {
  switch (action.type) {
    case 'MARK_QUESTION_VISITED':
      return {
        ...state,
        questions: state.questions.map((question, index) =>
          index === action.payload.questionIndex
            ? { ...question, visited: true }
            : question
        ),
      };
    case 'MARK_QUESTION_ATTEMPTED':
      return {
        ...state,
        questions: state.questions.map((question, index) =>
          index === action.payload.questionIndex
            ? { ...question, attempted: true, selectedChoice: action.payload.selectedChoice }
            : question
        ),
      };
    case 'SET_QUESTIONS':
      const questions = action.payload.questions.map((question: any) => {
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

      return {
        ...state,
        questions: questions
      };
    case 'SAVE_USER_EMAIL':
      return {
        ...state,
        email: action.payload.email
      }
    case 'SET_QUESTIONS_LOADING':
      return {
        ...state,
        isLoading: action.payload.isLoading
      }
    default:
      return state;
  }
};

export default quizReducer;
