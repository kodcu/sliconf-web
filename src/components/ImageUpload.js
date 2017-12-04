import React from 'react';
import Dropzone from 'react-dropzone'
import ApiClient from '../helpers/ApiClient'
import classNames from 'classnames'

class ImageUpload extends React.Component {

   state = {
      imageId:this.props.logo,
      removed:false,
   };

   componentWillReceiveProps(nextProps){
      if(nextProps.logo){
         this.setState({
            imageId:nextProps.logo,
         })
      }
   }

   onDropFiles = (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles.length) {
         new ApiClient().post('/image/upload',{
            file: acceptedFiles[0],
         }).then((res)=>{
            this.setState({imageId:res.returnObject},()=>{
               if(this.props.onLoad) {
                  this.props.onLoad(res.returnObject)
                  this.setState({
                     removed:false,
                  })
               }
            })
         },(err)=>{
            if(this.props.onError) {
               this.props.onError(err)
            }
         }).catch((err)=>{
            if(this.props.onError) {
               this.props.onError(err)
            }
         })
      }
   };
//sasasasasaqsa
   render() {
      return (
         <div style={{textAlign:"center"}}>
         <Dropzone
               accept="image/jpeg, image/png"
               onDrop={this.onDropFiles}
               style={{}}
               className={classNames('resimHolder', {'active':(!this.state.removed && (this.state.imageId!=='' && this.state.imageId!==null && this.state.imageId!=="http://app.sliconf.com:8090/service/image/get/"))})}
            >
               {this.props.children}

            </Dropzone>
            <button style={{marginTop:"20px"}} onClick={()=>{this.setState({imageId:null,removed:true},this.props.onLoad());}}>Remove Image</button>
         </div>
      );
   }
}

export default ImageUpload