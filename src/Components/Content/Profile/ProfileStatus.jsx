import React from 'react';

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }

    acivateEditMode = () => {
        this.setState( {
            editMode: true
        } )
    }

    deacivateEditMode = () => {
        this.setState( {
            editMode: false
        } )
        this.props.updateStatus(this.state.status);
    }
    onStatusChange = (e) => {
       this.setState({
           status: e.currentTarget.value
       })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode && 
                    <p onDoubleClick={this.acivateEditMode}>{this.props.status && this.state.status}</p>
                }
                {this.state.editMode &&
                    <div>
                        <input ref={this.statusInputRef} 
                            autoFocus={true} 
                            onBlur={this.deacivateEditMode} 
                            type="text" 
                            value={this.state.status} 
                            onChange={this.onStatusChange}/>
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatus