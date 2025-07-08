import jwt from 'jsonwebtoken';


const auth = (req,res,next)=>
    {
        const token=req.cookies.token;
        if(!token)
        {
            return res.status(401).json({ success: false, message: 'Unauthorized: No token' });
        }
        try{
                const decoded = jwt.verify(token, 'ArpanKheer');
                req.user = decoded; 
                next();
        }catch(error)
        {
            return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
        }
    } 


    export default auth;