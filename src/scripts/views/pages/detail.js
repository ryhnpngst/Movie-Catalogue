import UrlParser from '../../routes/url-parser';
import TheMovieDbSource from '../../data/themoviedb-source';
import { createMovieDetailTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const Detail = {
  async render() {
    return `
            <div id="movie" class="movie"></div>
            <div id="likeButtonContainer"></div>
        `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const movies = await TheMovieDbSource.detailMovie(url.id);
    const moviesContainer = document.querySelector('#movie');
    moviesContainer.innerHTML = createMovieDetailTemplate(movies);

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      movie: {
        id: movies.id,
        title: movies.title,
        overview: movies.overview,
        backdrop_path: movies.backdrop_path,
        vote_average: movies.vote_average,
      },
    });
  },
};

export default Detail;
