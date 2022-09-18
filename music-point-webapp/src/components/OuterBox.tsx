import { ReactNode } from "react";
import "../scss/components/OuterBox.scss"

interface Props {
    additionalClass?: string,
    children?: ReactNode | ReactNode[]
}

const defaultProps = {
    additionalClass: ""
}

export default function OuterBox(props : Props) {
    return (
        <div className={`outer-box ${props.additionalClass}`}>
            {props.children}
        </div>
    )
}

OuterBox.defaultProps = defaultProps;