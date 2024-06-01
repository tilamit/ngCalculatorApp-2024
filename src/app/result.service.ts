import { Injectable, Input } from '@angular/core';
import { ResultService } from './Services';
import { Expression } from './Expression';

@Injectable()
export class ResultServices {
  result: string = '';

  constructor(private dataService: ResultService) {}

  ngOnInit() {}

  getValue(aExpression: Expression) {
    this.dataService.getExpressionResult(aExpression).subscribe((result) => {
      this.result = result;
    });

    console.log('Expression Result: ' + this.result);
  }
}
