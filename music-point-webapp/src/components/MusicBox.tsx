import "../scss/components/MusicBox.scss";

interface Props {
    owner: string,
    musicUrl: string,
}

const defaultProps: Props = {
    owner: 'test owner',
    musicUrl: 'dummy url'
}

export default function MusicBox(props: Props) {
    return (
        <div className="music-box">
            <div className="music-owner bold">
                {props.owner}
            </div>
            <div className="music-url">
                {props.musicUrl}
            </div>
        </div>
    )
}

MusicBox.defaultProps = defaultProps