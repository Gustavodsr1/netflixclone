import React, { useEffect, useState } from "react";
import './App.css';
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header/Index";

export default () => {

  const [movielist, setmovielist] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async() => {
      //Pegando a Lista Total
      let list = await Tmdb.getHomeList();
      setmovielist(list);

      //Pegando Featured (Filme em destaque)
      let originals = list.filter(i => i.slug === 'originals');
      let randomFilms = Math.floor(Math.random() *  (originals[0].items.results.length - 1));
      let Film  = originals[0].items.results[randomFilms];
      let filmInfo = await Tmdb.getMovieInfo(Film.id, 'tv');
      setFeaturedData(filmInfo);
    }

    loadAll();
  }, [])

  useEffect(() =>{
    const scrollListner = () => {
      if(window.scrollY > 10)
      {
        setBlackHeader(true)
      }
      else{
        setBlackHeader(false)
      }
    } 

    window.addEventListener('scroll',scrollListner)
    return () => {
      window.removeEventListener('scroll',scrollListner)
    }
  }, []);

  return(
    <div className="page">

      <Header black = {blackHeader}/>

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {movielist.map((item, key) =>(
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>
    </div> 
  ); 
}
