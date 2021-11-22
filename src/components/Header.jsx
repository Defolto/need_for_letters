import React from 'react'
import '../style/header.scss'
import gamburger from '../img/gamburger.png'
import avatar from '../img/avatar.png'

/** Основной компонент*/
export default class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    
    render(){
        let user;
        if (this.props.regUser) {
            user = <div className="user">
                        <p>Defolto</p>
                        <img src={avatar} alt="аватар" />
                    </div>
        } else {
            user = <div className="user">
                        <p onClick={()=>this.props.modal("login")}>Войти</p>
                        <p onClick={()=>this.props.modal("reg")}>Зарегистрироваться</p>
                    </div>
        }

        return(
            <header>
                <div className="menu">
                    <img onClick={()=>this.props.openMenu()} src={gamburger} alt="меню" />
                </div>
                <h1>Название</h1>
                {user}
            </header>
        )
    }
}