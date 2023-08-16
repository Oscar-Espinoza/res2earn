'use client'

import React, { ReactNode, useEffect, useState } from 'react'

import Image from 'next/image'
import { getSurvey } from '@/app/api/surveys'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { SurveyType, AnswerType } from '@/app/types/survey'
import Question from '@/app/components/Question'
import { Button } from '@nextui-org/button'

type SurveyLayoutProps = {
  params: {
    id: string
  };
};

function Survey({ params }: SurveyLayoutProps) {
  const surveyId = parseInt(params.id)
  const queryClient = useQueryClient();
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<AnswerType[]>([])

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
    console.log(answers)
  }, [answers])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError || !survey) {
    return <div>Error fetching survey or survey not found</div>
  }

  const handleNextQuestion = () => {
    if (currentQuestion + 1 === survey.questions.length) {
    } else {
      setCurrentQuestion(prev => prev + 1)
    }
  }

  const handleAnswer = (question: string, answer: string) => {
    setAnswers(prev => [...prev, { question, answer }])
  }


  return (
    <div className='w-full flex flex-col gap-5'>
      <div className='w-full relative py-10 flex justify-center items-center border-b bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%'>
        <Image
          src={survey.image}
          alt='survey-photo'
          width={200}
          height={200}
        />
      </div>

      <div className='px-3 flex flex-col gap-2'>
        <strong>{currentQuestion + 1}/{survey.questions.length}</strong>
        <Question question={survey.questions[currentQuestion]} handleAnswer={handleAnswer} />
        <Button variant='bordered' color='primary' className='w-24 self-end' onClick={handleNextQuestion}>
          Next
        </Button>
      </div>
    </div>
  )
}

export default Survey