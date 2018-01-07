import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import * as EventActions from '../reducks/modules/event'
import * as CommentActions from '../reducks/modules/comment'
import {connect} from 'react-redux';
import '../stylesheets/presentation.css'
//sasa

class Presentation extends Component {

   state = {
      eventId:this.props.match.eventId,
      users:839,
      approved:94,
      unapproved:26,
      mostQuestionedSpeech:"Microservices and Future",
      mostLikedQuestion:"What will change with Java 9?",
      comments : [],
      newComments : [],
      sponsors : [],
      nth:0,
      toplam:1,
      logoPath: "https://trello-attachments.s3.amazonaws.com/58dfa1cf30e8221b3b4afb96/59c263323c5316634be52db8/x/239de66be9ba10b2beccec24c0969f0c/mavi-01.png",
      eventCode: this.props.match.params.eventId,

   };

   //Bu kod react'in genel yapisina uygun degildir. Animasyonlu gecisleri yapmak icin HTML DOM MANIPULATION kullanilmistir.

   unmountIntervals = [];
   unmountTimeouts = [];

   componentWillUnmount(){
      //geri gelme etkinligi varsa
      for(let i = 0; i < this.unmountIntervals.length; i++){
         clearInterval(this.unmountIntervals[i]);
      }
      for(let j = 0; j < this.unmountTimeouts.length; j++){
         clearTimeout(this.unmountTimeouts[j]);
      }

      window.removeEventListener("resize", this.updateDimensions);
      document.querySelector(".navbar").style.display = "block";
   }


   componentDidMount() {
      this.sortComments();

      document.querySelector(".navbar").style.display = "none";


      this.unmountIntervals.push(setInterval(function(){
         this.getComments();
      }.bind(this), 3000));

      {console.log(this.props)}



      this.updateDimensions();
      window.addEventListener("resize", this.updateDimensions);
      this.props.fetchEvent(this.props.match.params.eventId.slice(0,4));

   }




   componentWillReceiveProps(nextProps) {
      if ((nextProps.event && this.props.event !== nextProps.event) || (this.props.event && nextProps.event && this.props.event.id !== nextProps.event.id)) {
         if(nextProps.event.deleted===true){
            this.props.history.push("/");
         }
         console.log(nextProps.event)
         this.setState({
            id: nextProps.event.id ? nextProps.event.id : '',
            name: nextProps.event.name ? nextProps.event.name : '',
            logoPath: nextProps.event.logoPath ? nextProps.event.logoPath : '',
            agenda: nextProps.event.agenda ? nextProps.event.agenda : [],
            description: nextProps.event.description ? nextProps.event.description : '',
            web: nextProps.event.about ? nextProps.event.about.web ? nextProps.event.about.web : '' : '',
            rooms:nextProps.event.rooms ? nextProps.event.rooms : [],
            sponsors: nextProps.event.sponsors ? nextProps.event.sponsors[Object.keys(nextProps.event.sponsors).filter((el)=>{return el.split("|")[0]==="0"})] : [],
            sponsorTags: nextProps.event.sponsorTags ? nextProps.event.sponsorTags : {},
            floorPlan : nextProps.event.floorPlan ? nextProps.event.floorPlan : [],
            loading:false,
            toplam: nextProps.event.sponsors ? nextProps.event.sponsors[Object.keys(nextProps.event.sponsors).filter((el)=>{return el.split("|")[0]==="0"})].filter((el)=>{return el.logo.length>0}).length : 1,
         }, ()=>{

            this.getComments();

            if(this.state.toplam!==1){
               this.unmountIntervals.push(setInterval(()=>{
                  let soWidth = document.querySelector(".soWidth");
                  if(Number(this.state.nth)+1===this.state.toplam){
                     soWidth.style.transition = "1s all";
                     this.setState({nth:this.state.nth+1});
                     this.unmountTimeouts.push(setTimeout(function(){
                        soWidth.style.transition = "0.001s all";
                        this.setState({nth:0});
                        soWidth.style.transform = "translateX(-"+0+"px)";
                     }.bind(this),1000));
                  }else{
                     soWidth.style.transition = "1s all";
                     this.setState({nth:this.state.nth+1});
                  }
                  soWidth.style.transform = "translateX(-"+this.state.nth*240+"px)";
               },5010));
            }
         });
      }

      if (nextProps.comment && this.props.comment !== nextProps.comment) {
         this.setState({
            newComments:nextProps.comment.comment,
         }, () => {
            this.combineComments();
         })

      }
   }


   textToNumber = (text) => {
      let numberToText = "ZOTHFISEGN";
      let number = "";
      for(let i=0;i<text.length;i++){
         number += numberToText.indexOf(text[i]);
      }
      return number;
   };

   getComments = () => {
      let nIndex = this.textToNumber(this.props.match.params.eventId.slice(4));
      if(this.state.agenda[nIndex]){
         this.props.getComments(this.state.id, this.state.agenda[nIndex].id);
      }else{
         console.log("Talk Error")
      }
   };

