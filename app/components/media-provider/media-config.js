angular.module("media-config", [])
    .constant("mediaConfig", [{
        name: "YouTube",
        regex: /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig,
        embedUrl: "https://www.youtube.com/embed/",
        searchUrl: "https://www.googleapis.com/youtube/v3/search?part=id,snippet&type=video&q=",
        key: "AIzaSyDTUo1rZ5yO1k4t6AmLFUKejSmlb3i5AGs"
    }/*,{
        name: "Instagram",
        regex: /https?:\/\/(?:[0-9A-Z-]+\.)?(?:instagram\/|instagram(?:-nocookie)?\.com\S*[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*!/ig,
        embedUrl: "https://www.instagram.com/p/BJN-7E5gr6U/embed/captioned/?v=",
        searchUrl: "",
        key: ""
    }*/]);

