export class Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;

  constructor(id: string, title: string, content: string, createdAt: string) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
  }
}
