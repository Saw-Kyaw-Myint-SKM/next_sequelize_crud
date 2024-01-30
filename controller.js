const db = require("./db/models");

// Example query to retrieve all medium_users
const getAllMediumUsers = async () => {
  try {
    const allMediumUsers = await db.medium_users.findAll();
    return allMediumUsers;
  } catch (error) {
    throw error;
  }
};

// You can then use the getAllMediumUsers function to retrieve all medium_users

(async () => {
  try {
    const allMediumUsers = await getAllMediumUsers();
    console.log(JSON.stringify(allMediumUsers, null, 2));
  } catch (error) {
    console.error("Error fetching medium_users:", error);
  }
})();
