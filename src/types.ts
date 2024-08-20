export interface Image {
    id: string,
    alt_description: string,
    likes: number,
    urls: {
        small: string,
        regular: string,
    },
    user: { instagram_username: string },
}
