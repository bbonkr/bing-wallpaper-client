export type AnchorTargets = '_blank' | '_slef' | string;

export interface LinkModel {
    title: string;
    href: string;
    target?: AnchorTargets;
}
