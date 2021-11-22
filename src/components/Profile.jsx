import React, { Fragment } from 'react'
import '../style/profile.scss'
import pers from '../img/pers.png'
import imgBook from "../img/example.jpg"

export default class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            modeMenu: "stat",
            // статистика
            cash: 10,
            countWords: 1010,
            countMidSpeed: 6,
            timeTest: 5,
            writeBook: 0,
            writePoem: 0,
            gameOnline: 0
        }
    }

    changeMode(mode){
        this.setState({
            modeMenu: mode
        })
    }

    render(){
        let chooseMode;
        switch (this.state.modeMenu) {
            case "stat":
                chooseMode = <div className="profile-stat__info">
                <div className="stat">
                    <p>Кол-во слов: {this.state.countWords}</p>
                    <p>Сред скорость: {this.state.countMidSpeed}</p>
                    <p>Время теста: {this.state.timeTest}</p>
                    <p>Напечатано книг: {this.state.writeBook}</p>
                    <p>Напечатано стихотворений: {this.state.writePoem}</p>
                    <p>Игр онлайн: {this.state.gameOnline}</p>
                </div>
                <div className="table">
                    <table>
                        <tbody>
                            <tr>
                                <td className="choose">Стоимость</td>
                                <td className="choose">Слова</td>
                            </tr>
                            <tr>
                                <td className="choose">Месяц</td>
                                <td className="choose">Год</td>
                            </tr>
                            <tr>
                                <td onClick={()=>this.checkpost()}>Имя</td>
                                <td>Значение</td>
                            </tr>
                            <tr>
                                <td>Максим</td>
                                <td>1200</td>
                            </tr>
                            <tr>
                                <td>Дмитрий</td>
                                <td>1100</td>
                            </tr>
                            <tr>
                                <td>Антон</td>
                                <td>567</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
                break;
            case "collection":
                chooseMode = <div className="collection">
                    <div className="card">
                        <img src={imgBook} alt="" />
                        <p className="name">Мастер и Маргарита</p>
                        <p className="card-info"><span>Слов:</span> {12342}</p>
                        <p className="card-info"><span>Сложность:</span> {5}/10</p>
                        <div className="card-opacity">
                            <p className="card-info"><span>Время:</span> {6} минут</p>
                            <p className="card-info"><span>Ошибки:</span> {12}</p>
                            <p className="card-info"><span>Дата начала:</span> {"12.03.21"}</p>
                            <p className="card-info"><span>Дата конца:</span> {"19.03.21"}</p>
                        </div>
                    </div>
                    <div className="card">
                        <img src={imgBook} alt="" />
                        <p className="name">Мастер и Маргарита</p>
                        <p className="card-info"><span>Слов:</span> {12342}</p>
                        <p className="card-info"><span>Сложность:</span> {5}/10</p>
                    </div>
                    <div className="card">
                        <img src={imgBook} alt="" />
                        <p className="name">Мастер и Маргарита</p>
                        <p className="card-info"><span>Слов:</span> {12342}</p>
                        <p className="card-info"><span>Сложность:</span> {5}/10</p>
                    </div>
                    <div className="card">
                        <img src={imgBook} alt="" />
                        <p className="name">Мастер и Маргарита</p>
                        <p className="card-info"><span>Слов:</span> {12342}</p>
                        <p className="card-info"><span>Сложность:</span> {5}/10</p>
                    </div>
                    <div className="card">
                        <img src={imgBook} alt="" />
                        <p className="name">Мастер и Маргарита</p>
                        <p className="card-info"><span>Слов:</span> {12342}</p>
                        <p className="card-info"><span>Сложность:</span> {5}/10</p>
                    </div>
                    <div className="card">
                        <img src={imgBook} alt="" />
                        <p className="name">Мастер и Маргарита</p>
                        <p className="card-info"><span>Слов:</span> {12342}</p>
                        <p className="card-info"><span>Сложность:</span> {5}/10</p>
                    </div>
                </div>
                break;
            case "invent":
                chooseMode = <div>Инвентарь</div>
                break;
            default:
                break;
        }
        return(
            <div className="profile">
                <div className="profile-pers">
                    <div className="border">
                        <p className="cash">Общая стоимость: {this.state.cash}</p>
                        <img src={pers} alt="" />
                    </div>
                    <p>Тут будет список предметов</p>
                </div>
                <div className="profile-stat">
                    <div className="profile-stat__menu">
                        <p onClick={()=>this.changeMode("stat")} className={this.state.modeMenu == "stat"?"chooseMenu active":"chooseMenu"}>Статистика</p>
                        <p onClick={()=>this.changeMode("collection")} className={this.state.modeMenu == "collection"?"chooseMenu active":"chooseMenu"}>Коллекция</p>
                        <p onClick={()=>this.changeMode("invent")} className={this.state.modeMenu == "invent"?"chooseMenu active":"chooseMenu"}>Инвентарь</p>
                    </div>
                    {chooseMode}
                </div>
            </div>
        )
    }
}