export interface PortfolioInterface {
    sector: PortfolioSector[];
    works: PortfolioWorks[];
}
export interface PortfolioSector {
    id: number;
    title: string;
    active: boolean;
}
export interface PortfolioWorks {
    link: string;
    thumb: string;
    title: string;
    active: boolean;
    preview: string;
    subtitle: string;
    sectors: PortfolioSector[];
}
export interface TestimonialInterface {
    name: string;
    title: string;
    thumb: string;
    active: boolean;
    comment: string;
}
