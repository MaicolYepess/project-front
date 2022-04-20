export class Retro {
    id: string;
    sprint: string;
    date: string;
    positiveAspects: string[];
    negativeAspects: string[];
    aspectsToImprove: string[];
    commitments: Commitment[];
}

export class Commitment {
    id: string;
    description: string;
    responsible: string;
    compliment: boolean;
}