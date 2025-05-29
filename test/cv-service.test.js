import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/CVs.json"); 
import {
  getAllCVs,
  getCVById,
  addCV,
  updateCV,
  deleteCV,
} from "../src/services/cv-service.js";

describe("CV Service Tests", () => {
  let originalData;

  // Avant tout : lire et sauvegarder les données originales
  beforeAll(async () => {
    const content = await fs.readFile(filePath, "utf8");
    originalData = content;
  });

  // Après tout : restaurer les données originales
  afterAll(async () => {
    await fs.writeFile(filePath, originalData, "utf8");
  });

  test("should return all CVs", async () => {
    const cvs = await getAllCVs();
    expect(cvs).toBeDefined();
  });

  test("should return a CV by id", async () => {
    const cv = await getCVById("cv1");
    expect(cv).toBeDefined();
    expect(cv.profile.firstName).toBe("Khalid");
  });

  test("should add a new CV", async () => {
    const newCV = {
      profile: {
        firstName: "Ayoub",
        lastName: "Elbouari",
        professionalSummary: "System admin",
      },
      technologySkills: [{ skill: "Node.js", details: ["Express", "Jest"] }],
      experiences: [{ technologies: ["Node.js", "java"] }],
    };

    await addCV(newCV);
    const allCVs = await getAllCVs();

    const added = Object.values(allCVs).find(
      (cv) => cv.profile.firstName === "Ayoub"
    );
    expect(added).toBeDefined();
    expect(added.profile.lastName).toBe("Elbouari");
  });

  test("should update a CV", async () => {
    const allCVs = await getAllCVs();
    const existingId = Object.keys(allCVs).find(
      (id) => allCVs[id].profile.firstName === "Ayoub"
    );

    const updated = {
      ...allCVs[existingId],
      profile: {
        ...allCVs[existingId].profile,
        firstName: "UpdatedTest",
      },
    };

    const success = await updateCV(existingId, updated);
    expect(success).toBe(true);

    const modified = await getCVById(existingId);
    expect(modified.profile.firstName).toBe("UpdatedTest");
  });

  test("should delete a CV", async () => {
    const allCVs = await getAllCVs();
    const idToDelete = Object.keys(allCVs).find(
      (id) => allCVs[id].profile.firstName === "UpdatedTest"
    );

    const deleted = await deleteCV(idToDelete);
    expect(deleted).toBe(true);

    const afterDelete = await getCVById(idToDelete);
    expect(afterDelete).toBeUndefined();
  });
});
