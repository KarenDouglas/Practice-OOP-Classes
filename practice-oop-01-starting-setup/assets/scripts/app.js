class DomHelper {

    static clearEventListeners(element) {
        const clonedElement = element.cloneNode(true);
        element.replaceWith(clonedElement);
        return clonedElement;
    }

    static moveElement( elementId, newDestinationSelector) {
        const element = document.getElementById(elementId);
        const destinationElement = document.querySelector(newDestinationSelector);
        destinationElement.append(element);
    }
}

class Tooltip {}

class ProjectItem {

    constructor(id, updateProjecrListsFunction, type) {
        this.id = id;
        this.updateProjecrListsHandler = updateProjecrListsFunction;
        this.connectSwitchButton(type);
        this.connectMoreInfoButton();
    }

    connectMoreInfoButton() {

    }

    connectSwitchButton(type) {
        const projectItemElement = document.getElementById(this.id);
        let switchButton = projectItemElement.querySelector('button:last-of-type');
        switchButton = DomHelper.clearEventListeners(switchButton);
        switchButton.textContent = type === 'active'? 'Finish': 'Activate';
        switchButton.addEventListener('click', this.updateProjecrListsHandler.bind(null, this.id) );

    }

    update(updateProjectListsFn, type) {
        this.updateProjecrListsHandler =  updateProjectListsFn;
        this.connectSwitchButton(type);
    }
}

class ProjectList {
    projects = [];

    constructor(type) {
        this.type = type;

           const prjtItems = document.querySelectorAll(`#${type}-projects li`);
           for(const prjItem of prjtItems){
            this.projects.push(new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type));
           }
           console.log(this.projects)
    }

    setSwitchHandlerFunction(switchHandlerFunction) {
        this.switchHandler = switchHandlerFunction;
    }

    addProject(project) {
        this.projects.push(project);
        DomHelper.moveElement(project.id, `#${this.type}-projects ul`);
        project.update( this.switchProject.bind(this), this.type);
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