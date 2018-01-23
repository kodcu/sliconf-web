import React from 'react';
import Dropzone from 'react-dropzone'
import ApiClient from '../helpers/ApiClient'
import classNames from 'classnames'

class ImageUpload extends React.Component {

   state = {
      imageId:this.props.logo,
      removed:false,
      loading:false,
   };

   componentWillReceiveProps(nextProps){
      if(nextProps.logo){
         this.setState({
            imageId:nextProps.logo,
         })
      }
   }

   showModal = (err) => {
      //console.log(this.props);
      if(this.props.showModal){
         this.props.showModal(err);
      }
   };

   onDropFiles = (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles && acceptedFiles[0].size<1048576) {
         this.setState({
            loading:true,
         });
         new ApiClient().post('/image/upload',{
            file: acceptedFiles[0],
         }).then((res)=>{
            this.setState({imageId:res.returnObject},()=>{
               if(this.props.onLoad) {
                  this.props.onLoad(res.returnObject)
                  this.setState({
                     removed:false,
                     loading:false,
                  })
               }
            })
         },(err)=>{
            this.setState({
               loading:false,
            });
            this.showModal("Image could not be uploaded.");
            if(this.props.onError) {
               this.props.onError(err)
            }
         }).catch((err)=>{
            this.showModal("Image could not be uploaded.");
            this.setState({
               loading:false,
            });
            if(this.props.onError) {
               this.props.onError(err)
            }
         })
      }else{
         this.showModal("Image must be under 1 MegaByte.");
      }
   };

   render() {
      return (
         <div style={{textAlign:"center"}}>
         <Dropzone
               accept="image/jpeg, image/png"
               onDrop={this.onDropFiles}
               style={{}}
               className={classNames('resimHolder', {'loading':this.state.loading}, {'active':(!this.state.removed && (this.state.imageId!=='' && this.state.imageId!==null && this.state.imageId!=="https://app.sliconf.com/api/image/get/"))})}
            >
               {this.props.children}

            </Dropzone>
            <button style={{marginTop:"20px"}} onClick={()=>{if(!this.state.loading){this.setState({imageId:null,removed:true},this.props.onLoad());}}}>Remove Image</button>
         </div>
      );
   }
}

export default ImageUpload