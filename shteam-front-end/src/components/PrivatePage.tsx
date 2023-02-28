import { PropsWithChildren } from 'react';
import { Navigate } from "react-router-dom";

const PrivatePage = (props: PropsWithChildren<{path: string, userType: 'user' | 'dev'}>): JSX.Element => {
    if (sessionStorage.getItem("token") && sessionStorage.getItem('userType') == props.userType) {
        return props.children! as JSX.Element;
    } else {
        sessionStorage.setItem('redirect', props.path);
        return <Navigate to='/login' />;
    }
};

export default PrivatePage;