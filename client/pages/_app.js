import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/built-client";
import Headers from "../component/header";
const AppComponent = ({ Component, pageProps, currentUser }) => {
  //console.log(currentUser);
  return (
    <div>
      <Headers currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  // console.log(Object.keys(appContext));
  console.log(appContext);
  let pageProps = {};
  try {
    const { data } = await buildClient(appContext.ctx).get("user", {
      withCredentials: true,
    });

    if (appContext.Component.getInitialProps) {
      pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }
    //console.log(pageProps);
    return { pageProps, ...data };
  } catch (err) {
    if (appContext.Component.getInitialProps) {
      pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }
    //console.log(err);
    const data = { currentUser: null };
    return { pageProps, ...data };
  }
};
export default AppComponent;
