const addBtn = document.getElementById('addBtn');

const addPost = () => {
    document.location.replace('/api/posts/add');
}

addBtn.addEventListener('click', addPost);