// Michael Reilly, 10439198, CS-546A
// I pledge my honor that I have abided by the Stevens Honor System.

// Based on seed.js from lecture 6

const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const books = data.books;
const reviews = data.reviews;

async function main() {
  const db = await dbConnection();
  await db.dropDatabase();

  const shining = await books.createBook("The Shining", 
  {"authorFirstName": "Stephen", "authorLastName": "King"},
  ["Novel", "Horror fiction", "Gothic fiction", "Psychological horror", "Occult Fiction"],
  "1/28/1977",
  "Jack Torrance’s new job at the Overlook Hotel is the perfect chance for a fresh start. As the off-season caretaker at the atmospheric old hotel, he’ll have plenty of time to spend reconnecting with his family and working on his writing. But as the harsh winter weather sets in, the idyllic location feels ever more remote . . . and more sinister. And the only one to notice the strange and terrible forces gathering around the Overlook is Danny Torrance, a uniquely gifted five-year-old..");

  const shining_id = shining._id;
  await reviews.createReview("This book scared me to death!!",
  "scaredycat", 5, "10/7/2020",
  "This book was creepy!!! It had me at the edge of my seat.  One of Stephan King's best work!", shining_id);

  await reviews.createReview("Scary", "Baby", 4, "11/2/2019", "Scary book is scary", shining_id);

  const evelyn = await books.createBook("The Seven Husbands of Evelyn Hugo",
  {"authorFirstName": "Taylor", "authorLastName": "Jenkins Reid"},
  ["Novel", "Historical Fiction", "Romance"],
  "6/13/2017",
  "Evelyn Hugo Gets a biography written about her life before she dies.");

  const evelyn_id = evelyn._id;
  await reviews.createReview("Great storytelling", "me", 5, "1/1/2020", "Great Book.", evelyn_id);

  const vanishing = await books.createBook("The Vanishing Half",
  {"authorFirstName": "Brit", "authorLastName": "Bennett"},
  ["Novel", "Historical Fiction", "Drama"],
  "6/2/2020",
  "Two identical black twin sisters with completely different lives");

  const vanishing_id = vanishing._id;
  await reviews.createReview("Amazing work", "Muah", 5, "2/2/2021", "Phenomenal!", vanishing_id);




  console.log('Done seeding database');

  await db.serverConfig.close();
}

main();