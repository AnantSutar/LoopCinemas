import axios from "axios";

// --- Constants -------------localhost---------------------------------------------------------------------
const API_HOST = "http://localhost:4001";
const USER_KEY = "user";

// --- Users ---------------------------------------------------------------------------------------
async function verifyUser(username, password) {
  const response = await axios.get(API_HOST + "/api/users/login", {
    params: { username, password },
  });
  const user = response.data;
  console.log(response.data);

  // NOTE: In this example the login is also persistent as it is stored in local storage.
  if (user !== null) setUser(user);

  return user;
}

async function findUser(id) {
  const response = await axios.get(API_HOST + `/api/users/select/${id}`);

  return response.data;
}

async function createUser(user) {
  const response = await axios.post(API_HOST + "/api/users", user);

  return response.data;
}

async function updateUser(user) {
  const id = user.username;
  const response = await axios.put(API_HOST + `/api/users/select/${id}`, user);

  return response.data;
}

async function deleteUser(user) {
  const id = user.username;
  console.log(id);
  const response = await axios
    .delete(API_HOST + `/api/users/select/${id}`, user)
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
  console.log(response);
  return response.data;
}

// --- Post ---------------------------------------------------------------------------------------
async function getPosts(movie) {
  console.log(movie);
  const response = await axios.get(API_HOST + `/api/reviews/select/${movie}`);
  return response.data;
}

async function createPost(post) {
  const response = await axios.post(API_HOST + "/api/reviews", post);
  console.log(post);
  return response.data;
}

async function updatePost(post) {
  console.log(post);
  const post_id = post.post_id;
  const response = await axios.put(
    API_HOST + `/api/reviews/select/${post_id}`,
    post
  );
  console.log(post);
  return response.data;
}

async function deletePost(post_id) {
  console.log(post_id);
  const response = await axios
    .delete(API_HOST + `/api/reviews/select/${post_id}`)
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
  console.log(response);
  return response.data;
}
// --- Movies ---------------------------------------------------------------------------------------
async function getMovies() {
  const response = await axios.get(API_HOST + "/api/movies");

  return response.data;
}

async function getSingleMovies(movieTitle) {
  const response = await axios.get(
    API_HOST + `/api/movies/select/${movieTitle}`
  );
  return response.data;
}

// --- Sessions and Tickets---------------------------------------------------------------------------------------

async function getBooking(movieTitle, movietime) {
  const response = await axios.get(API_HOST + `/api/session/moviesession`, {
    params: { movieTitle, movietime },
  });
  // const response = await axios.get(API_HOST + "/api/users/login", {
  //   params: { username, password },
  // });
  return response.data;
}

// async function updateBooking(movieTitle, movietime, numtickets) {
//   const response = await axios.put(
//     API_HOST + `/api/session/select/moviesession`,
//     {
//       params: { movieTitle, movietime, numtickets },
//     }
//   );

async function updateBooking(newTicket) {
  const id = newTicket.moviesessionid;
  const response = await axios.put(
    API_HOST + `/api/session/moviesession/${id}`,
    newTicket
  );
  // const response = await axios.get(API_HOST + "/api/users/login", {
  //   params: { username, password },
  // });

  return response.data;
}

async function createTicket(ticket) {
  const response = await axios.post(API_HOST + `/api/ticket`, ticket);
  // const response = await axios.get(API_HOST + "/api/users/login", {
  //   params: { username, password },
  // });

  return response.data;
}
async function getTicketInfo(username) {
  const response = await axios.get(API_HOST + `/api/ticket/select/${username}`);
  // const response = await axios.get(API_HOST + "/api/users/login", {
  //   params: { username, password },
  // });

  return response.data;
}
// --- Helper functions to interact with local storage --------------------------------------------
function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY));
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

export {
  getSingleMovies,
  getMovies,
  verifyUser,
  findUser,
  createUser,
  getPosts,
  createPost,
  getUser,
  removeUser,
  updateUser,
  deleteUser,
  setUser,
  updatePost,
  getBooking,
  updateBooking,
  createTicket,
  getTicketInfo,
  deletePost,
};
