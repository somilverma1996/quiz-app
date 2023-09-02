// redux/store.ts
import { createStore, Store } from 'redux';
// import { QuizState } from './reducers';
// import quizReducer  from './reducers';
import quizReducer, { QuizState } from "./reducers"

const store: Store<QuizState> = createStore(quizReducer);

export default store;
