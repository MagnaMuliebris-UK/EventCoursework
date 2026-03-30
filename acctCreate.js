//Are we even able to hide the password? Can be seen on inspect element.
//We could encrypt the password? Discuss during meeting.
class Account
{
    accName = "";
    //CAN WE STORE ELSEWHERE?
    passWord = "";
    email = "";
    constructor(accName_, passWord_, email_)
    {
        this.accName = accName_;
        //No clue if we're doing this.
        passWord_ = ENCRYPTME(passWord_);
        this.passWord = passWord_;//Will need decrypted when logging in and saving.
        this.email = email_;
    }
}
let accounts = new Array();

function getAccountsFromPlace(accounts_)
{
    accounts = accounts_;
}

function accNameUnique(userName)
{
    if(accounts.includes(userName))
    {
        return false;
    }
    return true;
}

function goodEnoughPass(passWord)
{
    if((typeof passWord == String)&&(passWord.length >= 8)&&(passWord.match(/[A-Z]/))&&(passWord.match(/[a-z]/))&&(passWord.match(/[0-9]/)))
    {
        return true;
    }
    return false;
}

function acctCreate(uName, pass){
    if(accNameUnique(uName)&&goodEnoughPass(pass))
    {
        let acc = Account(uName, pass);
    }
    else
    {
        //error message?
    }
}