import React, { useState } from 'react'
import { RadioGroup, Radio, Button } from "@nextui-org/react";
import { QuestionType } from "../types/survey"

type QuestionProps = {
  question: QuestionType
  handleAnswer: (question: string, answer: string) => void
  nextQuestion: () => void
}

function Question({ question, handleAnswer, nextQuestion }: QuestionProps) {
  const [selected, setSelected] = useState('')
  return (
    <>
      <div className='flex flex-col gap-2 relative'>
        <RadioGroup label={question.text} className='border-b-2 pb-5 font-bold' value={selected} onValueChange={(value) => {
          setSelected(value)
          handleAnswer(question.text, value)
        }}>
          {question.options.map(option => <Radio key={option.text} value={option.text} className='font-normal'>{option.text}</Radio>)}
        </RadioGroup>
      </div>
      <Button variant='bordered' color='primary' className='w-24 self-end' onClick={nextQuestion}>
        Next
      </Button>
    </>
  )
}

export default Question