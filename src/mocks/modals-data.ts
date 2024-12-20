import { Modal } from '~/interfaces/enums';
import type { ModalsData } from '~/interfaces/modals-data';
import RouletteWheel from '~/assets/images/roulette-wheel.png';
import Innovator from '~/assets/images/innovator.png';
import Leaderboard from '~/assets/images/leaderboard.png';

export const modalsData: ModalsData = {
  [Modal.help]: {
    title: 'How to Play the Roulette Game:',
    text:
      'Start the Game: Press the "Spin" button to begin.\n' +
      'Watch the Wheel: The wheel will spin, displaying numbers from 0 to 36.\n' +
      'Result: Once the wheel stops, a random number between 0 and 36 will be selected.\n' +
      'Enjoy: Use the result for fun or as part of a larger game.',
    image: RouletteWheel
  },
  [Modal.credits]: {
    title: 'Credits',
    text:
      'This game was created by the Roman Kushyk.\n' +
      'Created using the Vue.js framework and the Pinia library.\n' +
      'Libraries: Nuxt.js, Vue.js, Pinia, and Pixi.js.\n' +
      'Tools: Webpack, ESLint, and Prettier.\n' +
      'Assets: all images used from open sources.',
    image: Innovator
  },
  [Modal.leaderboard]: {
    title: 'Leaderboard',
    text:
      'The leaderboard displays the top 10 players who have played the game.\n' +
      'Displays the player name and the number of games played.\n' +
      'Updates in real-time as players play the game.',
    image: Leaderboard
  }
};
