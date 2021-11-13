import { connect } from 'react-redux';
import { compose } from 'redux';
import { WithAuthRedirect } from '../../../Hoc/WithAuthRedirect';
import { sendMessageCreator } from '../../../Redux/reducers/dialogReducer';
import Dialogs from './Dialogs';
import './Dialogs.scss';

let mapStateToProps = (state) => {
    return {
        dialogs: state.messagesPage,
    }
}


let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessageBody) => {
            dispatch(sendMessageCreator(newMessageBody))
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect

)(Dialogs);