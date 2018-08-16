const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates.map((plate, i) => `
    <li>
      <input
        type="checkbox"
        data-index=${i}
        id="item${i}"
        ${plate.done ? 'checked' : ''}
        />
      <label for="item${i}">${plate.text}</label>
    </li>
    `).join(''); // Map will return an array and for innerHTML we need just a big string
}

function toggleDone(e) {
  if (!e.target.matches('input')) return; // Skip if not input
  const el = e.target;
  const { index } = el.dataset;
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items)); // localStorage can only handle strings
  populateList(items, itemsList);
}

function addItem(e) {
  e.preventDefault();
  // this refers to the form, item is an input so it has a value
  const text = (this.querySelector('[name=item]')).value;
  const item = {
    text,
    done: false,
  };

  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items)); // localStorage can only handle strings
  this.reset(); // Resets the form
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
populateList(items, itemsList);
