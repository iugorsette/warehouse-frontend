import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  @Output() pageChange = new EventEmitter<number>()
  @Input() totalItems: number = 100
  @Input() itemsPerPage: number = 10
  @Input() currentPage: number = 1
  @Input() pageSizeOptions: number[] = []

  constructor() {}

  onPageChange(page: any) {
    this.pageChange.emit(page)
  }

  getPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage)
  }
}
