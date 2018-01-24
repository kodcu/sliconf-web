import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Silly from '../reducks/modules/silly'
import {Link} from 'react-router-dom';
import AuthView from './AuthView';
import classNames from 'classnames';

class NavBar extends Component {

   state = {
      isOpen:false,
      yes:"",
      no:"",
      message:"",
      step:-1,
      lastStep:1,
      percentage:0,
   };

   messages = [
      "OK, I'm going. Just remember, you can always find me right bottom corner of your screen.", //Closing 0
      "Hello, I'm Silly! I'm here to help you with your journey. Do you want to start?", //Hello! 1
      "OK! Let's start with this: Click \"Create an Event\" button to create your event!", //First step 2
      "So, what is your event's name? Let's write that!", //Create Event 3
      "That looks great name for an event! Enter your date and duration and click Next!", //Name is filled 4
      "Great! You just created an event. Please note this code to share!", //Event created 5
      "So, this is the control panel for your event. Read the instructions and click \"Alright\"", //First opening 6
      "Let's enter a description for your event first. Don't forget to save after you made a change!", //General description 7
      "Look, a plus sign! Click on it to upload your event's logo. I prefer under 1MB and square. Don't forget to save!", //General Logo 8
      "Let's fill our social part now. Click on \"Next\" to continue our journey!", //General last step 9
      "OK! Let's add some social links to our event. If you don't have any, it's okay! Just click \"Next\".", //Social 10
      "Let's fill these fields! Just remember, \"Location\" is required. When you are ready, click \"Next\".", //Contact 11
      "If you don't have any floor plan nor multi-floored event, you can 'Do The Magic!'", //Floors add floor 12
      "Great! You have floor(s), so we can add rooms! Click on \"Rooms\" to continue.", //Floors last step 13
      "You do not have any rooms. To add a room, type room's name, select which floor it is on and click \"Create Room\".", //Rooms add room 14
      "Great! You have room(s)! To add sponsors, just click on \"Sponsors\".", //Rooms last step 15
      "You do not have any sponsorship packages. To add it, type package name and click \"Create Package\". Don't forget to save!", //Sponsors add package 16
      "You have sponsorship package(s), but you do not have any sponsors added. To add, click plus sign under it. Don't forget to save!", //Sponsors add sponsor 17
      "Great! Now we can add speakers. Click \"Speakers\" to add a speaker.", //Sponsors last step 18
      "Let me see... You do not have any speakers. To add one, click \"Add Speaker\".", //Speakers - Nothing to show 19
      "Wow! Look at this cool human being! I bet this person is amazing!", //Speaker 20
      "These are your settings. I mean, name and stuff. Do you want to change them?", //Settings 21
      "Ok, I'm not looking for this one. Change it quickly!", //Change Password 22
      "These are your event's stats. Shiny!", //Stats 23
      "Event's page, I think? Yeah it must be. It says \"Events\" with big green letters!", //Events 24
      "You can add/edit a break on this page. Just be careful, do not make a collusion! Or do, I will take care of it anyway.", //Add Break 25
      "You can add/edit a speaker on this page. Don't forget to add an image!", //Add Speaker 26
      "You can add/edit a talk on this page. Just be careful, do not make a collusion! Or do, I will take care of it anyway.", //Add Talk 27
      "You can select presentation here. But wait! Did you know you can enlarge LOOONG comments by clicking on them?", //Presentation Select 28
      "Hmmm... You do not have anything on your Agenda! To add one, click \"Add Speaker\".", //Talks (Agenda) - Nothing to show 29
      "So, these are the people you are inviting... Great choices! All of them! Maybe it's a great time to look your agenda if you haven't already?", //Speakers - Something to show 30
      "Just look at this! It's already best agenda in the world!", //Talks (Agenda) - Something to show 31
      "I think you just filled all the requirements! Great Job!", //Edit Event - All Done 32
      "Why would someone wants to delete their event anyways?", //Advanced 33
   ];
   //sasa
   nextOn = [9,10,11,13,15];
   faces =  [
            ">~<", "^_^", "^.^", "^-^", "^o^", "^.^", "^_^", "^.^", "^_^", "^-^", //0[0-9]
            "^.^", "^_^", "^-^", "^o^", "^_^", "^-^", "^.^", "^_^", "^o^", "^_^", //1[0-9]
            ".o.", "^.^", ">.<", "^-^", "^_^", "^.^", "^-^", "^.^", "^_^", "^.^", //2[0-9]
            "^0^", "^0^", "^.^", "?_?", "^_^", "^.^", "^-^", "^.^", "^_^", "^.^", //3[0-9]
            ];



