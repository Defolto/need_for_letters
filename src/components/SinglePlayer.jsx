import React from 'react'
import '../styles/general.scss'
import '../styles/trening.scss'
import replay from '../img/replay.png'

export class SinglePlayer extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            text: 'Тут будет выбранный вами текст',
            countLetter: 0,
            error: false,
            speed: 0,
            errorsInput: 0,
            time: 0,
            start: false
        }
    }

    generationSentence(sentence){
        let massText = [];
        for (let i = 0; i < sentence.length; i++) {
            massText.push(sentence[i])
        }
        const text = massText.map((letter, index) => {
            if (index < this.state.countLetter) {
                return <span key={index} className="passLetter" id={`letter${index}`}>{letter}</span>
            } else if (index == this.state.countLetter) {
                return <span key={index} className="activeLetter" id={`letter${index}`}>{letter}</span>
            } else {
                return <span key={index} id={`letter${index}`}>{letter}</span>
            }
        });
        return text;
    }

    changeText(newText){
        this.setState({
            text: newText,
            countLetter: 0,
            error: false,
            speed: 0,
            errorsInput: 0,
            time: 0,
            start: false
        })
    }

    replay(){
        clearInterval(this.interval);
        this.setState({
            countLetter: 0,
            error: false,
            speed: 0,
            errorsInput: 0,
            time: 0,
            start: false
        })
    }

    tickAndSpeed(){
        if (this.state.countLetter >= this.state.text.length) {
            clearInterval(this.interval);
        }
        let newSpeed = this.state.countLetter / this.state.time;
        let newTime = Math.ceil((this.state.time + 0.10)*100)/100;
        this.setState({
            time: newTime,
            speed: newSpeed
        })
    }

    inputLetter(event){
        // console.log(event.keyCode);
        document.querySelector(`#v${event.keyCode}`).classList.add('btn-press');
        setTimeout(() => {
            document.querySelector(`#v${event.keyCode}`).classList.remove('btn-press');
        }, 100);
        // Всё напечатали
        if (this.state.countLetter >= this.state.text.length) {
            return
        }
        // запуск таймера 
        if (!this.state.start) {
            this.interval = setInterval(() => this.tickAndSpeed(), 100);
            this.setState({
                start: true
            })
        }
        // проверка на правильность ввода
        if (event.key == this.state.text[this.state.countLetter]) {
            this.setState({
                countLetter: this.state.countLetter + 1,
                error: false
            })
        }else{
            if (event.key != "Shift" && event.key != "Alt" && event.key != "CapsLock" && event.key != "Tab" && event.key != "Enter" && event.key != "Backspace"){
                this.setState({
                    error: true,
                    errorsInput: this.state.errorsInput + 1
                })
            }
        }
    }

    componentDidMount(){
        addEventListener('keydown', this.inputLetter.bind(this))
    }

    render(){
        return(
            <div className="trening mainBlock">
                <div className="d-column">
                    <div className={this.state.error? "trening-text trening-text__error":"trening-text"}>
                        <p>{this.generationSentence(this.state.text)}</p>
                        <p className="replay" onClick={()=>this.replay()}>
                            <img src={replay} alt="" />
                        </p>
                    </div>
                    <div className="d-row trening-info">
                        <p>Скорость: <span>{this.state.speed? this.state.speed.toFixed(2) : 0}</span> <span className="littleParam">букв/сек</span></p>
                        <p>Ошибки: <span>{this.state.errorsInput}</span></p>
                        <p>Время: <span>{this.state.time.toFixed(1)}</span> <span className="littleParam">секунд</span></p>
                    </div>
                </div>
                <div className="trening-keyboard">
                    <div className="d-row">
                        <div id="v192" className="btn ml-a white-btn"><p>Ё</p></div>
                        <div id="v49" className="btn green-btn"><p>1</p></div>
                        <div id="v50" className="btn green-btn"><p>2</p></div>
                        <div id="v51" className="btn blue-btn"><p>3</p></div>
                        <div id="v52" className="btn pink-btn"><p>4</p></div>
                        <div id="v53" className="btn orange-btn"><p>5</p></div>
                        <div id="v54" className="btn orange-btn"><p>6</p></div>
                        <div id="v55" className="btn yellow-btn"><p>7</p></div>
                        <div id="v56" className="btn pink-btn"><p>8</p></div>
                        <div id="v57" className="btn blue-btn"><p>9</p></div>
                        <div id="v48" className="btn green-btn"><p>0</p></div>
                        <div id="v189" className="btn green-btn"><p>-</p></div>
                        <div id="v187" className="btn green-btn"><p>=</p></div>
                        <div id="v8" className="btn btn-2 mr-a white-btn"><p>←</p></div>
                    </div>
                    <div className="d-row">
                        <div id="v9" className="btn btn-2 ml-a white-btn"><p>TAB</p></div>
                        <div id="v81" className="btn green-btn"><p>Й</p></div>
                        <div id="v87" className="btn blue-btn"><p>Ц</p></div>
                        <div id="v69" className="btn pink-btn"><p>У</p></div>
                        <div id="v82" className="btn orange-btn"><p>К</p></div>
                        <div id="v84" className="btn orange-btn"><p>Е</p></div>
                        <div id="v89" className="btn yellow-btn"><p>Н</p></div>
                        <div id="v85" className="btn yellow-btn"><p>Г</p></div>
                        <div id="v73" className="btn pink-btn"><p>Ш</p></div>
                        <div id="v79" className="btn blue-btn"><p>Щ</p></div>
                        <div id="v80" className="btn green-btn"><p>З</p></div>
                        <div id="v219" className="btn green-btn"><p>Х</p></div>
                        <div id="v221" className="btn green-btn"><p>Ъ</p></div>
                        <div id="v220" className="btn mr-a white-btn"><p>\</p></div>
                    </div>
                    <div className="d-row">
                        <div id="v20" className="btn btn-3 ml-a white-btn"><p>CAPS</p></div>
                        <div id="v65" className="btn green-btn"><p>Ф</p></div>
                        <div id="v83" className="btn blue-btn"><p>Ы</p></div>
                        <div id="v68" className="btn pink-btn"><p>В</p></div>
                        <div id="v70" className="btn orange-btn"><p>А</p></div>
                        <div id="v71" className="btn orange-btn"><p>П</p></div>
                        <div id="v72" className="btn yellow-btn"><p>Р</p></div>
                        <div id="v74" className="btn yellow-btn"><p>О</p></div>
                        <div id="v75" className="btn pink-btn"><p>Л</p></div>
                        <div id="v76" className="btn blue-btn"><p>Д</p></div>
                        <div id="v186" className="btn green-btn"><p>Ж</p></div>
                        <div id="v222" className="btn green-btn"><p>Э</p></div>
                        <div id="v13" className="btn btn-3 mr-a white-btn"><p>ENTER</p></div>
                    </div>
                    <div className="d-row">
                        <div id="v16" className="btn btn-4 ml-a white-btn"><p>SHIFT</p></div>
                        <div id="v90" className="btn green-btn"><p>Я</p></div>
                        <div id="v88" className="btn blue-btn"><p>Ч</p></div>
                        <div id="v67" className="btn pink-btn"><p>С</p></div>
                        <div id="v86" className="btn orange-btn"><p>М</p></div>
                        <div id="v66" className="btn orange-btn"><p>И</p></div>
                        <div id="v78" className="btn yellow-btn"><p>Т</p></div>
                        <div id="v77" className="btn yellow-btn"><p>Ь</p></div>
                        <div id="v188" className="btn pink-btn"><p>Б</p></div>
                        <div id="v190" className="btn blue-btn"><p>Ю</p></div>
                        <div id="v191" className="btn green-btn"><p>.</p></div>
                        <div id="v16" className="btn btn-4 mr-a white-btn"><p>SHIFT</p></div>
                    </div>
                    <div className="d-row">
                        <div id="v32" className="btn space white-btn"><p>Пробел</p></div>
                    </div>
                </div>
                <div className="d-row trening-texts">
                    <div className="trening-texts__card" onClick={()=>this.changeText('Любовь это боль, которая выжигает все внутри, подобно огню, поглощающему все чувства, которые находятся в душе.')}><p>Любовь это боль, которая выжигает все внутри, подобно огню, поглощающему все чувства, которые находятся в душе.</p></div>
                    <div className="trening-texts__card" onClick={()=>this.changeText('Винить другого, как и себя - все равно, что хвалить себя же, это любимейшее занятие всех людей, тешить свое тщеславие, льстить себе же.')}><p>Винить другого, как и себя - все равно, что хвалить себя же, это любимейшее занятие всех людей, тешить свое тщеславие, льстить себе же.</p></div>
                    <div className="trening-texts__card" onClick={()=>this.changeText('Жизнь - это не рай, но ее необходимо изменять в лучшую сторону, а не в худшую, чтобы в конце пути не бояться оказаться в аду.')}><p>Жизнь - это не рай, но ее необходимо изменять в лучшую сторону, а не в худшую, чтобы в конце пути не бояться оказаться в аду.</p></div>
                    <div className="trening-texts__card" onClick={()=>this.changeText('Влюбленные бесстрашны и отважны, они, как птицы, пролетают самый яростный огонь даже не опалив крыльев.')}><p>Влюбленные бесстрашны и отважны, они, как птицы, пролетают самый яростный огонь даже не опалив крыльев.</p></div>
                    <div className="trening-texts__card" onClick={()=>this.changeText('Глупости так глубоко в нас засели, что всегда что-нибудь останется, но постараемся оставить лишь самое неизбежное.')}><p>Глупости так глубоко в нас засели, что всегда что-нибудь останется, но постараемся оставить лишь самое неизбежное.</p></div>
                    <div className="trening-texts__card" onClick={()=>this.changeText('Те, которые сделали себе ремесло из того, чтобы забавлять других, сами бывают невеселого, мрачного характера')}><p>Те, которые сделали себе ремесло из того, чтобы забавлять других, сами бывают невеселого, мрачного характера</p></div>
                    <div className="trening-texts__card" onClick={()=>this.changeText('То, что полезно по своей природе и сущности, нельзя отвергать из-за какого-то зла, наличествующего в нем побочно.')}><p>То, что полезно по своей природе и сущности, нельзя отвергать из-за какого-то зла, наличествующего в нем побочно.</p></div>
                    <div className="trening-texts__card" onClick={()=>this.changeText('Доводы, до которых человек додумывается сам, обычно убеждают его больше, нежели те, которые пришли в голову другим.')}><p>Доводы, до которых человек додумывается сам, обычно убеждают его больше, нежели те, которые пришли в голову другим.</p></div>
                </div>
            </div>
        )
    }
}