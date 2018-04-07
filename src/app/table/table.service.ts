import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class TableService {

  private baseUrl = `http://trirand.com/blog/phpjqgrid/examples/jsonp/getjsonp.php?callback=?&qwery=longorders`;

  constructor(private http: HttpClient) { }

  async loadList(page = 1): Promise<Response> {
    try {
      const resp = await this.http.get<Response>(`http://trirand.com/blog/phpjqgrid/examples/jsonp/getjsonp.php?qwery=longorders&page=${page}`).toPromise();
      return resp;
    } catch (err) {
      console.log(err);
    }
  }

}

export interface Response {
  records: string;
  page: number;
  total: number;
  rows: [{}];
}
