import React, { Component } from 'react';
import ProjectSummary from './ProjectSummary'

// return a list of projects
class ProjectList extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {};
    }

    toggle(match) {
        this.setState({
            collapse: this.state.collapse === match ? null : match
        });
    }

    render() {
        const { projects } = this.props;
        return (
            <div className="project-list section">
                {projects && projects.map(project => {
                    return (
                        <ProjectSummary project={project}
                            isOpen={this.state.collapse === project}
                            toggle={this.toggle}
                        />
                    );
                })}

            </div>
        );
    }
}

export default ProjectList;