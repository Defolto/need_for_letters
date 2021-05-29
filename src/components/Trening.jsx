import React from 'react'
import '../styles/general.scss'
import '../styles/trening.scss'
import hand from '../img/img.png'

export class Trening extends React.Component{
    
    constructor(props){
        super(props);
        this.keyboard = [['1','2','й',"ф","я"],
        ["3","ц","ы","ч"],["4","у","в","с"],
        ["5","6","к","е","а","п","м","и"],["7","н","г","р","о","т","ь"],
        ["8","ш","л","б"],["9","щ","д","ю"],["0","-","=","з","х","ъ","ж","э","."]];
        this.state = {
            letter: '',
            level: 0,
            corrects: 0,
            errorLetter: false
        }
    }

    inputLetter(event){
        document.querySelector(`#v${event.keyCode}`).classList.add('btn-press');
        setTimeout(() => {
            document.querySelector(`#v${event.keyCode}`).classList.remove('btn-press');
        }, 100);
        if (event.key == this.state.letter) {
            this.setState({
                letter: this.generationLetter(),
                corrects: this.state.corrects + 1,
                errorLetter: false
            })
        }else{
            if (event.key != "Shift" && event.key != "Alt" && event.key != "CapsLock" && event.key != "Tab" && event.key != "Enter" && event.key != "Backspace") {
                this.setState({
                    corrects: 0,
                    errorLetter: true
                })
            }
        }
    }

    generationLetter(){
        let numberMass = Math.floor(0 + Math.random() * (this.state.level + 1 - 0));
        return this.keyboard[numberMass][Math.floor(0 + Math.random() * (this.keyboard[numberMass].length-1 + 1 - 0))];
    }

    changeLvl(direction){
        if (direction == '+') {
            if (this.state.level < 7) {
                this.setState({
                    level: this.state.level + 1
                })
            }
        } else {
            if (this.state.level >= 1) {
                this.setState({
                    level: this.state.level - 1
                })
            }
        }
    }

    componentDidMount(){
        addEventListener('keydown', this.inputLetter.bind(this));
        this.setState({
            letter: this.generationLetter()
        })
    }

