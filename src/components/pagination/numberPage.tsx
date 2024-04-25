import { Button } from '@/shared/ui'

type viewPagination = {
  page: number
  index: number
  setPageNumber: (n: number) => void
}

export const PaginationView = ({ page, index, setPageNumber }: viewPagination) => {
  console.log(page, index)
  return (
    <Button isActive={page === index + 1} onClick={() => setPageNumber(index)}>
      {index + 1}
    </Button>
  )
}
