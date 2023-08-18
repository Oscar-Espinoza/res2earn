import { SurveyType } from "../types/survey";
import { surveyImg, travelImg, summerImg } from "../assets";

export const contractAddress = "0x9008bE46938a105a922ABDeb49061d5CE71c5629";

export const quizTokenAddress: `0x${string}` =
  "0x9008be46938a105a922abdeb49061d5ce71c5629";

export const mainNetwork = { name: "goerli", id: 5 };

export const surveys: SurveyType[] = [
  {
    id: 6,
    title: "holiday destinations",
    image: travelImg,
    questions: [
      {
        text: "Which destination would you love for a summer vacation?",
        image: summerImg,
        lifetimeSeconds: 10,
        options: [{ text: "Maldives" }, { text: "Bali" }, { text: "Ibiza" }],
      },
      {
        text: "Where would you spend your winter holidays?",
        image: "PLACEHOLDER_FOR_WINTER_DESTINATION",
        lifetimeSeconds: 5,
        options: [
          { text: "Switzerland" },
          { text: "Canada" },
          { text: "Norway" },
        ],
      },
      {
        text: "Which city would you love to explore?",
        image: "PLACEHOLDER_FOR_CITY",
        lifetimeSeconds: 5,
        options: [{ text: "Tokyo" }, { text: "Paris" }, { text: "New York" }],
      },
    ],
  },
  {
    id: 7,
    title: "sports preferences",
    image: surveyImg,
    questions: [
      {
        text: "Which sport do you enjoy watching the most?",
        image: "PLACEHOLDER_FOR_SPORT_WATCHING_IMAGE",
        lifetimeSeconds: 10,
        options: [
          { text: "Football (Soccer)" },
          { text: "Basketball" },
          { text: "Tennis" },
        ],
      },
      {
        text: "Which outdoor activity do you love?",
        image: "PLACEHOLDER_FOR_OUTDOOR_ACTIVITY_IMAGE",
        lifetimeSeconds: 5,
        options: [
          { text: "Hiking" },
          { text: "Cycling" },
          { text: "Swimming" },
        ],
      },
      {
        text: "What's your favorite gym workout?",
        image: "PLACEHOLDER_FOR_GYM_WORKOUT_IMAGE",
        lifetimeSeconds: 5,
        options: [{ text: "Treadmill" }, { text: "Weights" }, { text: "Yoga" }],
      },
    ],
  },
  {
    id: 3,
    title: "music genres",
    image: surveyImg,
    questions: [
      {
        text: "Which music genre do you listen to the most?",
        image: "PLACEHOLDER_FOR_MUSIC_GENRE_IMAGE",
        lifetimeSeconds: 10,
        options: [{ text: "Pop" }, { text: "Rock" }, { text: "Classical" }],
      },
      {
        text: "Which type of concert would you attend?",
        image: "PLACEHOLDER_FOR_CONCERT_TYPE_IMAGE",
        lifetimeSeconds: 5,
        options: [
          { text: "Orchestra" },
          { text: "Electronic Music Festival" },
          { text: "Rock Band Concert" },
        ],
      },
      {
        text: "Which musical instrument fascinates you?",
        image: "PLACEHOLDER_FOR_MUSICAL_INSTRUMENT_IMAGE",
        lifetimeSeconds: 5,
        options: [{ text: "Guitar" }, { text: "Piano" }, { text: "Violin" }],
      },
    ],
  },
  {
    id: 4,
    title: "movie genres",
    image: surveyImg,
    questions: [
      {
        text: "What type of movies do you enjoy watching?",
        image: "PLACEHOLDER_FOR_MOVIE_TYPE_IMAGE",
        lifetimeSeconds: 10,
        options: [{ text: "Action" }, { text: "Romantic" }, { text: "Horror" }],
      },
      {
        text: "Who's your favorite movie character type?",
        image: "PLACEHOLDER_FOR_CHARACTER_TYPE_IMAGE",
        lifetimeSeconds: 5,
        options: [
          { text: "Superhero" },
          { text: "Villain" },
          { text: "Comic Sidekick" },
        ],
      },
      {
        text: "Which movie setting appeals to you?",
        image: "PLACEHOLDER_FOR_MOVIE_SETTING_IMAGE",
        lifetimeSeconds: 5,
        options: [
          { text: "Historical Era" },
          { text: "Futuristic World" },
          { text: "Fantasy Realm" },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "food preference",
    image: surveyImg,
    questions: [
      {
        text: "Which fruit do you prefer?",
        image: "https://www.example.com/path-to-image/fruits.jpg",
        lifetimeSeconds: 10,
        options: [{ text: "Apple" }, { text: "Banana" }, { text: "Cherry" }],
      },
      {
        text: "Which cuisine is your favorite?",
        image: "https://www.example.com/path-to-image/cuisine.jpg",
        lifetimeSeconds: 10,
        options: [
          { text: "Italian" },
          { text: "Chinese" },
          { text: "Mexican" },
        ],
      },
      {
        text: "Preferred type of dessert?",
        image: "https://www.example.com/path-to-image/desserts.jpg",
        lifetimeSeconds: 10,
        options: [{ text: "Cake" }, { text: "Ice Cream" }, { text: "Pie" }],
      },
    ],
  },
];
