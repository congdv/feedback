import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const tags = await prisma.tag.findMany();
  if(tags.length === 0) {
    const bug = await prisma.tag.create({
      data: {
        slug: "Bug",
        description: "Bug"
      }
    })
    const question = await prisma.tag.create({
      data: {
        slug: "Question",
        description: "Question"
      }
    })
    const feature = await prisma.tag.create({
      data: {
        slug: "Feature",
        description: "Feature"
      }
    })
  
    const improvement = await prisma.tag.create({
      data: {
        slug: "Improvement",
        description: "Improvement"
      }
    })

  }

  const status = await prisma.status.findMany();

  if(status.length === 0) {
    await prisma.status.create({
      data: {
        slug: "in-review",
        description: "In review"
      }
    })
    await prisma.status.create({
      data: {
        slug: "planned",
        description: "Planned"
      }
    })
   

    await prisma.status.create({
      data: {
        slug: "in-progress",
        description: "In progress"
      }
    })
    await prisma.status.create({
      data: {
        slug: "done",
        description: "Done"
      }
    })
  } else if (status.length === 1) {
    await prisma.status.create({
      data: {
        slug: "planned",
        description: "Planned"
      }
    })
   

    await prisma.status.create({
      data: {
        slug: "in-progress",
        description: "In progress"
      }
    })
    await prisma.status.create({
      data: {
        slug: "done",
        description: "Done"
      }
    })
  }
  

  

}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })