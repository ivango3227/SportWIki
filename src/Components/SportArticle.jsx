import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function SportArticle(props) {
    const [sportData, setSportData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(0);
    const { name } = useParams();
    let article = {};


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
    }, []);

    if (isLoaded) {
        article = sportData.find((item) => item.attributes.name === name);
    }


    return isLoaded && (
        <div className="article-wrapper">
        <h1>{article.attributes.name}</h1>
            <div className="article" >
                <div>
                    <p>{article.attributes.description}</p>
                </div>
                <img src={article.relationships.images.data[0].url} alt="Failed to load" />
            </div>



        </div>
    );
}

export default SportArticle;