export const parser = new DOMParser();

export const getRandomNumberInRange = (rangeStart, rangeEnd) => {
    return rangeStart + Math.floor(rangeEnd * Math.random());
}

export const getRandomMagic8BallImg = () => {
    let number = getRandomNumberInRange(1, 20);
    return `img/magic/magic8ball_${number}.png`;
}