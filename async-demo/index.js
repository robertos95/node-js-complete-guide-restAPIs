console.log("Before");
// getUser(1, (user) => {
//   console.log("User", user);
//   getRepositories(user.gitHubUsername, (repos) => {
//     getCommits(repo, (commits) => {
//       console.log(commits);
//     });
//   });
// });

// Promise-based approach
// getUser(1)
//   .then((user) => getRepositories(user.gitHubUsername))
//   .then((repos) => getCommits(repos))
//   .then((commits) => console.log("Commits", commits))
//   .catch((err) => console.log("Error", err.message));

// Async and await-approach
async function displayCommits() {
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUsername);
    const commits = await getCommits(repos);
    console.log(commits);
  } catch (err) {
    console.log("Error: ", err.message);
  }
}

console.log("After");

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a user from the database...");
      resolve({ id: id, gitHubUsername: "robertos95" });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling Github API...");
      resolve(["repo1", "repo2", "repo3"]);
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling Github API...");
      resolve(["commit"]);
    }, 2000);
  });
}
