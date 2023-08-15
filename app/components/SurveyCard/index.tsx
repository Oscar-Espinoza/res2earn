import React from 'react'
import { Survey } from '@/app/types/survey'
import { Button, Card } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';

type SurveyProps = {
  survey: Survey;
  position: number;
};

function SurveyCard({ survey, position }: SurveyProps) {

  return (
    <Card className={`p-10 flex flex-col gap-5 hover:outline-blue-600 outline-offset-0 ${(position + 1) % 5 === 0 ? 'col-span-2' : ''}`}>
      <h3>{survey.title}</h3>
      <Image src={survey.image} alt="survey-image" width={200} height={200} />

      <Link href={`/survey/${survey.id}`}>
        <Button variant='bordered' color='primary' radius='full' className='font-bold text-base hover:text-white hover:bg-primary w-full'>
          Start
        </Button>
      </Link>
    </Card>
  )
}

export default SurveyCard