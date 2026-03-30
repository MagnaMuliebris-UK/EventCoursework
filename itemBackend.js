//IDK where this should go yet, may be shifted yet to another file
class item{
    itemID =0;//doesn't exist. Will be removed upon saving
    itemName = "";
    itemDesc = "";
    itemImage = "";
    constructor(item_Name, item_Desc, item_Image = false){
        this.itemID = IDmaker();
        this.itemName = item_Name;
        this.itemDesc = item_Desc;
        this.itemImage = item_Image;
    }
}
let items = new Array();

//note: ...Place is a placeholder for where the items are being stored. 
//May be local storage, may be a database, may be something else entirely.
//Considering JSON files. Will consider during meeting.
//DOUBLY NOTE: Should probably be stored completely separate from posts.
function getItemsFromPlace(items_)
{
    items = items_;
    //In reality, items_ isn't passed, and instead, 
    //the items are pulled from wherever they are being stored.
}

function IDmaker(){
    lastID= items.pop();
    items.unshift(lastID);
    return lastID+1;
}

//Should be able to post after a decent bit of info is entered
function postItem(itemInfo, image){
    let itemID = IDmaker();
    //if image has a value, it will allow the file to be entered.
    //if we can't figure this out, no problem! 
    if(image)
    {

    }
    
    items.push()
}

function bookmarkItem(itemID){

}