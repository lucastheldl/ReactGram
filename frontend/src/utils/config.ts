export const api = "http://localhost:5000/api"
export const upsloads= "http://localhost:5000/uploads"


type Headers = {
  "Content-Type"?: string;
  Authorization?: string;
};

export const requestConfig= (method:any, data:any , token=null, image = null) =>{
  let config;

  if(image){
    config={
      method,
      body:data,
      headers:{}as Headers
    };
  } else if(method === "DELETE" || data === null){
    config={
      method,
      headers:{}as Headers
    }
  }else{
    config={
      method,
      body:JSON.stringify(data),
      headers:{
        "Content-Type":"application/json"
      }as Headers
    }
  }

  if(token){
    //config.headers.Authorization = `Bearer ${token}`
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}