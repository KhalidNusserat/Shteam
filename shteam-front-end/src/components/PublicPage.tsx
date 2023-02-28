import { PropsWithChildren } from 'react';
import { Navigate } from "react-router-dom";

const PublicPage = (props: PropsWithChildren<{}>): JSX.Element => {
    if (!sessionStorage.getItem("token")) {
        return props.children! as JSX.Element;
    } else if (sessionStorage.getItem('userType') === 'user') {
        return <Navigate to='/user/home' />;
    } else {
        return <Navigate to='/dev/home' />;
    }
};

export default PublicPage;