import React from 'react'

import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Button } from '@/shared/ui'

import { lineCount } from '../primoHistory/promo-history'

import { ChooserPage } from './chooser-page'

type pagination = {
  pageCount: number
  pageNumber: number
  setPageNumber: (n: number) => void
  setCountLine: (n: lineCount) => void
  countLine: number
}

export const Pagination = ({ pageCount, pageNumber, setPageNumber, setCountLine, countLine }: pagination) => {
  const array = Array.from({ length: pageCount }, () => undefined)

  const ref = React.useRef<HTMLDivElement>(null)
  const [modalView, setModalView] = React.useState(false)

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setModalView(false)
    }
  }
  const nextPage = () => {
    if (pageCount > pageNumber + 1) {
      setPageNumber(pageNumber + 1)
    }
  }
  const prevPage = () => {
    if (1 < pageNumber + 1) {
      setPageNumber(pageNumber - 1)
    }
  }

  const setLine = (number: lineCount) => {
    setCountLine(number)
    setModalView(!modalView)
  }

  return (
    <div className='flex justify-center items-center gap-4 sm:justify-between my-8 flex-col sm:flex-row'>
      <div className='flex flex-row gap-1 justify-center'>
        <Button onClick={() => prevPage()}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        {array.map(
          (_, index) =>
            (index < 3 || index > array.length - 4 || index === pageNumber - 1 || index === pageNumber + 1 || index === pageNumber) && (
              <ChooserPage index={index} page={pageNumber + 1} setPageNumber={setPageNumber} key={index} />
            )
        )}
        <Button onClick={() => nextPage()}>
          <FontAwesomeIcon icon={faArrowRight} />
        </Button>
      </div>

      <div ref={ref} className='relative'>
        <Button onClick={() => setModalView(!modalView)}>{countLine}&nbsp;&nbsp; записей</Button>
        {modalView && (
          <div className='absolute -bottom-12 right-0 p-1 rounded-lg flex flex-row gap-1 bg-drop'>
            <Button onClick={() => setLine(5)}>5</Button>
            <Button onClick={() => setLine(10)}>10</Button>
            <Button onClick={() => setLine(15)}>15</Button>
            <Button onClick={() => setLine(25)}>25</Button>
          </div>
        )}
      </div>
    </div>
  )
}
