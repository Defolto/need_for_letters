import React, { Fragment } from 'react'
import '../style/learning.scss'
import '../style/chartist.scss'
import Chartist from "../js/chartist.min.js"
import speed from '../img/speed.png'
import time from '../img/time.png'
import error from '../img/error.png'
import keyboard from '../img/keyboard.png'
import sound from '../img/sound.png'
import colors from '../img/colors.png'
import hands from '../img/hands.png'
import replay from '../img/replay.png'
import hands1 from '../img/1.png'
import hands2 from '../img/2.png'
import hands3 from '../img/3.png'
import hands4 from '../img/4.png'
import hands5 from '../img/5.png'
import hands7 from '../img/7.png'
import hands8 from '../img/8.png'
import hands9 from '../img/9.png'
import hands10 from '../img/10.png'

export default class Practice extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            // общие состояние для работы
            texts: this.props.text,
            text: "",
            activeWordNumber: 0,
            start: false,
            activeError: false,
            errors: 0,
            speed: 0,
            time: 0,
            modal: false,
            // для графика
            staticWords: [0],
            staticSeconds: [0],
            // состояния для зажатого shift
            nowShift: false,
            // настройки
            optionSound: true,
            optionColors: true,
            optionKeyboard: true,
            optionHands: false
        };
        this.timer = '';
        this.static = '';
        this.audioCtx = new(window.AudioContext || window.webkitAudioContext)();
    }

    // звук при ошибке
    beep() {
        var oscillator = this.audioCtx.createOscillator();
        var gainNode = this.audioCtx.createGain();
    
        oscillator.connect(gainNode);
        gainNode.connect(this.audioCtx.destination);
    
        gainNode.gain.value = 0.2;
        oscillator.frequency.value = 808;
        oscillator.type = "sine";
    
        oscillator.start();
    
        setTimeout(
            function() {
              oscillator.stop();
            },
            100
        );
    }

    // Анимация нажатия клавиши (да, выходит из логики react, но что поделать)
    animationKeyPress(event){
        if (document.querySelector(`div[data-rusLittle="${event.key}"]`)) {
            document.querySelector(`div[data-rusLittle="${event.key}"]`).classList.add('press');
        }
        if (document.querySelector(`div[data-rusCaps="${event.key}"]`)) {
            document.querySelector(`div[data-rusCaps="${event.key}"]`).classList.add('press');
        }
    }

    // Анимация отпуска клавиши (да, выходит из логики react, но что поделать)
    animationKeyOut(event){
        if (document.querySelector(`div[data-rusLittle="${event.key}"]`)) {
            document.querySelector(`div[data-rusLittle="${event.key}"]`).classList.remove('press');
        }
        if (document.querySelector(`div[data-rusCaps="${event.key}"]`)) {
            document.querySelector(`div[data-rusCaps="${event.key}"]`).classList.remove('press');
        }
    }

    // Событие поднятия клавиши
    keyUpBtn(e){
        if (e.key == "Shift") {
            this.setState({
                nowShift: false
            })
        } 
        this.animationKeyOut(e)
    }

    // Событие нажатия клавиши
    keyDownBtn(e) {
        this.animationKeyPress(e);
        // Если зажали шифт меняем расскалдку
        if (e.key == "Shift") {
            this.setState({
                nowShift: true
            })
        }
        // Если не зажали alt или shift (логика смена языка)
        if (e.key != "Shift" && e.key != "Alt") {
            // Когда начали печатать, запускаем таймер
            {if (!this.state.start) {
                this.timer = setInterval(() => {
                    const newTime = this.state.time + 0.1;
                    const newSpeed = ((this.state.activeWordNumber + 1) / this.state.time).toFixed(1);
                    this.setState({
                        time: newTime,
                        speed: newSpeed
                    })
                }, 100);
                this.static = setInterval(() => {
                    let staticSeconds = this.state.staticSeconds;
                    staticSeconds.push(this.state.staticSeconds.length);
                    const newStaticSeconds = staticSeconds;

                    let staticWords = this.state.staticWords;
                    staticWords.push(this.state.speed);
                    const newStaticWords = staticWords;
                    this.setState({
                        staticSeconds: newStaticSeconds,
                        staticWords: newStaticWords
                    })
                }, 1000);
            }}
            // Если всё напечатали
            if (this.state.text.length - 1 == this.state.activeWordNumber) {
                clearInterval(this.timer);
                clearInterval(this.static);
                const newActiveWordNumber = this.state.activeWordNumber + 1;
                new Chartist.Line('.ct-chart', {
                    labels: this.state.staticSeconds,
                    series: [this.state.staticWords]
                });
                this.setState({
                    activeWordNumber: newActiveWordNumber,
                    modal: true
                })
            }else{
                // Если напечатанная буква совпадает с необходимой
                if (e.key == this.state.text[this.state.activeWordNumber]) {
                    const newActiveWordNumber = this.state.activeWordNumber + 1;
                    this.setState({
                        activeWordNumber: newActiveWordNumber,
                        start: true,
                        activeError: false
                    })
                // Ошибка. Не засчитываем ошибки, если открыто модальное окно (типа уже закончили печатать)
                } else if (!this.state.modal){
                    const newErrors = this.state.errors + 1;
                    if (this.state.optionSound) {
                        this.beep();
                    }
                    this.setState({
                        errors: newErrors,
                        start: true,
                        activeError: true
                    })
                }
            }
        }
    }

    continueWithNewText(){
        clearInterval(this.timer);
        clearInterval(this.static);
        this.closeModal()

        this.setState({
            activeWordNumber: 0,
            errors: 0,
            speed: 0,
            start: false,
            time: 0,
            activeError: false,
            text: this.state.texts[Math.floor(Math.random() * this.state.texts.length)]
        })
    }
    
    componentDidMount(){
        addEventListener("keydown", ()=>this.keyDownBtn(event));
        addEventListener("keyup", ()=>this.keyUpBtn(event));
        this.setState({
            text: this.state.texts[Math.floor(Math.random() * this.state.texts.length)]
        })
    }

    convertText(text, activeWordNumber){
        // Преобразование текста в массив
        const massText = []
        for (let i = 0; i < text.length; i++) {
            massText.push(text[i])
        }
        // Конвертирование текста в span-ы
        const convertText = massText.map((value, index)=>{
            if (activeWordNumber == index) {
                return <span className="activeWord" key={index}>{value}</span>
            } else {
                return <span key={index}>{value}</span>
            }
        })
        return convertText
    }

    closeModal(){
        this.setState({
            modal: false
        })
    }

    replay(){
        clearInterval(this.timer);
        clearInterval(this.static);
        this.closeModal()

        this.setState({
            activeWordNumber: 0,
            errors: 0,
            speed: 0,
            start: false,
            time: 0,
            activeError: false
        })
    }

    render(){
        return(
            <div className="wrapper-learning pt-20">
                <div className={this.state.modal? "wrapper-modal wrapper-modal__active": "wrapper-modal"}>
                    <div className="modal-info">
                        <h5 className="title">Статистика текста</h5>
                        <div className="static">
                            <div class="ct-chart ct-perfect-fourth"></div>
                        </div>
                        <div className="btns">
                            <div className="close" onClick={()=>this.continueWithNewText()}>Далее</div>
                            <div className="close" onClick={()=>this.replay()}>Повторить текст</div>
                            <div className="close" onClick={()=>this.closeModal()}>Закрыть</div>
                        </div>
                    </div>
                </div>
                <div className={this.state.activeError?"text text__error":"text"}>
                    {this.convertText(this.state.text, this.state.activeWordNumber)}
                </div>
                <div className="info">
                    <div className="info-left">
                        <div className="speed">
                            <p>
                                <img src={speed} alt="скорость" />
                                <span>{this.state.speed} знак/сек</span>
                            </p>
                        </div>
                        <div className="error">
                            <p>
                                <img src={error} alt="ошибки" />
                                <span>{this.state.errors}</span>
                            </p>
                        </div>
                        <div className="time">
                            <p>
                                <img src={time} alt="время" />
                                <span>{this.state.time.toFixed(1)} сек</span>
                            </p>
                        </div>
                    </div>
                    <div className="info-right">
                        <img className={this.state.optionSound?"":"pass"} onClick={()=>{this.setState({optionSound: !this.state.optionSound})}} src={sound} alt="звук" />
                        <img className={this.state.optionColors?"":"pass"} onClick={()=>{this.setState({optionColors: !this.state.optionColors})}} src={colors} alt="цвета" />
                        <img className={this.state.optionHands?"":"pass"} onClick={()=>{this.setState({optionHands: !this.state.optionHands})}} src={hands} alt="руки" />
                        <img className={this.state.optionKeyboard?"":"pass"} onClick={()=>{this.setState({optionKeyboard: !this.state.optionKeyboard})}} src={keyboard} alt="клавиатура" />
                        <img onClick={()=>this.replay()} src={replay} alt="заново" />
                    </div>
                </div>
                <div className={this.state.optionKeyboard?"learning":"learning learning_pass"}>
                    <div className={this.state.optionColors?"learning-row learning-colors":"learning-row"}>
                        <CreateKeys activeWord={this.state.optionHands?this.state.text[this.state.activeWordNumber]:''} keys={[[this.state.nowShift?"Ё":"ё", "lightBlue"], 
                        [this.state.nowShift?"!":"1", "green"], 
                        [this.state.nowShift?`"`:"2", "green"],
                        [this.state.nowShift?"№":"3", "blue"],
                        [this.state.nowShift?";":"4", "pink"],
                        [this.state.nowShift?"%":"5", "orange"],
                        [this.state.nowShift?":":"6", "orange"],
                        [this.state.nowShift?"?":"7", "yellow"],
                        [this.state.nowShift?"*":"8", "pinkR"],
                        [this.state.nowShift?"(":"9", "blueR"],
                        [this.state.nowShift?")":"0", "greenR"],
                        [this.state.nowShift?"_":"-", "greenR"],
                        [this.state.nowShift?"+":"=", "greenR"],
                        ["Backspace", "lightBlue"],
                        ]}/>
                    </div>
                    <div className={this.state.optionColors?"learning-row learning-colors":"learning-row"}>
                        <CreateKeys activeWord={this.state.optionHands?this.state.text[this.state.activeWordNumber]:''} keys={[["Tab", "lightBlue"], 
                            [this.state.nowShift?"Й":"й", "green"], 
                            [this.state.nowShift?"Ц":"ц", "blue"],
                            [this.state.nowShift?"У":"у", "pink"],
                            [this.state.nowShift?"К":"к", "orange"],
                            [this.state.nowShift?"Е":"е", "orange"],
                            [this.state.nowShift?"Н":"н", "yellow"],
                            [this.state.nowShift?"Г":"г", "yellow"],
                            [this.state.nowShift?"Ш":"ш", "pinkR"],
                            [this.state.nowShift?"Щ":"щ", "blueR"],
                            [this.state.nowShift?"З":"з", "greenR"],
                            [this.state.nowShift?"Х":"х", "greenR"],
                            [this.state.nowShift?"Ъ":"ъ", "greenR"],
                            [this.state.nowShift?"/":"\/", "lightBlue"],
                            ]}/>
                    </div>
                    <div className={this.state.optionColors?"learning-row learning-colors":"learning-row"}>
                    <CreateKeys activeWord={this.state.optionHands?this.state.text[this.state.activeWordNumber]:''} keys={[["CapsLock", "lightBlue"], 
                            [this.state.nowShift?"Ф":"ф", "green"], 
                            [this.state.nowShift?"Ы":"ы", "blue"],
                            [this.state.nowShift?"В":"в", "pink"],
                            [this.state.nowShift?"А":"а", "orange"],
                            [this.state.nowShift?"П":"п", "orange"],
                            [this.state.nowShift?"Р":"р", "yellow"],
                            [this.state.nowShift?"О":"о", "yellow"],
                            [this.state.nowShift?"Л":"л", "pinkR"],
                            [this.state.nowShift?"Д":"д", "blueR"],
                            [this.state.nowShift?"Ж":"ж", "greenR"],
                            [this.state.nowShift?"Э":"э", "greenR"],
                            ["Enter", "lightBlue"]
                            ]}/>
                    </div>
                    <div className={this.state.optionColors?"learning-row learning-colors":"learning-row"}>
                        <CreateKeys activeWord={this.state.optionHands?this.state.text[this.state.activeWordNumber]:''} keys={[["Shift", "lightBlue shift"], 
                            [this.state.nowShift?"Я":"я", "green"], 
                            [this.state.nowShift?"Ч":"ч", "blue"],
                            [this.state.nowShift?"С":"с", "pink"],
                            [this.state.nowShift?"М":"м", "orange"],
                            [this.state.nowShift?"И":"и", "orange"],
                            [this.state.nowShift?"Т":"т", "yellow"],
                            [this.state.nowShift?"Ь":"ь", "yellow"],
                            [this.state.nowShift?"Б":"б", "pinkR"],
                            [this.state.nowShift?"Ю":"ю", "blueR"],
                            [this.state.nowShift?",":".", "greenR"],
                            ["Shift", "lightBlue shift"]
                        ]}/>
                    </div>
                    <div className={this.state.optionColors?"learning-row learning-colors":"learning-row"}>
                        <CreateKeys activeWord={this.state.optionHands?this.state.text[this.state.activeWordNumber]:''} keys={[["Space", "lightBlue"]]}/>
                    </div>
                </div>
            </div>
        )
    }
}

