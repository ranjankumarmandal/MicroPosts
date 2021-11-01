import { http } from './http';
import { ui } from './ui';

document.addEventListener('DOMContentLoaded', getPosts);    // Get post on DOM Load
document.querySelector('.post-submit').addEventListener('click', submitPost);   // Submit post
document.querySelector('#posts').addEventListener('click', deletePost);    // Delete post
document.querySelector('#posts').addEventListener('click', enableEdit);    // edit state / post
document.querySelector('.card-form').addEventListener('click', cancelEdit);    // cancel edit state

function getPosts(e) {
    http.get('https://ranjan-microposts.herokuapp.com/posts')
        .then((data) => ui.showPosts(data))
        .catch((e) => console.log(e));
}

function submitPost(e) {
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    const hiddenId = document.querySelector('#id').value;       // will use this as valdation while edit or put request 
    const data = { title, body };

    if(title === '' || body === '') {
        ui.showAlert('Please fill in all fields', 'alert alert-danger');
    } else {
        if(hiddenId === '') {
            // create a post
            http.post('https://ranjan-microposts.herokuapp.com/posts', data) // create pose
                .then(data => { ui.showAlert('Post added', 'alert alert-success'); ui.clearFields(); getPosts(); })
                .catch((e) => console.log(e));
        } else {
            // update a post
            http.put(`https://ranjan-microposts.herokuapp.com/posts/${hiddenId}`, data)
                .then((data) => { ui.showAlert('Post updated', 'alert alert-success'); ui.changeFormState('add'); getPosts(); })
        }
    
    }
}

function deletePost(e) {
    e.preventDefault();
    if(e.target.parentElement.classList.contains('delete')) {
        const id = e.target.parentElement.dataset.id;
        if(confirm('Are you sure?')) {
            http.delete(`https://ranjan-microposts.herokuapp.com/posts/${id}`)
                .then((data) => { ui.showAlert('Post Removed', 'alert alert-success'); getPosts(); })
                .catch((e) => console.log(e));
        }
    }
}

function enableEdit(e) {
    e.preventDefault();
    if(e.target.parentElement.classList.contains('edit')) {
        const id = e.target.parentElement.dataset.id;
        const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const body = e.target.parentElement.previousElementSibling.textContent;

        const data = { id, title, body };

        ui.fillForm(data);
    }
}

function cancelEdit(e) {    // cancel edit state
    e.preventDefault();
    if(e.target.classList.contains('post-cancel')) {
        ui.changeFormState('add');
    }
}