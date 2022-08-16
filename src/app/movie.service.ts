import { Injectable } from '@angular/core';
import { fakeMovies } from './fakeMovie';
import { Movie } from './Models/movie';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private REST_API_URL = "http://localhost:3000/movies";
  private HTTP_HEADER = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  getMovies(): Observable<Movie[]>{
    // this.messageService.add(`${new Date().toLocaleDateString()} - Movie List retrieved from Service`)
    // return of (fakeMovies); 
    return this.http.get<Movie[]>(this.REST_API_URL).pipe(
      tap(retrievedMovies => console.log(`retrievedMovies = ${JSON.stringify(retrievedMovies)}`)),
      catchError(error => of([])),
    );
  }

  getMovieById(id: number):Observable<Movie | any>{
    // return of (fakeMovies.find(theMovie => theMovie.id === id));
    const thisUrl = `${this.REST_API_URL}/${id}`;
    return this.http.get<Movie>(thisUrl).pipe(
      tap(thisMovie => console.log(`thisMovie = ${JSON.stringify(thisMovie)}`)),
      catchError(error => of(new Movie())),
    );
  }

  updateMovie(movie: Movie): Observable<Movie>{
    return this.http.put<Movie>(`${this.REST_API_URL}/${movie.id}`, movie, this.HTTP_HEADER).pipe(
      tap(updatedMovie => console.log(`updatedMovie = ${JSON.stringify(updatedMovie)}`)),
      catchError(error => of(new Movie())),
    );
  }

  createNewMovie(movie: Movie): Observable<Movie>{
    return this.http.post<Movie>(`${this.REST_API_URL}`, movie, this.HTTP_HEADER).pipe(
      tap(createdMovie => console.log(`createdMovie = ${JSON.stringify(createdMovie)}`)),
      catchError(error => of(new Movie())),
    );
  }

  deleteMovie(id: number){
    return this.http.delete<Movie>(`${this.REST_API_URL}/${id}`, this.HTTP_HEADER).pipe()
      
  }

  constructor(public messageService: MessageService, private http: HttpClient) { }
}
