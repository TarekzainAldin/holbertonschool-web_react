// تعريف الـ interfaces
interface MajorCredits {
    credits: number;
    brand: "major";
  }
  
  interface MinorCredits {
    credits: number;
    brand: "minor";
  }
  
  // تعريف الدوال
  function sumMajorCredits(subject1: MajorCredits, subject2: MajorCredits): MajorCredits {
    return {
      credits: subject1.credits + subject2.credits,
      brand: "major"
    };
  }
  
  function sumMinorCredits(subject1: MinorCredits, subject2: MinorCredits): MinorCredits {
    return {
      credits: subject1.credits + subject2.credits,
      brand: "minor"
    };
  }
  
  // ✅ استخدام الدوال (حتى لو بس للتجريب)
  const major1: MajorCredits = { credits: 3, brand: "major" };
  const major2: MajorCredits = { credits: 4, brand: "major" };
  const totalMajor = sumMajorCredits(major1, major2);
  console.log("Total Major Credits:", totalMajor);
  
  const minor1: MinorCredits = { credits: 1, brand: "minor" };
  const minor2: MinorCredits = { credits: 2, brand: "minor" };
  const totalMinor = sumMinorCredits(minor1, minor2);
  console.log("Total Minor Credits:", totalMinor);
  