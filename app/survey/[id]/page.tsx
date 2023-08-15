'use client'

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSurvey } from '@/app/api/surveys';
import Image from 'next/image';
import SurveyQuestion from '@/app/components/SurveyQuestion';
import Link from 'next/link';
import { Button } from '@nextui-org/button';

export type SurveyProps = {
  params: {
    id: string
  };
};

function Survey({ params }: SurveyProps) {
  const { data: survey, isLoading, isError } = useQuery(['survey', params?.id], () => getSurvey(parseInt(params?.id)));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !survey) {
    return <div>Error fetching survey or survey not found</div>;
  }
  return (
    <div className='flex px-10 gap-3 items-center'>
      <p>Start the {survey.title} survey!</p>
      <Link href={`/survey/${survey.id}/question/1`}>
        <Button>
          Start
        </Button>
      </Link>
      {/* <span>{`${currentQuestion + 1}/${questions.length}`}</span>
      <SurveyQuestion question={questions[currentQuestion]} handleNextQuestion={handleNextQuestion} handlePrevQuestion={handlePrevQuestion} setAnswers={setAnswers} index={currentQuestion} /> */}
    </div>
  )
}

export default Survey