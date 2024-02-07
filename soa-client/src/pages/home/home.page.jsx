import React from 'react';
import UserService from '../../services/user.service';
import {User} from '../../models/user';
import MovieService from "../../services/movie.service";

export default class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            errorMessage: '',
            infoMessage: '',
            currentUser: new User()
        };
    }

    componentDidMount() {
        UserService.currentUser.subscribe(data => {
            this.setState({
                currentUser: data
            });
        });

        this.getAllMovies();
    }

    getAllMovies() {
        this.setState({
            movies: {loading: true}
        });

        MovieService.findAllMovies().then(movies => {
            this.setState({movies: movies.data});
        });
    }

    buy(movie) {
        if (!this.state.currentUser) {
            this.setState({errorMessage: 'To buy a movie ticket, you should sign in.'});
            return;
        }

        localStorage.setItem('currentMovie', JSON.stringify(movie));
        this.props.history.push('/payment/' + movie.id);
    }

    detail(movie) {
        localStorage.setItem('currentMovie', JSON.stringify(movie));
        this.props.history.push('/detail/' + movie.id);
    }

    render() {
        const {movies, infoMessage, errorMessage} = this.state;
        return (
            <div className="col-md-12">
                {infoMessage &&
                    <div className="alert alert-success">
                        <strong>Successfull! </strong>{infoMessage}
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                }
                {errorMessage &&
                    <div className="alert alert-danger">
                        <strong>Error! </strong>{errorMessage}
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                }
                {movies.loading && <em> Loading movies...</em>}
                {movies.length &&
                    <div style={{marginTop: 50}}>
                        <h2 style={{marginBottom: 60}}>Welcome! Please choose your desired movie from
                            our list:</h2>
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Movie Name</th>
                                <th scope="col">Director</th>
                                <th scope="col">Genre</th>
                                <th scope="col">Price</th>
                                <th scope="col">Details</th>
                                <th scope="col">Discount</th>
                            </tr>
                            </thead>
                            <tbody>
                            {movies.map((movie, index) =>
                                <tr key={movie.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{movie.name}</td>
                                    <td>{movie.author}</td>
                                    <td>{movie.genre}</td>
                                    <td>${movie.price}</td>
                                    <td>
                                        <button className="btn btn-info" onClick={() => this.detail(movie)}>Detail
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-success" onClick={() => this.buy(movie)}>Buy
                                        </button>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        );
    }

}
