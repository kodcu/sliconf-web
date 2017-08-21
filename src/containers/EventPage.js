import React, { Component } from 'react';
import NavBar from '../components/navbar'

class EventPage extends  Component {

  createEvent()
  {
    console.log("Event name : " + this.state.event_name)
    console.log("Event time : " + this.state.event_time)
    //TODO send event_name & time as props
    this.props.history.push('/event-success')
  }
  state = {
      event_name:"",
      event_time:""
  }
  render(){
    return(
      <div>
        <NavBar/>
        <div className="container mtop">
          <div className="row">
            <div className="twelve columns">
              <div className="row">
                <div className="twelve columns">
                  <h2>Welcome, Stranger!</h2>
                  <h4>Let's create your Event.</h4>
                </div>
              </div>
              <div className="row mtop50">
                <div className="six columns">
                  <label htmlFor="name">Event Name</label>
                  <input type="text" placeholder="i.e. Javaday" id="name" value={this.state.event_name} onChange={(e)=>this.setState({event_name:e.target.value})}/>
                </div>
              </div>
              <div className="row mtop25">
                <div className="six columns">
                  <label htmlFor="date">Event date</label>
                  <input type="text" placeholder="i.e. 21/03/2018" id="datepicker" value={this.state.event_time} onChange={(e)=>this.setState({event_time:e.target.value})}/>
                </div>
              </div>
              <div className="row mtop50">
                <div className="six columns">
                  <input className="button-primary" type="submit" defaultValue="next" onClick={()=>this.createEvent()}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    }
  }


  export default EventPage
