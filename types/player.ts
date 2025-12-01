export type PlayerType = "Mensalista" | "Diarista"
export type Position = "Defesa" | "Meio" | "Ataque"

export interface PlayerSkills {
    speed: number
    stamina: number
    intelligence: number
    vision: number
    technique: number
}

export interface Player {
    id: string
    name: string
    type: PlayerType
    positions: Position[]
    skills: PlayerSkills
    createdAt: number
}

export const initialSkills: PlayerSkills = {
    speed: 3,
    stamina: 3,
    intelligence: 3,
    vision: 3,
    technique: 3,
}
