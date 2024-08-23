function searchUser() {
    const userInfo = document.getElementById('user-info');
    const username = document.getElementById('username').value;
    const avatar = document.getElementById('avatar');
    const fullName = document.getElementById('full-name');
    const login = document.getElementById('login');
    const followers = document.getElementById('followers');
    const following = document.getElementById('following');
    const repos = document.getElementById('repos');
    const twitter = document.getElementById('twitter');
    const twitter_link = document.getElementById('twitter-link');
    const github = document.getElementById('github');
    const github_link = document.getElementById('github-link');
    const blog = document.getElementById('blog');
    const blog_link = document.getElementById('blog-link');
    const location = document.getElementById('location');
    const location_link = document.getElementById('location-link');
    const bio = document.getElementById('bio');
    const created = document.getElementById('created');
    const toast = document.getElementById('toast');

    fetch(`https://api.github.com/users/${username}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('User not found');
            }
        })
        .then(data => {
            avatar.src = data.avatar_url;
            fullName.textContent = data.name || data.login;
            login.textContent = "@"+data.login;
            followers.textContent = data.followers;
            following.textContent = data.following;
            repos.textContent = data.public_repos;

            if (data.twitter_username) {
                twitter.parentElement.style.textDecoration = 'underline'
                twitter.textContent = data.twitter_username;
                twitter_link.href = `https://twitter.com/${data.twitter_username}`;
                twitter_link.style.pointerEvents = 'auto';
            } else {
                twitter.parentElement.style.textDecoration = 'none';
                twitter.textContent = 'Not Available';
                twitter_link.href = '#';
                twitter_link.style.pointerEvents = 'none';
            }
            
            github.textContent = data.html_url;
            github_link.href = data.html_url;
            
            if (data.blog) {
                blog.parentElement.style.textDecoration = 'underline';
                blog.textContent = data.blog;
                blog_link.href = data.blog;
                twitter_link.style.pointerEvents = 'auto';
            } else {
                blog.parentElement.style.textDecoration = 'none';
                blog.textContent = 'Not Available';
                blog_link.href = '#';
                blog_link.style.pointerEvents = 'none';
            }
            
            if (data.location) {
                location.parentElement.style.textDecoration = 'underline';
                location.textContent = data.location;
                location_link.href = `https://www.google.com/maps/place/${data.location}`;
                twitter_link.style.pointerEvents = 'auto';
            } else {
                location.parentElement.style.textDecoration = 'none';
                location.textContent = 'Not Available';
                location_link.href = '#';
                location_link.style.pointerEvents = 'none';
            }
            
            bio.textContent = data.bio || 'Not Available';
            created.textContent = `Joined on\n${new Date(data.created_at).toDateString()}`;

            userInfo.style.display = 'flex';
            userInfo.scrollIntoView({behavior: 'smooth'});
            userInfo.style.opacity = 1;
            document.body.style.height = 'auto';
        })
        .catch(error => {
            toast.className = "toast show";
            setTimeout(() => {
                toast.className = toast.className.replace("show", "");
            }, 3000);
        });
}
function swapElements() {
    const userLinks = document.getElementById('user-links');
    const stats = document.getElementById('stats');
    const details1 = document.getElementById('details-1');
    const details2 = document.getElementById('details-2');

    if (window.innerWidth <= 768) {
        if (!details1.contains(stats)) {
            details1.insertBefore(stats, userLinks);
        }
    } else {
        if (!details2.contains(stats)) {
            details2.insertBefore(stats, details2.firstChild);
        }
    }
}

window.addEventListener('load', swapElements);
window.addEventListener('resize', swapElements);
//window.addEventListener('load', searchUser);
//window.addEventListener('resize', searchUser);