import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const avatars = [
    {
      id: 1,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/curly-hair-man-with-vr-9606843-7759131.png?f=webp',
      price: 25,
      isPremium: false,
    },
    {
      id: 2,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/curly-hair-man-9606398-7766943.png?f=webp',
      price: 25,
      isPremium: false,
    },
    {
      id: 3,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/bald-hair-man-with-vr-9606391-7766936.png?f=webp',
      price: 25,
      isPremium: false,
    },
    {
      id: 4,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/bald-hair-man-with-beanie-hat-9606385-7766930.png?f=webp',
      price: 30,
      isPremium: false,
    },
    {
      id: 5,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/woman-wearing-hijab-9606853-7759141.png?f=webp',
      price: 30,
      isPremium: false,
    },
    {
      id: 6,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/woman-wearing-hijab-9606847-7759135.png?f=webp',
      price: 30,
      isPremium: false,
    },
    {
      id: 7,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/dreadlocked-man-9606395-7766940.png?f=webp',
      price: 25,
      isPremium: false,
    },
    {
      id: 8,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/short-hair-man-with-bucket-hat-9606384-7766929.png?f=webp',
      price: 25,
      isPremium: false,
    },
    {
      id: 9,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDDmiVTnO-q6o7cyUX-heAOkwujoITTsmkACrn6pWCHjErlrGWUYbjm9KijC5XABr1cbw&usqp=CAU',
      price: 25,
      isPremium: false,
    },
    {
      id: 10,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnQHMerhHDL_bNgCCHoyHf5d7maNVrXaIFD3Oc-p6gJ2m5T7WgfnjKqsmX1PTX4fhEhxk&usqp=CAU',
      price: 30,
      isPremium: false,
    },
    {
      id: 11,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/mohawk-hair-man-9606858-7759146.png',
      price: 30,
      isPremium: false,
    },
    {
      id: 12,
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/short-hair-woman-with-vr-9606837-7759125.png?f=webp',
      price: 30,
      isPremium: false,
    },
  ];

  const diamondPackages = [
    {
      id: 1,
      image:
        'https://res.cloudinary.com/dv8vfur0m/image/upload/v1722826431/d1-removebg-preview_me6qay.png',
      price: 20000,
      quantity: 100,
    },
    {
      id: 2,
      image:
        'https://res.cloudinary.com/dv8vfur0m/image/upload/v1722826432/d4-removebg-preview_nhesta.png',
      price: 37000,
      quantity: 200,
    },
    {
      id: 3,
      image:
        'https://res.cloudinary.com/dv8vfur0m/image/upload/v1722826432/d5-removebg-preview_br1iwu.png',
      price: 69000,
      quantity: 500,
    },
    {
      id: 4,
      image:
        'https://res.cloudinary.com/dv8vfur0m/image/upload/v1722826432/d6-removebg-preview_i8kijx.png',
      price: 135000,
      quantity: 1000,
    },
    {
      id: 5,
      image:
        'https://res.cloudinary.com/dv8vfur0m/image/upload/v1722826432/d8-removebg-preview_relfdo.png',
      price: 250000,
      quantity: 500,
    },
    {
      id: 6,
      image:
        'https://res.cloudinary.com/dv8vfur0m/image/upload/v1722826432/d7-removebg-preview_idhc1f.png',
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
