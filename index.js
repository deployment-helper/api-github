require("dotenv").config();
const Github = require("./src/github");

exports.mcrc_repo_github = function(req, resp) {
  const github = new Github(req.body.access_token);
  const respJson = JSON.parse(JSON.stringify(message_format));
  const method = req.method;
  try {
    switch (method) {
      case "POST":
        if (req.body.repo_name) {
          github
            .create_repo(req.body.repo_name)
            .then(data => {
              respJson.body = createSuccessResp("Repo created", data);
              resp.send(respJson); 
            })
            .catch(err => {
                console.log("CATCH CALLLING"); 
              throw err.errors[0];
            });
        } else {
          throw new Error("repo_name required");
        }
        break;
      case "DELETE":
        if (req.body.user_name && req.body.repo_name) {
          github
            .delete_repo(req.body.user_name, req.body.repo_name)
            .then(data => {
              respJson.body = createSuccessResp("Repo deleted", data);
              resp.send(respJson);
            })
            .catch(err => {
              throw err.errors[0];
            });
        } else {
          throw new Error("user_name and repo_name required");
        }
        break;
      default:
        throw new Error("Method not supported");
    }
  } catch (error) {
    console.log("#############################################");
    console.log(error);
    respJson.body = createErrResp("Error", error);
    resp.send(respJson);
  }
};

const message_format = {
  statusCode: 200,
  isBase64Encoded: false,
  body: {
    status: "",
    message: "",
    data: {},
    error: null
  }
};

function createSuccessResp(message, data) {
  let resp_body = {};
  (resp_body.status = "OK"), (resp_body.message = message);
  resp_body.data = data;
  return resp_body;
}

function createErrResp(message, err) {
  let resp_body = {};
  (resp_body.status = "FAIL"), (resp_body.message = message);
  resp_body.err = err;
  return resp_body;
}
