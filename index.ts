import { v4 as randomUUID } from "uuid";
import { faker } from "@faker-js/faker";

class Post {
  private _id: string = randomUUID();
  private _userName: string;
  private _avatarUrl: string;
  private _imageUrl: string;
  private _description: string;
  private _isLiked: boolean = false;
  private _numberOfLikes: number = 0;
  private _createdAt: Date = new Date();

  constructor(
    userName: string,
    avatarUrl: string,
    imageUrl: string,
    description: string
  ) {
    this._userName = userName;
    this._avatarUrl = avatarUrl;
    this._imageUrl = imageUrl;
    this._description = description;
  }

  like() {
    const postContainer = document.getElementById(this._id);
    const btnLike = postContainer?.querySelector(".btn-like");
    const icon = btnLike?.querySelector("i");

    if (!icon) return;

    // Adiciona a classe de animação
    btnLike?.classList.add("btn-animation");

    // Remove a classe de animação após a duração da animação
    setTimeout(() => {
      btnLike?.classList.remove("btn-animation");
    }, 300); // Duração da animação em milissegundos

    if (this._isLiked) {
      this._numberOfLikes -= 1;
      icon.classList.remove("fa-heart");
      icon.classList.add("fa-heart-o");
      icon.classList.remove("liked");
    } else {
      this._numberOfLikes += 1;
      icon.classList.remove("fa-heart-o");
      icon.classList.add("fa-heart");
      icon.classList.add("liked");
    }
    this._isLiked = !this._isLiked;
  }

  toHTML() {
    const postContainer = document.createElement("div");
    postContainer.className = "post-container";
    postContainer.id = this._id;

    const postHeader = `
      <div class="post-header">
        <div class="left">
          <div>
            <img title="Avatar image" src="${this._avatarUrl}" />
          </div>
          <span>${this._userName}</span>
        </div>
        <div class="right">
          follow ...
        </div>
      </div>`;

    const postImage = `
      <div class="post-image">
        <img title="Post image" src="${this._imageUrl}" />
      </div>`;

    const postIcons = `
      <div class="post-icons">
        <div class="btn btn-like">
          <i class="fa fa-heart-o"></i>
        </div>
        <div class="btn">
          <i class="fa fa-comment-o"></i>
        </div>
        <div class="btn">
          <i class="fa fa-paper-plane-o"></i>
        </div>
      </div>`;

    postContainer.innerHTML = postHeader;
    postContainer.innerHTML += postImage;
    postContainer.innerHTML += postIcons;

    const btnLike = postContainer.querySelector(".btn-like");
    btnLike?.addEventListener("click", () => this.like());

    document.body.appendChild(postContainer);
  }
}

// Exemplo de uso
const posts: Post[] = [];

for (let index = 0; index < 15; index++) {
  const post = new Post(
    faker.person.firstName(),
    faker.image.avatarGitHub(),
    faker.image.urlPicsumPhotos(),
    faker.lorem.paragraph()
  );

  post.toHTML();
  posts.push(post);
}
