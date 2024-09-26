// Define the MajorCredits interface
interface MajorCredits {
	credits: number;
	brand: 'major';
  }

  // Define the MinorCredits interface
  interface MinorCredits {
	credits: number;
	brand: 'minor';
  }

  // Function to sum major credits
  function sumMajorCredits(subject1: MajorCredits, subject2: MajorCredits): MajorCredits {
	return {
	  credits: subject1.credits + subject2.credits,
	  brand: 'major',
	};
  }

  // Function to sum minor credits
  function sumMinorCredits(subject1: MinorCredits, subject2: MinorCredits): MinorCredits {
	return {
	  credits: subject1.credits + subject2.credits,
	  brand: 'minor',
	};
  }

  // Example usage
  const major1: MajorCredits = { credits: 3, brand: 'major' };
  const major2: MajorCredits = { credits: 4, brand: 'major' };
  const totalMajorCredits = sumMajorCredits(major1, major2);
  console.log(`Total Major Credits: ${totalMajorCredits.credits}`);

  const minor1: MinorCredits = { credits: 2, brand: 'minor' };
  const minor2: MinorCredits = { credits: 1, brand: 'minor' };
  const totalMinorCredits = sumMinorCredits(minor1, minor2);
  console.log(`Total Minor Credits: ${totalMinorCredits.credits}`);
  