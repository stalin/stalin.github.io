const username = "stalin.t"; // Replace with your Medium handle
const rss_url = `https://medium.com/feed/@${username}`;
const api_url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rss_url)}`;

fetch(api_url)
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('medium-posts');
    container.innerHTML = ""; // Clear 'Loading...'
    const posts = data.items.slice(0, 2);
    console.log(posts)

    posts.forEach(post => {
      const postEl = document.createElement("div");
      postEl.className = "col-lg-6 mb-4 mb-lg-0";
      const parser = new DOMParser();
      const doc = parser.parseFromString(post.description, 'text/html');

      const dateObj = new Date(post.pubDate);
      const day = dateObj.getDate();
      const month = dateObj.toLocaleString('en-US', { month: 'short' }); // e.g., "Aug"
      const year = dateObj.getFullYear();
      const formattedDate = `${day}, ${month}, ${year}`;

      // Find image inside <figure>
      const img = doc.querySelector('figure img');
      const imageUrl = img ? img.src : '';

      postEl.innerHTML = `
                    <div class="d2c_card_wrapper">
                      <img src="${imageUrl}" class="img-fluid" alt="post image">
                      <div class="d2c_card_body">
                        <p class="mb-2">${post.categories.join(', ')}</p>
                        <h4 class="mb-2"><a href="${post.link}" target="_blank">${post.title}</a></h4>
                        <p class="mb-1">${post.description.substring(0, 150)}</p>
                        <div class="d2c_date">
                          <span>${formattedDate}</span>
                          <a href="#"><i class="fas fa-share-alt"></i></a>
                        </div>
                        <a href="${post.link}" target="_blank">Learn More <i class="fas fa-arrow-right"></i></a>
                      </div>
                    </div>
      `;
      container.appendChild(postEl);
    });
  })
  .catch(error => {
    document.getElementById('medium-posts').innerText = "Failed to load posts.";
    console.error("Error fetching Medium RSS feed:", error);
  });