   updateDimensions = () => {
      let scale;
      scale = Math.min(this.windowWidth() / document.querySelector(".scaled").offsetWidth, this.windowHeight() / document.querySelector(".scaled").offsetHeight);
      document.querySelector(".scaled").style.transform = 'scale(' + scale + ')';
      document.querySelector(".scaled").style.top = '' + this.windowHeight() / 2 - scale * 300 + 'px';
      document.querySelector(".scaled").style.left = '' + this.windowWidth() / 2 - scale * 400 + 'px';
      document.querySelector("body").style.width = document.querySelector(".scaled").offsetWidth * scale;
      document.querySelector("body").style.height = document.querySelector(".scaled").offsetHeight * scale;
   };

   windowWidth = () => {
      let docElemProp = window.document.documentElement.clientWidth,
         body = window.document.body;
      return window.document.compatMode === ("CSS1Compat" && docElemProp) || (body && body.clientWidth) || docElemProp;
   };

   windowHeight = () => {
      let docElemProp = window.document.documentElement.clientHeight,
         body = window.document.body;
      return window.document.compatMode === ("CSS1Compat" && docElemProp) || (body && body.clientHeight) || docElemProp;
   };

   arrange = () => {
      let childDivs = document.querySelectorAll('.box');
      let i;
      for( i=0; i< childDivs.length; i++ ){
         let childDiv = childDivs[i];
         childDiv.style.top = ((childDiv.getAttribute("data-nth")-1)*170)+"px";
         childDiv.style.zIndex = 100-childDiv.getAttribute("data-nth");
      }
   };


   swapComments = (what,will) => {
      let temp = document.querySelector('.box[data-nth="'+will+'"]');
      document.querySelector('.box[data-nth="'+what+'"]').setAttribute("data-nth", will);
      temp.setAttribute("data-nth", what);
   };


   combineComments = () => {
      let comments = this.state.comments.slice(0);
      this.state.newComments.forEach(function(newElement){
         let changed = false;
         comments.forEach(function(element){
            if(newElement.id===element.id){
               element.like = newElement.like;
               changed = true;
            }
         });
         //if nothing found
         if(!changed){
            comments.push(newElement);
         }
      });
      this.setState({comments:comments},()=>{
         this.sortComments();
      });
   };

   sortComments = () => {
      let comments = this.state.comments;
      comments.forEach(function(element, i) {
         let oldComment = document.querySelector(".box[data-nth='"+(i+1)+"'] .likes");
         let questions = document.querySelector(".questions");
         if(oldComment){
            oldComment.innerHTML = element.like
         }else{
            let newComment = document.createElement("div");
            newComment.className = "box flashing";
            questions.appendChild(newComment);
            newComment.setAttribute("data-nth", (i+1));
            newComment.innerHTML += '<div class="name">'+element.username+'<div class="likes">'+element.like+'</div></div><div class="question"><span class="middler">'+element.commentValue+'</span></div>';
         }
      });
      let swapped;
      do {
         swapped = false;
         for (let i=0; i < comments.length-1; i++) {
            if (comments[i].like < comments[i+1].like) {
               let temp = comments[i];
               comments[i] = comments[i+1];
               comments[i+1] = temp;
               this.swapComments(i+1,i+2);
               swapped = true;
            }
         }
      } while (swapped);
      this.setState({comments:comments},()=>{
         this.arrange();
      });

   };

   //TODO sponsorun logosu yok ise patlamasin

   render() {
      return (
         <div className="presentation">
            <div className="blacker" />
            <div className="scaled">
               <div className="leftBar">
                  <div className="verticalAlign">
                     <div className="logo">
                        <img src={"http://app.sliconf.com:8090/service/image/get/"+this.state.logoPath} alt="" />
                     </div>
                     <div className="desc"><span className="joinAt">Join at</span><br />example.com<br /><b>#{this.state.eventCode}</b></div>
                     <div className="sponsor">
                        <div className="soWidth">
                           {this.state.sponsors.length > 0 ? this.state.sponsors.map((key) => {
                              if(key.logo){
                                 return <img key={key.logo} src={"http://app.sliconf.com:8090/service/image/get/"+key.logo} alt={key.name} />
                              }
                           }): ''}
                           {this.state.sponsors.length > 0 && this.state.sponsors[0].logo!=="" ? <img src={"http://app.sliconf.com:8090/service/image/get/" + (this.state.sponsors[0] ? this.state.sponsors[0].logo : '')} alt={(this.state.sponsors[0] ? this.state.sponsors[0].name : '')} /> : ''}
                        </div>
                     </div>
                  </div>
               </div>
               <div className="rightBar">
                  <h1>Top Questions</h1>
                  <div className="questions" />
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state, ownProps) => {
   return {
      event: state.event.event,
      user: state.auth.user,
      comment: state.comment,
   }
}

const mapDispatchToProps = (dispatch, ownProps) => {
   return {...bindActionCreators({...EventActions,...CommentActions}, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Presentation)