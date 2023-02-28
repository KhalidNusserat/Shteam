export const imageFromPath = async (path: string) => {
    const response = await fetch(path);
    return await response.blob();
}

export type GameData = {
    name: string,
    price: number,
    description: string,
    image: string | undefined
}