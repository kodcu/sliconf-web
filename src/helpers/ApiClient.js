import superagent from 'superagent';
//WARNING
//import config from '../config'

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
   const adjustedPath = path[0] !== '/' ? '/' + path : path;

   if (process.env.NODE_ENV === "development") {
     return 'https://app.sliconf.com/api' + adjustedPath;
     // return 'http://localhost:8090/service' + adjustedPath;
   }
   return '/api' + adjustedPath;
}

export default class ApiClient {

   get token() {
      return this.constructor.token;
   }

   set token(token){
      this.constructor.token = token;
   }

   constructor(req) {
      methods.forEach((method) =>
         this[method] = (path, {params, data, file} = {}) => new Promise((resolve, reject) => {
            const request = superagent[method](formatUrl(path));

            if(!file){
               request.set("Content-Type", "application/json");
               request.set("Authorization", this.token);
            }
            /*
            if(this.token){
               request.set('token',this.token);
            }
            */
            if (params) {
               request.query(params);
            }

            if (data) {
               request.send(JSON.stringify(data));
            }
            if (file) {
               request.attach('uploaded_file', file)
            }

            request.end((err, res) => {
                if(res && res.status === 401){
                    //Clear cookies
                    document.cookie.split(";").forEach(function(c){
                        document.cookie = c.replace(/^ +/, "")
                            .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                    });
                    //And redirect
                    setTimeout(function(){
                        window.location = "/logout";
                    },1);
                }

                if (err) {
                    reject(res.body || err);
                } else {
                    resolve(res.body);
                }
            });
         }));
   }
}