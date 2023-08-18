'use client'

import React from 'react'
import { SurveyType } from '@/app/types/survey'
import { Card } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePrepareContractWrite } from 'wagmi';
import contractABI from '@/app/_constants/abi.json'
import { contractAddress } from '@/app/_constants';

type SurveyProps = {
  survey: SurveyType;
  position: number;
};

function SurveyCard({ survey, position }: SurveyProps) {
  const { error, isLoading } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: 'submitSurvey',
    args: [survey.id, []],
  });

  let reason = (error?.cause as any)?.reason;

  return (
    <Card className={`p-7 flex flex-col items-center text-center gap-5 hover:outline-blue-600 outline-offset-0 ${(position + 1) % 5 === 0 ? 'col-span-2 flex-row justify-around' : ''}`}>
      <h3 className='font-bold text-sm capitalize text-center'>{survey.title}</h3>

      <div className='h-24 w-24 relative'>
        <Image src={survey.image} alt="survey-image" layout='fill' />
      </div>

      {isLoading
        ? <span>Loading...</span>
        : error ?
          <p className='text-sm font-semibold'>{reason}</p>
          :
          <Link href={`/surveys/${survey.id}`} className='font-bold text-base hover:text-white hover:bg-blue-600 w-25 text-center py-2 px-8 rounded-full border border-blue-600 text-blue-600'>
            Start
          </Link>
      }
    </Card>
  )
}

export default SurveyCard