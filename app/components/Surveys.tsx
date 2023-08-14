import React from 'react'
import SurveyCardSkeleton from './SurveyCard/SurveyCardSkeleton'
import SurveyCard from './SurveyCard'
import { surveys } from '../_constants'
import img from '../assets/survey1.svg'

function Surveys() {
  return (
    <div className='grid grid-cols-2 gap-5'>
      {surveys.map((survey, i) => <SurveyCard key={i} survey={survey} />)}
    </div>
  )
}

export default Surveys