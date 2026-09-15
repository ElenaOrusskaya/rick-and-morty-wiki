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
        <nav className = "nav" aria-label="Pagination">
            {pages.map((page) => (
                <button
                key={page}
                 type="button"
                 onClick={() => onPageChange(page)}
                 aria-label={`Page ${page}`}
                 aria-current={page === currentPage ? 'page' : undefined}
                 disabled={page === currentPage}>
                    {page}
                    </button>
            ))}
        </nav>
    )
}
