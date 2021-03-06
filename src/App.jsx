import {BrowserRouter, HashRouter} from 'react-router-dom';
import Content from './Components/Content/Content';
import Footer from './Components/Footer/Footer';
import HeaderContainer from './Components/Header/HeaderContainer';
import './App.scss';


function App(props) {
    return (
        <div className="wrapper">
            <HashRouter>
                <HeaderContainer/>
                <Content/>
                <Footer/>
            </HashRouter>
        </div>
    );
}

export default App;
