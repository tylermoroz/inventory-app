class Wares {
  constructor() {
    this.inventory = [
      { id: 1, type: "weapon", name: "sword", affinity: "kinetic" },
      { id: 2, type: "tome", name: "ward", affinity: "magic" },
      { id: 3, type: "potion", name: "heal", affinity: "holy" },
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

  getItemByAffinity(type, affinity) {
    return this.inventory.filter(
      (item) => item.type === type && item.affinity === affinity
    );
  }

  addItem({ type, name, affinity }) {
    const newItem = {
      id: this.id,
      type,
      name,
      affinity,
    };
    this.inventory.push(newItem);
    this.id++;
  }

  updateItem(id, { type, name, affinity }) {
    const item = this.inventory.find((item) => item.id === Number(id));
    item.type = type;
    item.name = name;
    item.affinity = affinity;
  }

  deleteItem(id) {
    this.inventory = this.inventory.filter((item) => item.id !== Number(id));
  }
}

module.exports = new Wares();
