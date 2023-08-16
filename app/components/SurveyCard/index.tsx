import React from 'react'
import { SurveyType } from '@/app/types/survey'
import { Card } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';

type SurveyProps = {
  survey: SurveyType;
  position: number;
};

function SurveyCard({ survey, position }: SurveyProps) {

  return (
    <Card className={`p-10 flex flex-col gap-5 hover:outline-blue-600 outline-offset-0 ${(position + 1) % 5 === 0 ? 'col-span-2' : ''}`}>
      <h3 className='font-bold text-sm capitalize text-center'>{survey.title}</h3>

      <div className='relative h-24'>
        <Image src={survey.image} alt="survey-image" layout='fill' />
      </div>

      <Link href={`/surveys/${survey.id}`} className='font-bold text-base hover:text-white hover:bg-blue-600 w-25 text-center py-2 px-8 rounded-full border border-blue-600 text-blue-600'>
        Start
      </Link>
    </Card>
  )
}

export default SurveyCard