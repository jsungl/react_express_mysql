import React, {useState,useEffect} from 'react';

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
  const [currentPageArray, setCurrentPageArray] = useState([]);
  const [totalPageArray, setTotalPageArray] = useState([]);

  useEffect(() => {
    if(currentPage % 5 === 1){
      //다음버튼 눌러서 page: 6, 11, 16, 21, ....가 되는경우
      setCurrentPageArray(totalPageArray[Math.floor(currentPage / 5)]);
    }else if (currentPage % 5 === 0) {
      //이전버튼 눌러서 page: 5, 10, 15, 20, ....가 되는경우
      setCurrentPageArray(totalPageArray[Math.floor(currentPage / 5) - 1]);
    }
    console.log('Pagination Component Rendering 1');
  },[currentPage, totalPageArray]);

  useEffect(() => {
    function sliceArrayByLimit(totalPage,limit) {
      const pageNumbers = [...Array(nPages + 1).keys()].slice(1); //[1,2,3,....30]
      return Array(Math.ceil(totalPage / limit)).fill().map(() => pageNumbers.splice(0, limit));
    }
    const slicedPageArray = sliceArrayByLimit(nPages, 5);
    //console.log('slicedPageArray: ', slicedPageArray); //[ [1,2,3,4,5],[6,7,8,9,10],...]
    setTotalPageArray(slicedPageArray);
    setCurrentPageArray(slicedPageArray[0]);
    console.log('Pagination Component Rendering 2');
  },[nPages]);

  const nextPage = () => {
    if(currentPage !== nPages) 
      setCurrentPage(currentPage + 1)
  }
  const prevPage = () => {
    if(currentPage !== 1) 
      setCurrentPage(currentPage - 1)
  }
  const firstPage = () => {
    setCurrentPage(1);
  }
  const lastPage = () => {
    setCurrentPage(nPages);
  }

  const style = {
    margin:0
  };

  return (
      <nav>
        <ul className='pagination' style={style}>
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <a className="page-link" href="/#" onClick={firstPage}>
                &laquo;
              </a>
            </li>
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <a className="page-link" 
                  onClick={prevPage} 
                  href='/#'>
                  &lt;
              </a>
            </li>
            {currentPageArray.map(pgNumber => (
                <li key={pgNumber} 
                    className= {`page-item ${currentPage === pgNumber ? 'active' : ''} `} >

                    <a onClick={() => setCurrentPage(pgNumber)}  
                        className='page-link' 
                        href='/#'>
                        {pgNumber}
                    </a>
                </li>
            ))}
            <li className={`page-item ${currentPage === nPages ? 'disabled' : ''}`}>
              <a className="page-link" 
                  onClick={nextPage}
                  href='/#'>
                  &gt;
              </a>
            </li>
            <li className={`page-item ${currentPage === nPages ? 'disabled' : ''}`}>
              <a className="page-link" href="/#" onClick={lastPage}>
                &raquo;
              </a>
            </li>
        </ul>
      </nav>
    
  );
};

export default Pagination;