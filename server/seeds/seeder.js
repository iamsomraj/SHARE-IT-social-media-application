const knex = require("../config/db-config.js");
const Following = require("../models/Following.js");
const Like = require("../models/Like.js");
const Person = require("../models/Person.js");
const Post = require("../models/Post.js");
const { person_data } = require("../utils/dummy-data.js");

async function main() {
  // Delete all data from the db.
  await Following.query().delete();
  await Like.query().delete();
  await Post.query().delete();
  await Person.query().delete();

  // Insert 3 person records to the database.
  const insertedPersons = await Person.query().insert(person_data);
  console.log("Inserted Person Records:", { insertedPersons });

  // Read all rows from the persons table.
  const personRecords = await Person.query();
  console.log("Fetched Person Records:", { personRecords });

  // Inserting Post for a Person
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
  console.log("Inserted Post", { insertedPost });

  // Inserting Like Records
  const likeRecords = await Like.query().insert([
    {
      master_id: insertedPost[0].id,
      owner_id: insertedPersons[0].id,
    },
    {
      master_id: insertedPost[0].id,
      owner_id: insertedPersons[1].id,
    },
  ]);
  console.log("Inserted Like", { likeRecord: likeRecords });

  // Inserting Following Records
  const followingRecords = await Following.query().insert([
    {
      follower_id: insertedPersons[0].id,
      followed_id: insertedPersons[1].id,
    },
    {
      follower_id: insertedPersons[0].id,
      followed_id: insertedPersons[2].id,
    },
    {
      follower_id: insertedPersons[1].id,
      followed_id: insertedPersons[2].id,
    },
  ]);
  console.log("Following Records:", followingRecords);
}

main()
  .then(() => knex.destroy())
  .catch((err) => {
    console.error(err);
    return knex.destroy();
  });
