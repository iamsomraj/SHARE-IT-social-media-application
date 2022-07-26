const knex = require("../config/db-config.js");
const Following = require("../models/Following.js");
const Like = require("../models/Like.js");
const Person = require("../models/Person.js");
const Post = require("../models/Post.js");
const { person_data } = require("../utils/data/dummy-data.js");

async function main() {
  /* DELETE ALL THE DATA THAT IS PRESENT IN DATABASE */
  await Following.query().delete();
  await Like.query().delete();
  await Post.query().delete();
  await Person.query().delete();

  /* BEGIN: PERSON MODEL HANDLING */
  /* INSERT PERSON RECORDS */
  const insertedPersons = await Person.query().insert(person_data);
  /* END: PERSON MODEL HANDLING */

  /* BEGIN: POST MODEL HANDLING */
  /* INSERT POST RECORDS */
  const insertedPost = await Post.query().insert([
    {
      content: "dogs",
      owner_id: insertedPersons[0].id,
    },
    {
      content: "dogs and cats",
      owner_id: insertedPersons[0].id,
    },
    {
      content: "cats",
      owner_id: insertedPersons[1].id,
    },
    {
      content: "birds",
      owner_id: insertedPersons[2].id,
    },
  ]);
  /* END: POST MODEL HANDLING */

  /* BEGIN: LIKE MODEL HANDLING */
  /* INSERT LIKE RECORDS */
  await Like.query().insert([
    {
      master_id: insertedPost[0].id,
      owner_id: insertedPersons[2].id,
    },
    {
      master_id: insertedPost[0].id,
      owner_id: insertedPersons[1].id,
    },
  ]);
  /* END: LIKE MODEL HANDLING */
}

main()
  .then(() => knex.destroy())
  .catch((err) => {
    console.error(err);
    return knex.destroy();
  });
