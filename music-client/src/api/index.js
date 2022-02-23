import Axios from "axios";
import {get,post} from "./http";

//============歌手相关================
//查询歌手
export const getAllSinger =() => get(`singer/allSinger`);
//根据性别查询歌手
export const getSingerOfSex = (sex) => get(`singer/singerOfSex?sex=${sex}`);


//============歌曲相关================
//根据歌手id查询歌曲
export const songOfSingerId =(id) => get(`song/singer/detail?singerId=${id}`);
//根据歌曲id查询歌曲对象(带时间)
export const songOfSongId2 =(id) => get(`song/detail2?songId=${id}`);
//根据歌曲id查询歌曲对象
export const songOfSongId =(id) => get(`song/detail?songId=${id}`);
//根据歌名模糊查询歌曲
export const likeSongOfName =(keywords) => get(`song/likeSongOfName?songName=${keywords}`);
//查询所有歌曲
export const getAllSong =() => get(`song/allSong`);
//展示播放量前十的歌曲
export const getTopSong =() => get(`song/getTopSong`);
//获取歌曲时长
export const getmusicTime =(url) => get(`song/musicTime?url=${url}`);


//============歌单相关================
//查询歌单
export const getAllSongList =() => get(`songList/allSongList`);
//返回标题包含文字的歌单列表
export const getSongListOfLikeTitle = (keywords) => get(`songList/likeTitle?title=${keywords}`);
//根据风格模糊查询歌单列表
export const getSongListOfLikeStyle = (style) => get(`songList/likeStyle?style=${style}`);


//============歌单的歌曲相关============
//根据歌单id查询歌曲列表
export const listSongDetail = (songListId) => get(`listSong/detail?songListId=${songListId}`);

//============用户相关================
//查询用户
export const getAllConsumer =() => get(`user/allUser`);
//注册
export const SignUp =(params) => post(`/user/add`,params);
//登录
export const loginIn =(params) => post(`/user/login`,params);
//根据用户id查询该用户的详细信息
export const getUserOfId =(id) => get(`/user/selectByPrimaryKey?id=${id}`);
//更新用户信息
export const updateUserMsg =(params) => post(`/user/update`,params);

//下载音乐
export const download = (url)  => Axios({
    method: 'get',
    url: url,
    responseType: 'blob'
});


//===========播放量======================
//增加播放量
export const setAddPlay =(params) => post(`/playVolume/Test`,params);
//查询用户某一首歌的播放量
export const getNumPlay = (playId) => get(`/playVolume/NumPlay?playId=${playId}`);
//查询某一首歌的总播放量
export const getNumPlayOfSong = (songId) => get(`/playVolume/NumPlayOfSong?songId=${songId}`);


//===========搜索量======================
//增加搜索量
export const setAddSearch =(params) => post(`/songSearch/Test`,params);

//===========评价======================
//提交评分
export const setGrade =(params) => post(`/grade/add`,params);
//获取指定歌单的平均分
export const getGradeOfSongListId = (songListId) => get(`/grade?songListId=${songListId}`);

//===========评论======================
//提交评论
export const setComment =(params) => post(`/comment/add`,params);
//点赞
export const setLike =(params) => post(`/comment/like`,params);
//返回当前歌单或歌曲的评论列表
export const getAllComment = (type,id) => {
    if(type == 0){              //歌曲
        return get(`/comment/commentOfSongId?songId=${id}`);
    }else{                      //歌单
        return get(`/comment/commentOfSongListId?songListId=${id}`);
    }
}

//===============收藏===================
//新增收藏
export const setCollect =(params) => post(`/collect/add`,params);
//取消收藏
export const deteleCollect = (userId,songId,songListId) => get(`collect/delete?userId=${userId}&songId=${songId}&songListId=${songListId}`);
//指定用户的收藏列表
export const getCollectOfUserId = (userId) => get(`/collect/collectOfUserId?userId=${userId}`);
//查询用户收藏中歌手
export const getCollectOfSinger = (userId) => get(`collect/collectOfSinger?userId=${userId}`);

//===============推荐===================
//根据用户id来推荐歌曲
export const SongOfUserTJ =(userid)=> get(`song/SongOfUserTJ?userid=${userid}`);
//更新相似度评分
export const setDegree =(params) => post(`/degree/update`,params);
export const setDegree2 =(params) => post(`/degree/update2`,params);