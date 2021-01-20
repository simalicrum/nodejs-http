const http = require("http");
const fs = require("fs");

const pathList = ["./index.html", "./about.html", "./contact-me.html"];

const parsePathname = (pathname) => {
  if (RegExp(/\S*(.html)/).test(pathname)) {
    return pathname;
  }
  if (pathname === "/") {
    return "/index.html";
  }
  return pathname + ".html";
};

const routePath = (pathname, pathList) => {
  const pathFound = pathList.find((element) => element === "." + pathname);
  if (pathFound === undefined) {
    return "./404.html";
  }
  return pathFound;
};

http
  .createServer((request, response) => {
    let filePath = routePath(parsePathname(request.url), pathList);
    fs.readFile(filePath, (error, data) => {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(data);
    });
  })
  .listen(8080);
