import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const avatars = [
    {
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/curly-hair-man-with-vr-9606843-7759131.png?f=webp',
      isPremium: false,
    },
    {
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/curly-hair-man-9606398-7766943.png?f=webp',
      isPremium: false,
    },
    {
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/bald-hair-man-with-vr-9606391-7766936.png?f=webp',
      isPremium: false,
    },
    {
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/bald-hair-man-with-beanie-hat-9606385-7766930.png?f=webp',
      isPremium: false,
    },
    {
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/woman-wearing-hijab-9606853-7759141.png?f=webp',
      isPremium: false,
    },
    {
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/woman-wearing-hijab-9606847-7759135.png?f=webp',
      isPremium: false,
    },
    {
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/dreadlocked-man-9606395-7766940.png?f=webp',
      isPremium: false,
    },
    {
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/short-hair-man-with-bucket-hat-9606384-7766929.png?f=webp',
      isPremium: false,
    },
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDDmiVTnO-q6o7cyUX-heAOkwujoITTsmkACrn6pWCHjErlrGWUYbjm9KijC5XABr1cbw&usqp=CAU',
      isPremium: false,
    },
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnQHMerhHDL_bNgCCHoyHf5d7maNVrXaIFD3Oc-p6gJ2m5T7WgfnjKqsmX1PTX4fhEhxk&usqp=CAU',
      isPremium: false,
    },
    {
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/mohawk-hair-man-9606858-7759146.png',
      isPremium: false,
    },
    {
      image:
        'https://cdn3d.iconscout.com/3d/premium/thumb/short-hair-woman-with-vr-9606837-7759125.png?f=webp',
      isPremium: false,
    },
  ];

  for (const avatar of avatars) {
    await prisma.avatar.create({
      data: avatar,
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
