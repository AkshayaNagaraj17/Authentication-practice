//finstal jsonwebtoken
const express=require("express")
const app=express()
const path=require("path")
const JWT_SECRET="randomakshparis"
const jwt=require("jsonwebtoken")
app.use(express.json())
//with stores the users and tokens as well
const users=[]

//retrieving index.html in backend

app.get("/",function(req,res)
{
    res.sendFile(path.join(__dirname, './public/index.html'));
})

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
        const token=jwt.sign({  //encode the uname to jwt
            uname:uname
        },JWT_SECRET)
        //foundUser.token=token
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

function auth(req,res,next)
{
    const token=req.headers.token;
    const decode=jwt.verify(token,JWT_SECRET)
    if(decode.uname)
    {
        req.uname=decode.uname //passing the data to next route
        next()
    }
    else{
        res.json(
            {
                message:"You are not logged in"
            }
        )
    }
}

app.get("/me",auth,function(req,res)
{
   
    const uname=req.uname //retrieving the passed data
    const user=users.find(user=>user.uname=== uname)
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