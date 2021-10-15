class Tooltip {}

class ProjectItem {}

class ProjectList {
    constructor(type) {
           const prjtItems = document.querySelectorAll(`#${type}-projects li`)
    }
}

class App {
    static init() {
        const activeProjectsList = new ProjectList('active');
        const finishedProjectsList = new ProjectList('finished');
    }

}

App.init();