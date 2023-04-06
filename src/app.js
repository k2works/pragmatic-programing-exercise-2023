const students = [
  {
    id: 1,
    name: "田尻 智裕",
    class: "3年B組",
    clubs: ["野球部", "写真部"],
    relatedStudents: ["山田 太郎", "鈴木 花子"],
  },
  {
    id: 2,
    name: "山田 太郎",
    class: "3年A組",
    clubs: ["野球部"],
    relatedStudents: ["田尻 智裕"],
  },
  {
    id: 3,
    name: "鈴木 花子",
    class: "3年A組",
    clubs: ["写真部"],
    relatedStudents: ["田尻 智裕"],
  },
];

const classes = ["3年A組", "3年B組", "3年C組", "3年D組"];

export const App = () => {
  const render = () => {
    Root({ student: Student() }).render();
  };

  return {
    render,
  };
};

const Root = (components) => {
  const render = () => {
    rootNavigation();
    components.student.render();
  };

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
  `;

    const studentNav = document.getElementById("student-nav");
    studentNav.addEventListener("click", () => {
      components.student.render();
    });
  };

  return {
    render,
  };
};

const Student = () => {
  const mode = {
    READ: 1,
    CREATE: 2,
    EDIT: 3,
    DELETE: 4,
  };

  const render = () => {
    studentCollection();
  };

  const deleteCallBack = (e) => {
    const id = e.currentTarget.getAttribute("data");
    const confirmed = confirm(`${id}:削除しますか？`);
    if (confirmed) {
      const index = students.findIndex((student) => student.id === Number(id));
      if (index !== -1) {
        students.splice(index, 1);
        render();
      }
    }
  };

  const saveCallBack = (e) => {
    const name = document.getElementById("name-input").value;
    let selectElement = document.querySelector(".single-view-property-value");
    const classValue = selectElement.value;

    if (!name) {
      alert("名前を入力してください");
      return;
    }

    const ulElement = document.getElementById('clubs');
    const clubsElements = ulElement.getElementsByClassName('single-view-related-item');
    const clubs = [];
    for (var i = 0; i < clubsElements.length; i++) {
      clubs.push(clubsElements[i].textContent);
      clubs[i] = clubs[i].replace('×', '');
    }

    const student = {
      id: students.length + 1,
      name,
      class: classValue,
      clubs: Array.from(new Set([...clubs])),
      relatedStudents: [],
    };
    students.push(student);
    render();
  };

  const updateCallBack = (e) => {
    const id = parseInt(e.target.getAttribute("data"));
    const name = document.getElementById("name-input").value;
    let selectElement = document.querySelector(".single-view-property-value");
    const classValue = selectElement.value;

    if (!name) {
      alert("名前を入力してください");
      return;
    }

    const ulElement = document.getElementById('clubs');
    const clubsElements = ulElement.getElementsByClassName('single-view-related-item');
    const clubs = [];
    for (var i = 0; i < clubsElements.length; i++) {
      clubs.push(clubsElements[i].textContent);
      clubs[i] = clubs[i].replace('×', '');
    }

    const student = students.find((s) => s.id === id);
    const newStudent = {
      ...student,
      clubs: Array.from(new Set([...student.clubs, ...clubs])),
    };

    const index = students.findIndex((student) => student.id === Number(id));
    if (index !== -1) {
      students[index].name = name;
      students[index].class = classValue;
      students[index].clubs = newStudent.clubs;
      render();
    }
  };

  const studentCollection = () => {
    const record = students.map((student) => {
      return `
      <li class="main-object-item">
        <div class="main-object-item-content" data="${student.id}">
          <div class="main-object-item-name">${student.name}</div>
          <div class="main-object-item-details">${student.class
        } ${student.clubs.join(" ")}</div>
        </div>
        <div class="main-object-item-actions">
          <button class="action-button" id="delete" data=${student.id
        }>削除</button>
        </div>
      </li>
    `;
    });

    const container = document.getElementById("contents");
    container.innerHTML =
      `
        <div class="search-container">
          <input type="text" id="search-input" placeholder="絞り込み">
        </div>
        <button class="action-button" id="create">新規</button>
        <div class="main-object-container">
          <ul class="main-object-list">
            ` +
      record.join("") +
      `
          </div>
        </div>     
  `;

    const createButton = document.getElementById("create");
    createButton.addEventListener("click", () => {
      studentSingle();
    });

    const deleteButtons = document.querySelectorAll("#delete");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", deleteCallBack);
    });

    const selectButtons = document.querySelectorAll(
      ".main-object-item-content",
    );
    selectButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = e.currentTarget.getAttribute("data");
        const student = students.find((student) => {
          return student.id === Number(id);
        });
        studentSingle(student);
      });
    });

    const searchAction = (keyword) => {
      const filteredStudents = students.filter((student) => {
        return student.name.includes(keyword);
      });
      const record = filteredStudents.map((student) => {
        return `
        <li class="main-object-item">
          <div class="main-object-item-content" data="${student.id}">
            <div class="main-object-item-name">${student.name}</div>
            <div class="main-object-item-details">${student.class
          } ${student.clubs.join(" ")}</div>
          </div>
          <div class="main-object-item-actions">
            <button class="action-button" id="delete" data=${student.id
          }>削除</button>
          </div>
        </li>
      `;
      });

      const container = document.getElementById("contents");
      container.innerHTML =
        `
          <div class="search-container">
            <input type="text" id="search-input" placeholder="絞り込み" value="${keyword}">
          </div>
          <button class="action-button" id="create">新規</button>
          <div class="main-object-container">
            <ul class="main-object-list">
              ` +
        record.join("") +
        `
            </div>
          </div>     
    `;

      const createButton = document.getElementById("create");
      createButton.addEventListener("click", () => {
        studentSingle();
      });

      const deleteButtons = document.querySelectorAll("#delete");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", deleteCallBack);
      });

      const selectButtons = document.querySelectorAll(
        ".main-object-item-content",
      );
      selectButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          const id = e.currentTarget.getAttribute("data");
          const student = students.find((student) => {
            return student.id === Number(id);
          });
          studentSingle(student);
        });
      });

      const searchInput = document.getElementById("search-input");
      searchInput.addEventListener("compositionstart", () => {
        isComposing = true;
      });
      searchInput.addEventListener("compositionend", onSearchInputEnd);
      searchInput.addEventListener("input", onSearchInput);

      return searchInput;
    };

    const searchInput = document.getElementById("search-input");
    let isComposing = false;
    searchInput.addEventListener("compositionstart", () => {
      isComposing = true;
    });
    const onSearchInputEnd = (e) => {
      isComposing = false;
      const keyword = e.currentTarget.value;
      e.preventDefault();
      searchInput.blur();
      const result = searchAction(keyword);
      const inputLength = result.value.length;
      result.focus();
      result.setSelectionRange(inputLength, inputLength);
    };
    const onSearchInput = (e) => {
      const keyword = e.currentTarget.value;
      if (!isComposing) {
        e.preventDefault();
        searchInput.blur();
        const result = searchAction(keyword);
        const inputLength = result.value.length;
        result.focus();
        result.setSelectionRange(inputLength, inputLength);
      }
    };
    searchInput.addEventListener("compositionend", onSearchInputEnd);
    searchInput.addEventListener("input", onSearchInput);
  };

  const studentSingle = (student, action) => {
    const header =
      action === mode.EDIT
        ? `
      <div class="single-view-header-left">
        <h1 class="single-view-title">${student.name}</h1>
        <p class="single-view-subtitle">${student.class}</p>
      </div>
      <div class="single-view-header-right">
        <button class="single-view-action-button" id="cancel">キャンセル</button>
        <button class="single-view-action-button" id="update" data=${student.id}>更新</button>
      </div>
    `
        : student
          ? `
      <div class="single-view-header-left">
        <h1 class="single-view-title">${student.name}</h1>
        <p class="single-view-subtitle">${student.class}</p>
      </div>
      <div class="single-view-header-right">
        <button class="single-view-action-button" id="edit" data=${student.id}>編集</button>
        <button class="single-view-action-button" id="delete" data=${student.id}>削除</button>
      </div>
    `
          : `
      <div class="single-view-header-left">
        <h1 class="single-view-title"></h1>
        <p class="single-view-subtitle"></p>
      </div>
      <div class="single-view-header-right">
        <button class="single-view-action-button" id="save">保存</button>
      </div>
    `;
    const main =
      action === mode.EDIT
        ? `
      <div class="single-view-body-left">
      <form class="single-view-property-form">
        <ul class="single-view-property-list">
          <li class="single-view-property-item">
            <label for="name-input" class="single-view-property-label">名前:</label>
            <input id="name-input" name="name" class="single-view-property-input" type="text" value="${student.name
        }" required>
          </li>
          <li class="single-view-property-item">
          <span class="single-view-property-label">組:</span>
          <select class="single-view-property-value">
          ${classes
          .map((c) =>
            c === student.class
              ? `<option value="${c}" selected>${c}</option>`
              : `<option value="${c}">${c}</option>`,
          )
          .join("")}
          </select>
        </li> 
        </ul>
      </form>
    </div>    
    `
        : student
          ? `
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
    `
          : `
      <div class="single-view-body-left">
      <form class="single-view-property-form">
        <ul class="single-view-property-list">
          <li class="single-view-property-item">
            <label for="name-input" class="single-view-property-label">名前:</label>
            <input id="name-input" name="name" class="single-view-property-input" type="text" required>
          </li>
          <li class="single-view-property-item">
          <span class="single-view-property-label">組:</span>
          <select class="single-view-property-value">
          ${classes.map((c) => `<option value="${c}">${c}</option>`).join("")}
          </select>
        </li> 
        </ul>
      </form>
    </div>
    
  `;

    const clubs = (() => {
      const clubs =
        action === mode.EDIT
          ? student.clubs.map((club) => {
            return `
      <li class="single-view-related-item">
        <input class="single-view-related-input" type="text" value="${club}">
      </li>
      `;
          })
          : student
            ? student.clubs.map((club) => {
              return `
      <li class="single-view-related-item">${club}</li>
    `;
            })
            : [];

      const view = action === mode.EDIT
        ? `
              <div class="single-view-body-right" >
                <h2 class="single-view-related-title">部</h2>
               
                <input type="text" id="departmentInput">
                <button id="addButton">追加</button>
                <div id="departmentContainer"></div>

                <ul class="single-view-related-list" id="clubs">

                ` +
        clubs.join("") +
        `
                </ul>
              </div>
      `
        : student ? `
              <div class="single-view-body-right" >
                <h2 class="single-view-related-title">部</h2>
                <ul class="single-view-related-list" id="clubs">

                ` +
          clubs.join("") +
          `
                </ul>
              </div >
       `: `
              <div class="single-view-body-right" >
                <h2 class="single-view-related-title">部</h2>
               
                <input type="text" id="departmentInput">
                <button id="addButton">追加</button>
                <div id="departmentContainer"></div>

                <ul class="single-view-related-list" id="clubs">

                ` +
        clubs.join("") +
        `
                </ul>
              </div>
       `;

      return view;
    })();

    const relatedStudents =
      action === mode.EDIT
        ? student.relatedStudents.map((relatedStudent) => {
          return `
      <li class="single-view-related-item">
        <input class="single-view-related-input" type="text" value="${relatedStudent}">
      </li>
    `;
        })
        : student
          ? student.relatedStudents.map((relatedStudent) => {
            return `
      <li class="single-view-related-item">${relatedStudent}</li>
    `;
          })
          : [];

    const container = document.getElementById("contents");
    container.innerHTML =
      `
        <div class=".main-single-view-object-container">
          <div class="single-view-container">
            <div class="single-view-header">
            ` +
      header +
      `
            </div>
            <div class="single-view-body">
            ` +
      main +
      `
              <div class="single-view-body-right">
              ` +
      clubs +
      `
              </div>
              <div class="single-view-body-right">
                <h2 class="single-view-related-title">関連する生徒</h2>
                <ul class="single-view-related-list">
                ` +
      relatedStudents.join("") +
      `
                </ul>
              </div>
            </div>
          </div>
        </div>     
  `;

    const editButton = document.getElementById("edit");
    if (editButton) {
      editButton.addEventListener("click", () => {
        studentSingle(student, mode.EDIT);
      });
    }

    const cancelButton = document.getElementById("cancel");
    if (cancelButton) {
      cancelButton.addEventListener("click", () => {
        studentSingle(student, mode.READ);
      });
    }

    const updateButton = document.getElementById("update");
    if (updateButton) {
      updateButton.addEventListener("click", updateCallBack);
    }

    const deleteButton = document.getElementById("delete");
    if (deleteButton) {
      deleteButton.addEventListener("click", deleteCallBack);
    }

    const saveButton = document.getElementById("save");
    if (saveButton) {
      saveButton.addEventListener("click", saveCallBack);
    }

    const addCallBack = () => {
      var departmentInput = document.getElementById('departmentInput');
      var selectedDepartment = departmentInput.value;

      if (selectedDepartment !== '') {
        const clubs = document.getElementById("clubs");
        const club = document.createElement("li");
        club.className = "single-view-related-item";
        club.textContent = selectedDepartment;
        clubs.appendChild(club);

        var deleteButton = document.createElement('button');
        deleteButton.textContent = '×';
        deleteButton.addEventListener('click', function () {
          clubs.removeChild(club);
        });
        club.appendChild(deleteButton);

        departmentInput.value = '';
      }
    };
    const addButton = document.getElementById("addButton");
    if (addButton) {
      addButton.addEventListener("click", addCallBack);
    }
  };

  return {
    render,
    studentCollection,
    studentSingle,
  };
};
