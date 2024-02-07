import React from 'react';

export default class MovieLecturePage extends React.Component {

    state = {
        movies: [
            {name: "Anna Karenina", author: "Leo Tolstoy", date: "09.02.2023 18:00", link: "172.30.192.1:8080/chat"}
        ],
    };

    render() {
        const meetings = this.state;
        return (
            <div className="col-md-12">
                <div className="jumbotron">
                    <h1 className="display-4">Movie Lecture Club</h1>
                    <h4>Welcome to the movie lecture club. Here you can interact with other people at the same time.
                        Check the table below to see the links for movie meetings</h4>
                </div>
                <div><h5>Click the link to open the chat:</h5></div>
                {meetings.movies.length > 0 &&
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Movie name</th>
                            <th scope="col">Director</th>
                            <th scope="col">Date</th>
                            <th scope="col">Link</th>
                        </tr>
                        </thead>
                        <tbody>
                        {meetings.movies.map((movie, index) =>
                            <tr key={movie}>
                                <th scope="row">{index + 1}</th>
                                <td>{movie.name}</td>
                                <td>{movie.author}</td>
                                <td>{movie.date}</td>
                                <td><a href="http://172.30.192.1:8080/chat" target="_blank">Go to chat</a></td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                }
                {meetings.movies.length === 0 &&
                    <div>No meetings scheduled so far</div>
                }
            </div>
        );
    }

}
