export class App {
  constructor() {
    rootNavigation();
  }

  render() {
    studentCollection();
    studentSingle();
  }
}

const students = [
  {
    id: 1,
    name: "田尻 智裕",
    class: "3年B組",
    clubs: ["野球部", "写真部"],
    relatedStudents: ["山田 太郎", "鈴木 花子"]
  },
  {
    id: 2,
    name: "山田 太郎",
    class: "3年A組",
    clubs: ["野球部"],
    relatedStudents: ["田尻 智裕"]
  },
  {
    id: 3,
    name: "鈴木 花子",
    class: "3年A組",
    clubs: ["写真部"],
    relatedStudents: ["田尻 智裕"]
  }
]

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
  const record = students.map((student) => {
    return `
      <li class="main-object-item">
        <div class="main-object-item-content">
          <div class="main-object-item-name">${student.name}</div>
          <div class="main-object-item-details">${student.class} ${student.clubs.join(" ")}</div>
        </div>
        <div class="main-object-item-actions">
          <button class="action-button" id="delete" data=${student.id}>削除</button>
          <button class="action-button" id="edit" data=${student.id}>編集</button>
        </div>
      </li>
    `
  });

  const container = document.getElementById("contents");
  container.innerHTML = `
        <button class="action-button" id="create">新規</button>
        <div class="main-object-container">
          <ul class="main-object-list">
            ` + record.join("") + `
            ` + record.join("") + `
            ` + record.join("") + `
          </div>
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
    button.addEventListener("click", (evnt) => {
      const id = evnt.target.getAttribute("data");
      const student = students.find((student) => {
        return student.id === Number(id);
      });
      studentSingle(student);
    });
  });
}

const studentSingle = (student) => {
  const header = student ? `
    <div class="single-view-header-left">
      <h1 class="single-view-title">${student.name}</h1>
      <p class="single-view-subtitle">${student.class}</p>
    </div>
    <div class="single-view-header-right">
      <button class="single-view-action-button" id="edit">編集</button>
      <button class="single-view-action-button" id="delete">削除</button>
    </div>
  ` : `
    <div class="single-view-header-left">
      <h1 class="single-view-title"></h1>
      <p class="single-view-subtitle"></p>
    </div>
  `;

  const main = student ? `
    <div class="single-view-body-left">
      <ul class="single-view-property-list">
        <li class="single-view-property-item">
          <span class="single-view-property-label">名前:</span>
          <span class="single-view-property-value">${student.name}</span>
        </li>
        <li class="single-view-property-item">
          <span class="single-view-property-label">組:</span>
          <span class="single-view-property-value">${student.class}</span>
        </li>
      </ul>
    </div>
    ` : `
    <div class="single-view-body-left">
      <ul class="single-view-property-list">
        <li class="single-view-property-item">
          <span class="single-view-property-label">名前:</span>
          <span class="single-view-property-value"></span>
        </li>
        <li class="single-view-property-item">
          <span class="single-view-property-label">組:</span>
          <span class="single-view-property-value"></span>
        </li>
      </ul>
    </div>
  `;

  const clubs = student ? student.clubs.map((club) => {
    return `
      <li class="single-view-related-item">${club}</li>
    `
  }) : [];

  const relatedStudents = student ? student.relatedStudents.map((relatedStudent) => {
    return `
      <li class="single-view-related-item">${relatedStudent}</li>
    `
  }) : [];

  const container = document.getElementById("contents");
  container.innerHTML = `
        <div class=".main-single-view-object-container">
          <div class="single-view-container">
            <div class="single-view-header">
            ` + header + `
            </div>
            <div class="single-view-body">
            ` + main + `
              <div class="single-view-body-right">
                <h2 class="single-view-related-title">部</h2>
                <ul class="single-view-related-list">
                ` + clubs.join("") + `
                </ul>
              </div>
              <div class="single-view-body-right">
                <h2 class="single-view-related-title">関連する生徒</h2>
                <ul class="single-view-related-list">
                ` + relatedStudents.join("") + `
                </ul>
              </div>
            </div>
          </div>
        </div>     
  `;

  const editButton = document.getElementById("edit");
  if (editButton) {
    editButton.addEventListener("click", () => {
      studentSingle(student);
    });
  }

  const deleteButton = document.getElementById("delete");
  if (deleteButton) {
    deleteButton.addEventListener("click", () => {
      alert("削除しますか？")
    });
  }
}