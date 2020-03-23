import { observable, decorate } from 'mobx';

export class Tag {
  name: string;
  comments: number;

  constructor(tag: Tag.Tag) {
    this.name = tag.name;
    this.comments = tag.comments;
  }
}

decorate(Tag, {
  name: observable,
  comments: observable,
});

export default Tag;
