// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
  }
  
  // Returns a random single stand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand
  }
  
  const pAequorFactory = (specimenNum, dna) => {
    return {
      specimenNum: specimenNum,
      dna: dna,
      mutate() {
        const randIndex = Math.floor(Math.random() * this.dna.length);
        let newMutatedRandBase = returnRandBase();
        while (newMutatedRandBase === this.dna[randIndex]) {
          newMutatedRandBase = returnRandBase();
        }
        this.dna[randIndex] = newMutatedRandBase;
        return this.dna;
      },
      compareDNA(pAequor) {
        let anotherSpecimenNum = pAequor.specimenNum;
        let anotherDna = pAequor.dna;
        let baseHit = 0;
        for (let i = 0; i < this.dna.length; i++) {
          if (this.dna[i] === anotherDna[i]) {
            baseHit++;
          }
        }
        let dnaCommonPercentage = `${(baseHit / this.dna.length) * 100}%`;
        console.log(`specimen #${this.specimenNum} and specimen #${anotherSpecimenNum} have ${dnaCommonPercentage} DNA in common`);
      },
      willLikelySurvive() {
        let baseHit = this.dna.filter(el => el === 'C' || el === 'G');
        return baseHit.length / this.dna.length >= 0.6;
      }
    };
  }
  
  const build30pAequor = () => {
    let specimenNum = 1;
    pAequorArray = [];
    while (pAequorArray.length < 30) {
      let pAequor = pAequorFactory(specimenNum, mockUpStrand());
      if (pAequor.willLikelySurvive()) {
        pAequorArray.push(pAequor);
        specimenNum++;
      }
    }
  }
  
  build30pAequor();
  
  let pAequor1 = pAequorFactory(1, mockUpStrand());
  let pAequor2 = pAequorFactory(2, mockUpStrand());
  console.log(pAequor1.mutate());
  console.log(pAequor2.dna);
  
  pAequor1.compareDNA(pAequor2);
  
  console.log(pAequor2.willLikelySurvive());