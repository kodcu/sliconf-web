import React, {Component} from 'react';
import RealDatePicker from 'react-datepicker';
import moment from 'moment';

class DatePicker extends Component {
   state = {
      date:0,
      time:0,
      timeRaw:""
   };

   extraTime = 0;

   componentDidMount(){
      let time = moment(this.props.selected).valueOf()-(Math.floor(moment(this.props.selected).valueOf()/86400000)*86400000)-((new Date().getTimezoneOffset())*60000);
      time = Math.floor(time / 1000);
      this.extraTime = time===86400 ? 86400 : 0;

       this.setState({
         time:time-this.extraTime,
         date:moment(Math.floor((Number(moment(this.props.selected).valueOf()))/86400000)*86400000+Number(this.state.time)*1000+((new Date().getTimezoneOffset())*60000))+86400000,
         timeRaw:("0"+Math.floor((time-this.extraTime)/3600)).slice(-2)+":"+("0"+Math.floor((time-this.extraTime)/60)%60).slice(-2)
      },()=>{
         // console.log("didmount after setstate",this.state);
      });
   }
   //sasasasasasasasasasa
   changeDateValue = () => {
      return (date) => {
         this.setState({
            date:moment(date).valueOf()
         },()=>{
            this.props.onChange(moment(Math.floor((Number(this.state.date))/86400000)*86400000+Number(this.state.time)*1000+((new Date().getTimezoneOffset())*60000)));
         });
      }
   };

   changeTimeValue = (e) => {

      // console.log("changetimevale.timeraw", e.target.value);
      // console.log("changetimevale.time", e.target.value.split(":")[0]*3600+e.target.value.split(":")[1]*60);

      this.setState({
         timeRaw:e.target.value,
         time:e.target.value.split(":")[0]*3600+e.target.value.split(":")[1]*60,
      },()=>{

          // console.log("time",this.state.time);
          // console.log("extratime",this.extraTime);
          // console.log("state", this.state);
          // console.log(
          //     moment(Math.floor((Number(this.state.date))/86400000)*86400000+Number(this.state.time)*1000+((new Date().getTimezoneOffset())*60000)).valueOf()+this.extraTime*1000
          // );
          //
          // console.log("date formatted",
          //     moment(
          //         moment(Math.floor((Number(this.state.date))/86400000)*86400000+Number(this.state.time)*1000+((new Date().getTimezoneOffset())*60000))+this.extraTime*1000
          //     ).format("DD MM YYYY - HH:mm:ss")
          // );

          this.props.onChange(moment(Math.floor((Number(this.state.date))/86400000)*86400000+Number(this.state.time)*1000+((new Date().getTimezoneOffset())*60000))+this.extraTime*1000);
      });

      //this.props.onChange(moment(Number(moment(date).unix())+Number(this.state.time)));
      //sasasasa
   };

   render() {
      return (
         <div className="row">
            <div className="eight columns">
               <RealDatePicker
                  {...this.props}
                  showTimeSelect={false}
                  onChange={this.changeDateValue()}
               />
            </div>
            <div className="four columns">
               <input type="time" style={{width:"100%"}} value={this.state.timeRaw} onChange={(e)=>{this.changeTimeValue(e)}} />
            </div>
         </div>
      );
   }
}

export default DatePicker