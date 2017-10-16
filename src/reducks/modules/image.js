const UPLOAD_IMAGE = 'image/UPLOAD_IMAGE';
const UPLOAD_IMAGE_SUCCESS = 'image/UPLOAD_IMAGE_SUCCESS';
const UPLOAD_IMAGE_FAIL = 'image/UPLOAD_IMAGE_FAIL';

const initialState = {
   loading: false,
   id: null,
};

export default function reducer(state = initialState, action = {}) {
   switch (action.type) {
      // -----
      case UPLOAD_IMAGE:
         return {
            ...state,
            loading: true
         };
      case UPLOAD_IMAGE_SUCCESS:
         return {
            ...state,
            loading: false,
            id: action.result.id,
            error: null
         };
      case UPLOAD_IMAGE_FAIL:
         return {
            ...state,
            loading: false,
            imageId: null,
            error: action.error
         };
      default:
         return state;
   }
}

export function uploadImage(imageFile) {
   return {
      types: [UPLOAD_IMAGE, UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_FAIL],
      mock:{id:(Math.ceil(Math.random() * (70 - 1) + 1))},
      promise: (client) => client.post('/image', {
         file: imageFile
      })
   }
}

