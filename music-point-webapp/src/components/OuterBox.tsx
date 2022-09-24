import { ReactNode } from "react";
import "../scss/components/OuterBox.scss"
import { loadingAnimatedIcon } from "../utils/ImagePaths";

interface Props {
    additionalClass?: string,
    children?: ReactNode | ReactNode[],
    boxTitle?: string,
    isContentLoading?: boolean,
    defaultBoxMsg?: string | null,
}

const defaultProps = {
    additionalClass: "",
    boxTitle: null,
    isContentLoading: false,
    defaultBoxMsg: null,
}

export default function OuterBox(props : Props) {
    return (
        <div className={`outer-box ${props.additionalClass}`}>
            {props.boxTitle && 
                <h1 className="text-white font-weight-bold">
                    {props.boxTitle}
                </h1>
            }
            {props.isContentLoading ?
                <img 
                    className='loading' 
                    src={loadingAnimatedIcon} 
                    alt="loading" 
                    title="loading" 
                /> :
                props.defaultBoxMsg ?
                    <div className='text-white mt-3 fst-italic'>
                        {props.defaultBoxMsg}
                    </div> :
                    props.children
            }
        </div>
    )
}

OuterBox.defaultProps = defaultProps;