function CreateKeys(props) {
    const btns = props.keys.map((value, index)=>{
        if (value[0] == "Backspace") {
            return <div data-rusLittle={value[0]} className={value[1] + " w-back"}><p>{value[0]}</p></div>
        }else if (value[0] == "Tab" || value[0] == "\/") {
            return <div className={value[1] + " w-10"}><p>{value[0]}</p></div>
        }else if (value[0] == "CapsLock" || value[0] == "Enter") {
            return <div data-rusLittle={value[0]} className={value[1] + " w-15"}><p>{value[0]}</p></div>
        }else if (value[0] == "Shift") {
            return <div data-rusLittle={value[0]} className={value[1] + " w-20"}><p>{value[0]}</p></div>
        }else if (value[0] == "Space") {
            if (" " == props.activeWord) {
                return <div data-rusLittle={" "} className={value[1] + " w-40"}>
                            <p>{value[0]}</p>
                            <img src={hands5} />
                        </div>
            } else {
                return <div data-rusLittle={" "} className={value[1] + " w-40"}><p>{value[0]}</p></div>
            }
        }else{
            let hand;
            if (value[0] == props.activeWord || value[0].toUpperCase() == props.activeWord) {
                switch (value[1]) {
                    case "green":
                        hand = hands1;
                        break;
                    case "blue":
                        hand = hands2;    
                        break;
                    case "pink":
                        hand = hands3;
                        break;
                    case "orange":
                        hand = hands4;
                        break;
                    case "yellow":
                       hand = hands7; 
                        break;
                    case "pinkR":
                        hand = hands8;    
                        break;
                    case "blueR":
                        hand = hands9;
                        break;
                    case "greenR":
                        hand = hands10;
                        break;
                }
                return <div data-rusLittle={value[0]} data-rusCaps={value[0].toUpperCase()} className={value[1] + " w-5"}>
                            <p>{value[0]}</p>
                            <img src={hand} />
                        </div>
            } else {
                return <div data-rusLittle={value[0]} data-rusCaps={value[0].toUpperCase()} className={value[1] + " w-5"}><p>{value[0]}</p></div>
            }
        }
    }) 
    return btns;
}