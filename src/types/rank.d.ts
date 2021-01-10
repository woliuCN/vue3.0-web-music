/*
 * @Description:
 * @Autor: cn
 * @Date: 2020-12-26 14:03:32
 * @LastEditors: cn
 * @LastEditTime: 2020-12-26 14:08:57
 */

declare interface CommonRank {
    id: number;
    name: string;
    coverImgUrl: string;
    backgroundImgUrl: string;
    updateTime: string;
    playCount: string | number;
    songs: Song[];
}

declare interface SingerRank {
    coverImgUrl: string;
    backgroundImgUrl: string;
    updateTime: string;
    artists: Artist [];
}
