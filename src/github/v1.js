const Octokit = require("@octokit/rest");

class Github {
  constructor(access_token) {
    this.octokit = new Octokit({
      auth: access_token
    });
  }
  create_repo(repo_name, is_private) {
    return new Promise((resolve, reject) => {
      try {
        console.log("OUTGOING REQ START");
        this.octokit.repos
          .createForAuthenticatedUser({
            name: repo_name,
            private: is_private
          })
          .then(resp => {
            console.log("OUTGOING REQ END");
            resolve(resp);
          })
          .catch(err => {
            console.log("OUTGOING REQ END WITH ERROR");
            console.log(err.errors[0]);
            reject(err);
          });
      } catch (error) {
        console.log(error);
        console.log("OUTGOING REQ ERROR REJECTED");
        reject(error);
      }
    });
  }
  delete_repo(user_name, repo_name) {
    return new Promise((resolve, reject) => {
      try {
        this.octokit.repos
          .delete({
            owner: user_name,
            repo: repo_name
          })
          .then(data => {
            resolve(data);
          })
          .catch(err => {
            console.log(err);
            throw err;
          });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
}

module.exports = Github;
