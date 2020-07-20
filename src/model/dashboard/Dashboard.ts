class Dashboard {
  id: number;

  name: string;

  constructor(id: number, name:string) {
    this.id = id;
    this.name = name;
  }

  static fromObject(obj: any) {
    return new Dashboard(obj.id, obj.name);
  }

  toObject() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}

export default Dashboard;
