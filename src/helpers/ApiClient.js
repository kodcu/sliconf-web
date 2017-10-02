import superagent from 'superagent';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
   const adjustedPath = path[0] !== '/' ? '/' + path : path;

   if(process.env.NODE_ENV==="development"){
       return path;
   }
   return '/api' + adjustedPath;
}

export default class ApiClient {
   constructor(req) {
      methods.forEach((method) =>
         this[method] = (path, {params, data} = {}) => new Promise((resolve, reject) => {
            const request = superagent[method](formatUrl(path));

             request.set("Content-Type", "text/plain")

            if (params) {
               request.query(params);
            }
            if (data) {
               request.send(JSON.stringify(data));
            }

            request.end((err, {body} = {}) => err ? reject(body || err) : resolve(body));
         }));
   }
}