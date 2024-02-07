import React from 'react';
import MovieService from '../../services/movie.service';

export default class DefaultPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            movie: JSON.parse(localStorage.getItem('currentMovie')),
            clients: [],
        };
    }

    componentDidMount() {
        this.findClientsOfCar();
    }

    findClientsOfCar() {
        MovieService.filterClients(this.state.id).then(clients => {
            this.setState({clients: clients.data});
        });
    }

    render() {
        const {clients} = this.state;
        return (
            <div className="col-md-12">
                <div className="jumbotron">
                    <h1 className="display-4">Movie: {this.state.movie.name}</h1>
                    <h4>Movie description: {this.state.movie.description}</h4>
                    <h4>Movie price: {this.state.movie.price}</h4>
                </div>
                <div><h5>Clients that attended this movie so far:</h5></div>
                {clients.length > 0 &&
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Client Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {clients.map((client, index) =>
                            <tr key={client}>
                                <th scope="row">{index + 1}</th>
                                <td>{client}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                }
                {clients.length === 0 &&
                    <div>No user has bought this item so far</div>
                }
            </div>
        );
    }

}
