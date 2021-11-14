import React from 'react';
import {NavLink, Redirect, Route, Switch} from 'react-router-dom';
import DialogsContainer from './Dialogs/DialogsContainer';
import UsersContainer from '../Users/UsersContainer';
import ProfileContainer from './Profile/ProfileContainer';
import './Content.scss';
import Login from './Login/Login';
import {connect} from 'react-redux';
import {initialize} from '../../Redux/reducers/appReducer';
import {toAuth} from '../../Redux/reducers/authReducer';
import Preloader from '../Preloader/Preloader';

class Content extends React.Component {
    componentDidMount() {
        this.props.initialize();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className="content">
                <nav>
                    <ul>
                        <li><NavLink to="/Profile">Profile</NavLink></li>
                        <li><NavLink to="/Dialogs">Messages</NavLink></li>
                        <li><NavLink to="/Users">Users</NavLink></li>
                        <li><a href="/#">News</a></li>
                        <li><a href="/#">Music</a></li>
                        <li><a href="/#">Settings</a></li>
                    </ul>
                </nav>
                <Switch>
                    <Redirect exact from="/" to="/Profile/:userId?" />
                    <Route path="/Profile/:userId?" render={() => <ProfileContainer/>}/>
                    <Route path="/Dialogs" render={() => <DialogsContainer/>}/>
                    <Route path="/Users" render={() => <UsersContainer/>}/>
                    <Route path="/Login" render={() => <Login/>}/>
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {initialized: state.app.initialized}
}

export default connect(mapStateToProps, {initialize, toAuth})(Content);
