import Document, {Head,Main,NextScript,Html} from "next/document";
export default class MyDocument extends Document{
    render(){
        return (
            <Html>
            
                <Head>
                    

                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==" crossorigin="anonymous" />
                </Head>
                <body>
                    <Main />
                    <NextScript/>

                </body>
                <style global jsx>
            {`
            body{
                margin:0;
                 
            }
            `}
                </style>
            </Html>
        )
    }
}