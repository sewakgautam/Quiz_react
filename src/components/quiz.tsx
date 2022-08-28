import axios from "axios";
import React, { ChangeEvent } from "react";
import { Component } from "react";

import "./quiz.css";

interface QuizProps { }

interface QuizState {
  question: string;
  answers: any;
  correctAns: string;
}

class Quiz extends React.Component<QuizProps, QuizState> {
  async fetchData() {
    const config = {
      headers: {
        "X-Api-key": <YOUR-API-KEY>,
      },
    };
    console.log("hit")
    let data = await axios
      .get(`https://quizapi.io/api/v1/questions`, config);
    const Data1 = data.data[0];
    console.log(Data1)
    this.setState({
      question: Data1.question,
      answers: Data1.answers,
      correctAns: Data1.correct_answer,
    } as QuizState);
  }
  render() {
    {
      // { this.state?.question ? console.log("url already hit") : this.fetchData() }
      const list = [];
      const ans = (this.state?.answers);
      const correct = this.state?.correctAns
      for (const i in ans) {
        if (ans[i]) {
          list.push(<button onClick={() => {
            if (correct == i) {
              alert('Congratulation !!!!!!!!!!!!')
              if (window.confirm('You Wanna Play another quiz ?')) {
                this.fetchData()
              } else {
                window.location.reload()
              }
            } else {
              alert('Better Luck Next Time')
              if (window.confirm('You Wanna Play another quiz ?')) {
                this.fetchData()
              } else {
                window.location.reload()
              }
            }
          }} name={i}> {ans[i]}</button >)
        }
      }

      return (
        <div className="quizPlay">
          {(!this.state?.question &&
            <div className="start"> 
            <button onClick={() => { this.fetchData() }}>Click to Play Game</button>
            </div>  
          ) || (
              <div className="main" >

                <div className="wrapper">
                  <div className="questions">
                    <p>{this.state.question}</p>
                  </div>
                  <div className="possibleAnswer">
                    {list}
                  </div>



                </div>

              </div >
            )}
        </div>
      );
    }
  }
}
export default Quiz;
