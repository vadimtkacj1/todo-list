class List {
  constructor(listElement, dataAboutList = []) {
    this.listElement = listElement;
    this.dataAboutList = dataAboutList;
  }

  fillListByDataAboutList() {
    this.listElement.textContent = "";
    this.dataAboutList.forEach((data) => {
      const template = data.createElement(data);

      this.listElement.insertAdjacentHTML("beforeend", template);
    });
  }

  deleteElementWithList(indexSelectElement) {
    this.dataAboutList.splice(indexSelectElement, 1);
  }
}

export default List;
