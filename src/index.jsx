import React, { Fragment } from 'react'
import {render} from 'react-dom'
import './style/main.scss'
import Header from './components/header.jsx'
import LeftMenu from './components/leftMenu.jsx'
import Practice from './components/Practice.jsx'
import Trening from './components/Trening.jsx'
import Profile from './components/Profile.jsx'

/** Основной компонент*/
class NFL extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            status_menu: false,
            mode: 'profile',
            texts: ["На дворе играла кошка с котятами. Вдруг с вышины бросился огромный орёл. Орёл схватил котенка. Мать кошка быстро вцепилась в орла. Орёл бросил котенка и стал пороться с кошкой. Он рвал когтя-га тело кошки и выклевал ей один лаз. Кошка храбро боролась с орлом. Она перекусила ему крыло. Потом кошка сделала ловкий прыжок и перекусила орлу горло.",
            "Дядя Семён ехал из города домой. С ним была собака Жучка, Вдруг из леса выскочили волки. Жучка испугалась и прыгнула в сани. У дяди Семёна была хорошая лошадь. Она тоже испугалась и быстро помчалась по дороге. Деревня была близко. Показались огни в окнах. Волки отстали. Умная лошадь спасла дядю Семена и Жучку.", 
            "Был у дедушки Степана мёд в горшке. Забрались в горшок муравьи и ели мёд. Дедушка видит, дело плохо. Взял он горшок, привязал веревку и повесил горшок на гвоздь к потолку. А в горшке остался один муравей. Он искал дорогу домой: вылез из горшка на верёвку, потом на потолок. С потолка . га стену, а со стены на пол. Муравей показал дорогу к горшку другим муравьям. Дедушка Степан снял горшок, а там мёду нет.", 
            "В деревне было много садов. Осенью поспевали яблоки и груши. В садах было много птиц. Они выводили птенцов и целый день кормили их червяками. Ребята разорили гнезда птиц. Птицы улетели из этой деревни. Весной зацвели на яблонях цветы, но червяки забрались в цветы и поели их. Осенью не было на деревьях яблок и груш."],
            userReg: false,
            login: 'Defolto',
            regLogin_modal: false
        };
    }

    openClose_regLogin_modal = (mode)=>{
        const newState = !this.state.regLogin_modal
        this.setState({
            regLogin_modal: newState
        })
    }

    open_closeLeftMenu = ()=>{
        this.setState({
            status_menu: !this.state.status_menu 
        })
    }

    changeMode = (new_mode)=>{
        this.setState({
            mode: new_mode,
            status_menu: false
        })
    }

    render(){
        let mode;
        switch (this.state.mode) {
            case "practice":
                mode = <Practice text={this.state.texts}/>;
                break;
            case "trening":
                mode = <Trening/>;
                break;
            case "profile":
                mode = <Profile/>;
                break;
            default:
                mode = <div>{this.state.mode}</div>;
                break;
        }
        return(
            <Fragment>
                <Header openMenu={this.open_closeLeftMenu} regUser={this.state.userReg} modal={this.openClose_regLogin_modal}/>
                <LeftMenu stateMenu={this.state.status_menu}
                        closeMenu={this.open_closeLeftMenu}
                        changemode={this.changeMode}/>
                {mode}
                <div className={this.state.regLogin_modal?"modal":"modal modal_hide"}>
                    <div className="modal_in">
                        <p onClick={()=>this.openClose_regLogin_modal()}>Закрыть</p>
                    </div>
                </div>
            </Fragment>
        )
    }
}

render(<NFL />, document.querySelector('#NFL'))