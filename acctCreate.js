class Account
{
    accName = "";
    passWord = "";
    constructor(accName_)
    {
        this.accName = accName_;
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
    //Needs looked At Later
    if((typeof passWord == String)&&(passWord))
    {}
    return ;
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