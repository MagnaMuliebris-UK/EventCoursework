class itemPost
{
    postID = 0; //doesn't exist. Will be removed upon saving

    //placeholder item. Must be replaced with actual item info when making.
    relatedItem = new item(0, null, null); 
    
    poster = null; //Link to poster's account. EXCLUDE THE PASSWORD SOMEHOW?
    constructor(newItem){
        this.relatedItem = newItem;
        this.postID = IDmaker();
    }
}
let posts = new Array();

//note: ...Place is a placeholder for where the posts are being stored. 
//May be local storage, may be a database, may be something else entirely.
//Considering JSON files. Will consider during meeting.
function getPostsFromPlace(posts_)
{
    posts = posts_;
    //In reality, posts_ isn't passed, and instead, 
    //the posts are pulled from wherever they are being stored.
}

function IDmaker(){
    lastID= posts.pop();
    posts.unshift(lastID);
    return lastID+1;
}