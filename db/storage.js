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
}

module.exports = new Wares();
