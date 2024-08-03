import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const avatars = [
    {
      id: 1,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/curly-hair-man-with-vr-9606843-7759131.png?f=webp',
      isPremium: false,
    },
    {
      id: 2,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/curly-hair-man-9606398-7766943.png?f=webp',
      isPremium: false,
    },
    {
      id: 3,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/bald-hair-man-with-vr-9606391-7766936.png?f=webp',
      isPremium: false,
    },
    {
      id: 4,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/bald-hair-man-with-beanie-hat-9606385-7766930.png?f=webp',
      isPremium: false,
    },
    {
      id: 5,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/woman-wearing-hijab-9606853-7759141.png?f=webp',
      isPremium: false,
    },
    {
      id: 6,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/woman-wearing-hijab-9606847-7759135.png?f=webp',
      isPremium: false,
    },
    {
      id: 7,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/dreadlocked-man-9606395-7766940.png?f=webp',
      isPremium: false,
    },
    {
      id: 8,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/short-hair-man-with-bucket-hat-9606384-7766929.png?f=webp',
      isPremium: false,
    },
    {
      id: 9,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDDmiVTnO-q6o7cyUX-heAOkwujoITTsmkACrn6pWCHjErlrGWUYbjm9KijC5XABr1cbw&usqp=CAU',
      isPremium: false,
    },
    {
      id: 10,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnQHMerhHDL_bNgCCHoyHf5d7maNVrXaIFD3Oc-p6gJ2m5T7WgfnjKqsmX1PTX4fhEhxk&usqp=CAU',
      isPremium: false,
    },
    {
      id: 11,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/mohawk-hair-man-9606858-7759146.png',
      isPremium: false,
    },
    {
      id: 12,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/short-hair-woman-with-vr-9606837-7759125.png?f=webp',
      isPremium: false,
    },
  ];

  const diamondPackages = [
    {
      id: 1,
      image:
        'https://png.pngtree.com/png-clipart/20220822/ourmid/pngtree-game-gems-bag-ui-icon-png-png-image_6120206.png',
      price: 20000,
      quantity: 100,
    },
    {
      id: 2,
      image:
        'https://previews.123rf.com/images/emojiimage/emojiimage1802/emojiimage180200329/95468322-large-brown-bag-full-of-valuable-stones-diamonds-sapphires-and-rubies-cartoon-gemstones-flat-vector.jpg',
      price: 37000,
      quantity: 200,
    },
    {
      id: 3,
      image:
        'https://st2.depositphotos.com/4155807/6227/v/950/depositphotos_62271937-stock-illustration-bag-with-gems.jpg',
      price: 69000,
      quantity: 500,
    },
    {
      id: 4,
      image: 'https://img.freepik.com/premium-vector/vector_863384-155.jpg',
      price: 135000,
      quantity: 1000,
    },
    {
      id: 5,
      image:
        'https://thumbs.dreamstime.com/b/cloth-fabric-money-bag-full-various-diamonds-sack-gems-game-interface-elements-donation-microtransacton-vector-107785049.jpg',
      price: 250000,
      quantity: 500,
    },
    {
      id: 6,
      image:
        'https://previews.123rf.com/images/lilu330/lilu3301504/lilu330150400080/41680969-cartoon-wooden-chest-with-diamonds.jpg',
      price: 516000,
      quantity: 10000,
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
