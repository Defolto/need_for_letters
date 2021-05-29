import React from 'react'
import '../styles/general.scss'
import '../styles/modal.scss'

export class Modal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mode: true,
            entryName: '',
            entryPassword: '',
            regLogin: '',
            regEmail: '',
            regPassword1: '',
            regPassword2: ''
        }
        this.inputData = this.inputData.bind(this);
    }

    inputData(e){
        if (e.target.name == "entryName") {
            this.setState({
                entryName: e.target.value
            })
        } else if (e.target.name == "entryPassword") {
            this.setState({
                entryPassword: e.target.value
            })
        } else if (e.target.name == "regLogin") {
            this.setState({
                regLogin: e.target.value
            })
        } else if (e.target.name == "regEmail") {
            this.setState({
                regEmail: e.target.value
            })
        } else if (e.target.name == "regPassword1") {
            this.setState({
                regPassword1: e.target.value
            })
        } else if (e.target.name == "regPassword2") {
            this.setState({
                regPassword2: e.target.value
            })
        }
    }

    regNewUser(){
        if (this.state.regPassword1 == this.state.regPassword2) {
            fetch('/api/regNewUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data:{
                        newUser: {
                            email: this.state.regEmail,
                            login: this.state.regLogin,
                            password: this.state.regPassword1
                        }
                    }
                })
            })
            .then(res => res.json())
            .then(res => {
                console.log(res);
            });
        } else {
            alert("Не верно")
        }
    }

    logIn(){
        const writeData = this.props.hoba;
        fetch('/api/logIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data:{
                    user: {
                        email: this.state.entryName,
                        password: this.state.entryPassword,
                    }
                }
            })
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            writeData(res);
        });
    }

    render(){
        console.log(this.state);
        if (this.state.mode) {
            return(
                <div className="modal">
                    <div className="modal__in">
                        <div className="d-row bb">
                            <p><span className="active__input">Вход</span> <span>/</span> <span onClick={()=>this.setState({mode: false})}>Регистрация</span></p>
                            <p className="ml-a close" onClick={()=>this.props.closeModal()}>✖</p>
                        </div>
                        <div className="d-column">
                            <p>Email / логин:</p>
                            <input type="text" name="entryName" value={this.state.entryName} onChange={this.inputData}/>
                            <p>Пароль:</p>
                            <input type="password" name="entryPassword" value={this.state.entryPassword} onChange={this.inputData}/>
                            <button onClick={()=>this.logIn()}>Войти</button>
                        </div>
                    </div>
                </div>
            )
        } else {
            return(
                <div className="modal">
                    <div className="modal__in">
                        <div className="d-row bb">
                            <p><span onClick={()=>this.setState({mode: true})}>Вход</span> / <span className="active__input">Регистрация</span></p>
                            <p className="ml-a close" onClick={()=>this.props.closeModal()}>✖</p>
                        </div>
                        <div className="d-column">
                            <p>Email</p>
                            <input type="email" value={this.state.regLogin} onChange={this.inputData} name="regEmail"/>
                            <p>Логин</p>
                            <input type="text" name="regLogin" value={this.state.regEmail} onChange={this.inputData}/>
                            <p>Пароль</p>
                            <input type="text" name="regPassword1" value={this.state.regPassword1} onChange={this.inputData}/>
                            <p>Повторите пароль</p>
                            <input type="text" name="regPassword2" value={this.state.regPassword2} onChange={this.inputData}/>
                            <button onClick={()=>this.regNewUser()}>Зарегистрироваться</button>
                        </div>
                    </div>
                </div>
            )
        }
        
    }
}