import React from 'react'
import SurveyCardSkeleton from './SurveyCard/SurveyCardSkeleton'
import SurveyCard from './SurveyCard'
import { useQuery } from '@tanstack/react-query'
import { SurveyType } from '../types/survey'
import { getSurveys } from '../api/surveys'

function Surveys() {
  const { data: surveys, isLoading } = useQuery<SurveyType[]>({
    queryKey: ['surveys'],
    queryFn: getSurveys
  })

  if (isLoading) {
    return (
      <div className='grid grid-cols-2 gap-5'>
        {[0, 1, 2, 3, 4].map(i => <SurveyCardSkeleton key={i} position={i} />)}
      </div>
    )
  }

  return (
    <div className='grid grid-cols-2 gap-5'>
      {surveys?.map((survey, i) =>
        <SurveyCard key={i} survey={survey} position={i} />
      )}
    </div>
  )
}

export default Surveys