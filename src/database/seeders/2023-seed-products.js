'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Define the data to be inserted
    const data = [
      {
        name: 'The Tyrion All Set',
        price: 149.99,
        quantity: 3,
        description:
          'The Tyrion all set is a combo of the finest of the tyrion products coming in different colour. Comes with its exclusivity from the collection',
        size: 'L'
      },

      {
        name: 'The All Black Hoodie',
        price: 112.99,
        quantity: 4,
        description:
          'The Tyrion all black hoodie is an all cotton piece highlighted with an applique logo. It serves the warmth and comfort for it users',
        size: 'L'
      },
      {
        name: 'The Mixed Feeling Snap Back',
        price: 95.99,
        quantity: 5,
        description:
          'The Tyrion Mixed feeling Snap Back gives off two varieties of emotion due to its 2way colour design. It is rare one among its collection due to its uniqueness',
        size: 'M'
      },
      {
        name: 'The Tyrion Snap Back',
        price: 79.99,
        quantity: 10,
        description:
          ' The Tyrion Snap Back is an all cotton piece highlighted with an applique logo. It is finely straightened so it gives off the vibe. It comes in different sizes applicable to the interest of its owner',
        size: 'S'
      },
      {
        name: 'The Tyrion Snow-White Hoodie',
        price: 109.99,
        quantity: 5,
        description:
          'The Tyrion Snow-White Hoodie is an all cotton piece highlighted with an applique logo. It is finely crafted so it can cater for the warmth needs of its owner. It comes in different sizes applicable to the interest of its owner',
        size: 'XL'
      },
      {
        name: 'The Tyrion Trucker',
        price: 59.99,
        quantity: 8,
        description:
          'The Tyrion Trucker is an all cotton piece highlighted with an applique logo on the fore of the trucker. Able to be adjusted comfortably to different sizes from the back. It comes in different colours applicable to individual interest',
        size: 'L'
      }
    ];

    // Insert the data into the table
    await queryInterface.bulkInsert('products', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the inserted data from the table
    await queryInterface.bulkDelete('products', null, {});
  }
};
