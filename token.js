const express=require("express")
const app=express()

app.use(express.json())
//with stores the users and tokens as well
const users=[]

function generateToken()
{
    let token=''
    let options=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','z','0','1','2','3','4','5','6','7','8','9']
    for(let i=0;i<32;i++)
    {
        token = token + options[Math.floor(Math.random() * options.length)];
    }
    return token
}
app.post("/signup",function(req,res)
{
    const uname=req.body.uname
    const pword=req.body.pword
    //pushing the new users in users array
    users.push(
        {
            uname:uname,
            pword:pword
        }
    )
    res.json(
        {
            message:"You are signed up"
        }
    )
    console.log(users)
})


app.post("/sign-in",function(req,res)

{
    const uname = req.body.uname;
    const pword = req.body.pword;
    let foundUser=null
    for(let i=0 ; i<users.length;i++)
    {
        if(users[i].uname===uname && users[i].pword===pword)
        {
            foundUser=users[i]
        }
    }
    if(foundUser)
    {
        const token=generateToken()
        foundUser.token=token
        res.json(
            {
                token:token
            }
        )
    }
    else
        {
            res.status(403).send
            {
                message:"Invalid user"
            }
        }
        console.log(users)
})



app.get("/me",function(req,res)
{
    const token=req.headers.token
    const user=users.find(user=>user.token===token)
    if(user)
    {
        res.json({
            yourName:user.uname
        })
    }
    else{
        res.status(401).send({
            message:"Unauthorized"
        })
    }
})


app.listen(3005)