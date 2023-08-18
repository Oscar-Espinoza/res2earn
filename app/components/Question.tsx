import React, { useState, useEffect } from 'react';
import { RadioGroup, Radio, Button } from "@nextui-org/react";
import { QuestionType } from "../types/survey"

type QuestionProps = {
  question: QuestionType
  handleAnswer: (questionIndex: number, answer: string) => void
  nextQuestion: () => void
  index: number
}

function Question({ question, handleAnswer, nextQuestion, index }: QuestionProps) {
  const [timeLeft, setTimeLeft] = useState(question.lifetimeSeconds);

  // useEffect(() => {
  //   setTimeLeft(question.lifetimeSeconds);

  //   const timer = setInterval(() => {
  //     setTimeLeft(prevTime => prevTime - 0.1);
  //   }, 100);

  //   return () => clearInterval(timer);
  // }, [question]);

  // useEffect(() => {
  //   if (timeLeft <= 0) {
  //     nextQuestion();
  //   }
  // }, [nextQuestion, timeLeft]);

  return (
    <>
      <div key={index} className='flex flex-col gap-2 relative'>
        <div className='font-medium' >
          Time left: <span className={`${timeLeft >= 8 ? '' : timeLeft >= 5 ? 'text-yellow-500 font-semibold' : 'font-bold text-red-600 text-xl'}`}>{timeLeft.toFixed(1)}</span> seconds
        </div>
        <RadioGroup label={question.text} className='border-b-2 pb-5 font-bold' onValueChange={(value) => {
          handleAnswer(index, value)
        }}>
          {question.options.map((option, i) => <Radio key={option.text} value={`${i}`} className='font-semibold'>{option.text}</Radio>)}
        </RadioGroup>
      </div>
      <Button variant='bordered' color='primary' className='w-24 self-end' onClick={nextQuestion}>
        Next
      </Button>
    </>
  )
}

export default Question