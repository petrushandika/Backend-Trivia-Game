import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const avatars = [
    {
      id: 5,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/curly-hair-man-with-vr-9606843-7759131.png?f=webp',
      diamond: 25,
      isPremium: false,
    },
    {
      id: 6,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/short-hair-man-with-bucket-hat-9606384-7766929.png?f=webp',
      diamond: 0,
      isPremium: false,
    },
    {
      id: 7,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/bald-hair-man-with-vr-9606391-7766936.png?f=webp',
      diamond: 25,
      isPremium: false,
    },
    {
      id: 8,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/bald-hair-man-with-beanie-hat-9606385-7766930.png?f=webp',
      diamond: 30,
      isPremium: false,
    },
    {
      id: 9,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/woman-wearing-hijab-9606853-7759141.png?f=webp',
      diamond: 0,
      isPremium: false,
    },
    {
      id: 10,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/woman-wearing-hijab-9606847-7759135.png?f=webp',
      diamond: 0,
      isPremium: false,
    },
    {
      id: 11,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/dreadlocked-man-9606395-7766940.png?f=webp',
      diamond: 25,
      isPremium: false,
    },
    {
      id: 12,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/curly-hair-man-9606398-7766943.png?f=webp',
      diamond: 0,
      isPremium: false,
    },
    {
      id: 13,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDDmiVTnO-q6o7cyUX-heAOkwujoITTsmkACrn6pWCHjErlrGWUYbjm9KijC5XABr1cbw&usqp=CAU',
      diamond: 0,
      isPremium: false,
    },
    {
      id: 14,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnQHMerhHDL_bNgCCHoyHf5d7maNVrXaIFD3Oc-p6gJ2m5T7WgfnjKqsmX1PTX4fhEhxk&usqp=CAU',
      diamond: 30,
      isPremium: false,
    },
    {
      id: 15,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/mohawk-hair-man-9606858-7759146.png',
      diamond: 0,
      isPremium: false,
    },
    {
      id: 16,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/short-hair-woman-with-vr-9606837-7759125.png?f=webp',
      price: 30,
      isPremium: false,
    },
    {
      id: 17,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2u8MNXCpBqfbMGscoq1LpuYxOcVR2f-BOWSLM4NgC6iIblh8oEuxE8eXgtCU24-ubY9w&usqp=CAU',
      price: 0,
      isPremium: false,
    },
  ];

  const diamondPackages = [
    {
      id: 221,
      image:
        'https://res.cloudinary.com/dv8vfur0m/image/upload/v1722826431/d2-removebg-preview_j8cgo0.png',
      price: 20000,
      quantity: 100,
    },
    {
      id: 222,
      image:
        'https://res.cloudinary.com/dv8vfur0m/image/upload/v1722826432/d4-removebg-preview_nhesta.png',
      price: 37000,
      quantity: 200,
    },
    {
      id: 223,
      image:
        'https://res.cloudinary.com/dv8vfur0m/image/upload/v1722826432/d5-removebg-preview_br1iwu.png',
      price: 69000,
      quantity: 500,
    },
    {
      id: 224,
      image:
        'https://res.cloudinary.com/dv8vfur0m/image/upload/v1722826432/d6-removebg-preview_i8kijx.png',
      price: 135000,
      quantity: 1000,
    },
    {
      id: 225,
      image:
        'https://res.cloudinary.com/dv8vfur0m/image/upload/v1722826432/d7-removebg-preview_idhc1f.png',
      price: 250000,
      quantity: 5000,
    },
    {
      id: 226,
      image:
        'https://res.cloudinary.com/dv8vfur0m/image/upload/v1722826432/d8-removebg-preview_relfdo.png',
      price: 516000,
      quantity: 10000,
    },
  ];
  const questions = [
    {
      id: 331,
      content: 'Apa ibu kota Prancis?',
      maxScore: 100,
      timer: 30,
      answers: [
        { content: 'Paris', isCorrect: true },
        { content: 'London', isCorrect: false },
        { content: 'Berlin', isCorrect: false },
        { content: 'Madrid', isCorrect: false },
      ],
    },
    {
      id: 332,
      content: "Negara manakah yang dikenal dengan sebutan 'Negeri Sakura'?",
      maxScore: 100,
      timer: 30,
      answers: [
        { content: 'Jepang', isCorrect: true },
        { content: 'Cina', isCorrect: false },
        { content: 'Korea Selatan', isCorrect: false },
        { content: 'Thailand', isCorrect: false },
      ],
    },
    {
      id: 333,
      content: 'Gunung tertinggi di dunia adalah?',
      maxScore: 100,
      timer: 30,
      answers: [
        { content: 'Everest', isCorrect: true },
        { content: 'Kilimanjaro', isCorrect: false },
        { content: 'Fuji', isCorrect: false },
        { content: 'Denali', isCorrect: false },
      ],
    },
    {
      id: 334,
      content: 'Apa nama laut yang menghubungkan Eropa dan Afrika?',
      maxScore: 100,
      timer: 30,
      answers: [
        { content: 'Laut Mediterania', isCorrect: true },
        { content: 'Laut Karibia', isCorrect: false },
        { content: 'Laut Kaspia', isCorrect: false },
        { content: 'Laut Hitam', isCorrect: false },
      ],
    },
    {
      id: 335,
      content: 'Ibukota Australia adalah?',
      maxScore: 100,
      timer: 30,
      answers: [
        { content: 'Canberra', isCorrect: true },
        { content: 'Sydney', isCorrect: false },
        { content: 'Melbourne', isCorrect: false },
        { content: 'Brisbane', isCorrect: false },
      ],
    },
    {
      id: 336,
      content: 'Negara manakah yang memiliki piramida terbesar?',
      maxScore: 100,
      timer: 30,
      answers: [
        { content: 'Mesir', isCorrect: true },
        { content: 'Meksiko', isCorrect: false },
        { content: 'Peru', isCorrect: false },
        { content: 'Sudan', isCorrect: false },
      ],
    },
    {
      id: 337,
      content: "Siapa penulis novel 'Harry Potter'?",
      maxScore: 100,
      timer: 30,
      answers: [
        { content: 'J.K. Rowling', isCorrect: true },
        { content: 'J.R.R. Tolkien', isCorrect: false },
        { content: 'George R.R. Martin', isCorrect: false },
        { content: 'C.S. Lewis', isCorrect: false },
      ],
    },
    {
      id: 338,
      content: 'Apa nama sungai terpanjang di dunia?',
      maxScore: 100,
      timer: 30,
      answers: [
        { content: 'Nil', isCorrect: true },
        { content: 'Amazon', isCorrect: false },
        { content: 'Yangtze', isCorrect: false },
        { content: 'Mississippi', isCorrect: false },
      ],
    },
    {
      id: 339,
      content: 'Apa nama pulau terbesar di dunia?',
      maxScore: 100,
      timer: 30,
      answers: [
        { content: 'Greenland', isCorrect: true },
        { content: 'New Guinea', isCorrect: false },
        { content: 'Borneo', isCorrect: false },
        { content: 'Madagaskar', isCorrect: false },
      ],
    },
    {
      id: 400,
      content: 'Apa nama bangunan tertinggi di dunia saat ini?',
      maxScore: 100,
      timer: 30,
      answers: [
        { content: 'Burj Khalifa', isCorrect: true },
        { content: 'Shanghai Tower', isCorrect: false },
        { content: 'Abraj Al-Bait', isCorrect: false },
        { content: 'One World Trade Center', isCorrect: false },
      ],
    },
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
          create: question.answers,
        },
      },
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
