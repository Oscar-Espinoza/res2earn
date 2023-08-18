import React, { Dispatch, SetStateAction, useState } from 'react'
import { Question } from '../types/survey'
import { RadioGroup, Radio } from "@nextui-org/react";

type SurveyQuestionProps = {
  question: Question
  handleNextQuestion: () => void
  handlePrevQuestion: () => void
  setAnswers: Dispatch<SetStateAction<never[]>>
  index: number
}

function SurveyQuestion({ question, handleNextQuestion, handlePrevQuestion, setAnswers, index }: SurveyQuestionProps) {
  const [selected, setSelected] = useState<string>(question.options[0].text)
  return (
    <div className='flex flex-col gap-3'>
      <RadioGroup
        label={question.text}
        value={selected}
        onValueChange={setSelected}
      >
        {question.options.map(option => (
          <Radio key={option.text} value={option.text}>{option.text}</Radio>
        ))}
      </RadioGroup>
    </div>
  )
}

export default SurveyQuestion