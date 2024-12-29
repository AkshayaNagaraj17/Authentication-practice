const express=require("express")
const app=express()

app.use(express.json())
//with stores the users and tokens as well
const users=[]


app.post("/signup",function(req,res)
{
    const uname=req.body.uname
    const pword=req.body.pword
    //pushing the new users in users array
    users.push(
        {
            username:uname,
            password:pword
        }
    )
    req.json(
        {
            message:"You are signed up"
        }
    )
    console.log(users)
})


app.post("/sign-in",function(req,res)
{
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
})
app.listen(3005)