import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/built-client";
import Headers from "../component/header";
import fetch from "isomorphic-unfetch"
import axios from "axios";
const AppComponent = ({ Component, pageProps, currentUser }) => {
 // console.log(currentUser);
  return (
    <div>
      <Headers currentUser={currentUser} />
      <Component currentUser={currentUser} {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  // console.log(Object.keys(appContext));
 // console.log(appContext);
  let pageProps = {};
  
  if(typeof window==="undefined"){
    
    //console.log("server  side");
    

    
    const response=await fetch("http://localhost:3010/api-gateway/current-user/user",{credentials:"include",headers:appContext.ctx.req.headers})
    const data=await response.json()
    if (appContext.Component.getInitialProps) {
      pageProps = await appContext.Component.getInitialProps(appContext.ctx,buildClient(appContext.ctx),data);
    }
    //console.log(appContext.ctx.req.headers)
   // console.log(data);
    return { pageProps, ...data };
  }
  
  else{
   // console.log("client  side");
      const response=await fetch("http://localhost:3010/api-gateway/current-user/user",{credentials:"include"})
      const data=await response.json()
      if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx,buildClient(appContext.ctx),data);
      }
    //  console.log(data);
      return { pageProps, ...data };
  }

 /* try {
    console.log("trying");
    const { data } = await buildClient(appContext.ctx).get("user", {
      withCredentials: true,
    });
    console.log("successfull");
    if (appContext.Component.getInitialProps) {
      pageProps = await appContext.Component.getInitialProps(appContext.ctx,buildClient(appContext.ctx),data);
    }
   
    //console.log(data);;
    return { pageProps, ...data };
  } catch (err) {
   // console.log("error",err);
    // try {
    // const response = await axios.get(
    //   "http://localhost:3010/api-gateway/current-user/user",
    //   { withCredentials: true }
    // );
    // const data = { currentUser: response.data };
    // if (appContext.Component.getInitialProps) {
    //   pageProps = await appContext.Component.getInitialProps(appContext.ctx,buildClient(appContext.ctx),data);
    // }
    // return { pageProps, ...data };
    // }
    // catch(err)
    // {

    //   console.log("inside error2",);
    //   //console.log(err);
    //   return {pageProps, currentUser:null}
    // }
    
    const res = await fetch("http://localhost:3010/api-gateway/current-user/user",{ credentials: 'include'})
    //console.log(res.status);
  const resp = await res.json()
    //console.log(resp);
    
    if(res.status===200)
    {
      if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx,buildClient(appContext.ctx),resp);
       }
       //console.log(resp);
       //console.log('fetch successfull');
     // console.log("True");
    
      return {pageProps, currentUser:resp}
    }
    else if(typeof window==="undefined"){
      try {
        console.log("trying 2" );
       
        const {data} = await axios.get(
          "http://localhost:3010/api-gateway/current-user/user",
          { withCredentials: true,headers:appContext.ctx.req.headers},
        );
        console.log("sucessfull 2" );
        
        //const data = { currentUser:response.data };
        //console.log(data);
        if (appContext.Component.getInitialProps) {
          pageProps = await appContext.Component.getInitialProps(appContext.ctx,buildClient(appContext.ctx),data);
        }

        return { pageProps, data };
        }
        catch(err)
        {
          //console.log(err);
          console.log("null passing window undefined ");
          //console.log(err);
          return {pageProps, currentUser:null}
        }
    
    }
    else
    {
      console.log("null passing");
      return {pageProps, currentUser:null}
            
    }
  }*/
};
export default AppComponent;
