export interface formDataTypes {
    email: string;
}

// "response_code":0,
//    "results":[
//       {
//          "category":"Sports",
//          "type":"multiple",
//          "difficulty":"hard",
//          "question":"What tool lends it&#039;s name to a last-stone advantage in an end in Curling?",
//          "correct_answer":"Hammer",
//          "incorrect_answers":[
//             "Wrench",
//             "Drill",
//             "Screwdriver"
//          ]
//       },


interface result {
    category:string,
    type:string,
    difficulty:string,
    question:string,
    correct_answer:string,
    incorrect_answers:[]
}
export interface apiResponse {
    response_code: number;
    results: [result]
}
export interface QuizProps {
    questions: any // Annotate the questions prop
  }