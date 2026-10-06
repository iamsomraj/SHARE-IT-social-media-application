"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STORIES = exports.LIKES = exports.POSTS = exports.FOLLOWINGS = exports.PERSONS = exports.DEFAULT_PASSWORD = void 0;
exports.DEFAULT_PASSWORD = '123456';
exports.PERSONS = [
    { name: 'Sheldon Cooper', email: 'sheldon@example.com' },
    { name: 'Leonard Hofstadter', email: 'leonard@example.com' },
    { name: 'Penny', email: 'penny@example.com' },
    { name: 'Howard Wolowitz', email: 'howard@example.com' },
    { name: 'Rajesh Koothrappali', email: 'raj@example.com' },
    { name: 'Bernadette Rostenkowski', email: 'bernadette@example.com' },
    { name: 'Amy Farrah Fowler', email: 'amy@example.com' },
];
/** `[follower, followed]` pairs, as indexes into `PERSONS`. */
exports.FOLLOWINGS = [
    [0, 1],
    [0, 2],
    [1, 2],
    [1, 0],
    [2, 0],
    [2, 1],
];
/** `author` is an index into `PERSONS`. */
exports.POSTS = [
    {
        author: 0,
        content: 'Scissors cuts paper, paper covers rock, rock crushes lizard, lizard poisons Spock, Spock smashes scissors, scissors decapitates lizard, lizard eats paper, paper disproves Spock, Spock vaporizes rock, and as it always has, rock crushes scissors.',
    },
    {
        author: 0,
        content: "For the record, it could kill us to meet new people. They could be murderers or the carriers of unusual pathogens. And I'm not insane, my mother had me tested",
    },
    {
        author: 0,
        content: "Then it's settled. Amy's birthday present will be my genitals.",
    },
    {
        author: 1,
        content: 'Penny. We are made of particles that have existed since the moment the universe began. I like to think those atoms traveled fourteen billion years through time and space to create us, so that we could be together and make each other whole.',
    },
    {
        author: 1,
        content: "People get things they don't deserve all the time. Like me with you.",
    },
    {
        author: 1,
        content: "Penny, you don't want to get into it with Sheldon. The guy's one lab accident away from being a super villain.",
    },
    {
        author: 2,
        content: 'Yeah Sheldon, well your Ken can kiss my Barbie.',
    },
    {
        author: 2,
        content: 'All right, Howard Wolowitz, listen up! You sign anything she puts in front of you, because you are the luckiest man alive. If you let her go, there is no way you can find anyone else. Speaking on behalf of all women, it is not going to happen, we had a meeting.',
    },
    {
        author: 2,
        content: "No, mom. It's the same guy I've been going out with for the past two years. Yeah, the scientist. Well, it's complicated. He works with lasers and atomic magnets. No, I did not see it coming. No, we have not set a date. No, I am not pregnant. Yeah, this is a first for our family.",
    },
];
/** `[person, post]` pairs, as indexes into `PERSONS` and `POSTS`. */
exports.LIKES = [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
];
/** `[person, post]` pairs, as indexes into `PERSONS` and `POSTS`. */
exports.STORIES = [
    [1, 1],
    [2, 1],
];
//# sourceMappingURL=dummy-data.js.map