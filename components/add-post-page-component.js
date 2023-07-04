import { renderUploadImageComponent } from "./upload-image-component.js";
import { renderHeaderComponent } from "./header-component.js";
import { protectionHtml } from "../helpers.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let imageUrl = "";
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
         <div class="form">
              <h3 class="form-title">
                   Добавить пост
              </h3>
              <div class="form-inputs">
                <div class="upload-image-container"></div>
                <label>
                Описание фотографии
                <textarea 
                class="input textarea" 
                rows="5"
                id = "postsTextInput"
                ></textarea>
                </label>
                <div class="form-error"></div>
                  <button class="button" id="add-button">Добавить</button>
                </div>
              </div>
  </div>
  `;

    appEl.innerHTML = appHtml;


    const setError = (message) => {
      appEl.querySelector(".form-error").textContent = message;
    };

    // зарендерили шапку
    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

    // рендер формы загрузки картинки и получение ее Url

    const uploadImageContainer = appEl.querySelector(".upload-image-container");

    if (uploadImageContainer) {
      renderUploadImageComponent({
        element: appEl.querySelector(".upload-image-container"),
        onImageUrlChange(newImageUrl) {
          imageUrl = newImageUrl;
        },
      });
    }

// обработчик клика на добавление нового поста 

    document.getElementById("add-button").addEventListener("click", () => {
      setError("");  //убираем ошибку
      const textDescription = document.getElementById('postsTextInput').value;

      if (!imageUrl) {
        alert("Нужно добавить фотографию");
        return;
      }
      if (!textDescription) {
        alert('Введите описание поста');
        return;
      }

      onAddPostClick({
        description: protectionHtml(textDescription),
        imageUrl: imageUrl
      });
    });
  };

  render();
}
