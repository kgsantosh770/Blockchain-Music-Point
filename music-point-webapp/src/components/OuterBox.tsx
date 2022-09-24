import { ReactNode } from "react";
import "../scss/components/OuterBox.scss"
import { loadingAnimatedIcon } from "../utils/ImagePaths";
import { useWalletContext } from "../WalletContext"

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
    const { isConnected } = useWalletContext();

    const getDefaultMsg = () => {
        return isConnected ? props.defaultBoxMsg : "Please connect your blockchain wallet"
    }
    
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
                        {getDefaultMsg()}
                    </div> :
                    props.children
            }
        </div>
    )
}

OuterBox.defaultProps = defaultProps;