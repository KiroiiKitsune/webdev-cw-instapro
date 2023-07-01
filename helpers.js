import { activeUserLike} from "./api.js";
import { getToken, renderApp } from "./index.js";



export function saveUserToLocalStorage(user) {
  window.localStorage.setItem("user", JSON.stringify(user));
}

export function getUserFromLocalStorage(user) {
  try {
    return JSON.parse(window.localStorage.getItem("user"));
  } catch (error) {
    return null;
  }
}

export function removeUserFromLocalStorage(user) {
  window.localStorage.removeItem("user");
}


// функция лайков 

export function getUpdateLikes (arr) {
  const token = getToken();
  const likeButEl = document.querySelectorAll('.like-button');

  for (const likeButEls of likeButEl){
    likeButEls.addEventListener('click', () => {
      if ( token ) {
        likeButEls.classList.add('louding-like');
        const index = likeButEls.dataset.index;
        return activeUserLike ({ likeId: likeButEls.dataset.postId, token: getToken(), activeLike: arr[index].isLiked})
        .then((newPost) => {
          arr[index] = newPost;
          renderApp();
        })
        .catch((error) => {
          console.error(error);
        });
      } else {console.log('автаризуйтесь');}
    })
  }
}



 export const protectionHtml = (string) => {
    return string
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
  };

  export const dataFormat = (commentDate) => {
    const dateComment = new Date(commentDate);
    const formatDate =
      dateComment.getDate().toString().padStart(2, '0') + '.' +
      (dateComment.getMonth() + 1).toString().padStart(2, '0') + '.' +
      dateComment.getFullYear().toString().slice(-2) + ' ' +
      dateComment.getHours().toString().padStart(2, '0') + ':' +
      dateComment.getMinutes().toString().padStart(2, '0');
      return formatDate;
    }
