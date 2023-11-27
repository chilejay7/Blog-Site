const addBtn = document.getElementById('addBtn');
const createBtn = document.getElementById('createBtn');

// Used to set the new location when the "Add a Post" button is clicked in the menu.
const displayAdd = () => {
    document.location.replace('/api/posts/add');
};

const addPost = async () => {
    const sendPost = await fetch ('/api/posts/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

   sendPost.ok ? document.location.replace('/')
    : alert('Unable to create post.  Please try again later.');
}

addBtn.addEventListener('click', displayAdd);

createBtn.addEventListener('click', addPost);

