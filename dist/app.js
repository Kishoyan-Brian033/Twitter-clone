"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const usersUrl = 'https://jsonplaceholder.typicode.com/users';
const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
const commentsUrl = 'https://jsonplaceholder.typicode.com/comments';
const selectUser = document.getElementById('select-user');
const postsContainer = document.getElementById('posts-container');
const commentsContainer = document.getElementById('comments-container');
const postCountSpan = document.getElementById('post-count');
const commentCountSpan = document.getElementById('comment-count');
const usernameElement = document.getElementById('username');
const userInfoElement = document.getElementById('user-info');
const userBioElement = document.getElementById('user-bio');
const userLocationElement = document.getElementById('user-location');
let currentUser = null;
let currentPosts = [];
let currentComments = [];
function fetchData(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return yield response.json();
    });
}
function initApp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield fetchData(usersUrl);
            populateUserDropdown(users);
            if (users.length > 0) {
                selectUser.value = users[0].id.toString();
                yield loadUserData(parseInt(selectUser.value));
            }
        }
        catch (error) {
            console.error('Error initializing app:', error);
            postsContainer.innerHTML = '<p>Error loading data. Please try again later.</p>';
        }
    });
}
function populateUserDropdown(users) {
    selectUser.innerHTML = '';
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id.toString();
        option.textContent = user.name;
        selectUser.appendChild(option);
    });
    selectUser.addEventListener('change', () => __awaiter(this, void 0, void 0, function* () {
        const userId = parseInt(selectUser.value);
        yield loadUserData(userId);
    }));
}
function loadUserData(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield fetchData(`${usersUrl}/${userId}`);
            currentUser = user;
            updateProfile(user);
            const posts = yield fetchData(`${postsUrl}?userId=${userId}`);
            currentPosts = posts;
            renderPosts(posts);
            postCountSpan.textContent = `(${posts.length})`;
            if (posts.length > 0) {
                yield loadPostComments(posts[0].id);
            }
        }
        catch (error) {
            console.error('Error loading user data:', error);
            postsContainer.innerHTML = '<p>Error loading user data. Please try again later.</p>';
        }
    });
}
function updateProfile(user) {
    var _a;
    usernameElement.textContent = `@${user.username}`;
    userInfoElement.textContent = user.username;
    userBioElement.textContent = ((_a = user.company) === null || _a === void 0 ? void 0 : _a.catchPhrase) || 'No bio';
    userLocationElement.textContent = `${user.address.city}, ${user.address.street}`;
}
function renderPosts(posts) {
    postsContainer.innerHTML = '';
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post-card';
        postElement.innerHTML = `
                    <div class="top-card">
                        <h3>${post.title}</h3>
                        <ion-icon name="checkmark-done-circle-outline"></ion-icon>
                        <ion-icon name="logo-twitter"></ion-icon>
                    </div>
                    <p>${post.body}</p>
                    <div class="card-bottom">
                        <ion-icon name="chatbubbles-outline"></ion-icon>
                        <ion-icon name="repeat-outline"></ion-icon>
                        <ion-icon name="heart"></ion-icon>
                    </div>
                    
                `;
        postElement.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            yield loadPostComments(post.id);
        }));
        postsContainer.appendChild(postElement);
    });
}
function loadPostComments(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            commentsContainer.innerHTML = '<p>Loading comments...</p>';
            const comments = yield fetchData(`${commentsUrl}?postId=${postId}`);
            currentComments = comments;
            renderComments(comments);
            commentCountSpan.textContent = `(${comments.length})`;
        }
        catch (error) {
            console.error('Error loading comments:', error);
            commentsContainer.innerHTML = '<p>Error loading comments.</p>';
        }
    });
}
function renderComments(comments) {
    commentsContainer.innerHTML = '';
    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.className = 'post-card';
        commentElement.innerHTML = `
                    <div class="top-card">
                        <h3>${comment.name}</h3>
                        <ion-icon name="checkmark-done-circle-outline"></ion-icon>
                        <ion-icon name="logo-twitter"></ion-icon>
                    </div>
                    <p>${comment.body}</p>
                    <p><small>${comment.email}</small></p>
                    <div class="card-bottom">
                        <ion-icon name="chatbubbles-outline"></ion-icon>
                        <ion-icon name="repeat-outline"></ion-icon>
                        <ion-icon name="heart"></ion-icon>
                    </div>
                `;
        commentsContainer.appendChild(commentElement);
    });
}
document.addEventListener('DOMContentLoaded', initApp);
