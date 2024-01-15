
import React from "react";


export default function Pagination(props) {

    const { nPages, currentPage, changePage, setCurrentPage } = props;

    const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

    const goToNextPage = () => {
        if(currentPage !== nPages)
            setCurrentPage(currentPage + 1)
    }

    return (
        <nav>
            <ul className='pagination justify-content-center'>
                <li className="page-item">
                    <a className="page-link"
                        // onClick={prevPage}
                       href='#'>

                        Previous
                    </a>
                </li>
                {pageNumbers.map(pgNumber => (
                    <li key={pgNumber}
                        className= {`page-item ${currentPage === pgNumber ? 'active' : ''} `}
                    >

                        <a
                            onClick={() => changePage(pgNumber)}
                            className='page-link'
                            href='#'>

                            {pgNumber}
                        </a>
                    </li>
                ))}
                <li className="page-item">
                    <a className="page-link"
                        // onClick={goToNextPage}
                       href='#'>

                        Next
                    </a>
                </li>
            </ul>
        </nav>
    )
}
