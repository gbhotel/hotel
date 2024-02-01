
import React, {useState} from "react";


export default function Pagination(props) {

    const { nPages, currentPage, changePage } = props;

    // const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

    const [pages, setPages] = useState([1,2,3]);

    const prevPage = () => {

        if(pages[0] > 1) {
            setPages(prevState => [prevState[0] - 1, ...prevState]);
            setPages(prevState => prevState.slice(0,3));
        }
    }

    const nextPage = () => {

        if(pages[pages.length - 1] < nPages) {
            setPages(prevState => [...prevState, prevState[prevState.length - 1] + 1]);
            setPages(prevState => prevState.slice(1));
        }
    }

    return (
        <nav>
            <div className='pagination justify-content-center'>

                <li className="page-pagination">
                    <div className="зpage-link"
                        onClick={prevPage}
                    >
                        Previous
                    </div>
                </li>
                <div style={{display: 'flex', alignItems: 'end', paddingBottom: '7px'}}>
                    {pages[0] > 1 ? (<div>...</div>):(<div></div>)}
                </div>
                {pages.map((pgNumber, index) => (
                            <li key={index}
                                className= {`page-item ${currentPage === pgNumber ? 'active' : ''} `}
                            >
                                <div
                                    onClick={() => changePage(pgNumber)}
                                    className='page-link'
                                    >
                                    {pgNumber}
                                </div>
                            </li>
                ))}
                <div style={{display: 'flex', alignItems: 'end'}}>

                    {pages[pages.length - 1] < nPages ? (<div>...</div>):(<div></div>)}
                </div>
                <li className="page-item">
                    <div className="page-link"
                        onClick={nextPage}
                    >
                        Next
                    </div>
                </li>
            </div>
        </nav>
    )
}
