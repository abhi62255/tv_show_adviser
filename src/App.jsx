import { TVShowAPI } from "./api/tv-show"
import s from "./style.module.css"

import { useEffect, useState } from "react";
import { BACKDROP_BASE_URL } from "./config";
import { TVShowDetail } from "./componenets/TVShowDetail/TVShowDetail";
import { Logo } from "./componenets/Logo/Logo";
import logoImage from "./assets/images/logo.png"
import { TVShowListItem } from "./componenets/TVShowListItem/TVShowListItem";
import { TVShowList } from "./componenets/TVShowList/TVShowList";
import { SearchBar } from "./componenets/SearchBar/SearchBar";


export function App(){

    const [curretTVShow, setCurrentTVShow] = useState();

    const [recommentaionsList, setRecommentaionsList] = useState([]);

    function updateCurrentTVShow(tvShow){
        setCurrentTVShow(tvShow);
    }


    async function fetchPopulars(){
        try{
            const popularTVShowList = await TVShowAPI.fetchPopulars();
            if(popularTVShowList.length >0){
                setCurrentTVShow(popularTVShowList[0]);
        }
        }catch(error){
            alert("Something went wrong when connecting to API")

        }
        
    }


    async function fetchRecommentaions(tvShowId){
        try{
            const recommentaionsListResp = await TVShowAPI.fetchRecommendations(tvShowId);
            if(recommentaionsListResp.length >0){
                setRecommentaionsList(recommentaionsListResp.slice(0,10));
        }
        }catch(error){
            alert("Something went wrong when connecting to API")

        }
        
    }

    async function fetchByTitle(title){
        try{
            const searchResponse = await TVShowAPI.fetchByTitle(title);
            if(searchResponse.length >0){
                setCurrentTVShow(searchResponse[0]);
            }
        }
        catch(error){
            alert("Something went wrong when connecting to API")

        }
    }

    useEffect(()=>{
        fetchPopulars();
    },[])


    useEffect(()=>{
        if (curretTVShow){
            fetchRecommentaions(curretTVShow.id);
        }
    },[curretTVShow])

    return(
    <div className={s.main_container}
        style={{
            background:curretTVShow ? `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url("${BACKDROP_BASE_URL}${curretTVShow.backdrop_path}") no-repeat center / cover` : "black"
        }}
    >
        <div className={s.header}>
            <div className="row">
                <div className="col-4">
                    <div>
                        <Logo img={logoImage} title="Watowatch" subtitle="Find a show you may like"/>
                    </div>
                </div>
                <div className="col-md-12 col-lg-4">
                    <SearchBar onSubmit={fetchByTitle}/>
                </div>

            </div>
        </div>
        <div className={s.tv_show_detail}>
            {curretTVShow && <TVShowDetail tvShow={curretTVShow} />}
        </div>
        <div className={s.recommended_tv_shows}>
            { curretTVShow && <TVShowList onClickItem={updateCurrentTVShow} tvShowList={recommentaionsList}/>}
        </div>
    </div>
    )
}