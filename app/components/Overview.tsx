import React from 'react'
import { SurveyType } from '../types/survey'
import { contractAddress } from '../_constants'
import contractABI from '../_constants/abi.json'
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { Button } from '@nextui-org/button'
import Link from 'next/link'
import Swal from 'sweetalert2'
import { useRouter } from "next/navigation";

type OverviewProps = {
  survey: SurveyType
  answers: number[]
  setQuestion: (n: number) => void
}

function Overview({ survey, answers, setQuestion }: OverviewProps) {

  const { isConnected } = useAccount()

  const router = useRouter()
  const { config, error, isLoading: preparing } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: 'submitSurvey',
    args: [survey.id, answers],
  })
  const { isLoading, isSuccess, write } = useContractWrite(config)

  const handleSubmit = () => {
    if (survey.questions.length !== answers.length) {
      Swal.fire({
        title: "You didn't submit answers for all the questions",
        text: 'Do you want to try again?',
        icon: 'error',
        iconColor: '#5dc3df',
        confirmButtonText: 'Try again',
        showDenyButton: true,
        denyButtonText: 'Dashboard',
        denyButtonColor: '#37dcb4'
      }).then((value) => {
        if (value.isConfirmed) {
          setQuestion(0)
        } else if (value.isDenied) {
          router.push('/')
        }
      })
    } else {
      write?.()
    }
  }

  let reason = (error?.cause as any)?.reason;

  console.log(answers[0])

  return (
    <div className='flex flex-col gap-2'>
      <h3 className='font-bold'>Summary</h3>
      <div className='border-b'>
        {survey.questions.map((question, i) => (
          <div key={question.text} className={`${i === 0 ? '' : 'border-t'} py-3 flex flex-col gap-1`}>
            <h4 className={`font-semibold text-blue-500`}>{question.text}</h4>
            <p className='ps-1 font-light'>{answers[i] === undefined ? "Didn't answer" : question.options[answers[i]].text}</p>
          </div>
        ))}
      </div>
      {preparing ?
        <p className='text-sm font-semibold self-end'>Preparing contract...</p>
        : isLoading ?
          <p className='font-semibold px-5 py-2 border w-fit rounded text-cyan-500 border-cyan-500'>Check your wallet!</p>
          : isSuccess ?
            <div className=' flex flex-col gap-3'>
              <Link href={'/'} className='font-bold border px-5 py-2 rounded text-green-600 border-green-600 hover:bg-green-600 hover:text-white text-center'>
                Go back to Dashboard
              </Link>
              <p>Congratulations! you can go back to your dashboard and see your balance updated, it might take a few seconds!</p>
            </div>
            : error && reason ?
              <p className='text-sm font-semibold self-end'>{reason}</p>
              : isConnected ?
                <Button disabled={isLoading} onClick={handleSubmit} variant='bordered' color={isLoading ? 'default' : 'success'} className='w-24 font-bold self-end'>
                  Submit
                </Button>
                :
                <p className='font-bold p-5 border border-red-500 rounded text-red-500 text-center'>You have to connect to your wallet to submit your survey and earn the price!</p>
      }
    </div>
  )
}

export default Overview