import React, {Fragment} from 'react'
import {render} from 'react-dom'
import { Header } from './components/Header.jsx';
import { Menu } from './components/Menu.jsx';
import {Modal} from './components/Modal.jsx'
import { setHeightMenu} from './js/sizes.js'

/** Основной компонент*/
class NFL extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            registerd: false,
            modal: false,
            user: {

            }
        }
    }

    writeDataUser = (data)=>{
        this.setState({
            user: data,
            registerd: true,
            modal: false
        })
    }

    open_close__Modal = () => {
        if (this.state.modal) {
            this.setState({
                modal: false
            })
        }else{
            this.setState({
                modal: true
            })
        }
    }

    componentDidMount(){
        setHeightMenu()
    }

    render(){
        return(
            <Fragment>
                {this.state.modal ? <Modal hoba={this.writeDataUser} closeModal={this.open_close__Modal} /> : ''}
                <Header openModal={this.open_close__Modal} entry={this.state.registerd} userInfo={this.state.user}/>
                <Menu/>
            </Fragment>
        )
    }
}

render(<NFL />, document.querySelector('#NFL'))