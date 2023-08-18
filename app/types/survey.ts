export type OptionType = {
  text: string;
};

export type QuestionType = {
  text: string;
  image: string;
  lifetimeSeconds: number;
  options: OptionType[];
};

export type SurveyType = {
  id: number;
  title: string;
  image: string;
  questions: QuestionType[];
};
