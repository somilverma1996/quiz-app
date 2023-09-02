const API_BASE_URL = 'https://opentdb.com/api.php';

export function shuffleArray(array: any) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const fetchQuestions = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}?amount=15`);
    const data = await response.json();
    return data.results.map((question: any) => {
      const allChoices = [...question.incorrect_answers, question.correct_answer];
      // Shuffle the choices so that they appear in a random order
      const shuffledChoices = shuffleArray(allChoices);
      return {
        ...question,
        choices: shuffledChoices,
        visited: false,
        attempted: false,
      }
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
};