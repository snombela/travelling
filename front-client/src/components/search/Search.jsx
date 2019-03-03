import React, { Component } from 'react'
import Movieshowservice from '../movieshow/Movieshow-service';
import { Link } from 'react-router-dom';

export default class Search extends Component {
	constructor(props) {
		super(props)
		this.state = {
			movieshow: null,
			originalMovieshow: null,
			search: ''
		}
		this.service = new Movieshowservice();
	}

	componentDidMount() {
		this.service.getMovieshowAll()
			.then(movieshow => {
				this.setState({ ...this.state, movieshow: movieshow, originalMovieshow: movieshow })
			})
	}

	handleFormSearch = e => {
		const text = e.target.value;
		this.setState({ ...this.state, search: text })
		if (text.length > 0) {
			const movieshow = this.state.originalMovieshow.filter(movie => {
				return movie.title.toLowerCase().indexOf(text.toLowerCase()) !== -1
			})
			console.log(movieshow)
			this.setState({ ...this.state, movieshow: movieshow })
		} else {
			this.setState({ ...this.state, movieshow: this.state.originalMovieshow })
		}
	};

	render() {
		if (this.state.movieshow !== null) {
			return (
				<div>
					<input type="text" name="search" className="form-control" onChange={e => this.handleFormSearch(e)} placeholder="enter your query" />
					<Link to='/search'></Link>
					<div className="card-deck ">
						{this.state.movieshow.map((eachMovieshow) => {
							return (
								<div key={eachMovieshow._id} className="card">
									<Link to={`/movieshow/${eachMovieshow._id}`} style={{ textDecoration: 'none' }}>
										<img src={eachMovieshow.backgroundUrl} alt="background" className="card-img-top img-card" />
										<div className="card-body">
											<h6 className="card-title">{eachMovieshow.title}</h6>
										</div>
									</Link>
								</div>
							)
						})}
					</div>
				</div>
			)
		} else {
			return <h1>No hay nada que mostrar</h1>;
		}
	}
}
