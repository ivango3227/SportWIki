import React, { useState, useEffect } from "react";
import axios from "axios";
import SportTile from "./SportTile";
import ReactPaginate from "react-paginate";

function HomePage(props) {
    const [sportData, setSportData] = useState([]);
    const [currentItems,setCurrentItems]=useState([]);
    const [isLoaded, setIsLoaded] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const [itemOffset,setItemOffset]=useState(0);

    const sportsPerPage = 10;
    const pagesVisited = pageNumber * sportsPerPage;
    const pageCount=Math.ceil(sportData.length / sportsPerPage);

    async function getData() {

        await axios.get("https://sports.api.decathlon.com/sports")
            .then((res) => {
                const allSports = res.data.data;
                setSportData(allSports);
                setIsLoaded(1);
            })
            .catch((err) => console.error(err));

    }

    useEffect(() => {
        getData();
    }, [])
    
    useEffect(()=>{
        const endOffset=itemOffset+sportsPerPage;
        setCurrentItems(sportData.slice(itemOffset,endOffset))
        setPageNumber(Math.ceil(sportData.length / sportsPerPage));

    },[itemOffset,sportData])

    function changePage({selected}){
        const newOffset=(selected*sportsPerPage)%sportData.length;
        setItemOffset(newOffset);

    }
    

    return isLoaded ?
            (
                <div className="article-container">
                    <h1>Explore all sports</h1>
                    {
                        currentItems.map((item, index) =>
                            <SportTile
                                key={item.id}
                                name={item.attributes.name}
                                description={item.attributes.description}
                                image={item.relationships.images.data[0].variants[0].thumbnail.url}
                            />
                        )
                        }
                    <ReactPaginate
                        pageRangeDisplayed={5}
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationButtons"}
                        previousLinkClassName={"previousButton"}
                        nextLinkClassName={"nextButton"}
                        activeClassName={"paginationActive"}
                    />
                </div>
            ) : (<p>Loading...</p>)

    }

    export default HomePage;