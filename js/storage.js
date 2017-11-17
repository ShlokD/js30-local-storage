  const addItems = document.querySelector('.add-items');
  const itemsList = document.querySelector('.plates');
  const items = localStorage ? JSON.parse(localStorage.getItem('items')) : [];


  const handleChecked = ev => {
   if(!ev.target.matches('input')) return;
   
   const selectedIndex = parseInt(ev.target.dataset.index);
   
   if (items[selectedIndex]) {
     items[selectedIndex].done = !items[selectedIndex].done;
   }
  
   if (localStorage) {
    localStorage.setItem('items', JSON.stringify(items))
  }

  }
  const handleAddItem = ev => {
    ev.preventDefault();
    const text = ev.target.querySelector('input[name="item"]').value;
    items.push({
      text,
      done: false
    })
    populateList(items, itemsList);
    if(localStorage) {
      localStorage.setItem('items', JSON.stringify(items))
    }
    ev.target.reset();
  };

  const populateList = (plates = [], platesList) => {
    platesList.innerHTML = plates.map((plate, index) => {
      return `<li key=${index}>
      <input type="checkbox" data-index=${index} id="item${index}" ${plate.done ? "checked" : ""}/>
      <label for='item${index}'>${plate.text}</label> 
      </li>`;
    }).join('');
  };

  addItems.addEventListener('submit', handleAddItem);
  itemsList.addEventListener('click', handleChecked)

  populateList(items, itemsList);