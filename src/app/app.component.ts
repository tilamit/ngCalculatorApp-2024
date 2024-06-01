import { Component, OnInit } from '@angular/core';
import { ResultServices } from './result.service';
import { ResultService } from './Services';
import { Expression } from './Expression';
import { DataMem } from './DataMem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private dataService: ResultService, private obj: Expression) {}
  title = 'calculator-app';
  popup = false;

  input: string = '';
  result: string = '';
  dataMem: DataMem[] = [];
  results: Number = 0;

  ngOnInit() {}

  pressNum(num: string) {
    if (num == '.') {
      if (this.input != '') {
        const lastNum = this.getLastOperand();
        console.log(lastNum.lastIndexOf('.'));
        if (lastNum.lastIndexOf('.') >= 0) return;
      }
    }

    if (num == '0') {
      const PrevKey = this.input[this.input.length - 1];
      if (
        PrevKey === '/' ||
        PrevKey === '*' ||
        PrevKey === '-' ||
        PrevKey === '+'
      ) {
        return;
      }
    }

    this.input = this.input + num;
  }

  getLastOperand() {
    let pos: number;
    console.log(this.input);
    pos = this.input.toString().lastIndexOf('+');
    if (this.input.toString().lastIndexOf('-') > pos)
      pos = this.input.lastIndexOf('-');
    if (this.input.toString().lastIndexOf('*') > pos)
      pos = this.input.lastIndexOf('*');
    if (this.input.toString().lastIndexOf('/') > pos)
      pos = this.input.lastIndexOf('/');
    console.log('Last ' + this.input.substr(pos + 1));
    return this.input.substr(pos + 1);
  }

  pressOperator(op: string) {
    const lastKey = this.input[this.input.length - 1];
    if (
      lastKey === '/' ||
      lastKey === '*' ||
      lastKey === '-' ||
      lastKey === '+'
    ) {
      return;
    }

    this.input = this.input + op;
  }

  clear() {
    if (this.input != '') {
      this.input = this.input.substr(0, this.input.length - 1);
    }
  }

  allClear() {
    this.result = '';
    this.input = '';
  }

  calcResult() {
    let formula = this.input;

    if (formula.length == 0) {
      alert('Expression is required!');
    } else {
      console.log(formula);

      this.obj.MathExpression = formula;

      this.dataService.getExpressionResult(this.obj).subscribe((result) => {
        var val = result;
        if (this.isNumber(val)) {
          this.result = result;
        } else {
          alert(result + ' - Invalid Expression!');
          this.allClear();
        }

        console.log(result);
      });
    }
  }

  isNumber(numStr: string) {
    return !isNaN(parseFloat(numStr)) && !isNaN(+numStr);
  }

  setMemory() {
    let formula = this.input;
    console.log(formula);

    let a = this.result;

    if (formula.length == 0 && a.length == 0) {
      alert('Expression and result are required to store in memory!');
    } else {
      const index = this.dataMem.findIndex(
        (c) => c.Expression === formula && c.Result === Number(a)
      );
      if (index == -1) {
        var aDataMem = new DataMem();

        aDataMem.Expression = formula;
        aDataMem.Result = Number(a);
        this.dataMem.push(aDataMem);

        console.log(this.dataMem);
      }
    }
  }

  getMemory() {
    this.popup = true;

    for (let i = 0; i < this.dataMem.length; i++) {
      console.log(this.dataMem[i].Expression + ' ' + this.dataMem[i].Result);
    }
  }

  getResult() {
    this.calcResult();
    //this.input = this.result;
    if (this.input == '0') this.input = '';
  }
}
