import React from 'react'
import '../style/trening.scss'

import error from '../img/error.png'
import time from '../img/time.png'
import keyboard from '../img/keyboard.png'
import sound from '../img/sound.png'
import colors from '../img/colors.png'
import hands from '../img/hands.png'
import replay from '../img/replay.png'
import ok from '../img/ok.png'
import hands1 from '../img/1.png'
import hands2 from '../img/2.png'
import hands3 from '../img/3.png'
import hands4 from '../img/4.png'
import hands5 from '../img/5.png'
import hands7 from '../img/7.png'
import hands8 from '../img/8.png'
import hands9 from '../img/9.png'
import hands10 from '../img/10.png'

/** Основной компонент*/
export default class Trening extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            // общие состояние для работы
            letters: [["1","2","й","ф","я"],["3","ц","ы","ч"],["4","у","в","с"],["5","6","к","е","в","а","м","и"],["7","н","г","р","о","т","ь"],["8","ш","л","б"],["9","щ","д","ю"],["0","-","=","з","х","ъ","ж","э","."]],
            sizeWord: 1,
            openColors: 1,
            activeNumberLetter: 0,
            activeWordMass: [],
            activeWord: '',
            activeError: false,
            time: 0,
            errors: 0,
            points: 0,
            modal: false,
            // состояния для зажатого shift
            nowShift: false,
            // настройки
            optionSound: true,
            optionColors: true,
            optionKeyboard: true,
            optionHands: false
        };
        this.audioCtx = new(window.AudioContext || window.webkitAudioContext)();
        this.timer = '';
    }

    // Создание слова, исходя из уровня сложности
    createNewWord(){
        let newWord = [];
        for (let i = 0; i < this.state.sizeWord; i++) {
            let randomMassLetters = Math.floor(Math.random() * this.state.openColors)
            newWord.push(this.state.letters[randomMassLetters][Math.floor(Math.random() * this.state.letters[randomMassLetters].length)]);
        }
        const covertText = newWord.map((value, index)=>{
            if (index == this.state.activeNumberLetter) {
                return <span className="activeWord" key={index}>{value}</span>
            } else {
                return <span key={index}>{value}</span>
            }
        })
        this.setState({
            activeWord: covertText,
            activeWordMass: newWord
        })
    }

    updateThisWord(){
        const covertText = this.state.activeWordMass.map((value, index)=>{
            if (index == this.state.activeNumberLetter) {
                return <span className="activeWord" key={index}>{value}</span>
            } else {
                return <span key={index}>{value}</span>
            }
        })
        this.setState({
            activeWord: covertText
        })
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

    changeLevel(){
        if (this.state.points == 20) {
            this.setState({
                sizeWord: 2
            })
        }
        if (this.state.points == 40) {
            this.setState({
                openColors: 2
            })
        }
        if (this.state.points == 60) {
            this.setState({
                sizeWord: 3
            })
        }
        if (this.state.points == 80) {
            this.setState({
                openColors: 3
            })
        }
        if (this.state.points == 100) {
            this.setState({
                sizeWord: 4
            })
        }
        if (this.state.points == 120) {
            this.setState({
                openColors: 4
            })
        }
        if (this.state.points == 140) {
            this.setState({
                sizeWord: 5
            })
        }
        if (this.state.points == 160) {
            this.setState({
                openColors: 5
            })
        }
        if (this.state.points == 180) {
            this.setState({
                sizeWord: 6
            })
        }
        if (this.state.points == 200) {
            this.setState({
                openColors: 6
            })
        }
        if (this.state.points == 220) {
            this.setState({
                sizeWord: 7
            })
        }
        if (this.state.points == 240) {
            this.setState({
                openColors: 7
            })
        }
        if (this.state.points == 260) {
            this.setState({
                sizeWord: 8
            })
        }
        if (this.state.points == 280) {
            this.setState({
                openColors: 8
            })
        }
        if (this.state.points == 300) {
            this.setState({
                sizeWord: 9
            })
        }
        if (this.state.points == 320) {
            this.setState({
                sizeWord: 10
            })
        }
        if (this.state.points == 340) {
            this.setState({
                sizeWord: 11
            })
        }
        if (this.state.points == 360) {
            this.setState({
                sizeWord: 12
            })
        }
        if (this.state.points == 380) {
            this.setState({
                sizeWord: 13
            })
        }
        if (this.state.points == 400) {
            clearInterval(this.timer);
            this.setState({
                modal: true
            })
        }
    }

    minusLevel(){
        if (this.state.points < 20) {
            const addError = this.state.errors + 1;
            this.setState({
                points: 0,
                activeError: true,
                errors: addError
            })
        }else if (this.state.sizeWord > this.state.openColors) {
            const addError = this.state.errors + 1;
            const newPoints = this.state.points - 20;
            const newSize = this.state.sizeWord - 1;
            this.setState({
                points: newPoints,
                sizeWord: newSize,
                activeError: true,
                errors: addError
            })
        }else if (this.state.sizeWord == this.state.openColors) {
            const addError = this.state.errors + 1;
            const newPoints = this.state.points - 20;
            const newColor = this.state.openColors - 1;
            this.setState({
                points: newPoints,
                openColors: newColor,
                activeError: true,
                errors: addError
            })
        }
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
        // Проверка на повышение уровня сложности
        this.changeLevel();
        // Если не зажали alt или shift (логика смена языка)
        if (e.key != "Shift" && e.key != "Alt") {
            // запуск таймера
            {if (this.state.time === 0) {
                this.timer = setInterval(() => {
                    const newTime = this.state.time + 0.1;
                    this.setState({
                        time: newTime,
                    })
                }, 100);
            }}
            // Если напечатали всё слово
            if (this.state.activeWordMass.length -1 == this.state.activeNumberLetter && e.key == this.state.activeWordMass[this.state.activeNumberLetter]) {
                const addPoint = this.state.points + 1;
                this.setState({
                    activeNumberLetter: 0,
                    points: addPoint,
                    activeError: false
                })
                this.createNewWord();
                // Если напечатанная буква совпадает с необходимой
            } else if (e.key == this.state.activeWordMass[this.state.activeNumberLetter]) {
                const newStates = {
                    "activeNumberLetter": this.state.activeNumberLetter + 1,
                    "points": this.state.points + 1
                }
                this.setState({
                    activeNumberLetter: newStates["activeNumberLetter"],
                    points: newStates["points"],
                    activeError: false
                })
                this.updateThisWord();
            // Ошибка. Не засчитываем ошибки, если открыто модальное окно (типа уже закончили печатать)
            } else if (!this.state.modal){
                if (this.state.optionSound) {
                    this.beep();
                }
                this.minusLevel();
            }
        }
    }

    continueWithNewText(){
        this.closeModal()

        this.setState({
            speed: 0,
            time: 0,
        })
    }
    
    componentDidMount(){
        addEventListener("keydown", ()=>this.keyDownBtn(event));
        addEventListener("keyup", ()=>this.keyUpBtn(event));
        this.createNewWord();
    }

    closeModal(){
        this.setState({
            modal: false
        })
    }

    replay(){
        this.closeModal()
        clearInterval(this.timer);
        this.createNewWord();

        this.setState({
            time: 0,
            points: 0,
            openColors: 1,
            sizeWord: 1
        })
    }

    render(){
        return(
            <div className="wrapper-learning pt-20">
                <div className={this.state.modal? "wrapper-modal wrapper-modal__active": "wrapper-modal"}>
                    <div className="modal-info">
                        <h5 className="title">Статистика</h5>
                            <div className="row">
                                <div className="error">
                                    <img src={error} alt="ошибки" />
                                    <span>{this.state.errors}</span>
                                </div>
                                <div className="time">
                                    <img src={time} alt="время" />
                                    <span>{this.state.time.toFixed(1)} сек</span>
                                </div>
                            </div>
                        <div className="btns">
                            <div className="close" onClick={()=>this.replay()}>Заново</div>
                            <div className="close" onClick={()=>this.closeModal()}>Закрыть</div>
                        </div>
                    </div>
                </div>
                <div className={this.state.activeError?"text text__error":"text"}>
                    {this.state.activeWord}
                </div>
                <div className="info">
                    <div className="info-left info-col">
                        <div className="info-row">
                            <div className="points">
                                <p>
                                    <img src={ok} alt="счёт" />
                                    <span>{this.state.points} / 400 </span>
                                </p>
                            </div>
                            <div className="time">
                                <p>
                                    <img src={time} alt="время" />
                                    <span>{this.state.time.toFixed(1)} сек</span>
                                </p>
                            </div>
                        </div>
                        <div className="info-row">
                            <p className="text_size">Размер слов: {this.state.sizeWord}</p>
                            <p className="text_size">Кол-во цветов: {this.state.openColors}</p>
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
                        <CreateKeys activeWord={this.state.optionHands?this.state.activeWordMass[this.state.activeNumberLetter]:''} keys={[[this.state.nowShift?"Ё":"ё", "lightBlue"], 
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
                        <CreateKeys activeWord={this.state.optionHands?this.state.activeWordMass[this.state.activeNumberLetter]:''} keys={[["Tab", "lightBlue"], 
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
                    <CreateKeys activeWord={this.state.optionHands?this.state.activeWordMass[this.state.activeNumberLetter]:''} keys={[["CapsLock", "lightBlue"], 
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
                        <CreateKeys activeWord={this.state.optionHands?this.state.activeWordMass[this.state.activeNumberLetter]:''} keys={[["Shift", "lightBlue shift"], 
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
                        <CreateKeys activeWord={this.state.optionHands?this.state.activeWordMass[this.state.activeNumberLetter]:''} keys={[["Space", "lightBlue"]]}/>
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