// This is the button used to delete a post in the postById view.
const deletePostBtn = document.getElementById('deletePostBtn');

const deletePost = async (e) => {
    e.preventDefault();
    console.log(e);
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    
    const sendDelete = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
    });

    sendDelete.ok ? document.location.replace(`/api/posts`)
        : alert(`Unable to delete post ${id}`);
};

deletePostBtn.addEventListener('click', deletePost);