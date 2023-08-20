
export class Token {
    id: number = 0;
    uuid: string = '';
    image: string = '';
    first_name: string = '';
    last_name: string = '';
    email: string = '';

    setInfo(data: any) {
      this.id = data.id;
      this.uuid = data.uuid;
      this.image = data.image;
      this.first_name = data.first_name;
      this.last_name = data.last_name;
      this.email = data.email;
      return this;
    }
}
