export class App {
  constructor() {
    rootNavigation();
  }

  render() {
    studentCollection();
  }
}

const rootNavigation = () => {
  const container = document.getElementById("app");
  container.innerHTML = `
    <div class="root-container">
      <div class="nav-container">
        <ul class="nav-list">
          <li class="nav-item active" id="student-nav">生徒</li>
          <li class="nav-item">教員</li>
          <li class="nav-item">組</li>
          <li class="nav-item">部</li>
          <li class="nav-item">イベント</li>
        </ul>
      </div>
      <div class="view-container" id="contents">
      </div>
    </div>
  `

  const studentNav = document.getElementById("student-nav");
  studentNav.addEventListener("click", () => {
    studentCollection();
  });

}

const studentCollection = () => {
  const container = document.getElementById("contents");
  container.innerHTML = `
        <button class="action-button" id="create">新規</button>
        <div class="main-object-container">
          <ul class="main-object-list">
            <li class="main-object-item">
              <div class="main-object-item-content">
                <div class="main-object-item-name">田尻 智裕</div>
                <div class="main-object-item-details">3年B組 野球部 写真部</div>
              </div>
              <div class="main-object-item-actions">
                <button class="action-button" id="delete">削除</button>
                <button class="action-button" id="edit">編集</button>
              </div>
            </li>
            <li class="main-object-item">
              <div class="main-object-item-content">
                <div class="main-object-item-name">山田 太郎</div>
                <div class="main-object-item-details">3年A組 野球部</div>
              </div>
              <div class="main-object-item-actions">
                <button class="action-button">削除</button>
                <button class="action-button">編集</button>
              </div>
            </li>
            <li class="main-object-item">
              <div class="main-object-item-content">
                <div class="main-object-item-name">田尻 智裕</div>
                <div class="main-object-item-details">3年B組 野球部 写真部</div>
              </div>
              <div class="main-object-item-actions">
                <button class="action-button">削除</button>
                <button class="action-button">編集</button>
              </div>
            </li>
            <li class="main-object-item">
              <div class="main-object-item-content">
                <div class="main-object-item-name">山田 太郎</div>
                <div class="main-object-item-details">3年A組 野球部</div>
              </div>
              <div class="main-object-item-actions">
                <button class="action-button">削除</button>
                <button class="action-button">編集</button>
              </div>
            </li>
            <li class="main-object-item">
              <div class="main-object-item-content">
                <div class="main-object-item-name">田尻 智裕</div>
                <div class="main-object-item-details">3年B組 野球部 写真部</div>
              </div>
              <div class="main-object-item-actions">
                <button class="action-button">削除</button>
                <button class="action-button">編集</button>
              </div>
            </li>
            <li class="main-object-item">
              <div class="main-object-item-content">
                <div class="main-object-item-name">山田 太郎</div>
                <div class="main-object-item-details">3年A組 野球部</div>
              </div>
              <div class="main-object-item-actions">
                <button class="action-button">削除</button>
                <button class="action-button">編集</button>
              </div>
            </li>
          </ul>
        </div>
  `;

  const createButton = document.getElementById("create");
  createButton.addEventListener("click", () => {
    studentSingle();
  });

  const deleteButtons = document.querySelectorAll("#delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      alert("削除しますか？")
    });
  });

  const editButtons = document.querySelectorAll("#edit");
  editButtons.forEach((button) => {
    button.addEventListener("click", () => {
      studentSingle();
    });
  });
}

const studentSingle = () => {
  const container = document.getElementById("contents");
  container.innerHTML = `
        <div class=".main-single-view-object-container">
          <div class="single-view-container">
            <div class="single-view-header">
              <div class="single-view-header-left">
                <h1 class="single-view-title">田尻 智裕</h1>
                <p class="single-view-subtitle">3年B組</p>
              </div>
              <div class="single-view-header-right">
                <button class="single-view-action-button">編集</button>
                <button class="single-view-action-button">削除</button>
              </div>
            </div>
            <div class="single-view-body">
              <div class="single-view-body-left">
                <ul class="single-view-property-list">
                  <li class="single-view-property-item">
                    <span class="single-view-property-label">名前:</span>
                    <span class="single-view-property-value">田尻 智裕</span>
                  </li>
                  <li class="single-view-property-item">
                    <span class="single-view-property-label">組:</span>
                    <span class="single-view-property-value">3年B組</span>
                  </li>
                </ul>
              </div>
              <div class="single-view-body-right">
                <h2 class="single-view-related-title">部</h2>
                <ul class="single-view-related-list">
                  <li class="single-view-related-item">野球部</li>
                  <li class="single-view-related-item">写真部</li>
                </ul>
              </div>
              <div class="single-view-body-right">
                <h2 class="single-view-related-title">関連する生徒</h2>
                <ul class="single-view-related-list">
                  <li class="single-view-related-item">田尻 智裕</li>
                  <li class="single-view-related-item">山田 太郎</li>
                  <li class="single-view-related-item">鈴木 花子</li>
                </ul>
              </div>
            </div>
          </div>
        </div>     
  `;
}