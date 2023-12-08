import http from "http";

export const server = http.createServer((request, response) => {
  response.writeHead(200, {
    "Content-Type": "application/json",
  });
  response.end(
    JSON.stringify({
      data: "server is up!",
    }),
  );
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
