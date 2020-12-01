import { Component } from '@angular/core';
import { StockService } from './shared/stock.service';

declare var $

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  page: number = 1
  totalPages: number = 0
  currCount: number = 0
  count: number = 0
  stocks: any[] = []
  isNext: boolean = true
  open: string = ''
  close: string = ''

  constructor(private stockService: StockService) {}
  
  ngOnInit() {
    this.getStocks()
  }

  onPrev() {
    if(this.page > 1) {
      this.page -= 1
      this.getStocks()
    }
  }

  onNext() {
    if(this.page < this.totalPages) {
      this.page+=1
      this.getStocks()
    }
  }

  getStocks() {
    let query = {
      page: this.page
    }
    this.stockService.getStocks(query).subscribe(res => {
      if(res.code == 200) {
        this.stocks = res.data.list || []
        this.count = res.data.count ? res.data.count : this.count
        this.totalPages = Math.ceil(this.count/30)
      }
    })
  }

  onAdd() {
    let body = {
      open: this.open,
      close: this.close
    }
    this.stockService.addStock(body).subscribe(res => {
      if(res.code == 200) {
        $('#myModal').modal('hide')
        this.reset()
        this.page = 1
        this.getStocks()
      }
    })
  }

  reset() {
    this.open = ''
    this.close = ''
  }
}
