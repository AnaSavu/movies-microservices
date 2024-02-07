import axios from 'axios';

let API_URL = 'http://localhost:8765/api/movie/service/';

class MovieService {

  createOrder(order){
    return axios.post(API_URL + 'buy', JSON.stringify(order),
  {headers: {'Content-Type':'application/json; charset=UTF-8'}});
  }

  filterOrders(userId){
    return axios.get(API_URL + 'user/'+ userId,
  {headers: {'Content-Type':'application/json; charset=UTF-8'}});
  }

  filterClients(movieId){
    return axios.get(API_URL + 'movie/' + movieId,
  {headers: {'Content-Type':'application/json; charset=UTF-8'}});
  }

  findMovieById(movieId){
    return axios.get(API_URL + movieId,
        {headers: {'Content-Type':'application/json; charset=UTF-8'}});
  }

  findAllMovies(){
    return axios.get(API_URL + 'all',
    {headers: {'Content-Type':'application/json; charset=UTF-8'}});
  }
}
export default new MovieService();