   componentDidMount(){
      //console.log(this.props);
      this.setState({
         step:this.props.silly.step,
         percentage: (this.props.event && this.props.event.event && this.props.event.event.statusDetails && this.props.event.event.statusDetails.percentage) ? this.props.event.event.statusDetails.percentage : 0,
      });

   }

   mobileToggle = () => {
      this.setState({isOpen:!this.state.isOpen});
   };

   no = () => {
      this.props.changeStep(0);
   };

   yes = () => {
      this.props.changeStep(2);
   };

   next = () => {
      if(this.props.silly.callback){
         this.props.silly.callback();
      }
      /*if(this.state.step===9 && this.props.silly.tab==="general" && this.props.silly.completed){
         this.props.changeStep(10);
      }*/
   };

   ok = () => {
      this.props.changeStep(-2);
   };

   showOrHide = () => {
      if(this.state.step===-2){
         this.props.changeStep(this.state.lastStep, "userOpen");
      }else{
         this.props.changeStep(0);
      }
   };

   componentWillReceiveProps(nextProps){
      this.setState({
         step:nextProps.silly.step,
         percentage: (nextProps.event && nextProps.event.event && nextProps.event.event.statusDetails && nextProps.event.event.statusDetails.percentage) ? nextProps.event.event.statusDetails.percentage : 0,
         lastStep:nextProps.silly.lastStep,
      });
      //console.log(nextProps);
   }

   silly = (step) => {
      return (<div className={classNames('helper', {'hide': this.state.step===-2 || this.state.step===-1}, {'hidden': !(this.props.auth && this.props.auth.user && (this.props.auth.user.length > 0 || Object.keys(this.props.auth.user).length > 0) && this.props.auth.status)})}>
         <div className={classNames('silly hvr-bob')} onClick={this.showOrHide}>
            <div className="hover">
               <div className="face" data-face={this.faces[this.state.step]} />
            </div>
         </div>
         <div className="silly-talk">
            <div className="message">{this.messages[step]}</div>
            <div className="buttons">
               {this.state.step===1 ? <button className="no" onClick={this.no}>Not now.</button> : ''}
               {this.state.step===1 ? <button className="yes" onClick={this.yes}>Let's go!</button> : ''}
               {this.nextOn.includes(this.state.step) ? <button className="yes" onClick={this.next} disabled={!this.props.silly.completed}>Next</button> : ''}
               {this.state.step===0 ? <button className="yes" onClick={this.ok}>OK</button> : ''}
            </div>
         </div>
         <div className={classNames("silly-bar", {'minimize':this.state})}>
            <div className="bar-perc" style={{width: this.state.percentage+"%"}} />
         </div>
      </div>)
   };

   render() {
      return (
         <div>
            <nav className={classNames('navbar', {'open': this.state.isOpen})}>
               <div className="container">
                  <div className="row">
                     <div className="six columns">
                        <h1 className="logo"><Link to="/">sli<b>Conf</b></Link></h1>
                     </div>
                     <div className="six columns">
                        <li className="menu" onClick={this.mobileToggle}/>
                        <ul className="navbar-list">
                           <AuthView out><li onClick={this.mobileToggle} className="navbar-item"><Link className="navbar-link" to="/login">Sign In</Link></li></AuthView>
                           <AuthView out><li onClick={this.mobileToggle} className="navbar-item"><Link className="navbar-link" to="/register">Register</Link></li></AuthView>
                           <AuthView in><li onClick={this.mobileToggle} className="navbar-item"><Link className="navbar-link" to="/events">Events</Link></li></AuthView>
                           <AuthView in><li onClick={this.mobileToggle} className="navbar-item"><Link className="navbar-link" to="/settings">Settings</Link></li></AuthView>
                           <AuthView in><li onClick={this.mobileToggle} className="navbar-item"><Link className="navbar-link" to="/logout">Sign Out</Link></li></AuthView>
                        </ul>
                     </div>
                  </div>
               </div>
            </nav>
            <div className={classNames('hiddennav', {'open': this.state.isOpen})}>sa</div>
            {this.silly(this.state.step)}
         </div>
      );
   }
}

const mapStateToProps = (state, ownProps) => {
   return {
      silly: state.silly,
      event: state.event,
      auth: state.auth,
   }
}


const mapDispatchToProps = (dispatch, ownProps) => {
   return bindActionCreators({...Silly}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
