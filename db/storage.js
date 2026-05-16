class Wares {
  constructor() {
    this.inventory = [
      { id: 1, type: "weapon", name: "sword" },
      { id: 2, type: "tome", name: "ward" },
      { id: 3, type: "potion", name: "heal" },
    ];
    this.id = 4;
  }

  getItems() {
    return this.inventory;
  }

  getItem(id) {
    return this.inventory.find((item) => item.id === Number(id));
  }

  getItemByType(type) {
    return this.inventory.filter((item) => item.type === type);
  }

  addItem({ type, name }) {
    const newItem = {
      id: this.id,
      type,
      name,
    };
    this.inventory.push(newItem);
    this.id++;
  }

  updateItem(id, { type, name }) {
    const item = this.inventory.find((item) => item.id === Number(id));
    item.type = type;
    item.name = name;
  }

  deleteItem(id) {
    this.inventory = this.inventory.filter((item) => item.id !== Number(id));
  }
}

module.exports = new Wares();
