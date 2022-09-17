import "../scss/components/Footer.scss"

export default function Footer() {
    return (
        <footer>
            <div className="footer-inner-div">
                <span className="about-me">
                    Hi! I am the developer of this application. I am currently open for blockchain jobs.
                    <a href="#portfolio" className="know-more">Know more about me</a>
                </span>
                <a className="hire-me-btn" href="#hire-me">
                    Hire me
                </a>
            </div>
        </footer>
    )
}