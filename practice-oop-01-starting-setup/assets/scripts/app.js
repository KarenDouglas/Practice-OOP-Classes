class Tooltip {}

class ProjectItem {

    constructor(id, updateProjecrListsFunction) {
        this.id = id;
        this.updateProjecrListsHandler = updateProjecrListsFunction;
        this.connectSwitchButton();
        this.connectMoreInfoButton();
    }

    connectMoreInfoButton() {

    }

    connectSwitchButton() {
        const projectItemElement = document.getElementById(this.id);
        const switchButton = projectItemElement.querySelector('button:last-of-type');
        switchButton.addEventListener('click', this.updateProjecrListsHandler );
    }

}

class ProjectList {
    projects = [];

    constructor(type) {
        this.type = type;

           const prjtItems = document.querySelectorAll(`#${type}-projects li`);
           for(const prjItem of prjtItems){
            this.projects.push(new ProjectItem(prjItem.id, this.switchProject.bind(this)));
           }
           console.log(this.projects)
    }

    setSwitchHandlerFunction(switchHandlerFunction) {
        this.switchHandler = switchHandlerFunction;
    }

    addProject() {
        console.log(this)
    }

    switchProject(projectId) {
        // const projectIndex = this.projects.findIndex(p => p.id === projectId);
        // this.projects.splice( projectIndex, 1);
        this.switchHandler(this.projects.find(p => p.id === projectId));
       this.projects = this.projects.filter( p => p.id !== projectId);
    }
}

class App {
    static init() {
        const activeProjectsList = new ProjectList('active');
        const finishedProjectsList = new ProjectList('finished');

        activeProjectsList.setSwitchHandlerFunction(finishedProjectsList.addProject.bind(finishedProjectsList));
        finishedProjectsList.setSwitchHandlerFunction(activeProjectsList.addProject.bind(activeProjectsList));
    }

}

App.init();