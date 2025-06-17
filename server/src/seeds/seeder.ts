import FollowingsModel from '@/models/FollowingsModel';
import PostLikesModel from '@/models/PostLikesModel';
import PersonsModel from '@/models/PersonsModel';
import PostStatsModel from '@/models/PostStatsModel';
import PostsModel from '@/models/PostsModel';
import { person_data } from '@/utils/data/dummy-data';
import _ from 'colors';

async function main() {
  /* DELETE ALL THE DATA THAT IS PRESENT IN DATABASE */
  await FollowingsModel.query().delete();
  await PostLikesModel.query().delete();
  await PostStatsModel.query().delete();
  await PostsModel.query().delete();
  await PersonsModel.query().delete();

  /* BEGIN: PERSON MODEL HANDLING */
  /* INSERT PERSON RECORDS */
  await PersonsModel.query().insert(person_data);
  /* END: PERSON MODEL HANDLING */

  // Additional seeding logic would be added here when fully migrated

  // eslint-disable-next-line no-console
  console.log('Seeding completed successfully!'.green);
  process.exit(0);
}

main().catch(error => {
  // eslint-disable-next-line no-console
  console.error('Seeding failed:'.red, error);
  process.exit(1);
});

export default main;
