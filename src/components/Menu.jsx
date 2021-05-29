import React, { Fragment } from 'react'
import '../styles/general.scss'
import '../styles/menu.scss'
import { SinglePlayer } from './SinglePlayer.jsx';
import {Trening} from './Trening.jsx'
import {Clans} from './Clans.jsx'
import {setHeightMenu} from '../js/sizes.js'
import singlePlayer__gif from '../img/menu/2.gif'
import singlePlayer__jpg from '../img/menu/2.jpg'

import multyPlayer__gif from '../img/menu/3.gif'
import multyPlayer__jpg from '../img/menu/3.jpg'

import trening__gif from '../img/menu/1.gif'
import trening__jpg from '../img/menu/1.jpg'

import clan__gif from '../img/menu/4.gif'
import clan__jpg from '../img/menu/4.jpg'

import shop__gif from '../img/menu/5.gif'
import shop__jpg from '../img/menu/5.jpg'

import setting__gif from '../img/menu/6.gif'
import setting__jpg from '../img/menu/6.jpg'

export class Menu extends React.Component{
    
    constructor(props){
        super(props);

        this.state={
            mode: 'Menu',
            imgSingle: singlePlayer__jpg,
            imgMulty: multyPlayer__jpg,
            trening: trening__jpg,
            clan: clan__jpg,
            shop: shop__jpg,
            setting: setting__jpg,
        }
    }

    changeMode(mode){
        this.setState({
            mode: mode
        })
    }

    componentDidUpdate(){
        setHeightMenu()
    }

    onMouseEnterHandler(mode){
        if (mode == "single") {
            this.setState({
                imgSingle: singlePlayer__gif
            })
        }else if (mode == "multy") {
            this.setState({
                imgMulty: multyPlayer__gif
            })
        }else if (mode == "trening") {
            this.setState({
                trening: trening__gif
            })
        }else if (mode == "clan") {
            this.setState({
                clan: clan__gif
            })
        }else if (mode == "shop") {
            this.setState({
                shop: shop__gif
            })
        }else if (mode == "setting") {
            this.setState({
                setting: setting__gif
            })
        }
    }

    onMouseLeaveHandler(mode){
        if (mode == "single") {
            this.setState({
                imgSingle: singlePlayer__jpg
            })
        }else if (mode == "multy") {
            this.setState({
                imgMulty: multyPlayer__jpg
            })
        }else if (mode == "trening") {
            this.setState({
                trening: trening__jpg
            })
        }else if (mode == "clan") {
            this.setState({
                clan: clan__jpg
            })
        }else if (mode == "shop") {
            this.setState({
                shop: shop__jpg
            })
        }else if (mode == "setting") {
            this.setState({
                setting: setting__jpg
            })
        }
    }

    render(){
        if (this.state.mode == 'Menu') {
            return(
                <div className="mainBlock menu d-row">
                    <div className="col-50 left d-column">
                        <div className="card" onClick={()=>this.changeMode('SinglePlayer')} onMouseEnter={()=>this.onMouseEnterHandler("single")}
                        onMouseLeave={()=>this.onMouseLeaveHandler("single")}>
                            <img src={this.state.imgSingle} className="card-foto"/>
                            <p>Одиночная игра</p>
                        </div>
                        <div className="card" onMouseEnter={()=>this.onMouseEnterHandler("multy")}
                        onMouseLeave={()=>this.onMouseLeaveHandler("multy")}>
                            <p>Онлайн</p>
                            <img src={this.state.imgMulty} className="card-foto"/>
                        </div>
                    </div>
                    <div className="col-50 right d-column">
                        <div className="card" onClick={()=>this.changeMode('Trening')} onMouseEnter={()=>this.onMouseEnterHandler("trening")}
                        onMouseLeave={()=>this.onMouseLeaveHandler("trening")}>
                            <p>Тренажёр</p>
                            <div className="foto">
                                <img className="card-foto1" src={this.state.trening}/>
                            </div>
                        </div>
                        <div className="card" onClick={()=>this.changeMode('Clans')} onMouseEnter={()=>this.onMouseEnterHandler("clan")}
                        onMouseLeave={()=>this.onMouseLeaveHandler("clan")}>
                            <p>Кланы</p>
                            <div className="foto">
                                <img className="card-foto1" src={this.state.clan}/>
                            </div>
                        </div>
                        <div className="card" onMouseEnter={()=>this.onMouseEnterHandler("shop")}
                        onMouseLeave={()=>this.onMouseLeaveHandler("shop")}>
                            <p>Магазин</p>
                            <div className="foto">
                                <img className="card-foto1" src={this.state.shop}/>
                            </div>
                        </div>
                        <div className="card" onMouseEnter={()=>this.onMouseEnterHandler("setting")}
                        onMouseLeave={()=>this.onMouseLeaveHandler("setting")}>
                            <p>Настройки</p>
                            <div className="foto">
                                <img className="card-foto1" src={this.state.setting}/>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else if (this.state.mode == 'SinglePlayer') {
            return(
                <div className="mainBlock blueFon">
                    <p className="back" onClick={()=>this.changeMode("Menu")}><span>←</span> Обратно в меню</p>
                    <SinglePlayer />    
                </div>
                
            )
        }else if (this.state.mode == 'Trening') {
            return(
                <div className="mainBlock blueFon">
                    <p className="back" onClick={()=>this.changeMode("Menu")}><span>←</span> Обратно в меню</p>
                    <Trening />
                </div>
            )
        } else if (this.state.mode == 'Clans') {
            return(
                <div className="mainBlock blueFon">
                    <p className="back" onClick={()=>this.changeMode("Menu")}><span>←</span> Обратно в меню</p>
                    <Clans />
                </div>
            )
        }
    }
}