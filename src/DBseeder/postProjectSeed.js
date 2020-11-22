const PostProject = require("../models/postProjectModel");

const newProject = [
  {
    name: "Paarth",
    email: "test123@test.com",
    gender: "male",
    skillLevel: "Intermediate",
    domain: "Web Development",
    projectTitle: "Peer Project Forum",
    description:
      "lorem ipsum peer project and this makes it two lines of description jai hind!"
  }
];

const postProjectSeed = async () => {
  await PostProject.sync({ force: true });
  newProject.forEach(async (project) => {
    try {
      const result = await PostProject.create(project);
      console.log(result.get());
    } catch (e) {
      console.error(e);
    }
  });
};

postProjectSeed();
