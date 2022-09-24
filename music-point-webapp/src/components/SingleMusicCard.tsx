import "../scss/components/SingleMusicCard.scss";
import { spotify } from "../utils/ImagePaths";

interface Props {
    owner: string,
    musicUrl: string,
    timePosted: Date,
    isChain?: boolean,
}

const defaultProps = {
    isChain: false,
}

export default function SingleMusicCard(props: Props) {
    const getMonthName = (month: number) => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        return monthNames[month];
    }
    const formatDateTime = (date: Date) => {
        const currentYear = new Date().getFullYear()
        const day = date.getDate()
        const month = getMonthName(date.getMonth())
        const year = date.getFullYear()

        let formattedDate;
        if (year < currentYear) {
            formattedDate = month + " " + year
        } else {
            formattedDate = day + " " + month
        }

        return formattedDate
    }

    return (
        <div className="single-music-box">
            {props.isChain && <div className="time-line"></div>}
            <img className="music-web-logo" src={spotify} alt="block-number" />
            <div className="music-owner-url">
                <div className="music-owner bold d-block text-truncate">
                    {props.owner}
                </div>
                <a href={props.musicUrl} className="music-url text-white" target="blank">
                    {props.musicUrl}
                </a>
                <span className="time-posted">
                    {formatDateTime(props.timePosted)}
                </span>
            </div>
        </div>
    )
}

SingleMusicCard.defaultProps = defaultProps;