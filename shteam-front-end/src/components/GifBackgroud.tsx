import { PropsWithChildren } from "react";
import image from '../img/wallpaper.gif';

const GifBackground = (props: PropsWithChildren<{}>): JSX.Element => {
    return (
        <div
            style={{
                backgroundImage: `url(${image})`,
                height: '100%'
            }}
        >
            {props.children}
        </div>
    );
}

export default GifBackground;