    render(){
        return(
            <div className="trening d-column mainBlock">
                <div className="d-column">
                    <div className="d-row">
                        <p className={this.state.errorLetter ? "trening-letter trening-letter__error" : "trening-letter"}>{this.state.letter}</p>
                    </div>
                </div>
                <div className="d-row trening-info">
                        <p className="trening-lvl">Уровень сложности: {this.state.level + 1}</p>
                        <p className="trening-lvl">Счёт: {this.state.corrects}</p>
                        <div className="trening-plus" onClick={()=>this.changeLvl('+')}><p>+</p></div>
                        <div className="trening-minus" onClick={()=>this.changeLvl('-')}><p>-</p></div>
                    </div>
                <div className="trening-keyboard">
                    <div className="d-row">
                        <div id="v192" className="btn ml-a white-btn"><p>Ё</p></div>
                        <div id="v49" className="btn green-btn"><p>1</p></div>
                        <div id="v50" className="btn green-btn"><p>2</p></div>
                        <div id="v51" className={this.state.level >= 1 ? "btn blue-btn":"btn blue-btn opacity"}><p>3</p></div>
                        <div id="v52" className={this.state.level >= 2 ? "btn pink-btn":"btn pink-btn opacity"}><p>4</p></div>
                        <div id="v53" className={this.state.level >= 3 ? "btn orange-btn":"btn orange-btn opacity"}><p>5</p></div>
                        <div id="v54" className={this.state.level >= 3 ? "btn orange-btn":"btn orange-btn opacity"}><p>6</p></div>
                        <div id="v55" className={this.state.level >= 4 ? "btn yellow-btn":"btn yellow-btn opacity"}><p>7</p></div>
                        <div id="v56" className={this.state.level >= 5 ? "btn pink-btn":"btn pink-btn opacity"}><p>8</p></div>
                        <div id="v57" className={this.state.level >= 6 ? "btn blue-btn":"btn blue-btn opacity"}><p>9</p></div>
                        <div id="v48" className={this.state.level >= 7 ? "btn green-btn":"btn green-btn opacity"}><p>0</p></div>
                        <div id="v189" className={this.state.level >= 7 ? "btn green-btn":"btn green-btn opacity"}><p>-</p></div>
                        <div id="v187" className={this.state.level >= 7 ? "btn green-btn":"btn green-btn opacity"}><p>=</p></div>
                        <div id="v8" className="btn btn-2 mr-a white-btn"><p>←</p></div>
                    </div>
                    <div className="d-row">
                        <div id="v9"  className="btn btn-2 ml-a white-btn"><p>TAB</p></div>
                        <div id="v81" className="btn green-btn"><p>Й</p></div>
                        <div id="v87" className={this.state.level >= 1 ? "btn blue-btn":"btn blue-btn opacity"}><p>Ц</p></div>
                        <div id="v69" className={this.state.level >= 2 ? "btn pink-btn":"btn pink-btn opacity"}><p>У</p></div>
                        <div id="v82" className={this.state.level >= 3 ? "btn orange-btn":"btn orange-btn opacity"}><p>К</p></div>
                        <div id="v84" className={this.state.level >= 3 ? "btn orange-btn":"btn orange-btn opacity"}><p>Е</p></div>
                        <div id="v89" className={this.state.level >= 4 ? "btn yellow-btn":"btn yellow-btn opacity"}><p>Н</p></div>
                        <div id="v85" className={this.state.level >= 4 ? "btn yellow-btn":"btn yellow-btn opacity"}><p>Г</p></div>
                        <div id="v73" className={this.state.level >= 5 ? "btn pink-btn":"btn pink-btn opacity"}><p>Ш</p></div>
                        <div id="v79" className={this.state.level >= 6 ? "btn blue-btn":"btn blue-btn opacity"}><p>Щ</p></div>
                        <div id="v80" className={this.state.level >= 7 ? "btn green-btn":"btn green-btn opacity"}><p>З</p></div>
                        <div id="v219" className={this.state.level >= 7 ? "btn green-btn":"btn green-btn opacity"}><p>Х</p></div>
                        <div id="v221" className={this.state.level >= 7 ? "btn green-btn":"btn green-btn opacity"}><p>Ъ</p></div>
                        <div id="v220" className="btn mr-a white-btn"><p>\</p></div>
                    </div>
                    <div className="d-row">
                        <div id="v20" className="btn btn-3 ml-a white-btn"><p>CAPS</p></div>
                        <div id="v65" className="btn green-btn"><p>Ф</p></div>
                        <div id="v83" className={this.state.level >= 1 ? "btn blue-btn":"btn blue-btn opacity"}><p>Ы</p></div>
                        <div id="v68" className={this.state.level >= 2 ? "btn pink-btn":"btn pink-btn opacity"}><p>В</p></div>
                        <div id="v70" className={this.state.level >= 3 ? "btn underline orange-btn":"btn underline orange-btn opacity"}><p>А</p></div>
                        <div id="v71" className={this.state.level >= 3 ? "btn orange-btn":"btn orange-btn opacity"}><p>П</p></div>
                        <div id="v72" className={this.state.level >= 4 ? "btn yellow-btn":"btn yellow-btn opacity"}><p>Р</p></div>
                        <div id="v74" className={this.state.level >= 4 ? "btn underline yellow-btn":"btn underline yellow-btn opacity"}><p>О</p></div>
                        <div id="v75" className={this.state.level >= 5 ? "btn pink-btn":"btn pink-btn opacity"}><p>Л</p></div>
                        <div id="v76" className={this.state.level >= 6 ? "btn blue-btn":"btn blue-btn opacity"}><p>Д</p></div>
                        <div id="v186" className={this.state.level >= 7 ? "btn green-btn":"btn green-btn opacity"}><p>Ж</p></div>
                        <div id="v222" className={this.state.level >= 7 ? "btn green-btn":"btn green-btn opacity"}><p>Э</p></div>
                        <div id="v13" className="btn btn-3 mr-a white-btn"><p>ENTER</p></div>
                    </div>
                    <div className="d-row">
                        <div id="v16" className="btn btn-4 ml-a white-btn"><p>SHIFT</p></div>
                        <div id="v90" className="btn green-btn"><p>Я</p></div>
                        <div id="v88" className={this.state.level >= 1 ? "btn blue-btn":"btn blue-btn opacity"}><p>Ч</p></div>
                        <div id="v67" className={this.state.level >= 2 ? "btn pink-btn":"btn pink-btn opacity"}><p>С</p></div>
                        <div id="v86" className={this.state.level >= 3 ? "btn orange-btn":"btn orange-btn opacity"}><p>М</p></div>
                        <div id="v66" className={this.state.level >= 3 ? "btn orange-btn":"btn orange-btn opacity"}><p>И</p></div>
                        <div id="v78" className={this.state.level >= 4 ? "btn yellow-btn":"btn yellow-btn opacity"}><p>Т</p></div>
                        <div id="v77" className={this.state.level >= 4 ? "btn yellow-btn":"btn yellow-btn opacity"}><p>Ь</p></div>
                        <div id="v188" className={this.state.level >= 5 ? "btn pink-btn":"btn pink-btn opacity"}><p>Б</p></div>
                        <div id="v190" className={this.state.level >= 6 ? "btn blue-btn":"btn blue-btn opacity"}><p>Ю</p></div>
                        <div id="v191" className={this.state.level >= 7 ? "btn green-btn":"btn green-btn opacity"}><p>.</p></div>
                        <div id="v16" className="btn btn-4 mr-a white-btn"><p>SHIFT</p></div>
                    </div>
                    <div className="d-row">
                        <div id="v32" className="btn space white-btn"><p>Пробел</p></div>
                    </div>
                </div>
                <div className="tutorial">
                    <h1>Инструкция по слепой печати</h1>
                    <div className="d-row">
                        <div className="col-50">
                            <h2>Перед началом работы</h2>
                            <ol>
                                <li><p>Положите руки, как показано на изображении справа</p></li>
                                <li><p>Смотрите только на монитор</p></li>
                                <li><p>При ошибке, не смотрите на клавиатуру и попытайтесь ещё раз найти нужную букву</p></li>
                                <li><p>Не торопитесь в начале обучения</p></li>
                                <li><p>Передвигайте пальцы только по тем клавишам, которые соответствуют каждому пальцу</p></li>
                            </ol>
                        </div>
                        <div className="col-50">
                            <img className="hands" src={hand} alt="Изображение рук"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}