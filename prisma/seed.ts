import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const avatars = [
    {
      id: 111,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/curly-hair-man-with-vr-9606843-7759131.png?f=webp',
      isPremium: false,
      diamond: null,
    },
    {
      id: 112,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/curly-hair-man-9606398-7766943.png?f=webp',
      isPremium: false,
      diamond: 25,
    },
    {
      id: 113,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/bald-hair-man-with-vr-9606391-7766936.png?f=webp',
      isPremium: false,
      diamond: null,
    },
    {
      id: 114,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/bald-hair-man-with-beanie-hat-9606385-7766930.png?f=webp',
      isPremium: false,
      diamond: null,
    },
    {
      id: 115,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/woman-wearing-hijab-9606853-7759141.png?f=webp',
      isPremium: false,
      diamond: 28,
    },
    {
      id: 116,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/woman-wearing-hijab-9606847-7759135.png?f=webp',
      isPremium: false,
      diamond: 26,
    },
    {
      id: 117,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/dreadlocked-man-9606395-7766940.png?f=webp',
      isPremium: false,
      diamond: 40,
    },
    {
      id: 118,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/short-hair-man-with-bucket-hat-9606384-7766929.png?f=webp',
      isPremium: false,
      diamond: 35,
    },
    {
      id: 119,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDDmiVTnO-q6o7cyUX-heAOkwujoITTsmkACrn6pWCHjErlrGWUYbjm9KijC5XABr1cbw&usqp=CAU',
      isPremium: false,
      diamond: 32,
    },
    {
      id: 120,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnQHMerhHDL_bNgCCHoyHf5d7maNVrXaIFD3Oc-p6gJ2m5T7WgfnjKqsmX1PTX4fhEhxk&usqp=CAU',
      isPremium: false,
      diamond: 10,
    },
    {
      id: 121,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/mohawk-hair-man-9606858-7759146.png',
      isPremium: false,
      diamond: 33,
    },
    {
      id: 122,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/short-hair-woman-with-vr-9606837-7759125.png?f=webp',
      isPremium: false,
      diamond: null,
    },
  ];

  const diamondPackages = [
    {
      id: 221,
      image:
        'https://png.pngtree.com/png-clipart/20220822/ourmid/pngtree-game-gems-bag-ui-icon-png-png-image_6120206.png',
      price: 20000,
      quantity: 100,
    },
    {
      id: 222,
      image:
        'https://previews.123rf.com/images/emojiimage/emojiimage1802/emojiimage180200329/95468322-large-brown-bag-full-of-valuable-stones-diamonds-sapphires-and-rubies-cartoon-gemstones-flat-vector.jpg',
      price: 37000,
      quantity: 200,
    },
    {
      id: 223,
      image:
        'https://st2.depositphotos.com/4155807/6227/v/950/depositphotos_62271937-stock-illustration-bag-with-gems.jpg',
      price: 69000,
      quantity: 500,
    },
    {
      id: 224,
      image: 'https://img.freepik.com/premium-vector/vector_863384-155.jpg',
      price: 135000,
      quantity: 1000,
    },
    {
      id: 225,
      image:
        'https://thumbs.dreamstime.com/b/cloth-fabric-money-bag-full-various-diamonds-sack-gems-game-interface-elements-donation-microtransacton-vector-107785049.jpg',
      price: 250000,
      quantity: 500,
    },
    {
      id: 226,
      image:
        'https://previews.123rf.com/images/lilu330/lilu3301504/lilu330150400080/41680969-cartoon-wooden-chest-with-diamonds.jpg',
      price: 516000,
      quantity: 10000,
    },
  ]
  const questions = [
    {
      id: 331,
      content: "Apa ibu kota Prancis?",
      maxScore: 100,
      timer: 30,
      answers: [
        { content: "Paris", isCorrect: true },
        { content: "London", isCorrect: false },
        { content: "Berlin", isCorrect: false }
      ]
    },
    {
      id: 332,
      content: "Negara manakah yang dikenal dengan sebutan 'Negeri Sakura'?",
      maxScore: 100,
      timer: 30,
      answers: [
        { content: "Jepang", isCorrect: true },
        { content: "Cina", isCorrect: false },
        { content: "Korea Selatan", isCorrect: false }
      ]
    },
    {
      id: 333,
      content: "Gunung tertinggi di dunia adalah?",
      maxScore: 100,
      timer: 30,
      answers: [
        { content: "Everest", isCorrect: true },
        { content: "Kilimanjaro", isCorrect: false },
        { content: "Fuji", isCorrect: false }
      ]
    },
    {
      id: 334,
      content: "Apa nama laut yang menghubungkan Eropa dan Afrika?",
      maxScore: 100,
      timer: 30,
      answers: [
        { content: "Laut Mediterania", isCorrect: true },
        { content: "Laut Karibia", isCorrect: false },
        { content: "Laut Kaspia", isCorrect: false }
      ]
    },
    {
      id: 335,
      content: "Ibukota Australia adalah?",
      maxScore: 100,
      timer: 30,
      answers: [
        { content: "Canberra", isCorrect: true },
        { content: "Sydney", isCorrect: false },
        { content: "Melbourne", isCorrect: false }
      ]
    },
    {
      id: 336,
      content: "Negara manakah yang memiliki piramida terbesar?",
      maxScore: 100,
      timer: 30,
      answers: [
        { content: "Mesir", isCorrect: true },
        { content: "Meksiko", isCorrect: false },
        { content: "Peru", isCorrect: false }
      ]
    },
    {
      id: 337,
      content: "Siapa penulis novel 'Harry Potter'?",
      maxScore: 100,
      timer: 30,
      answers: [
        { content: "J.K. Rowling", isCorrect: true },
        { content: "J.R.R. Tolkien", isCorrect: false },
        { content: "George R.R. Martin", isCorrect: false }
      ]
    },
    {
      id: 338,
      content: "Apa nama sungai terpanjang di dunia?",
      maxScore: 100,
      timer: 30,
      answers: [
        { content: "Nil", isCorrect: true },
        { content: "Amazon", isCorrect: false },
        { content: "Yangtze", isCorrect: false }
      ]
    },
    {
      id: 339,
      content: "Apa nama pulau terbesar di dunia?",
      maxScore: 100,
      timer: 30,
      answers: [
        { content: "Greenland", isCorrect: true },
        { content: "New Guinea", isCorrect: false },
        { content: "Borneo", isCorrect: false }
      ]
    },
    {
      id: 400,
      content: "Apa nama bangunan tertinggi di dunia saat ini?",
      maxScore: 100,
      timer: 30,
      answers: [
        { content: "Burj Khalifa", isCorrect: true },
        { content: "Shanghai Tower", isCorrect: false },
        { content: "Abraj Al-Bait", isCorrect: false }
      ]
    }
  ];

  for (const avatar of avatars) {
    await prisma.avatar.create({
      data: avatar,
    });
  }

  for (const diamondPackage of diamondPackages) {
    await prisma.diamondPackage.create({
      data: diamondPackage,
    });
  }

  for (const question of questions) {
    await prisma.question.create({
      data: {
        content: question.content,
        maxScore: question.maxScore,
        timer: question.timer,
        answer: {
          create: question.answers
        }
      }
    });
  }

  console.log('Seed data has been added.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
