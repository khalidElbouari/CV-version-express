import { getAllCVs, getCVById } from '../src/services/cv-service.js';

describe("CV Service Tests", () => {
  test("should return all CVs", () => {
    const cvs = getAllCVs();
    expect(Array.isArray(cvs)).toBe(true);
    expect(cvs.length).toBeGreaterThan(0);
  });

  test("should return a CV by id", () => {
    const cv = getCVById("cv1");
    expect(cv).toBeDefined();
    expect(cv.profile.firstName).toBe("Khalid");
  });

  test("should return null for unknown CV id", () => {
    const cv = getCVById("cv999");
    expect(cv).toBeNull();
  });
});
