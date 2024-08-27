import React, {PropsWithChildren} from "react";

type Props = {

}


const LanguageProvider: React.FC<PropsWithChildren<Props>> = (props) => {


    return <>{props.children}</>;
}

export default LanguageProvider;

