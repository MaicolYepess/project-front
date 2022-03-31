export class Retro {
    id: string;
    sprint: string;
    positiveAspects: string[];
    negativeAspects: string[];
    aspectsToImprove: string[];
    commitments: Commitment[];
}

export class Commitment {
    id: string;
    description: string;
    compliment: boolean;
}