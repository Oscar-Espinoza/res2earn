import React from 'react'
import { AnswerType } from '../types/survey'
import { Accordion, AccordionItem, Avatar } from "@nextui-org/react";

function Overview({ answers }: { answers: AnswerType[] }) {
  return (
    <div className='flex flex-col'>
      <h3>Summary</h3>
      {answers.map(answer => (
        <div key={answer.question}>
          <h4>{answer.question}</h4>
          <p>{answer.answer}</p>
        </div>
      ))}
    </div>
  )
}

export default Overview