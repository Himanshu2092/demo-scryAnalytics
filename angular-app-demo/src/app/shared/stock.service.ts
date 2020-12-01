import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
// import { Socket } from "ngx-socket-io";
@Injectable({
  providedIn: "root"
})
export class StockService {
  baseUrl = "http://localhost:3000/";

  constructor(private httpService: HttpClient /* private socket: Socket */) {}

  getStocks(query): Observable<any> {
    const apiUrl = `api/stocks?page=${query.page}`;
    const headers = new HttpHeaders();
    headers.set("Content-Type", "application/json");
    const options = {
      headers
    };
    return this.httpService.get(`${this.baseUrl}${apiUrl}`, options).pipe(
      map((res: Response) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  addStock(body): Observable<any> {
    const apiUrl = "api/stocks/add";
    const headers = new HttpHeaders();
    headers.set("Content-Type", "application/json");
    const options = {
      headers
    };
    return this.httpService
      .post(`${this.baseUrl}${apiUrl}`, body, options)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        catchError(this.handleError)
      );
  }

  handleError = (error: any): Observable<any> => {
    try {
      let errormsg;
      switch (error.status) {
        case 400:
        case 401:
          // Unauthorised
          errormsg = error.message;
          return throwError(errormsg);
        case 404:
        case 500:
          errormsg = error.message;
          return throwError(errormsg);

        default:
          errormsg = error.message;
          return throwError(error.message);
      }
    } catch (e) {
      return throwError(e);
    }
  };

  // TODO: some cors issues are coming
  // public sendMessage(message) {
  //   this.socket.emit("new-message", message);
  // }

  // public getMessages = () => {
  //   return Observable.create(observer => {
  //     this.socket.on("new-message", message => {
  //       observer.next(message);
  //     });
  //   });
  // };
}
