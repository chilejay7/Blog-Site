// This button is displayed on individual posts in  the postById view.  It is used to unhide the update form.
const displayUpdateBtn = document.getElementById('displayUpdateBtn');

// This is the update form that will be displayed in the postById view when not hidden.
const updateForm = document.querySelector('.updateForm');

// This function is used as the callback in the event listener to unhide or display the post update form.
const unhideForm = (e) => {
    console.log(e);
    updateForm.style.display = 'block';
}

const updatePost = async (e) => {

    console.log(e);
    // This is used to prevent the page from refreshing.
    e.preventDefault();

    // This captures the values from the 
    const post_title = document.getElementById('title_update').value;
    const post_content = document.getElementById('content_update').value;

    // The window.location provides access to the page's URL, and the split method separates it based on the / symbols.
    // This returns an array, which is why square brackets are used to then call the .length method of -1 to get the index of the id value we need.
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const sendUpdate = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({
            post_title,
            post_content,
        })
    });

    sendUpdate.ok ? document.location.replace(`/api/posts/byId/${id}`)
        : console.log('Update failed');
};

displayUpdateBtn.addEventListener('click', unhideForm);

updateForm.addEventListener('submit', updatePost);
