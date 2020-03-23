import { observable, decorate } from 'mobx';

export class Sorting {
  value: string;
  label: string;

  constructor(sorting: Sorting.Sorting) {
    this.value = sorting.value;
    this.label = sorting.label;
  }
}

decorate(Sorting, {
  value: observable,
  label: observable,
});

export default Sorting;
