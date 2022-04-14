const jsonServer = require("json-server");
const auth = require("json-server-auth");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// /!\ Bind the router db to the server
server.db = router.db;

server.use(auth);
server.use(jsonServer.bodyParser);
server.use(middlewares);

// Custom middleware to access POST methods.
// Can be customized for other HTTP method as well.
server.use((req, res, next) => {
  next();
  //   const body = req.body;
  //   console.log(req.path);
  //   if (req.path === "/login") {
  //     //res.json(body);
  //   } else {
  //     //Not a login request. Let db.json handle it
  //     next();
  //   }
});

server.use(router);

router.render = (req, res) => {
  res.json({
    body: res.locals.data,
  });
};

server.listen(3000, () => {
  console.log("JSON Server is running");
});
