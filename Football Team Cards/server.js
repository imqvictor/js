const http = require("http");

const token = "icaSv3pjswAzHNxUwVGYEDvqJGdNhq4LM50uGJf9HqO80ehnWjPOyPyMcPan";

const server = http.createServer(async (req, res) => {

    //fetch leagues from SportMonks API and return to client 
    if (req.url === "/api/leagues") {

        const response = await fetch(
            `https://api.sportmonks.com/v3/football/leagues?api_token=${token}`
        );

        const data = await response.json();

        res.writeHead(200, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        });

        res.end(JSON.stringify(data));
        return;
    }


    //fetch teams from SportMonks API and return to client
    if (req.url === "/api/teams") {
        const response = await fetch(
            `https://api.sportmonks.com/v3/football/teams?api_token=${token}&per_page=50&page=1`
        );

        const data = await response.json();

        res.writeHead(200, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        });

        res.end(JSON.stringify(data));
        return;
    }

    if (req.url === "/api/teams/53") {
        const response = await fetch(
            `https://api.sportmonks.com/v3/football/teams/53?api_token=${token}&include=country;venue;players;coaches;trophies;latest;upcoming`
        );

        const data = await response.json();

        res.writeHead(response.status, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        });

        res.end(JSON.stringify(data));
        return;
    }

    res.writeHead(404);
    res.end("Not found");

});


server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});


