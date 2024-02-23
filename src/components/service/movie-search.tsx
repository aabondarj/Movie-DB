import axios, { AxiosError } from "axios";

interface Genre {
  id: number;
  name: string;
}

export default class MovieSearchService {

  private apiKey: string;
  guestSessionId: string | null;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.guestSessionId = null;
    this.createGuestSession();
  }

  async createGuestSession() {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/authentication/guest_session/new`,
        {
          params: {
            api_key: this.apiKey,
          },
        }
      );
      this.guestSessionId = response.data.guest_session_id;
    } catch (error) {
      console.error("Error creating guest session:", error);
    }
  }

  async getGenres(): Promise<Genre[]> {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list`,
        {
          params: {
            api_key: this.apiKey,
          },
        }
      );
      return response.data.genres;
    } catch (error) {
      console.error("Error fetching genres:", error);
      return [];
    }
  }
  
  async getMovies(query: string = 'return', page: number = 1) {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: this.apiKey,
          query: query,
          page: page
        }
      });

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // Запрос был выполнен, но сервер вернул код состояния, не в диапазоне 2xx
        throw new Error(`Could not fetch https://api.themoviedb.org/3/search/movie?${query}, received ${axiosError.response.status}`);
      } else if (axiosError.request && !axiosError.response) {
        // Запрос был выполнен, но ответ не получен (нет соединения)
        throw new Error('Network error occurred. Please check your internet connection.');
      } else {
        // Во время настройки запроса произошла ошибка
        throw new Error(`Request setup error: ${axiosError.message}`);
      }
    }
  }

  async getMoviesQuery(query: string = 'return', page: number = 1) {
    const data = await this.getMovies(query, page);
    return data;
  }

  async getRatedMovies() {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/guest_session/${this.guestSessionId}/rated/movies`,
        {
          params: {
            api_key: this.apiKey,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching rated movies:", error);
      return [];
    }
  }
}