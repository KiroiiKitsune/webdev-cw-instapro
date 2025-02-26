import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { getUpdateLikes, dataFormat} from "../helpers.js";

export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
// создали разметку списка постов из Api
  const postsHtml = posts.map((item, index) => {
    let activeLike = '';
    if (item.isLiked) {
      activeLike = '-active-like'
    }
    return `<li class="post">
    <div class="post-header" data-user-id=${item.user.id}>
        <img src=${item.user.imageUrl} class="post-header__user-image">
        <p class="post-header__user-name">${item.user.name}</p>
    </div>
    <div class="post-image-container">
      <img class="post-image" src=${item.imageUrl}>
    </div>
    <div class="post-likes">
      <button data-post-id=${item.id} data-index='${index}' class="like-button">
        ${ item.isLiked ? '<img src="./assets/images/like-active.svg">' : '<img src="./assets/images/like-not-active.svg">'}
      </button>
      <p class="post-likes-text">
        Нравится: <strong>${item.likes.length}</strong>
      </p>
    </div>
    <p class="post-text">
      <span class="user-name">${item.user.name}</span>
      ${item.description}
    </p>
    <p class="post-date">
      ${dataFormat(item.createdAt)}
    </p>
  </li>`
}).join('');
 
  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">
                 ${postsHtml}
                </ul>
              </div>`;


      appEl.innerHTML = appHtml; 


  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
  getUpdateLikes(posts)
}
