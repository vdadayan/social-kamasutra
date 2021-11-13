import React, { useState } from 'react';

export const Paginator = ({totalUsersCount, pageSize, onPageChanged, currentPage, portion}) => {
   
    let pages = [];
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(totalUsersCount / portion);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionpageNumber = (portionNumber -1 ) * pageSize + 1;
    let rightPortionPageNumber = portionNumber * pageSize;
    return(
        <>  
            {portionNumber > 1 && 
                <button onClick={() => {setPortionNumber(portionNumber - 1)}}>PREV</button>
            }
            {pages.filter((p) =>  p >= leftPortionpageNumber && p <= rightPortionPageNumber )
            .map((p) => {
                return(
                <span onClick={() => {onPageChanged(p)}}
                    className={currentPage === p ? "selected-page" : ""}>
                {p}
                </span> 
                )
            })}
            {portionCount > portionNumber && 
            <button onClick={() => {setPortionNumber(portionNumber + 1)}}>NEXT</button>
            }
        </>
    )
}
