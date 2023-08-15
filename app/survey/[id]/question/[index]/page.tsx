import React from 'react'

type QuestionProps = {
  params: {
    index: number
  }
}

function Question({ params }: QuestionProps) {
  return (
    <div>Question: {params.index}</div>
  )
}

export default Question