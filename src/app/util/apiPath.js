const BACKEND_HOST = import.meta.env.VITE_APP_BACKEND_ADDRESS
const IMAGE_BACKEND_HOST = import.meta.env.VITE_APP_BACKEND_IMAGE
const  base="http://"+BACKEND_HOST+"/api/v1/";
const imageService = "http://"+IMAGE_BACKEND_HOST+"/api/v1/"
const api={
    token:{
        url:base.concat("auth/refresh"),
        logout:base.concat("auth/logout")
    },
    article:{
        url:base.concat("article"),
        hubs:"/hubs",
        feed:"",
        comment:"/comment",
        answers:"/answers",
        find:"/find"
    },
    hubs:{
        url:base.concat("hubs"),
        fetch:"",
    },
    auth:{
        url:base.concat("auth"),
        signup:"/signup",
        signin:"/signin",
        logout:"/logout"
    },
    profile:{
        url:base.concat("profile"),
        logo:"/logo",
        articles:""

    },
    sandbox:{
        url :base.concat("sandbox"),
        find:"/find",
        create:"/template",
        part:"/part",
        clear:"/template",
        preview:"/preview",
        img:"/image",
        update:"/update",
        edit:"/edit",
        publish:""
    },
    search:{
        url :base.concat("search"),
        search:""
    },
    reactions:{
        url:base.concat("reaction"),
        check:"",
        reaction:""
    },
    subscription:{
        url:base.concat("subscription"),
    },
    bookmark:{
        url:base.concat("bookmarks"),
    },
    comment:{
        url:base.concat("comment"),
    },
    answers:{
        url:base.concat("answers"),
    },
    image:{
        url:base.concat("image"),
        search:"/search",
    },
    authors:{
        url:base.concat("authors"),
    },
    complaint:{
        url:base.concat("complaint"),
    },
    articles:{
        url:base.concat("admin"),
    },
    images:{
        url:imageService.concat("image"),
        list:"/list"
    }


    
   
   
}

export default api;