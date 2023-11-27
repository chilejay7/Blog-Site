const addBtn = document.getElementById('addBtn');

// Used to set the new location when the "Add a Post" button is clicked in the menu.
const displayAdd = () => {
    document.location.replace('/api/posts/add');
};

addBtn.addEventListener('click', displayAdd);