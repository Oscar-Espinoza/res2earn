'use client'

import React, { ReactNode } from 'react'

import Image from 'next/image'
import { getSurvey } from '@/app/api/surveys'
import { useQuery } from '@tanstack/react-query'

export type SurveyLayoutProps = {
  children: ReactNode;
  params: {
    id: string
    index?: number
  };
};

function SurveysLayout({ children, params }: SurveyLayoutProps) {
  const { data: survey, isLoading, isError } = useQuery(['survey', params?.id], () => getSurvey(parseInt(params?.id)));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !survey) {
    return <div>Error fetching survey or survey not found</div>;
  }

  // const handleNextQuestion = () => {
  //   setCurrentQuestion(prev => {
  //     const nextQ = prev + 1;
  //     if (nextQ === questions.length) {
  //       return 0;
  //     }
  //     return nextQ;
  //   });
  // }

  // const handlePrevQuestion = () => {
  //   setCurrentQuestion(prev => {
  //     const prevQ = prev - 1;
  //     if (prevQ === -1) {
  //       return questions.length - 1;
  //     }
  //     return prevQ;
  //   });
  // }

  return (
    <div className='w-full flex flex-col gap-5'>
      <div className='w-full h-32 relative py-10'>
        <Image
          src={survey.image}
          alt='survey-photo'
          fill={true}
        />
      </div>
      {children}
    </div>
  )
}

export default SurveysLayout