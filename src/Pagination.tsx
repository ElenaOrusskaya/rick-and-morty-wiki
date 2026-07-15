interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination ({
    currentPage, 
    totalPages, 
    onPageChange,
}: PaginationProps) {

    const pages = Array.from({length: totalPages}, (_, index) => index + 1);

    return (
        <div className = "nav">
            {pages.map((page) => (
                <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                disabled={page === currentPage}>
                    {page}
                    </button>
            ))}
        </div>
    )
}