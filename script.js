// Load posts and set up event listeners when the page loads
document.addEventListener('DOMContentLoaded', () => {
    displayPosts();
    document.getElementById('searchInput').addEventListener('input', displayPosts);
    document.getElementById('categoryFilter').addEventListener('change', displayPosts);
});

function addPost() {
    const name = document.getElementById('userName').value.trim();
    const title = document.getElementById('postTitle').value.trim();
    const content = document.getElementById('postContent').value.trim();
    const category = document.getElementById('postCategory').value;
    
    if (name === '' || title === '' || content === '') {
        alert('Please fill in name, title, and content.');
        return;
    }

    // Create post object
    const post = {
        id: Date.now(),
        name: name,
        title: title,
        content: content,
        category: category,
        date: new Date().toLocaleString()
    };

    // Save to localStorage
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.unshift(post);
    localStorage.setItem('posts', JSON.stringify(posts));

    // Clear form
    document.getElementById('userName').value = '';
    document.getElementById('postTitle').value = '';
    document.getElementById('postContent').value = '';
    document.getElementById('postCategory').value = 'Event';

    // Update display
    displayPosts();
}

function displayPosts() {
    const postsContainer = document.getElementById('postsContainer');
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const selectedCategory = document.getElementById('categoryFilter').value;
    
    postsContainer.innerHTML = '';
    
    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm) || 
                            post.content.toLowerCase().includes(searchTerm) || 
                            post.name.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === '' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });
    
    filteredPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'p-4 bg-gray-50 rounded-lg shadow';
        postElement.innerHTML = `
            <h2 class="text-lg font-semibold">${post.title}</h2>
            <p class="text-gray-600">${post.content}</p>
            <p class="text-sm text-gray-500 mt-2">Posted by: ${ voname} on ${post.date} | Category: ${post.category}</p>
            <button onclick="deletePost(${post.id})" class="mt-2 text-red-500 hover:text-red-700">Delete</button>
        `;
        postsContainer.appendChild(postElement);
    });
}

function deletePost(id) {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts = posts.filter(post => post.id !== id);
    localStorage.setItem('posts', JSON.stringify(posts));
    displayPosts();
}