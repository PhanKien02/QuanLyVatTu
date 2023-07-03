import React from "react";
import style from "./loading.module.scss";
function LoadingComponent() {
    return (
        <div className={style.spinner}>
            <div className={style.center}>
                <div className={style.squares_container}>
                    <div className={style.squares}>
                        <div className={style.square}></div>
                        <div className={style.square}></div>
                        <div className={style.square}></div>
                        <div className={style.square}></div>
                    </div>
                    <div className={style.reflection}>
                        <div className={`${style.squares} ${style.squares_2}`}>
                            <div className={style.square}></div>
                            <div className={style.square}></div>
                            <div className={style.square}></div>
                            <div className={style.square}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoadingComponent;
