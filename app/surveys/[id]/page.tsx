'use client'

import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import { getSurvey } from '@/app/api/surveys'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { SurveyType } from '@/app/types/survey'
import Question from '@/app/components/Question'
import Overview from '@/app/components/Overview'

type SurveyLayoutProps = {
  params: {
    id: string
  };
};

function Survey({ params }: SurveyLayoutProps) {
  const surveyId = parseInt(params.id)
  const queryClient = useQueryClient();
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])

  const { data: survey, isLoading, isError } = useQuery(
    ['surveys', surveyId],
    () => getSurvey(surveyId),
    {
      initialData: () => {
        const cachedSurveys = queryClient.getQueryData<SurveyType[]>(['surveys']);
        return cachedSurveys?.find(survey => survey.id === surveyId);
      }
    }
  );

  useEffect(() => {
  }, [currentQuestion, survey?.questions.length])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError || !survey) {
    return <div>Error fetching survey or survey not found</div>
  }

  const handleNextQuestion = () => {
    setCurrentQuestion(prev => prev + 1)
  }

  const handleAnswer = (questionIndex: number, answer: string) => {
    setAnswers(prev => {
      let updatedAnswers = [...prev]
      updatedAnswers[questionIndex] = parseInt(answer)
      return updatedAnswers
    })
  }


  return (
    <div className='flex justify-center md:pt-10'>
      <div className='flex flex-col gap-5 max-w-lg grow'>
        <div className='w-full py-10 flex justify-center items-center border-b bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%'>
          <div className='w-72 h-72 relative'>
            <Image
              src={survey.image}
              alt='survey-photo'
              layout='fill'
            />
          </div>
        </div>
        <div className='flex flex-col gap-2 px-4'>
          <strong>{currentQuestion}/{survey.questions.length}</strong>
          {currentQuestion === survey.questions.length
            ?
            <Overview survey={survey} answers={answers} setQuestion={setCurrentQuestion} />
            :
            <Question question={survey.questions[currentQuestion]} handleAnswer={handleAnswer} nextQuestion={handleNextQuestion} index={currentQuestion} />
          }
        </div>
      </div>
    </div>
  )
}

export default Survey