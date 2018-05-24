import React, { Component } from 'react';
import Header from './Components/Header';
import SubHeader from './Components/SubHeader';
import ProjectForm from './Components/ProjectForm';
import ProjectList from './Components/ProjectList';
import TaskList from './Components/TaskList';

import './App.css';

class App extends React.Component {
    state = {
      projects: [
        {id: 1, title: "Angular eBook",phase:"todo", completed:false, edit: false},
        {id: 2, title: "React eBook",phase:"completed", completed:true, edit: false},
        {id: 3, title: "NodeJS eBook",phase:"todo", completed:false,edit: false},
        {id: 4, title: "Modern JavaScript eBook",phase:"inprogress", completed:false,edit: false},
        {id: 5, title: "Node Microservice",phase:"inprogress", completed:false,edit: false},
      ],
      
      tasks: [
        {id: 1, projectId: 1, title: "Plan Content", phase:"inprogress",completed:false,edit:false},
        {id: 2, projectId: 1, title: "Create TOC", phase:"todo",completed:false,edit:false},
        {id: 3, projectId: 1, title: "Create Cover Image", phase:"todo",completed:false,edit:false},
        {id: 4, projectId: 1, title: "Write the first draft", phase:"todo",completed:false,edit:false},
        
        {id: 5, projectId: 2, title: "Plan React Content", phase:"inprogress",completed:false,edit:false},
        {id: 6, projectId: 2, title: "Create React TOC", phase:"todo",completed:false,edit:false},
        {id: 7, projectId: 2, title: "Create React Cover Image", phase:"todo",completed:false,edit:false},
        {id: 8, projectId: 2, title: "Write the first draft of ReactJS", phase:"todo",completed:false,edit:false},
        
      ],
      phase: ["todo","inprogress","completed"],
      currentProject: null,
    }
  
    onProjectAdd = (project) => {
      let maxId = +new Date();
      project.id = maxId;
      project.edit = false;
      project.completed = false;
      
      let projects = [project, ...this.state.projects];
      
      this.setState({
        projects
      });
   
    }
    
    onToggleEditProject = (projectId) => {
      let projects = this.state.projects.map((p) => {
        if (p.id == projectId) {
          p.edit = !p.edit;
        }
        return p;
      });
      this.setState({
        projects
      });
    }
    
    onUpdate = (id, project) => {
      let projects = this.state.projects.map((p) => {
        if (p.id == id) {
          p.edit = !p.edit;
          p.title = project.title;
          p.phase = project.phase;
        }
        return p;
      });
      
      this.setState({
        projects
      })
    }
    
    onDeleteProject = (id, title) => {
      if (window.confirm(`Are you sure you want to delete ${title}?`)) {
        let projects = this.state.projects.filter((p) => {
          return p.id != id;
        });
        
        this.setState({
          projects
        });
      }
    }
    
    onMarkCompleted = (projectId) => {
      let projects = this.state.projects.map((p) => {
        if (p.id == projectId) {
          p.completed = !p.completed;
        }
        return p;
      });
      this.setState({
        projects
      });
    }
    
    findProject = (projectId) => {
     let project = this.state.projects.find((p) => {
        return p.id === projectId;
     })
     return project;
    }
   
    
    onProjectSelected = (projectId) =>{
      let project = this.findProject(projectId);
      this.setState({
        currentProject: project
      });
    }

    showProjects = () => {
      this.setState({
        currentProject: null
      })
    }
    
    render() {
      console.log(this.state.currentProject);
      return (
        <div>
           <Header title="Project Management App">
              <SubHeader color="red"
                title="(Kanban based system)" />
           </Header>
           <hr/>
           
           <ProjectForm onProjectAdd={this.onProjectAdd} />
           {!this.state.currentProject &&
              <ProjectList 
                projects={this.state.projects} 
                phase={this.state.phase}
                onEdit={this.onToggleEditProject}
                onUpdate={this.onUpdate}
                onCancel={this.onToggleEditProject}
                onDelete={this.onDeleteProject}
                onMarkCompleted={this.onMarkCompleted}
                onProjectSelected={this.onProjectSelected}
              />
           }
        
          
        {this.state.currentProject && <TaskList
               tasks = {this.state.tasks}
               phase={this.state.phase}
               onNavigateToProject={this.showProjects}
           /> 
        }
        </div>
      );
    }
}

export default App;