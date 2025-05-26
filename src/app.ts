
     
        interface User {
            id: number;
            name: string;
            username: string;
            email: string;
            address: {
                street: string;
                suite: string;  
                city: string;
                zipcode?: string;
                geo?: {
                    lat: string;
                    lng: string;
                };
            };
            phone?: string;
            website: string;
            company?: {
                name: string;
                catchPhrase: string;
                bs: string;
            };
        }

        interface Post {
            userId: number;
            id: number;
            title: string;
            body: string;
        }

        interface Comment {
            postId: number;
            id: number;
            name: string;
            email: string;
            body: string;
        }

      
        const usersUrl = 'https://jsonplaceholder.typicode.com/users';
        const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
        const commentsUrl = 'https://jsonplaceholder.typicode.com/comments';

        const selectUser = document.getElementById('select-user') as HTMLSelectElement;
        const postsContainer = document.getElementById('posts-container') as HTMLDivElement;
        const commentsContainer = document.getElementById('comments-container') as HTMLDivElement;
        const postCountSpan = document.getElementById('post-count') as HTMLSpanElement;
        const commentCountSpan = document.getElementById('comment-count') as HTMLSpanElement;
        const usernameElement = document.getElementById('username') as HTMLParagraphElement;
        const userInfoElement = document.getElementById('user-info') as HTMLParagraphElement;
        const userBioElement = document.getElementById('user-bio') as HTMLAnchorElement;
        const userLocationElement = document.getElementById('user-location') as HTMLSpanElement;


        let currentUser: User | null = null;
        let currentPosts: Post[] = [];
        let currentComments: Comment[] = [];

        async function fetchData<T>(url: string): Promise<T> {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        }

       
        async function loadWindow() {
            try {
                const users = await fetchData<User[]>(usersUrl);
                dropdownUser(users);
                
                if (users.length > 0) {
                    selectUser.value = users[0].id.toString();
                    await loadUserData(parseInt(selectUser.value));
                }
            } catch (error) {
                console.error('Error initializing app:', error);
                postsContainer.innerHTML = '<p>Error loading data. Please try again later.</p>';
            }
        }

        function dropdownUser(users: User[]) {
            selectUser.innerHTML = '';
            
            users.forEach(user => {
                const option = document.createElement('option');
                option.value = user.id.toString();
                option.textContent = user.name;
                selectUser.appendChild(option);
            });
            
            selectUser.addEventListener('change', async () => {
                const userId = parseInt(selectUser.value);
                await loadUserData(userId);
            });
        }

        async function loadUserData(userId: number) {
            try {
                const user = await fetchData<User>(`${usersUrl}/${userId}`);
                currentUser = user;
                updateProfile(user);
                
                const posts = await fetchData<Post[]>(`${postsUrl}?userId=${userId}`);
                currentPosts = posts;
                displayPosts(posts);
                postCountSpan.textContent = `(${posts.length})`;
                
                if (posts.length > 0) {
                    await loadPostComments(posts[0].id);
                }
            } catch (error) {
                console.error('Error loading user data:', error);
                postsContainer.innerHTML = '<p>Error loading user data. Please try again later.</p>';
            }
        }

        function updateProfile(user: User) {
            usernameElement.textContent = `@${user.username}`;
            userInfoElement.textContent = user.username;
            userBioElement.textContent = user.company?.catchPhrase || 'No bio';
            userLocationElement.textContent = `${user.address.city}, ${user.address.street}`;
        }

        function displayPosts(posts: Post[]) {
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
                
                postElement.addEventListener('click', async () => {
                    await loadPostComments(post.id);
                });
                
                postsContainer.appendChild(postElement);
            });
        }

        async function loadPostComments(postId: number) {
            try {
                commentsContainer.innerHTML = '<p>Loading comments...</p>';
                const comments = await fetchData<Comment[]>(`${commentsUrl}?postId=${postId}`);
                currentComments = comments;
                displayComments(comments);
                commentCountSpan.textContent = `(${comments.length})`;
            } catch (error) {
                console.error('Error loading comments:', error);
                commentsContainer.innerHTML = '<p>Error loading comments.</p>';
            }
        }

        function displayComments(comments: Comment[]) {
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

        document.addEventListener('DOMContentLoaded', loadWindow);
 



      