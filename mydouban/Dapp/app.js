const express = require("express");
const mysql = require("mysql");
// const session = require("express-session");
const bodyParser = require("body-parser")
const cors = require("cors");
var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "hugh",
});
var app = express();
app.use(cors({
    origin: ["http://127.0.0.1:8080",
        "http://localhost:8080",
        "http://192.168.1.4:8080"
    ],
    credentials: true
}));
app.use(express.static("public"));
app.listen(3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//功能1：登录
app.get('/login', (req, res) => {
    var u = req.query.uname;
    var p = req.query.upwd;
    var sql = "SELECT nid FROM hugh_login WHERE uname=? AND upwd=md5(?)";
    pool.query(sql, [u, p], (err, result) => {
        if (err) throw err;
        console.log(result);
        if (result.length == 0) {
            res.send({ code: -1, msg: "用户名或密码有误" })
        } else {
            res.send({ code: 1, msg: "登录成功" });
        }
    })
})
//功能2，注册
app.post('/appReg',(req,res)=>{
    var uname=req.body.uname;
    var upwd=req.body.upwd;
    console.log(uname);
    console.log(upwd);
    var sql="INSERT INTO hugh_login VALUES(?,?,md5(?))";
    pool.query(sql,[null,uname,upwd],(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result,msg:"注册成功"});
    })
});
// 3 精品课程
app.get('/appClass',(req,res)=>{
    var msg=req.query.heade_msg;
    var sql="SELECT heade_msg FROM hugh_tk";
    pool.query(sql,msg,(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result});
    })
});
// 4 nav课程
app.get('/navclass',(req,res)=>{
    var sql="SELECT heade_msg,img_url FROM hugh_class";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result})
    })
});
// 5 师资力量
app.get('/navsznl',(req,res)=>{
    var sql="SELECT heade_msg,img_url FROM hugh_sznl";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result})
    })

});
//6 训练中心
app.get('/dslian',(req,res)=>{
    var sql="SELECT img_url,xl_msg,xl_jixun FROM hugh_jixun";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result});
    })
});
// 教师团队
app.get('/jstd',(req,res)=>{
    var sql="SELECT img_url,msg,jname FROM hugh_jstd";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result});
    })
});
//学子合影
app.get('/xzhy',(req,res)=>{
    let sql="SELECT img_url FROM hugh_xzhy";
    pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send({code:1,data:result});
    })
});
// 热点关注
app.get('/Rdgz',(req,res)=>{
    var sql="SELECT guanzhu_msg FROM hugh_guanzhu";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result});
    });
});
// 轮播图
app.get('/Lunbo',(req,res)=>{
    var sql="SELECT img_url FROM hugh_lunbo";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result});
    });
});
// 年级
app.get('/Nianji',(req,res)=>{
    var sql="SELECT ban_msg FROM hugh_ban";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result});
    });
});
// 老师详情
app.get('/teaches',(req,res)=>{
    var sql="SELECT img_url,tname,tys,msg,tln FROM hugh_teache";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result});
    });
});





