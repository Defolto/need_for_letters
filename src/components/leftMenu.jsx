import React from 'react'
import '../style/menu.scss'
import close from '../img/close.png'

/** Основной компонент*/
export default class LeftMenu extends React.Component{
    render(){
        return(
            
            <aside className={this.props.stateMenu?"left-menu menu-active":"left-menu"}>
                <div className="left-menu__menu">
                    <img className="close" onClick={()=>this.props.closeMenu()} src={close} alt="закрыть" />
                    <p onClick={()=>this.props.changemode('practice')}>Практика</p>
                    <p onClick={()=>this.props.changemode('trening')}>Тренировка</p>
                    <p onClick={()=>this.props.changemode('online')}>Онлайн</p>
                    <p onClick={()=>this.props.changemode('clane')}>Кланы</p>
                    <p onClick={()=>this.props.changemode('profile')}>Профиль</p>
                    <p onClick={()=>this.props.changemode('reiting')}>Рейтинг</p>
                    <p onClick={()=>this.props.changemode('shop')}>Магазин</p>
                </div>
                <div className="left-menu__shadow" onClick={()=>this.props.closeMenu()}></div>
            </aside>
        )
    }
}