import { surveys } from "@/app/_constants";
import { Survey } from "@/app/types/survey";

export const getSurveys = () => {
  return new Promise<Survey[]>((resolve) => {
    resolve(surveys);
  });
};

export const getSurvey = (id: number) => {
  return new Promise<Survey>((resolve) => {
    const survey = surveys.find((survey) => survey.id === id);
    survey && resolve(survey);
  });
};
