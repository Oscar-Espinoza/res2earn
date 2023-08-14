'use client'

import React from 'react'
import { Survey } from '@/app/types/survey'
import { Button, Card } from '@nextui-org/react';
import Image from 'next/image';

type SurveyProps = {
  survey: Survey;
};

function SurveyCard({ survey }: SurveyProps) {
  return (
    <Card className='p-10 flex flex-col gap-5 hover:outline-blue-600 outline-offset-0'>
      <h3>{survey.title}</h3>
      <Image src={survey.image} alt="survey-image" width={200} height={200} />
      <Button variant='bordered' color='primary' radius='full' className='font-bold text-base hover:text-white hover:bg-primary'>
        Start
      </Button>
    </Card>
  )
}

export default SurveyCard