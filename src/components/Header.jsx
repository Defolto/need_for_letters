import React from 'react'
import '../styles/general.scss'
import '../styles/header.scss'
import coin from '../img/coin.png'

export class Header extends React.Component{
    
    constructor(props){
        super(props);

        this.state={
            
        }
    }

    render(){
        if (this.props.entry) {
            return(
                <header className="header d-row">
                    <div className="header-logo d-column">
                        <h1>NFL</h1>
                        <h2>need for letters</h2>
                    </div>
                    <div className="header-infoUser d-column">
                        <div className="header-infoUser__top d-row">
                            <p className="name">{this.props.userInfo.login}</p>
                        </div>
                        <div className="header-infoUser__bottom d-row">
                            <div className="money d-row">
                                <p>1234</p>
                                <img className="coin" src={coin}/>
                            </div>
                        </div>
                    </div>
                </header>
            )
        } else {
            return(
                <header className="header d-row">
                    <div className="header-logo d-column">
                        <h1>NFL</h1>
                        <h2>need for letters</h2>
                    </div>
                    <div className="header-infoUser d-row">
                        <button onClick={()=>this.props.openModal()}>Регистрация / Вход</button>
                    </div>
                </header>
            )
        }
        
    }
}