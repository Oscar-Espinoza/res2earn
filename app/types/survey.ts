export type OptionType = {
  text: string;
};

export type QuestionType = {
  text: string;
  image: string;
  lifetimeSeconds: number;
  options: OptionType[];
};

export type AnswerType = {
  question: string;
  answer: string;
};

export type SurveyType = {
  id: number;
  title: string;
  image: string;
  questions: QuestionType[];
};
