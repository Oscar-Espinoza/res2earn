'use client'

import { getSurvey } from '@/app/api/surveys';
import { Button } from '@nextui-org/button'
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react'

function QuestionLayout({ children, params }: { children: React.ReactNode, params: { id: string, index: string } }) {
  const { data: survey, isLoading, isError } = useQuery(['survey', params?.id], () => getSurvey(parseInt(params?.id)));
  return (
    <div>
      {children}
      <div className='flex gap-3'>

        <Link href={`/survey/${params.id}/question/${parseInt(params.index) - 1}`}>
          <Button className='w-32'>
            prev
          </Button>
        </Link>

        <Link href={`/survey/${params.id}/question/${parseInt(params.index) + 1}`}>
          <Button className='w-32'>
            Next
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default QuestionLayout