export const IS_DEBUG = process.env.NODE_ENV === 'development';

export const rand = (num=0, min=0): number => Math.floor(Math.random() * (num)) + min;
export const random = <K extends any>(items: K[]):K  => items[rand(items.length)];
