export interface ServiceInterface {
    desc: string;
    title: string;
    active: boolean;
    resource: ServiceResource[];
}
export interface ServiceResource {
    icon: string;
    link: string;
}
export interface ClientInterface {
    active: boolean;
    title: string;
    logo: string;
}
