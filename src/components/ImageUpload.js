import React from 'react';
import Dropzone from 'react-dropzone'
import ApiClient from '../helpers/ApiClient'
import classNames from 'classnames'

class ImageUpload extends React.Component {

   state = {
      imageId:null
   }

   onDropFiles = (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles.length) {
         new ApiClient().post('/image',{
            file: acceptedFiles[0]
         }).then((res)=>{
            this.setState({imageId:res.id},()=>{
               if(this.props.onLoad) {
                  this.props.onLoad(res.id)
               }
            })
         },(err)=>{
            // bu kısmı sil
            let id = (Math.ceil(Math.random() * (70 - 1) + 1))
            this.setState({imageId:id},()=>{
               if(this.props.onLoad) {
                  this.props.onLoad(id)
               }
            })
            // buraya kadar
            if(this.props.onError) {
               this.props.onError(err)
            }
         }).catch((err)=>{
            if(this.props.onError) {
               this.props.onError(err)
            }
         })
      }
   }

   render() {
      return (
         <Dropzone
            accept="image/jpeg, image/png"
            onDrop={this.onDropFiles}
            style={{}}
            className={classNames('resimHolder', {'active':!!this.state.imageId})}
         >
            {this.props.children}
         </Dropzone>
      );
   }
}

export default ImageUpload