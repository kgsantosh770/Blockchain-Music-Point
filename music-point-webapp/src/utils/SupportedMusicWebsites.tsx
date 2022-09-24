import { spotify } from "./ImagePaths"
export const supportedWebUrls = [
    {
        website: "spotify",
        imagePath: spotify,
        // eslint-disable-next-line
        regularExpression: "/^(spotify:|https://[a-z]+\.spotify\.com/)/",
    }
]