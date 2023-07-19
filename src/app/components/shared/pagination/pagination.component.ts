import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
    @Input() currentPage: number = 1;
    @Input() totalPage: number = 0;
    @Output() changePage = new EventEmitter<number>();

    pages: number[] = [];

    ngOnInit(): void {
        this.pages = this.range(1, this.totalPage);
    }

    range(start: number, end: number): number[] {
        return [...Array(end).keys()].map((element) => element + start);
    }

    onPagination(event: any) {
        this.changePage.emit(event.value);
    }
}
