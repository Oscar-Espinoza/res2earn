import { surveys } from "@/app/_constants";
import { SurveyType } from "@/app/types/survey";

export const getSurveys = () => {
  return new Promise<SurveyType[]>((resolve) => {
    resolve(surveys);
  });
};

export const getSurvey = (id: number) => {
  return new Promise<SurveyType>((resolve, reject) => {
    const survey = surveys.find((survey) => survey.id === id);
    if (survey) {
      resolve(survey);
    } else {
      reject("Survey not found");
    }
  });
};
