import { Button } from '@/shared/ui'

type viewPagination = {
  page: number
  index: number
  setPageNumber: (n: number) => void
}

export const ChooserPage = ({ page, index, setPageNumber }: viewPagination) => {
  return (
    <Button isActive={page === index + 1} onClick={() => setPageNumber(index)}>
      {index + 1}
    </Button>
  )
}
