const API_KEY = 'bdddefbfc5372234052d393726beae7e';
const API_BASE = 'https://api.themoviedb.org/3';

/*
- originais Netflix
- recomendados (trending)
- em alta (top rated)
- ação
- comedia
- terror
- romance
- documentarios
*/

const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
}

export default {
    getHomeList: async() =>{
        return[
            {
                slug: 'originals',
                title: 'Originais Netflix',
                items: await basicFetch(`/discover/tv?with_network=213&language=pt-br&api_key=${API_KEY}`)
            },
            {     
                    slug: 'trending',
                    title: 'Recomendados para Você',
                    items: await basicFetch(`/trending/all/week?language=pt-br&api_key=${API_KEY}`)     
            },
            {
                slug: 'toprated',
                title: 'Em Alta',
                items: await basicFetch(`/movie/top_rated?language=pt-br&api_key=${API_KEY}`)
            },
            {
                slug: 'Action',
                title: 'ação',
                items: await basicFetch(`/discover/movie?with_genres=28&language=pt-br&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch(`/discover/movie?with_genres=35&language=pt-br&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&language=pt-br&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-br&api_key=${API_KEY}`)
            },
            {
                slug: 'documentery',
                title: 'Documentarios',
                items: await basicFetch(`/discover/movie?with_genres=99&language=pt-br&api_key=${API_KEY}`)
            },
        ]
    },
    //Pegar informação sobre o tituto se é filme ou serie pegando mais informações da API
    getMovieInfo: async (movieID, type) =>{
        let info = {};
        
        if(movieID) {
            switch(type){
                case 'movie':
                    info = await basicFetch(`/movie/${movieID}?language=pt-br&api_key=${API_KEY}`);
                break;

                case 'tv':
                    info = await basicFetch(`/tv/${movieID}?language=pt-br&api_key=${API_KEY}`);
                break;

                default:
                    info = null;
                break;
            }
        }  

        return info
    }

}