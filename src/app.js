import { http } from './http';
import { ui } from './ui';

// Get post on DOM Load
document.addEventListener('DOMContentLoaded', getPost);

function getPost(e) {
    http.get('http://localhost:3000/posts')
        .then((data) => ui.showPosts(data))
        .catch((e) => console.log(e));
}